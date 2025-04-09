"""
Email-only authentication.
"""
from datetime import datetime
import uuid
from fastapi import APIRouter, status, HTTPException, BackgroundTasks
from fastapi import Form, UploadFile, File
from fastapi.responses import JSONResponse, RedirectResponse

from app.core.config import HOME_URL, EMAIL_REGISTER_URL, LOGIN_URL, PROFILE_PICTURE_URL, API_URL
from app.schemas.general.responses import MessageResponse, TokenResponse
from app.schemas.users.schools import SchoolBase, School
from app.schemas.users.shared import EmailLoginRequestBody
from app.services.schools import create_school
from app.services.user import user_exists
from app.utils.auth_utils import generate_verification_token, generate_access_token, generate_refresh_token
from app.utils.auth_utils import store_auth_data, decode_token, store_registration_data, get_registration_data
from app.utils.email_auth_utils import send_email_verification_link
from app.utils.general import save_verification_document, validate_pdf




email_auth_router = APIRouter()

@email_auth_router.post('/login', response_model=MessageResponse)
async def login(body: EmailLoginRequestBody, background_tasks: BackgroundTasks):
    """
    Login with email.
    """
    email = body.email

    user = user_exists(email)
    if user:
        token = generate_verification_token({"sub": email, "registered": True})
    else:
        token = generate_verification_token({"sub": email, "registered": False})

    background_tasks.add_task(send_email_verification_link, email, token)

    return JSONResponse(status_code=status.HTTP_200_OK,
                        content=MessageResponse(message="Email sent successfully.").model_dump())

@email_auth_router.get('/verify')
async def verify(token: str):
    """
    Verify token.
    """
    payload = decode_token(token)
    error = payload.get("error")
    is_verification = payload.get("token_type") == "verification"
    if error or not is_verification:
        return RedirectResponse(url=HOME_URL)

    registered = payload.get("registered")
    email = payload.get("sub")
    user = user_exists(email)
    if registered and user:
        access_token = generate_access_token({"sub": email})
        refresh_token = generate_refresh_token({"sub": email})
        state_id = store_auth_data({"access_token": access_token, "refresh_token": refresh_token})
        response = RedirectResponse(url=f"{LOGIN_URL}?state_id={state_id}")
        return response
    registration_id = store_registration_data(user_data={"email": email}, registration_method="email")
    response = RedirectResponse(url=f"{EMAIL_REGISTER_URL}?registration_id={registration_id}")
    return response

@email_auth_router.post('/register/school', response_model=SchoolBase)
async def register_school(
    name: str = Form(...),
    phone_number: str = Form(...),
    geo_coordinates: str = Form(...),
    school_registration_number: str = Form(...),
    verification_document: UploadFile = File(...),
    registration_id: str = Form(...)
):
    """
    Register school.
    """
    if registration_id[0:2] != "e-":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                             detail="Invalid registration ID.")
    stored_data = get_registration_data(registration_id)

    if not stored_data:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                             detail="Unauthorized access.")
    
    email = stored_data.get("email")
    school_exists = user_exists(email)
    if school_exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="School already exists.")

    if not verification_document:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Verification document is required.")

    # Validate the file type
    validate_pdf(verification_document)

    # Save the verification document
    filename = save_verification_document(verification_document)

    file_url = f"{API_URL}/uploads/{filename}"

    # Create a school object
    school_obj = {
        "name": name,
        "email": email,
        "phone_number": phone_number,
        "geo_coordinates": geo_coordinates,
        "school_registration_number": school_registration_number,
        "verification_document": file_url,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        "is_verified": False
    }

    # Store the school object in the database
    inserted_school_id = create_school(school_obj)
    school_obj["school_id"] = inserted_school_id
    if not inserted_school_id:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Error adding school to database.")
    
    access_token = generate_access_token({"sub": email})
    refresh_token = generate_refresh_token({"sub": email})

    return JSONResponse(status_code=status.HTTP_201_CREATED,
                        content=TokenResponse(
                            access_token=access_token,
                            refresh_token=refresh_token,
                            token_type="Bearer",
                            ).model_dump())

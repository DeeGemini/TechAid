# New endpoint in admin_router.py
from fastapi import Depends, Form, HTTPException, APIRouter
from fastapi.responses import JSONResponse
from app.services.schools import verify_school, get_school_by_id
from app.schemas.schools import SchoolBase

admin_router = APIRouter()

async def get_current_admin():
    # Placeholder admin dependency; replace with real auth implementation
    raise HTTPException(status_code=401, detail="Admin authentication not implemented")

@admin_router.patch('/schools/{school_id}/verify', response_model=SchoolBase)
async def verify_school_endpoint(
    school_id: str,
    is_approved: bool = Form(...),
    current_admin: dict = Depends(get_current_admin)  # Implement admin auth
):
    school = get_school_by_id(school_id)
    if not school:
        raise HTTPException(status_code=404, detail="School not found")

    if is_approved:
        verify_school(school_id)  # Updates is_verified=True in DB
        return JSONResponse(status_code=200, content={"message": "School verified"})
    else:
        # Optional: Send rejection email to school
        return JSONResponse(status_code=200, content={"message": "Verification rejected"})
import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
import mimetypes

from app.core.config import SECRET_KEY
from app.api.endpoints.google_auth import google_router
from app.api.endpoints.email_auth import email_auth_router

app = FastAPI()
if not SECRET_KEY:
    raise ValueError('Missing key!')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key=SECRET_KEY
)

app.include_router(router=google_router, tags=['Google Auth'])
app.include_router(router=email_auth_router, tags=['Email Auth'])



@app.get("/uploads/{filename}")
async def view_verification_document(filename: str):
    file_path = os.path.join("schools", filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    # Guess the content type (e.g., application/pdf, image/jpeg)
    content_type, _ = mimetypes.guess_type(file_path)
    content_type = content_type or "application/octet-stream"

    return FileResponse(file_path, media_type=content_type, filename=filename)

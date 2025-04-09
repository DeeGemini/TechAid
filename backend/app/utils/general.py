import os
from uuid import uuid4
from fastapi import UploadFile, HTTPException

def save_verification_document(file: UploadFile, upload_dir: str = "schools") -> str:
    # Make sure the upload directory exists
    os.makedirs(upload_dir, exist_ok=True)

    # Create a unique filename using uuid + preserve extension
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid4().hex}{file_extension}"

    file_path = os.path.join(upload_dir, unique_filename)

    # Save the file
    with open(file_path, "wb") as f:
        contents = file.file.read()
        f.write(contents)

    return unique_filename  # You can return just the filename if you want

def validate_pdf(file: UploadFile):
    # Check MIME type
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # Optional: Double-check extension
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid file extension. Only .pdf files are accepted")


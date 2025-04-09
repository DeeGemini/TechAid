from pydantic import BaseModel, EmailStr
from fastapi import UploadFile, File


class SchoolBase(BaseModel):
    name: str
    email: EmailStr
    phone_number: str
    geo_coordinates: str
    registration_number: str
    created_at: str
    updated_at: str
    is_verified: bool
    verification_document: str

class School(SchoolBase):
    school_id: str

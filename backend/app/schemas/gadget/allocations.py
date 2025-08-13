from datetime import datetime
from pydantic import BaseModel, EmailStr
from fastapi import UploadFile, File


class AllocationsBase(BaseModel):
    allocation_id: str
    school_id: str
    gadget_type: str
    quantity : int
    allocation_date: datetime


class Allocations(AllocationsBase):
    allocation_id: str

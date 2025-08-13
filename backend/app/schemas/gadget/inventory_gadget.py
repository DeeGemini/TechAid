from pydantic import BaseModel, EmailStr
from fastapi import UploadFile, File


class GadgetinventoryBase(BaseModel):
    gadget_name: str
    available_quantity: int
    

class Gadgetinventory(GadgetinventoryBase):
    Gadgetinventory_id: str

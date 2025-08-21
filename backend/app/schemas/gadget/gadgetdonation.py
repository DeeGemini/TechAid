import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional


class GadgetdonationBase(BaseModel):
    donation_id: str
    donor_id: str  # Links to donor user
    gadget_type: str  # e.g., "Laptop", "Tablet"
    quantity: int
    donation_date: datetime = datetime.now()
    status: str = "available"  
    

class GadgetDonation(GadgetdonationBase):
    donation_id: str

# schemas/gadgets.py
from pydantic import BaseModel
from datetime import datetime

class GadgetDonationBase(BaseModel):
    donation_id: str
    donor_id: str  # Links to donor user
    gadget_type: str  # e.g., "Laptop", "Tablet"
    quantity: int
    donation_date: datetime = datetime.now()
    status: str = "available"  # available, allocated
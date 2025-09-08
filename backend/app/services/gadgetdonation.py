import uuid  # Import UUID module
from datetime import datetime  # For default timestamp
from app.database.mongo_db import donation_collection  # Correct collection
from app.schemas.users.schools import SchoolBase
from backend.app.schemas.gadget.gadgetdonation import GadgetdonationBase

def create_gadgetdonation(gadgetdonation: GadgetdonationBase):
    # Convert Pydantic model to dictionary
    gadgetdonation_data = gadgetdonation.model_dump()
    
    # Generate a unique donation_id (UUID)
    donation_id = uuid.uuid4()
    gadgetdonation_data["donation_id"] = str(donation_id)

    # Set donation_date to current time if not provided
    if "donation_date" not in gadgetdonation_data:
        gadgetdonation_data["donation_date"] = datetime.utcnow()

    # Insert into the donations collection
    result = donation_collection.insert_one(gadgetdonation_data)

    # Return the generated donation_id (UUID string)
    return str(donation_id)
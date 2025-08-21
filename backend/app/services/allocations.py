import uuid  # Import UUID module
from datetime import datetime  # For default timestamp
from app.database.mongo_db import allocations_collection  # Correct collection
from app.schemas.users.schools import SchoolBase
from backend.app.schemas.gadget.allocations import AllocationsBase

def create_allocations(allocations: AllocationsBase):
    # Convert Pydantic model to dictionary
    allocation_data = allocations.model_dump()
    
    # Generate a unique allocation_id (UUID)
    allocation_id = uuid.uuid4()
    allocation_data["allocation_id"] = str(allocation_id)
    
    # Set allocation_date to current time if not provided
    if "allocation_date" not in allocation_data:
        allocation_data["allocation_date"] = datetime.utcnow()
    
    # Insert into the allocations collection
    result = allocations_collection.insert_one(allocation_data)
    
    # Return the generated allocation_id (UUID string)
    return str(allocation_id)
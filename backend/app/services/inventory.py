from app.database.mongo_db import schools_collection
from app.schemas.users.schools import SchoolBase
from backend.app.schemas.gadget.inventory_gadget import GadgetinventoryBase

def create_inventory_gadget(gadgetinventory : GadgetinventoryBase):
    """
    Create a new gadget inventory in the database.
    """
    gadget_data = gadgetinventory.model_dump()
    result = schools_collection.insert_one(gadget_data)
    return str(result.inserted_id)
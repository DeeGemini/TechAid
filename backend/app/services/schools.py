from app.database.mongo_db import schools_collection
from app.schemas.users.schools import SchoolBase


def create_school(school: SchoolBase):
    """
    Create a new school in the database.
    """
    school_data = school.model_dump()
    result = schools_collection.insert_one(school_data)
    return str(result.inserted_id)

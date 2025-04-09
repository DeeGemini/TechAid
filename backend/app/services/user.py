from app.database.mongo_db import users_index


async def user_exists(email: str) -> bool:
    """
    Retrieves a user associated with given email.
    """
    user = await users_index.find_one({"email": email})
    if not user:
        return False
    return True
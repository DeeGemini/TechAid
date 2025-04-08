from datetime import datetime, timedelta
import uuid
from typing import Tuple
from fastapi import HTTPException, status
import jwt
from jose import JWTError

from app.core.config import TOKEN_KEY
from app.database.redis_db import redis_client


ACCESS_TOKEN_EXPIRE_MINUTES = 60
REFRESH_TOKEN_EXPIRE_DAYS = 30

def generate_verification_token(payload: dict) -> str:
    """
    Generate verification token.
    """
    payload["token_type"] = "verification"
    payload["exp"] = int((datetime.now() + timedelta(minutes=15)).timestamp())
    return jwt.encode(payload, TOKEN_KEY, algorithm="HS256")

def generate_access_token(payload: dict) -> str:
    """
    Generate access token.
    """
    payload["token_type"] = "access"
    payload["exp"] = int((datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)).timestamp())
    token = jwt.encode(payload, TOKEN_KEY, algorithm="HS256")
    return token

def generate_refresh_token(payload: dict) -> str:
    """
    Generate refresh token.
    """
    payload["token_type"] = "refresh"
    payload["exp"] = int((datetime.now() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)).timestamp())
    token = jwt.encode(payload, TOKEN_KEY, algorithm="HS256")
    return token

def decode_token(token: str) -> dict:
    """
    Decode token.
    """
    try:
        return jwt.decode(token, TOKEN_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired."}
    except jwt.InvalidTokenError:
        return {"error": "Invalid token."}
    except JWTError as e:
        return {"error": str(e)}

def validate_token(token: str, token_type: str) -> dict:
    """
    Validate token.
    """
    try:
        is_blacklisted = token_is_blacklisted(token)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Unauthorized access.") from exc

    if is_blacklisted:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Unauthorized access.")

def validate_token(token: str, token_type: str) -> dict:
    """
    Validate token.
    """
    try:
        is_blacklisted = token_is_blacklisted(token)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Unauthorized access.") from exc

    if is_blacklisted:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Unauthorized access.")

    payload = decode_token(token)
    error = payload.get("error")
    if error:
        print("Error decoding token:", error)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Unauthorized access.")

    is_right_type = payload.get("token_type") == token_type
    if not is_right_type:
        print("Token type not equal to token_type.")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Unauthorized access.")

    user_id = payload.get("sub")
    user = find_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                             detail="Unauthorized access.")
    return payload

def store_auth_data(auth_data: dict) -> str:
    """
    Store authentication data in redis.
    """
    state_id = str(uuid.uuid4())
    redis_client.hset(state_id, mapping=auth_data)
    redis_client.expire(state_id, 600)

    return state_id

def get_auth_data(state_id: str) -> dict:
    """
    Get authentication data from redis.
    """
    auth_data = redis_client.hgetall(state_id)
    decoded_auth_data = {}
    for key, value in auth_data.items():
        key = key.decode("utf-8")
        decoded_auth_data[key] = value.decode("utf-8")
    redis_client.delete(state_id)
    return decoded_auth_data

def blacklist_token(token: str, ttl: int) -> None:
    """
    Blacklist token.
    """
    try:
        redis_client.set(token, ttl, "blacklisted")
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Token blacklisting failed.") from exc

def token_is_blacklisted(token: str) -> bool:
    """
    Check if token is blacklisted.
    """
    blacklisted = redis_client.get(token)
    is_blacklisted = blacklisted == b"blacklisted"
    return is_blacklisted

def store_registration_data(user_data: dict, registration_method: str) -> str:
    """
    Store user's registration data in redis.
    """
    if registration_method == "email":
        registration_id = f"e-{str(uuid.uuid4())}"
    elif registration_method == "google":
        registration_id = f"g-{str(uuid.uuid4())}"
    else:
        return None
    redis_client.hset(registration_id, mapping=user_data)
    redis_client.expire(registration_id, 3600)

    return registration_id

def get_registration_data(registration_id: str) -> dict:
    """
    Get user's registration data from redis.
    """
    user_data = redis_client.hgetall(registration_id)
    modified_user_data = {}
    for key, value in user_data.items():
        key = key.decode("utf-8")
        modified_user_data[key] = value.decode("utf-8")
    redis_client.delete(registration_id)
    return modified_user_data


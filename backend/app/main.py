from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.core.config import SECRET_KEY
from app.api.endpoints.google_auth import google_router

app = FastAPI()
if not SECRET_KEY:
    raise ValueError('Missing key!')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key=SECRET_KEY
)

app.include_router(router=google_router, tags=['Google Auth'])

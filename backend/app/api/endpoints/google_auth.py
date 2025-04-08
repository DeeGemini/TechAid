from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import RedirectResponse
from starlette.config import Config
from authlib.integrations.starlette_client import OAuth, OAuthError

from app.core.config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET


if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
    raise ValueError("Missing Google credentials!")

config_data = {'GOOGLE_CLIENT_ID': GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_SECRET': GOOGLE_CLIENT_SECRET}
config = Config(environ=config_data)
oauth = OAuth(config=config)

oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

google_router = APIRouter()

@google_router.route('/google/login')
async def login(request: Request):
    """
    Login with Google.
    """
    redirect_uri = request.url_for('auth')
    return await oauth.google.authorize_redirect(request, redirect_uri)

@google_router.route('/auth')
async def auth(request: Request):
    """
    Authorization from the user.
    """
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f'Could not validate credentials: {error}'
        ) from error
    print(token.get('userinfo'))

    return RedirectResponse(url='/test')

@google_router.get('/test')
def test():
    return {'message': 'successful'}

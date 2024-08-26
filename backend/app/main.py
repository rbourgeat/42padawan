import httpx
import os

from fastapi import FastAPI, Request, Response, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2AuthorizationCodeBearer
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from starlette.responses import JSONResponse

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
AUTHORIZATION_BASE_URL = os.getenv("AUTHORIZATION_BASE_URL")
TOKEN_URL = os.getenv("TOKEN_URL")
FRONTEND_URL = os.getenv("FRONTEND_URL")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust according to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=AUTHORIZATION_BASE_URL,
    tokenUrl=TOKEN_URL,
)

@app.get("/")
def read_root():
    return {"Hello": "Student"}

@app.get("/login")
def login():
    authorization_url = (
        f"{AUTHORIZATION_BASE_URL}?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code"
    )
    return RedirectResponse(authorization_url)

@app.get("/logout")
async def logout(response: Response):
    response.delete_cookie(key="authToken")
    return {"detail": "Logged out"}

@app.get("/auth/callback")
async def auth_callback(code: str, request: Request):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            TOKEN_URL,
            data={
                "grant_type": "authorization_code",
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uri": REDIRECT_URI,
                "code": code,
            },
        )
        response_data = response.json()
        access_token = response_data.get("access_token")

        response = RedirectResponse(url=FRONTEND_URL)
        response.set_cookie(key="authToken", value=access_token, httponly=True, secure=True, samesite="Lax")
        return response

def get_token_from_cookie(request: Request):
    token = request.cookies.get("authToken")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return token

@app.get("/profile")
async def profile(request: Request):
    token = get_token_from_cookie(request)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.intra.42.fr/v2/me",
            headers={"Authorization": f"Bearer {token}"},
        )
        if response.status_code == 401:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        user_data = response.json()
        return user_data

@app.get("/events/{user_id}")
async def get_user_events(user_id: int, request: Request):
    token = get_token_from_cookie(request)
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.intra.42.fr/v2/users/{user_id}/events_users",
            headers={"Authorization": f"Bearer {token}"},
        )
        if response.status_code == 401:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="User or events not found")
        events_data = response.json()
        return events_data

from typing import Literal, Optional
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Header
from pydantic import BaseModel, EmailStr, Field

from app.core.auth import create_token, decode_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

users_by_email: dict[str, dict] = {}
users_by_username: dict[str, str] = {}
users_by_id: dict[str, dict] = {}


class RegisterRequest(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3, max_length=32)
    password: str = Field(min_length=6, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    gender: Optional[Literal["male", "female", "other", "prefer_not_to_say"]] = None
    age: Optional[int] = Field(default=None, ge=1, le=120)


class CompleteProfileRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    gender: Literal["male", "female", "other", "prefer_not_to_say"]
    age: int = Field(ge=1, le=120)


def user_response(user: dict) -> dict:
    return {
        "email": user["email"],
        "username": user["username"],
        "name": user.get("name") or user["username"],
        "gender": user.get("gender"),
        "age": user.get("age"),
        "profile_complete": bool(user.get("profile_complete")),
    }


def get_current_user(authorization: Optional[str] = Header(default=None)) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.removeprefix("Bearer ").strip()
    payload = decode_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = users_by_id.get(payload["sub"])
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


@router.post("/register")
def register(body: RegisterRequest):
    email = body.email.lower()
    username = body.username.strip()

    if email in users_by_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered. Please log in instead.",
        )

    if username.lower() in {u.lower() for u in users_by_username}:
        raise HTTPException(status_code=400, detail="Username is already taken")

    user = {
        "id": str(uuid4()),
        "email": email,
        "username": username,
        "password": hash_password(body.password),
        "name": username,
        "gender": None,
        "age": None,
        "profile_complete": False,
    }
    users_by_email[email] = user
    users_by_username[username] = email
    users_by_id[user["id"]] = user

    token = create_token({"sub": user["id"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_response(user),
    }


@router.post("/login")
def login(body: LoginRequest):
    email = body.email.lower()
    user = users_by_email.get(email)

    if not user or not verify_password(body.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token({"sub": user["id"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_response(user),
    }


@router.get("/me")
def get_me(user: dict = Depends(get_current_user)):
    return user_response(user)


@router.patch("/profile")
def update_profile(body: ProfileUpdateRequest, user: dict = Depends(get_current_user)):
    if body.email and body.email.lower() != user["email"]:
        new_email = body.email.lower()
        if new_email in users_by_email:
            raise HTTPException(status_code=400, detail="Email is already in use")
        del users_by_email[user["email"]]
        user["email"] = new_email
        users_by_email[new_email] = user

    if body.name is not None:
        user["name"] = body.name.strip()
    if body.gender is not None:
        user["gender"] = body.gender
    if body.age is not None:
        user["age"] = body.age

    if user.get("gender") and user.get("age") and user.get("name"):
        user["profile_complete"] = True

    return user_response(user)


@router.post("/complete-profile")
def complete_profile(body: CompleteProfileRequest, user: dict = Depends(get_current_user)):
    user["name"] = body.name.strip()
    user["gender"] = body.gender
    user["age"] = body.age
    user["profile_complete"] = True
    return user_response(user)

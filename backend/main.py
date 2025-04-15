import os
from fastapi import FastAPI
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from app.api import chatbot

load_dotenv()




class UserInput(BaseModel):
    message: str
    role: str = "user"  # Default role is 'user'
    conversation_id: str

app = FastAPI(title="GadgetGuru AI")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbot.router, prefix="/chatbot")


@app.get("/")
def root():
    return {"message": "GadgetGuru API running 🚀"}

import os
from fastapi import FastAPI, HttpException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv


load_dotenv()



app = FastAPI()

class UserInput(BaseModel):
    message: str
    role: str = "user"  # Default role is 'user'
    conversation_id: str


@app.post("/chat")
async def chat(user_input: UserInput):
    conversation_id = user_input.conversation_id
    message = user_input.message
    role = user_input.role
    return {"message": message, "conversation_id": conversation_id, "role": role}




from fastapi import FastAPI
from app.api import chatbot, extract, products, compare, answer

app = FastAPI(title="GadgetGuru AI")

app.include_router(chatbot.router, prefix="/chat")
app.include_router(extract.router, prefix="/extract")
app.include_router(products.router, prefix="/products")
app.include_router(compare.router, prefix="/compare")
app.include_router(answer.router, prefix="/answer")

@app.get("/")
def root():
    return {"message": "GadgetGuru API running 🚀"}

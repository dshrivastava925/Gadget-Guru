from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.scraper import fetch_product_details
from app.services.gemini_services import generate_response

router = APIRouter()

class ProductQuery(BaseModel):
    query: str
    source: str  # "amazon" or "flipkart"

@router.post("/search")
async def search_product(query: ProductQuery):
    try:
        result = await fetch_product_details(query.query, query.source)
        return {"product": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat")
async def chat_llm(prompt: str):
    try:
        response = await generate_response(prompt)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
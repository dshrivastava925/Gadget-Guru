from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
# from app.services.scraper import fetch_product_details
from app.services.gemini_services import generate_response

router = APIRouter()

class PromptInput(BaseModel):
    prompt: str
    
class ProductQuery(BaseModel):
    query: str
    source: str  # "amazon" or "flipkart"

@router.post("/search")
async def search_product(query: ProductQuery):
    try:
        # result = await fetch_product_details(query.query, query.source)
        result = f"{query.query} \n{query.source} \nComming Soon"

        return {"product": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat")
async def chat_llm(query: PromptInput):
    try:
        response = await generate_response(query.prompt)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

async def generate_response(prompt: str) -> str:
    response = model.generate_content(prompt)
    return response.text

from playwright.async_api import async_playwright
from bs4 import BeautifulSoup

async def fetch_product_details(query: str, source: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        if source == "amazon":
            url = f"https://www.amazon.in/s?k={query.replace(' ', '+')}"
        elif source == "flipkart":
            url = f"https://www.flipkart.com/search?q={query.replace(' ', '+')}"
        else:
            raise ValueError("Invalid source. Use 'amazon' or 'flipkart'.")

        await page.goto(url)
        content = await page.content()
        await browser.close()

        soup = BeautifulSoup(content, "html.parser")

        if source == "amazon":
            product = soup.select_one(".s-result-item h2 a")
            price = soup.select_one(".a-price .a-offscreen")
            rating = soup.select_one(".a-icon-alt")

        elif source == "flipkart":
            product = soup.select_one("div._4rR01T") or soup.select_one("a.s1Q9rs")
            price = soup.select_one("div._30jeq3")
            rating = soup.select_one("div._3LWZlK")

        result = {
            "title": product.text.strip() if product else "Not found",
            "price": price.text.strip() if price else "N/A",
            "rating": rating.text.strip() if rating else "N/A",
        }

        return result

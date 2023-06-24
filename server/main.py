from fastapi import FastAPI, File, UploadFile, Form  
from sensei_core.core_wolfram_chain import initialize_wolfram_agent, ask_wolfram_alpha
import os

from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# os.environ["OPENAI_API_KEY"] = 
# os.environ["WOLFRAM_ALPHA_APPID"] =

agent = initialize_wolfram_agent()

# @app.on_event("startup")
# def init_app():
#     print("Starting")
#     agent = initialize_wolfram_agent()

@app.get("/test")
def test():
  return {
    "Message": "Foo"
  }

@app.post("/api/v1/ask")  
async def upload_image(  
    image: UploadFile = File(...), user_query: str = Form(...), meta: str = Form(...)  
):  
    contents = await image.read()
    meta = json.loads(meta)
  
    context = ""

    if meta and meta.get('context') == "doubt":
        context = "doubt"
    
    solution = ask_wolfram_alpha(agent, user_query, context)
    return {
            "status": "success",
            "message": solution
        }

from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel
from rag_engine import ask_question
import os

API_KEY = "Vishnu@2004"

app = FastAPI()

class Query(BaseModel):
    message: str


@app.post("/chat")

def chat(
    query: Query,
    x_api_key: str = Header(None)
):

    if x_api_key != API_KEY:
        raise HTTPException(status_code=401)

    answer = ask_question(query.message)

    return {
        "answer": answer
    }
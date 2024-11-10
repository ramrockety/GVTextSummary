import logging
from fastapi import FastAPI, BackgroundTasks, HTTPException, Depends, Request, status
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
load_dotenv()
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

templates = Jinja2Templates(directory="templates")
import schemas


llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)
@app.post("/text_summarize", status_code=status.HTTP_201_CREATED)
async def text_summarize(prompt: schemas.TextSummarize):
    """ This function will summarize 
    the text that is given to it """
    messages =[
        (         
         "system",
         "You are a helpful assistant that will summarize the user text in same language that was given by the user"
        ),
        ("human", prompt.prompt)
    ]
    ai_msg = llm.invoke(messages)
    return ai_msg.content

@app.post("/text_translation", status_code=status.HTTP_201_CREATED)
async def text_translation(prompt:schemas.TextTranslation, language:schemas.TextTranslation):
    """This function will give out the translation of
    the given text in the textbox"""
    messages =[
        ("system",
         f"You are a helpful assistant that will translate the user text to {language.language} language"),
         ("human", prompt.prompt)
    ]
    ai_msg = llm.invoke(messages)
    return ai_msg.content
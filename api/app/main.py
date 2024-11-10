import logging
from fastapi import FastAPI, status
from fastapi.responses import FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import os
import aiofiles
from dotenv import load_dotenv
from pyht import AsyncClient
from pyht.client import TTSOptions
from langchain_google_genai import ChatGoogleGenerativeAI
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

client = AsyncClient(
    user_id = os.getenv("PLAY_HT_USER_ID"),
    api_key = os.getenv("PLAY_HT_API_KEY")
)

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
async def text_translation(text:schemas.TextTranslation):
    """This function will give out the translation of
    the given text in the textbox"""
    messages =[
        ("system",
         f"You are a helpful assistant that will translate the user text to {text.language} language"),
         ("human", text.prompt)
    ]
    ai_msg = llm.invoke(messages)
    return ai_msg.content

@app.post("/audio_download", status_code=status.HTTP_201_CREATED)
async def audio_download(text: schemas.TextSummarize):
    """This endpoint generates an audio file from the summarized text and serves it to the frontend."""
    options = TTSOptions(voice="s3://voice-cloning-zero-shot/775ae416-49bb-4fb6-bd45-740f205d20a1/jennifersaad/manifest.json")
    # Path to store the generated audio file
    audio_file_path = "audio_summary.mp3"

    # Open a file in binary write mode to save the chunks
    async with aiofiles.open(audio_file_path, 'wb') as audio_file:
        # Iterate over audio chunks asynchronously
        async for chunk in client.tts(text.prompt, options):
            # Write each chunk to the file
            await audio_file.write(chunk)

    # Ensure the file is saved and then send it as a downloadable response
    return FileResponse(audio_file_path, media_type="audio/mpeg", filename="audio_summary.mp3")
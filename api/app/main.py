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


# from schemas import TranslationRequestSchema
# from typing import List
# from utils import translate_text, process_translations

# # db related #  #
# from database import engine, SessionLocal, get_db
# import models 
# from models import TranslationRequest, TranslationResult, IndividualTranslations
# models.Base.metadata.create_all(engine)
# #       #       #


#####################################################################################################
#####################################################################################################
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

# @app.get("/index", response_class=HTMLResponse)
# async def read_index(request: Request):
#     return templates.TemplateResponse("index.html", {"request": request})

# ############################################################################
# ############################################################################
# ############################################################################
# ############################################################################





# # @app.post("/translate")
# # async def translate(request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
# #     try:
# #         body = await request.json()
# #         logging.info(f"Received raw request body: {body}")
# #     except Exception as e:
# #         logging.error(f"Error parsing request body: {e}")
# #         raise HTTPException(status_code=400, detail="Invalid request body")
    
# #     try:
# #         translation_request = TranslationRequestSchema(**body)
# #         logging.info(f"Validated request data: {translation_request.json()}")
# #     except Exception as e:
# #         logging.error(f"Error validating request data: {e}")
# #         raise HTTPException(status_code=422, detail="Unprocessable Entity")
    
# #     # Convert the languages string to a list
# #     languages_list = [lang.strip() for lang in translation_request.languages.split(',')]
    
# #     request_data = TranslationRequest(
# #         text=translation_request.text,
# #         languages=languages_list
# #     )
# #     db.add(request_data)
# #     db.commit()
# #     db.refresh(request_data)
# #     background_tasks.add_task(process_translations, request_data.id, translation_request.text, languages_list)
# #     return {"id": request_data.id, "status": request_data.status}


# @app.post("/translate")
# async def translate(request: TranslationRequestSchema, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
#     print(request.text)
#     print(request.languages)

#     # requests above is a pydantic model, my_dict below is a dict, incase you need to use one or another
#     my_dict = request.model_dump()
# #     print(my_dict)
#     ########################################################
#     ########################################################

#     request_data = models.TranslationRequest(
#         text=request.text,
#         languages=request.languages)
#     db.add(request_data)
#     db.commit()
#     db.refresh(request_data)

#     #background_tasks.add_task(process_translations, request_data.id, request.text, request.languages)
#     return {"payload": request_data}




# ############################################################################
# ############################################################################
# ############################################################################
# ############################################################################
# @app.get("/translate/{request_id}")
# async def get_translation_status(request_id: int, request: Request, db: Session = Depends(get_db)):
#     request_obj = db.query(TranslationRequest).filter(TranslationRequest.id == request_id).first()
#     if not request_obj:
#         raise HTTPException(status_code=404, detail="Request not found")
#     if request_obj.status == "in progress":
#         return {"status": request_obj.status}
#     translations = db.query(TranslationResult).filter(TranslationResult.request_id == request_id).all()
#     return templates.TemplateResponse("results.html", {"request": request, "translations": translations})
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
         "You are a helpful assistant that summarize in any language given by the user,\
          you will summarize the text using the exact language of the text given"
        ),
        ("human", prompt.prompt)
    ]
    ai_msg = llm.invoke(messages)
    return ai_msg.content
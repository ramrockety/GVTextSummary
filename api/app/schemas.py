# Making sure the data coming from the front end is validated
# schemas.py

from pydantic import BaseModel

class TextTranslation(BaseModel):
    prompt:str
    language:str
    class Config():
        from_attributes = True

class TextSummarize(BaseModel):
    prompt: str
    class Config():
        from_attributes = True
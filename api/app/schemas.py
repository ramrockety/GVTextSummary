# Making sure the data coming from the front end is validated
"""
I always insist on using schemas to have full control of the data flow from fe -> be.
"""



# schemas.py

from pydantic import BaseModel

class Language(BaseModel):
    title: str
    body: str
    class Config():
        from_attributes = True

class ShowLanguage(BaseModel):
    title: str
    body: str
    class Config():
        from_attributes = True

class TextSummarize(BaseModel):
    prompt: str
    class Config():
        from_attributes = True
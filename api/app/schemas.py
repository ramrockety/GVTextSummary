# Making sure the data coming from the front end is validated
# schemas.py

from pydantic import BaseModel
from enum import Enum

class TextTranslation(BaseModel):
    prompt:str
    language:str
    class Config():
        from_attributes = True

class TextSummarize(BaseModel):
    prompt: str
    class Config():
        from_attributes = True

class Language(str, Enum):
    AFRIKAANS = "af"
    ALBANIAN = "sq"
    AMHARIC = "am"
    ARABIC = "ar"
    BENGALI = "bn"
    BULGARIAN = "bg"
    CATALAN = "ca"
    CROATIAN = "hr"
    CZECH = "cs"
    DANISH = "da"
    DUTCH = "nl"
    ENGLISH = "en"
    FRENCH = "fr"
    GALICIAN = "gl"
    GERMAN = "de"
    GREEK = "el"
    HEBREW = "he"
    HINDI = "hi"
    HUNGARIAN = "hu"
    INDONESIAN = "id"
    ITALIAN = "it"
    JAPANESE = "ja"
    KOREAN = "ko"
    MALAY = "ms"
    MANDARIN = "zh"
    POLISH = "pl"
    PORTUGUESE = "pt"
    RUSSIAN = "ru"
    SERBIAN = "sr"
    SPANISH = "es"
    SWEDISH = "sv"
    TAGALOG = "tl"
    THAI = "th"
    TURKISH = "tr"
    UKRAINIAN = "uk"
    URDU = "ur"
    XHOSA = "xh"
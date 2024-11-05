from fastapi import Depends, HTTPException, status
from .. import database
from sqlalchemy.orm import Session
from .. import models, schemas

def get_all(db:Session):
    new_language = models.
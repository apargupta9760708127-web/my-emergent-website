from pydantic import BaseModel
from typing import List

class Flag(BaseModel):
    id: str
    country: str
    name: str
    colors: List[str]
    difficulty: str
    videoUrl: str
    image: str

class FlagDB(BaseModel):
    country: str
    name: str
    colors: List[str]
    difficulty: str
    videoUrl: str
    image: str

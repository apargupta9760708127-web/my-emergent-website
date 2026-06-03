from pydantic import BaseModel, Field
from typing import List, Optional

class Cube(BaseModel):
    id: str
    name: str
    type: str  # 'classic' or 'other'
    size: str
    difficulty: int
    description: str
    pieces: int
    price: str
    worldRecord: str
    videoUrl: str
    buyLink: str
    image: str
    colorScheme: List[str]

class CubeDB(BaseModel):
    name: str
    type: str
    size: str
    difficulty: int
    description: str
    pieces: int
    price: str
    worldRecord: str
    videoUrl: str
    buyLink: str
    image: str
    colorScheme: List[str]

from pydantic import BaseModel

class Pattern(BaseModel):
    id: str
    name: str
    difficulty: str
    description: str
    moves: str
    image: str

class PatternDB(BaseModel):
    name: str
    difficulty: str
    description: str
    moves: str
    image: str

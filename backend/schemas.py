from pydantic import BaseModel, Field, field_validator
from typing import Optional

class InviteCreate(BaseModel):
    family_name: str = Field(..., min_length=1, max_length=80)
    guests: int = Field(..., gt=0)
    children: bool = False

class InviteUpdate(BaseModel):
    family_name: Optional[str] = Field(None, min_length=1, max_length=80)
    guests: Optional[int] = Field(None, gt=0)
    children: Optional[bool] = None

class InviteResponse(BaseModel):
    id: str
    family_name: str
    guests: int
    children: bool

    class Config:
        from_attributes = True
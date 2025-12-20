from pydantic import BaseModel, Field, field_validator
from typing import Optional

from models import BuffetAgeGroups

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

class GuestCreate(BaseModel):
    invite_id: str = Field(..., min_length=6, max_length=6)
    first_name: str = Field(..., min_length=3, max_length=80)
    last_name: str = Field(..., min_length=3, max_length=80)
    age_range: BuffetAgeGroups = Field(default=BuffetAgeGroups.FULL_PRICE)

class GuestResponse(BaseModel):
    id: str
    first_name: str
    last_name: str
    age_range: BuffetAgeGroups
    invite_id: str

    class Config:
        from_attributes = True

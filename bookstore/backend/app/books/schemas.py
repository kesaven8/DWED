from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class BookCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    title: str = Field(min_length=1, max_length=200)
    author: str = Field(min_length=1, max_length=150)
    price: Decimal = Field(gt=0, max_digits=10, decimal_places=2)


class BookRead(BookCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int

from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.books import repository
from app.books.schemas import BookCreate, BookRead
from app.database import get_session

router = APIRouter(prefix="/books", tags=["books"])
DatabaseSession = Annotated[Session, Depends(get_session)]


@router.get("", response_model=list[BookRead])
def list_books(session: DatabaseSession):
    return repository.list_books(session)


@router.post("", response_model=BookRead, status_code=status.HTTP_201_CREATED)
def create_book(data: BookCreate, session: DatabaseSession):
    return repository.create_book(session, data)

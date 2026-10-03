from sqlalchemy import select
from sqlalchemy.orm import Session

from app.books.models import Book
from app.books.schemas import BookCreate


def list_books(session: Session) -> list[Book]:
    return list(session.scalars(select(Book).order_by(Book.id.desc())))

def get_book(session: Session, id: int) -> Book:
    return session.get(Book, id)


def create_book(session: Session, data: BookCreate) -> Book:
    book = Book(**data.model_dump())
    session.add(book)
    try:
        session.commit()
    except Exception:
        session.rollback()
        raise
    session.refresh(book)
    return book

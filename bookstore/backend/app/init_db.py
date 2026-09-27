"""Explicit classroom schema setup. Replace with migrations as an exercise."""

from app.books.models import Book  # noqa: F401 -- register table metadata
from app.database import Base, engine


def main() -> None:
    Base.metadata.create_all(engine)
    print("Bookstore tables are ready.")


if __name__ == "__main__":
    main()

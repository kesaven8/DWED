import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app.database import Base, get_session
from app.main import app


@pytest.fixture
def client():
    # Isolated SQLite tests never touch the configured PostgreSQL database.
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    Base.metadata.create_all(engine)

    def test_session():
        with Session(engine) as session:
            yield session

    app.dependency_overrides[get_session] = test_session
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
    engine.dispose()


def test_create_and_list_books(client):
    assert client.get("/api/books").json() == []
    response = client.post(
        "/api/books", json={"title": "  Clean Code  ", "author": "Robert Martin", "price": "29.90"}
    )
    assert response.status_code == 201
    book = response.json()
    assert book == {"id": 1, "title": "Clean Code", "author": "Robert Martin", "price": "29.90"}
    assert client.get("/api/books").json() == [book]


@pytest.mark.parametrize(
    "changes",
    [
        {"title": " "},
        {"author": ""},
        {"price": "0"},
        {"price": "-1"},
        {"price": "1.234"},
        {"price": "100000000"},
        {"title": "a" * 201},
        {"unexpected": "field"},
    ],
)
def test_invalid_book_is_not_saved(client, changes):
    data = {"title": "A book", "author": "An author", "price": "10.00", **changes}
    assert client.post("/api/books", json=data).status_code == 422
    assert client.get("/api/books").json() == []

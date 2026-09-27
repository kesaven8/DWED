# Bookstore classroom starter

A small three-tier application: React + TypeScript → HTTP/JSON → FastAPI → SQLAlchemy → PostgreSQL.
Implemented scope: list books and create a book. All prices use USD for this exercise.
No authentication is implemented; run this as a local classroom application.

## Start here

1. Follow [backend setup](backend/README.md) to create the PostgreSQL database, install Python dependencies with **pip**, initialize tables, and start the API.
2. In another terminal, follow [frontend setup](frontend/README.md).
3. Open http://localhost:5173, create a book, then refresh to check persistence.
4. Work through [student TODOs](TODOS.md).

```text
bookstore/
  frontend/                 Presentation tier: React, TypeScript, plain CSS
    src/features/books/     Book components, API calls, and TypeScript types
  backend/                  Application tier: FastAPI and SQLAlchemy
    app/books/              Routes, validation schemas, ORM model, repository
    app/database.py         Engine and request-scoped database sessions
    tests/                  Isolated API tests
  docker-compose.yml        PostgreSQL database with persistent storage
```

PostgreSQL is the data tier. SQLAlchemy runs inside the backend; it is not a separate tier.
The frontend never connects directly to PostgreSQL.

## Trace one request

`BookForm` → `api.ts` → `POST /api/books` → Pydantic validation → repository → PostgreSQL.
The API responds with HTTP 201 and the saved book. React adds it to the displayed list.
`GET /api/books` returns books newest first, or an empty array.
Money travels as decimal strings (for example `"12.50"`) and is stored as `NUMERIC(10,2)`.
Titles and authors are trimmed and required; prices must be positive with at most two decimal places.
Duplicate titles are allowed: different books can share a title.

## Coding conventions

- Keep components focused; keep HTTP calls in the API module and SQL in the repository.
- Use PascalCase for React components and Python classes, camelCase for TypeScript functions,
  and snake_case for Python functions and variables.
- Prefer explicit types, meaningful names, small functions, and composition.
- Validate at the API boundary even when the browser also validates.
- Use one database session per request; commit successful writes and roll back failed writes.
- Keep credentials in ignored `.env` files. `VITE_` variables are public browser configuration.
- Add abstractions when they solve a real problem. There is no generic repository, base service,
  or pass-through service layer for two simple operations. Add an order service when business
  workflows need orchestration. FastAPI dependency injection keeps database sessions replaceable.
- Run backend tests/lint and the frontend build before submitting work.

These choices apply KISS, DRY, and SOLID through clear responsibilities and replaceable dependencies,
without introducing unnecessary inheritance or interfaces.

## Teaching sequence

First explain technical tiers using the working catalog. Next complete inventory and orders inside
the same backend. Only then extract business capabilities into services. Three-tier architecture
and microservices describe different boundaries and can coexist.

The starter intentionally uses explicit `create_all` schema initialization and an unpaginated list.
Schema migrations, pagination, authentication, and deployment are student extensions.
The Compose file runs PostgreSQL only. From `bookstore`, run `docker compose up -d db`,
then follow the backend instructions to initialize tables and start the API locally.

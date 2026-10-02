# Backend — FastAPI + SQLAlchemy + PostgreSQL

Run all shell commands from `bookstore/backend`. Requires Python 3.12+ and a running PostgreSQL
server (PostgreSQL 16+ recommended for the classroom). Dependencies are installed with **pip**.

## 1. Create the database

To use the provided container database, run `docker compose up -d db` (or
`podman compose up -d db`) from `bookstore`.
It creates the database and user below automatically; skip the SQL commands and continue to step 2.
Check readiness with `docker compose ps`. Stop it with `docker compose down`; the named volume
preserves data. Adding `-v` deletes that volume and its data.
If host port 5432 is occupied, set `POSTGRES_PORT` to another port before starting Compose
(PowerShell: `$env:POSTGRES_PORT = "5433"`) and match that port in backend `.env`.

Alternatively, connect to an existing PostgreSQL server as your administrator using `psql -U postgres` or pgAdmin.
Run the following once, outside a transaction:

```sql
CREATE USER bookstore WITH PASSWORD 'bookstore';
CREATE DATABASE bookstore OWNER bookstore;
```

These credentials are for local learning only. If your server uses a different host, port,
username, or password, adjust `DATABASE_URL`. URL-encode special characters in credentials.
The frontend and backend run locally; Compose runs only PostgreSQL.

## 2. Create a virtual environment and install dependencies

Windows PowerShell (activation is not required):

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-dev.txt
Copy-Item .env.example .env
.\.venv\Scripts\python.exe -m app.init_db
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

macOS / Linux:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-dev.txt
cp .env.example .env
.venv/bin/python -m app.init_db
.venv/bin/python -m uvicorn app.main:app --reload --port 8000
```

For runtime dependencies only, use `requirements.txt`. Copy the environment example only on
first setup so you do not overwrite local configuration. Restart the API after changing `.env`.
Schema initialization creates missing tables; it does not update existing table definitions.
Replacing it with migrations is a student task.

## 3. Try the API

Open http://localhost:8000/docs. Execute `GET /api/books` (initially `[]`), then `POST /api/books`:

```json
{"title": "The Pragmatic Programmer", "author": "David Thomas and Andrew Hunt", "price": "35.50"}
```

Creation returns HTTP 201 with an ID and decimal-string price. Listing returns the saved book.
Validation errors return HTTP 422. Database failures return HTTP 503 with a generic message;
the server logs the underlying error.

## Checks

```powershell
.\.venv\Scripts\python.exe -m pytest
.\.venv\Scripts\python.exe -m ruff check .
.\.venv\Scripts\python.exe -m ruff format --check .
```

On macOS/Linux replace `.\.venv\Scripts\python.exe` with `.venv/bin/python`.
Tests override the database dependency with isolated in-memory SQLite databases. They verify
the API contract and validation without touching PostgreSQL. They do not verify PostgreSQL-specific
behavior; adding integration tests is a student exercise.
The current Starlette test client emits a deprecation warning for its httpx integration; this
does not fail the tests. Runtime and development direct dependencies are pinned in the pip requirements files.

## Structure and troubleshooting

`app/main.py` wires the application and CORS; `config.py` reads environment settings;
`database.py` owns connections. Inside `app/books`, `router.py` owns HTTP, `schemas.py` validates
input/output, `models.py` maps database tables, and `repository.py` owns SQL and write transactions.
There is no service layer until business workflows require one.

- Connection refused: start PostgreSQL and verify the host and port.
- If PostgreSQL runs in Podman, confirm the **bookstore** container publishes
  `127.0.0.1:5432->5432/tcp` with `podman ps`. A healthy container for another
  project, or one showing only `5432/tcp`, is not reachable at the backend's
  configured address.
- Authentication failed: check the database user and `.env` credentials.
- Table does not exist: run `python -m app.init_db` using the virtual environment.
- Browser CORS error: match `FRONTEND_ORIGIN` to the browser origin exactly, then restart the API.
- HTTP 422: inspect the response or `/docs` for field validation details.

See [student TODOs](../TODOS.md) before extending the starter.

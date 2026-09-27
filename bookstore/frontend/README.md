# Frontend — React + TypeScript

Requires Node.js 22.12+ (a current LTS release is recommended) and npm.
Run commands from `bookstore/frontend`. Start the [backend](../backend/README.md) first.

## Start

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

On macOS/Linux use `cp .env.example .env` instead of `Copy-Item`.
Open http://localhost:5173. The dev server uses a fixed port so it matches backend CORS configuration.
Add a book and reload the page to confirm it was saved in PostgreSQL.
An empty database is expected on first launch.

`VITE_API_URL` defaults to `http://localhost:8000/api`. Restart Vite after changing `.env`.
All `VITE_` variables are visible to browser users: never place database credentials or secrets here.

## Checks and build

```bash
npm run typecheck
npm run build
npm run preview
```

The build writes static files to `dist/`. Preview is a local build check, not a production server.
Its default origin is `http://localhost:4173`; set backend `FRONTEND_ORIGIN` accordingly and restart
the backend if testing API calls from preview. Switch it back to port 5173 for development.

## Structure

- `src/App.tsx`: coordinates loading, errors, retries, and the book collection.
- `src/features/books/BookList.tsx`: displays books and the empty state.
- `src/features/books/BookForm.tsx`: handles creation, pending state, and feedback.
- `src/features/books/api.ts`: keeps HTTP calls out of presentation components.
- `src/features/books/types.ts`: shared book types; prices travel as decimal strings.
- `src/styles.css`: plain responsive CSS. No CSS framework or component library.

Use functional components, explicit prop types, accessible labels, stable list keys, and small
functions. TypeScript is strict. The starter uses browser `fetch` and built-in form validation;
backend validation remains authoritative. Automated UI tests are a [student exercise](../TODOS.md).

The starter pins React 19.3.0, TypeScript 7.0.2, and Vite 8.3.1. The committed npm lockfile
records the dependency tree; `npm ci` reproduces it. Use `npm install` when intentionally changing dependencies.

If books do not load, verify the backend is running, PostgreSQL is available, schema initialization
has completed, and the API URL and CORS origin match your local addresses.

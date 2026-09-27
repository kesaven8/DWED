# Student exercises

Complete one change at a time. Explain the affected tier, show the acceptance criteria working,
and keep related code together. The two starter endpoints must continue to work.

## Already implemented — book starter

These are working backend endpoints, not student TODOs:

| Method | Endpoint | Behavior |
| --- | --- | --- |
| GET | `/api/books` | List saved books, newest first |
| POST | `/api/books` | Validate and save a book; return HTTP 201 |

Both are registered in FastAPI and available at `http://localhost:8000/docs`.
The React frontend calls these endpoints. Book details, editing, and deletion below are
optional catalog extensions beyond the original list/create starter.

## Remaining use-case endpoints — student TODOs

Implement these after understanding the starter. These routes do not exist yet.
Design request/response schemas and error behavior before writing each implementation.

- [ ] `GET /api/inventory/{book_id}`: return stock for an existing book.
- [ ] `PATCH /api/inventory/{book_id}`: update stock with validation and admin authorization.
- [ ] `POST /api/orders`: place an order from book IDs and quantities; calculate prices on the backend.
- [ ] `GET /api/orders`: list the authenticated customer's orders.
- [ ] `GET /api/orders/{order_id}`: show an order and its items; enforce ownership.
- [ ] `POST /api/orders/{order_id}/cancel`: enforce cancellation rules and restore stock once.
- [ ] `POST /api/orders/{order_id}/payment`: simulate a payment result; define allowed transitions
  and prevent duplicate processing. Do not collect real payment information.

Keep the cart in React initially. Notifications are a later event-consumer exercise rather
than a public HTTP endpoint. See sections 4 and 5 for transaction and service-boundary requirements.

## 1. Understand the starter

- [ ] Draw the three tiers and trace listing and creating a book using browser Network tools.
- [ ] Explain why TypeScript types and HTML validation do not replace backend validation.
- [ ] Send a blank title and negative price through `/docs`; observe HTTP 422 and no saved row.
- [ ] Stop the API and confirm the frontend shows an actionable error; restart it and retry.
- [ ] Explain why monetary values use Decimal / NUMERIC instead of binary floating point.

## 2. Extend the catalog

- [ ] Add `GET /api/books/{id}` and a details view; unknown IDs return HTTP 404.
- [ ] Add editing with a deliberate PUT or PATCH contract; refresh confirms persistence.
- [ ] Add deletion with a confirmation step; define behavior for unknown IDs.
- [ ] Add server-side title/author search and bounded pagination with stable ordering.
- [ ] Introduce Alembic migrations using pip. Migrate an existing database without losing books.
- [ ] Add frontend tests for loading, empty results, failed requests, successful creation,
  and preserving entered values when saving fails.
- [ ] Add PostgreSQL integration tests using a separate test database; never clear the classroom database.

## 3. Explore the database Compose configuration

- [ ] Explain the PostgreSQL service, port mapping, named volume, and health check in `docker-compose.yml`.
- [ ] Change the published database port and update the backend connection string to match.
- [ ] Document which addresses the browser, local backend, and database container use.
- [ ] Explain why `depends_on` alone does not guarantee database readiness.
- [ ] Run `docker compose config`, start the database, run the frontend and backend locally, and exercise both features.
- [ ] Stop and restart containers; verify saved books remain. Document that deleting volumes loses data.

## 4. Build the ordering use case as a modular monolith

- [ ] Add an inventory module with nonnegative stock quantities.
- [ ] Add a React cart containing book IDs and quantities; derive display totals from catalog data.
- [ ] Add orders and order items. Store the unit price at purchase time on each order item.
- [ ] Implement an order service that reads authoritative prices, checks stock, records the order,
  and reduces stock in one transaction. Never trust browser totals.
- [ ] Test insufficient stock and concurrent purchases of the last copy: no overselling or partial orders.
- [ ] Add simulated payment results; define cancellation and failure behavior.
- [ ] Add authentication and separate customer/admin permissions before exposing management features.

## 5. Evolve into microservices

- [ ] Identify catalog, inventory, orders, and notification ownership before splitting code.
- [ ] Extract one service with its own database ownership; no cross-service table access.
- [ ] Replace in-process calls with explicit API contracts and timeouts.
- [ ] Replace the single order transaction with stock reservation and compensating release.
- [ ] Publish an `OrderConfirmed` event and consume it in a simulated notification service.
- [ ] Add idempotency, retries, and a reliable event publishing strategy (for example, an outbox).
- [ ] Demonstrate a service outage and recovery without duplicate orders or notifications.
- [ ] Discuss independent deployment and scaling alongside operational cost and eventual consistency.

## Definition of done for each exercise

- [ ] Acceptance criteria demonstrated; error paths considered.
- [ ] Relevant tests added and existing checks pass.
- [ ] README and API documentation updated where behavior changes.
- [ ] No secrets committed, no unrelated refactoring, and no abstraction without a clear purpose.

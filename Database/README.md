# Database

This folder contains the Docker Compose configuration for the PostgreSQL database used by the project.

## Services

- `db`: PostgreSQL 16 running in a container

## Run the database

From the project root, or from this folder, run:

```bash
docker compose up -d
```

If you are inside the `Database` folder, this also works:

```bash
docker-compose up -d
```

## Stop the database

```bash
docker compose down
```

or

```bash
docker-compose down
```

## Connection details

- Host: `localhost`
- Port: `5432`
- Database: `ecommerce`
- Username: `ecommerce`
- Password: `ecommerce123`

## Data persistence

Database data is stored in a Docker volume named `ecommerce_data`, so your data remains available between container restarts.

## Useful commands

Check running containers:

```bash
docker ps
```

View database logs:

```bash
docker compose logs -f db
```

Reset the database completely:

```bash
docker compose down -v
```

import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

from app.books.router import router
from app.config import get_settings

logger = logging.getLogger(__name__)
app = FastAPI(title="Bookstore API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[get_settings().frontend_origin],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)
app.include_router(router, prefix="/api")


@app.exception_handler(SQLAlchemyError)
async def database_error_handler(request: Request, error: SQLAlchemyError):
    logger.error("Database operation failed", exc_info=error)
    return JSONResponse(
        status_code=503, content={"detail": "Database unavailable. Please try again later."}
    )

"""
Mwanza Directory Platform — FastAPI entry point.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import create_db_and_tables

# importing models so SQLModel registers the tables before create_all()
from app.models import Category, Business, Event  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create DB tables on startup."""
    create_db_and_tables()
    yield


app = FastAPI(
    title="Mwanza Directory",
    description="Local business & event directory for Mwanza",
    version="0.1.0",
    lifespan=lifespan,
)


@app.get("/health")
def health_check():
    return {"status": "ok"}

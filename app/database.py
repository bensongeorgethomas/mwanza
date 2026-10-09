"""
Database configuration — SQLite for local development.

Swap DATABASE_URL to a PostgreSQL / MySQL connection string
when deploying to production; everything else stays the same
thanks to SQLModel + SQLAlchemy.
"""

from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./mwanza.db"

engine = create_engine(
    DATABASE_URL,
    echo=True,                       # SQL logging — disable in production
    connect_args={"check_same_thread": False},  # required for SQLite + threads
)


def create_db_and_tables() -> None:
    """Create all tables defined by SQLModel metadata."""
    SQLModel.metadata.create_all(engine)


def get_session():
    """FastAPI dependency that yields a database session per request."""
    with Session(engine) as session:
        yield session

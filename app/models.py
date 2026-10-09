"""
SQLModel table definitions for the Mwanza directory platform.

Three tables:
  • Category  — business categories (e.g. "Restaurants", "Hotels")
  • Business  — individual business listings
  • Event     — community / business events
"""

from datetime import datetime
from typing import Optional

from sqlmodel import Field, Relationship, SQLModel


# ──────────────────────────────────────────────
# Category
# ──────────────────────────────────────────────
class Category(SQLModel, table=True):
    """A top-level grouping for businesses."""

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=100)
    slug: str = Field(unique=True, max_length=120)

    # one-to-many → Business
    businesses: list["Business"] = Relationship(back_populates="category")


# ──────────────────────────────────────────────
# Business
# ──────────────────────────────────────────────
class Business(SQLModel, table=True):
    """A single business listing in the directory."""

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=200)
    slug: str = Field(unique=True, max_length=220)
    description: str | None = Field(default=None)
    phone_whatsapp: str | None = Field(default=None, max_length=20)
    location_coords: str | None = Field(
        default=None,
        max_length=50,
        description="Lat,Lng pair stored as text, e.g. '-2.5164,32.9176'",
    )
    is_verified: bool = Field(default=False)

    # foreign key → Category
    category_id: int | None = Field(default=None, foreign_key="category.id")
    category: Optional[Category] = Relationship(back_populates="businesses")


# ──────────────────────────────────────────────
# Event
# ──────────────────────────────────────────────
class Event(SQLModel, table=True):
    """A community or business event."""

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=200)
    description: str | None = Field(default=None)
    event_date: datetime | None = Field(default=None)
    location: str | None = Field(default=None, max_length=255)

# Mwanza Hotel Booking Platform — Production Readiness Audit

**Date:** 2026-10-12
**Auditor:** Senior Software Architect / Principal Full-Stack Engineer
**Repository:** https://github.com/bensongeorgethomas/mwanza
**Branch:** main (cloned fresh)

---

## 1. Current Implementation — Accurate Description

### 1.1 Repository Structure
```
D:\openroute/
├── app/                    # FastAPI backend (Python)
│   ├── __init__.py
│   ├── database.py         # SQLite + SQLModel config
│   ├── main.py             # FastAPI app, lifespan, /health
│   └── models.py           # Category, Business, Event models
├── frontend/               # Next.js 15 frontend (TypeScript)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout (Navbar + Footer)
│   │   │   ├── page.tsx            # Hotel-style homepage ("Oriel")
│   │   │   ├── globals.css         # Custom CSS (Tailwind v4)
│   │   │   ├── businesses/         # Business directory pages
│   │   │   ├── events/             # Events directory pages
│   │   │   └── [slug]/             # BROKEN - "Coursify" course pages
│   │   ├── components/
│   │   │   ├── business-card.tsx
│   │   │   ├── event-card.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── navbar.tsx
│   │   │   └── share-button.tsx
│   │   ├── data/
│   │   │   ├── businesses.json     # 10 sample businesses
│   │   │   └── events.json         # 5 sample events
│   │   ├── lib/
│   │   │   └── data.ts             # Data access (reads JSON)
│   │   └── types/
│   │       └── index.ts            # Business, Event, Category types
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
├── images/                 # 5 hero images (Unsplash)
├── requirements.txt        # fastapi, sqlmodel, uvicorn
└── mwanza.db              # SQLite database (auto-created)
```

### 1.2 Backend (FastAPI + SQLModel)
- **Framework:** FastAPI 0.143, SQLModel 0.0.48, Uvicorn 0.54
- **Database:** SQLite (`sqlite:///./mwanza.db`), swappable to PostgreSQL
- **Models:** 3 tables — `category`, `business`, `event`
- **API Endpoints:** Only `GET /health` → `{"status": "ok"}`
- **Missing:** All CRUD endpoints, authentication, validation, business logic, booking/reservation domain

### 1.3 Frontend (Next.js 15 + React 19 + Tailwind CSS 4)
- **Two completely separate UI systems:**
  1. **Hotel Homepage (`/`):** "Oriel" brand, premium hotel collection aesthetic, hero video, stays, experiences, journal sections — **all static/mock content**
  2. **Directory Pages (`/businesses`, `/events`):** "Mwanza Directory" brand, functional listing/detail pages with search/filter — **reads from local JSON**
- **Working Components:** BusinessCard, EventCard, Navbar (mobile responsive), Footer, ShareButton
- **Broken/Dead Code:** `/app/[slug]/` references non-existent components (`Button`, `Hero`, `Lists`, `Newsletter`) and services (`@/services/courses`)
- **No API Integration:** Frontend does not call the FastAPI backend at all
- **Build Status:** ❌ Fails — missing components in `[slug]` directory

### 1.4 Data Layer
- **Backend:** SQLModel models (Category, Business, Event) — minimal fields
- **Frontend:** TypeScript interfaces with richer fields (latitude, longitude, images[], opening_hours, is_featured, is_verified)
- **Mismatch:** Backend models ⊄ Frontend types — e.g., backend `Business` has `location_coords` (string), frontend expects `latitude` + `longitude` (numbers) + `images[]` + `opening_hours` + `is_featured`

### 1.5 Database Schema (Actual)
```sql
CREATE TABLE category (id PK, name, slug UNIQUE);
CREATE TABLE business (id PK, name, slug UNIQUE, description, phone_whatsapp, location_coords, is_verified, category_id FK);
CREATE TABLE event (id PK, name, description, event_date, location);
```
- No indexes beyond PK/UNIQUE
- No migrations system
- No seed data

---

## 2. Feature Inventory

### ✅ Working Features
| Feature | Location | Notes |
|---------|----------|-------|
| Health check endpoint | `GET /health` | Returns `{"status":"ok"}` |
| SQLite auto-create on startup | `app/main.py:lifespan` | Tables created via `SQLModel.metadata.create_all` |
| Business listing page | `/businesses` | Search, category filter, URL sync |
| Business detail page | `/businesses/[slug]` | Images, map embed, WhatsApp CTA, share |
| Events listing page | `/events` | Upcoming/Past tabs, date sorting |
| Responsive navbar/footer | `components/navbar.tsx`, `footer.tsx` | Mobile menu, brand links |
| Hotel-style homepage | `/` | "Oriel" branding, visual design only |
| TypeScript types | `types/index.ts` | Well-defined Business/Event interfaces |

### ⚠️ Incomplete Features
| Feature | Location | Gap |
|---------|----------|-----|
| Backend API | `app/main.py` | Only `/health` exists |
| Database models | `app/models.py` | Missing fields needed by frontend |
| Frontend-backend connection | — | Frontend reads JSON, not API |
| Homepage "Book a stay" CTA | `components/navbar.tsx`, `page.tsx` | Links to `#contact` (footer mailto) |

### ❌ Broken Features
| Feature | Location | Issue |
|---------|----------|-------|
| `/[slug]` layout & page | `app/[slug]/layout.tsx`, `page.tsx` | References non-existent components/services (`Button`, `Hero`, `Lists`, `Newsletter`, `@/services/courses`) |
| Frontend build | `npm run build` | Fails with 5 "Module not found" errors |
| Hotel homepage media | `app/page.tsx` | "YOUR HERO VIDEO/IMAGE", "YOUR HOTEL PHOTO" placeholders |

### 🚫 Missing Features (Hotel Booking Platform)
| Domain | Missing |
|--------|---------|
| **Room Inventory** | Room types, categories, occupancy limits, amenities, photos |
| **Pricing** | Nightly rates, seasonal pricing, taxes, fees, currency |
| **Availability** | Calendar, date-range queries, block-out dates, inventory tracking |
| **Reservations** | Booking flow, guest details, confirmation, cancellation, modification |
| **Payments** | Payment gateway (Stripe/PayPal), deposit, refund, invoicing |
| **Authentication** | Guest accounts, admin/staff roles, JWT/session, password reset |
| **Authorization** | Role-based access (guest vs admin), rate limiting |
| **Admin Dashboard** | Room management, booking calendar, reports, user management |
| **Communications** | Email/SMS confirmations, reminders, notifications |
| **SEO/Analytics** | Structured data, sitemap, GA/Plausible, meta tags per room |

---

## 3. Prioritized Issue List

### P0 — Blockers (Must Fix Before Any Progress)
| ID | File | Issue | Evidence |
|----|------|-------|----------|
| P0-1 | `frontend/src/app/[slug]/layout.tsx` | Dead code from "Coursify" project — breaks build | `Module not found: @/components/newsletter` |
| P0-2 | `frontend/src/app/[slug]/page.tsx` | Dead code — breaks build | `Module not found: @/components/button`, `hero`, `lists`, `@/services/courses` |
| P0-3 | `frontend/package.json` | Name `"courses-directory"` — wrong project identity | Line 2 |
| P0-4 | `app/models.py` | Backend models don't match frontend types | Missing: `latitude`, `longitude`, `images[]`, `opening_hours`, `is_featured`, `whatsapp` (vs `phone_whatsapp`) |
| P0-5 | `frontend/src/lib/data.ts` | Reads static JSON, not API | No `fetch` to backend |

### P1 — Critical Gaps (Core Booking Platform)
| ID | Area | Missing |
|----|------|---------|
| P1-1 | Backend | No API routes for businesses, events, rooms, bookings |
| P1-2 | Database | No room, room_type, rate_plan, booking, guest, payment tables |
| P1-3 | Backend | No authentication (JWT), authorization, rate limiting |
| P1-4 | Backend | No validation (Pydantic), error handling, logging |
| P1-5 | Frontend | No booking flow (date picker, room selection, guest form, payment) |
| P1-6 | Frontend | No admin interface |
| P1-7 | Integration | Frontend → Backend API client, env config |
| P1-8 | Payments | No Stripe/PayPal integration |
| P1-9 | Email | No transactional email (confirmations, reminders) |

### P2 — Important Enhancements
| ID | Area | Missing |
|----|------|---------|
| P2-1 | Database | Migrations (Alembic), indexes, seed scripts |
| P2-2 | Backend | OpenAPI docs, request/response models, pagination |
| P2-3 | Frontend | Real images (replace Unsplash placeholders), image optimization |
| P2-4 | Frontend | Accessibility audit (ARIA, contrast, focus states) |
| P2-5 | DevOps | Dockerfile, docker-compose, CI/CD, staging/prod envs |
| P2-6 | Monitoring | Error tracking (Sentry), logging, health checks |
| P2-7 | Testing | Unit/integration/e2e tests (Vitest, Playwright) |
| P2-8 | SEO | Structured data (Hotel, Room), sitemap.xml, robots.txt |

---

## 4. Recommended Architecture

### 4.1 Architectural Decision: **Retain Next.js Frontend + FastAPI Backend**
**Rationale:**
- Next.js 15 (App Router, RSC, Turbopack) is modern, performant, and already set up
- FastAPI + SQLModel is clean, fast, and Pythonic — good for business logic
- SQLite → PostgreSQL migration is one `DATABASE_URL` change (SQLModel abstraction)
- Separation of concerns: frontend = presentation, backend = domain logic + data

**Operational Cost:** Low — both frameworks are maintained, well-documented, and have large communities.

**Security Implications:** 
- ✅ Backend owns auth, validation, secrets
- ✅ Frontend never exposes DB credentials
- ⚠️ Must implement CORS, CSRF, rate limiting, secure headers

**Suitability for Small Hotel Business:**
- ✅ Single codebase, two deployable units
- ✅ Can run on modest VPS (e.g., $20-40/mo) or serverless (Vercel + Railway/Render)
- ✅ Scales to multi-property later

### 4.2 Request/Data Flow
```
┌─────────────┐     HTTPS/REST      ┌─────────────┐     SQLAlchemy      ┌─────────────┐
│   Browser   │ ←──────────────────→ │  Next.js    │ ←─────────────────→ │  FastAPI    │
│  (Guest)    │   JSON + HTML       │  Frontend   │   HTTP + JSON       │  Backend    │
└─────────────┘                     └─────────────┘                     └──────┬──────┘
                                                                             │
                                                      ┌──────────────────────┘
                                                      ▼
                                            ┌─────────────────┐
                                            │  PostgreSQL     │
                                            │  (Production)   │
                                            │  SQLite (Dev)   │
                                            └─────────────────┘
```

**Key Boundaries:**
- **Frontend → Backend:** REST API (`/api/v1/*`), JSON, JWT in `Authorization` header
- **Backend → DB:** SQLModel/SQLAlchemy ORM, async sessions
- **External Services:** Stripe (payments), SendGrid/Resend (email), S3/R2 (images)

---

## 5. Proposed Database Entity & Relationship Design

### 5.1 Core Domain Entities (Hotel Booking)
```mermaid
erDiagram
    HOTEL ||--o{ ROOM_TYPE : has
    HOTEL ||--o{ ROOM : contains
    ROOM_TYPE ||--o{ ROOM : defines
    ROOM_TYPE ||--o{ RATE_PLAN : prices
    ROOM ||--o{ BOOKING : booked_in
    GUEST ||--o{ BOOKING : makes
    BOOKING ||--o{ PAYMENT : pays_for
    BOOKING ||--o{ BOOKING_ROOM : includes
    ROOM ||--o{ BOOKING_ROOM : assigned_to
    RATE_PLAN ||--o{ SEASONAL_RATE : overrides
    HOTEL ||--o{ AMENITY : offers
    ROOM_TYPE ||--o{ AMENITY : includes
```

### 5.2 SQLModel Definitions (New Tables)
```python
# app/models/hotel.py
class Hotel(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=200)
    slug: str = Field(unique=True, max_length=220)
    description: str | None = None
    address: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    phone: str | None = None
    email: str | None = None
    check_in_time: time = Field(default=time(14, 0))
    check_out_time: time = Field(default=time(11, 0))
    currency: str = Field(default="USD", max_length=3)
    timezone: str = Field(default="Africa/Dar_es_Salaam", max_length=50)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class RoomType(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hotel_id: int = Field(foreign_key="hotel.id", index=True)
    name: str = Field(max_length=100)  # "Deluxe Lake View"
    slug: str = Field(max_length=120)
    description: str | None = None
    max_occupancy: int = Field(default=2)
    base_occupancy: int = Field(default=2)
    extra_bed_capacity: int = Field(default=0)
    base_rate: Decimal = Field(max_digits=10, decimal_places=2)  # per night
    currency: str = Field(default="USD", max_length=3)
    is_active: bool = Field(default=True)
    sort_order: int = Field(default=0)
    # Relationships
    hotel: Hotel = Relationship(back_populates="room_types")
    rooms: list["Room"] = Relationship(back_populates="room_type")
    rate_plans: list["RatePlan"] = Relationship(back_populates="room_type")
    amenities: list["Amenity"] = Relationship(back_populates="room_type", link_model=RoomTypeAmenity)

class Room(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hotel_id: int = Field(foreign_key="hotel.id", index=True)
    room_type_id: int = Field(foreign_key="room_type.id", index=True)
    number: str = Field(max_length=20, index=True)  # "101", "A-201"
    floor: int | None = None
    status: RoomStatus = Field(default=RoomStatus.AVAILABLE, index=True)
    notes: str | None = None
    # Relationships
    hotel: Hotel = Relationship(back_populates="rooms")
    room_type: RoomType = Relationship(back_populates="rooms")
    bookings: list["BookingRoom"] = Relationship(back_populates="room")

class RatePlan(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    room_type_id: int = Field(foreign_key="room_type.id", index=True)
    name: str = Field(max_length=100)  # "Flexible", "Non-refundable", "Advance 30"
    description: str | None = None
    cancellation_policy: CancellationPolicy = Field(default=CancellationPolicy.FLEXIBLE)
    advance_days: int | None = None
    requires_deposit: bool = Field(default=False)
    deposit_percent: Decimal | None = Field(default=None, max_digits=5, decimal_places=2)
    is_active: bool = Field(default=True)
    # Relationships
    room_type: RoomType = Relationship(back_populates="rate_plans")
    seasonal_rates: list["SeasonalRate"] = Relationship(back_populates="rate_plan")

class SeasonalRate(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    rate_plan_id: int = Field(foreign_key="rate_plan.id", index=True)
    start_date: date = Field(index=True)
    end_date: date = Field(index=True)
    rate: Decimal = Field(max_digits=10, decimal_places=2)
    min_stay: int = Field(default=1)
    # Relationships
    rate_plan: RatePlan = Relationship(back_populates="seasonal_rates")

class Guest(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True, max_length=255)
    password_hash: str | None = None  # nullable for guest bookings
    first_name: str = Field(max_length=100)
    last_name: str = Field(max_length=100)
    phone: str | None = Field(default=None, max_length=20)
    country: str | None = Field(default=None, max_length=2)
    preferences: dict = Field(default_factory=dict, sa_column=Column(JSON))
    is_verified: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    # Relationships
    bookings: list["Booking"] = Relationship(back_populates="guest")

class Booking(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hotel_id: int = Field(foreign_key="hotel.id", index=True)
    guest_id: int = Field(foreign_key="guest.id", index=True)
    booking_reference: str = Field(unique=True, max_length=20, index=True)
    status: BookingStatus = Field(default=BookingStatus.PENDING, index=True)
    check_in: date = Field(index=True)
    check_out: date = Field(index=True)
    nights: int
    adults: int
    children: int = Field(default=0)
    subtotal: Decimal = Field(max_digits=10, decimal_places=2)
    taxes: Decimal = Field(max_digits=10, decimal_places=2)
    fees: Decimal = Field(max_digits=10, decimal_places=2)
    total: Decimal = Field(max_digits=10, decimal_places=2)
    currency: str = Field(max_length=3)
    special_requests: str | None = None
    source: BookingSource = Field(default=BookingSource.WEBSITE)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    confirmed_at: datetime | None = None
    cancelled_at: datetime | None = None
    # Relationships
    hotel: Hotel = Relationship(back_populates="bookings")
    guest: Guest = Relationship(back_populates="bookings")
    rooms: list["BookingRoom"] = Relationship(back_populates="booking")
    payments: list["Payment"] = Relationship(back_populates="booking")

class BookingRoom(SQLModel, table=True):
    """Many-to-many: Booking ↔ Room (with rate snapshot)"""
    id: int | None = Field(default=None, primary_key=True)
    booking_id: int = Field(foreign_key="booking.id", index=True)
    room_id: int = Field(foreign_key="room.id", index=True)
    room_type_id: int = Field(foreign_key="room_type.id")
    rate_plan_id: int = Field(foreign_key="rate_plan.id")
    rate_per_night: Decimal = Field(max_digits=10, decimal_places=2)
    # Relationships
    booking: Booking = Relationship(back_populates="rooms")
    room: Room = Relationship(back_populates="bookings")
    room_type: RoomType = Relationship()
    rate_plan: RatePlan = Relationship()

class Payment(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    booking_id: int = Field(foreign_key="booking.id", index=True)
    amount: Decimal = Field(max_digits=10, decimal_places=2)
    currency: str = Field(max_length=3)
    status: PaymentStatus = Field(default=PaymentStatus.PENDING, index=True)
    provider: PaymentProvider  # STRIPE, PAYPAL, CASH, BANK_TRANSFER
    provider_transaction_id: str | None = None
    provider_response: dict = Field(default_factory=dict, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    captured_at: datetime | None = None
    refunded_at: datetime | None = None
    # Relationships
    booking: Booking = Relationship(back_populates="payments")

class Amenity(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(unique=True, max_length=100)
    icon: str | None = None
    category: AmenityCategory = Field(default=AmenityCategory.GENERAL)

# Link tables
class HotelAmenity(SQLModel, table=True):
    hotel_id: int = Field(foreign_key="hotel.id", primary_key=True)
    amenity_id: int = Field(foreign_key="amenity.id", primary_key=True)

class RoomTypeAmenity(SQLModel, table=True):
    room_type_id: int = Field(foreign_key="room_type.id", primary_key=True)
    amenity_id: int = Field(foreign_key="amenity.id", primary_key=True)
```

### 5.3 Enums (Python + DB)
```python
class RoomStatus(str, Enum):
    AVAILABLE = "available"
    OCCUPIED = "occupied"
    MAINTENANCE = "maintenance"
    OUT_OF_ORDER = "out_of_order"
    HOUSEKEEPING = "housekeeping"

class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CHECKED_IN = "checked_in"
    CHECKED_OUT = "checked_out"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"

class CancellationPolicy(str, Enum):
    FLEXIBLE = "flexible"           # Free cancellation until 24h before
    MODERATE = "moderate"           # Free cancellation until 5 days before
    STRICT = "strict"               # 50% refund until 7 days before
    NON_REFUNDABLE = "non_refundable"

class PaymentStatus(str, Enum):
    PENDING = "pending"
    AUTHORIZED = "authorized"
    CAPTURED = "captured"
    FAILED = "failed"
    REFUNDED = "refunded"
    PARTIALLY_REFUNDED = "partially_refunded"

class PaymentProvider(str, Enum):
    STRIPE = "stripe"
    PAYPAL = "paypal"
    CASH = "cash"
    BANK_TRANSFER = "bank_transfer"

class BookingSource(str, Enum):
    WEBSITE = "website"
    PHONE = "phone"
    EMAIL = "email"
    WALK_IN = "walk_in"
    OTA = "ota"  # Booking.com, Expedia, etc.

class AmenityCategory(str, Enum):
    GENERAL = "general"
    ROOM = "room"
    HOTEL = "hotel"
    BATHROOM = "bathroom"
    TECHNOLOGY = "technology"
    ACCESSIBILITY = "accessibility"
```

### 5.4 Indexes (Critical for Performance)
```sql
-- Availability queries (most frequent)
CREATE INDEX idx_booking_dates ON booking (check_in, check_out);
CREATE INDEX idx_booking_room_dates ON booking_room (booking_id, room_id);

-- Rate lookups
CREATE INDEX idx_seasonal_rate_dates ON seasonal_rate (start_date, end_date);
CREATE INDEX idx_seasonal_rate_plan_dates ON seasonal_rate (rate_plan_id, start_date, end_date);

-- Guest lookups
CREATE INDEX idx_guest_email ON guest (email);

-- Room status + type
CREATE INDEX idx_room_status_type ON room (status, room_type_id);
```

---

## 6. Required Environment Variables & External Services

### 6.1 Backend (.env)
```bash
# Database
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/mwanza  # Production
# DATABASE_URL=sqlite+aiosqlite:///./mwanza.db                  # Development

# Security
SECRET_KEY=your-32-char-min-secret-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=1440  # 24h
REFRESH_TOKEN_EXPIRE_DAYS=30

# CORS
ALLOWED_ORIGINS=https://mwanza-hotel.com,https://www.mwanza-hotel.com

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend/SendGrid)
EMAIL_PROVIDER=resend  # or sendgrid
EMAIL_API_KEY=re_...
EMAIL_FROM=noreply@mwanza-hotel.com
EMAIL_FROM_NAME="Mwanza Hotel"

# File Storage (S3/R2/Cloudinary)
STORAGE_PROVIDER=r2
STORAGE_ENDPOINT=https://<account>.r2.cloudflarestorage.com
STORAGE_ACCESS_KEY=...
STORAGE_SECRET_KEY=...
STORAGE_BUCKET=mwanza-hotel-images
STORAGE_PUBLIC_URL=https://images.mwanza-hotel.com

# Frontend URL (for email links)
FRONTEND_URL=https://mwanza-hotel.com

# Admin
ADMIN_EMAIL=admin@mwanza-hotel.com
ADMIN_PASSWORD_HASH=...  # bcrypt hash, set via script

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_SECONDS=60

# Logging
LOG_LEVEL=INFO
SENTRY_DSN=https://...@sentry.io/...  # Optional
```

### 6.2 Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://api.mwanza-hotel.com/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_SITE_URL=https://mwanza-hotel.com
NEXT_PUBLIC_SITE_NAME="Mwanza Hotel"
```

### 6.3 External Services Required
| Service | Purpose | Est. Cost (Small Hotel) |
|---------|---------|------------------------|
| PostgreSQL | Primary database | $5-15/mo (managed) or self-hosted |
| Redis | Sessions, rate limiting, caching | $5-10/mo (managed) |
| Stripe | Payments | 2.9% + 30¢ per transaction |
| Resend/SendGrid | Transactional email | $0-20/mo (up to 10k-50k emails) |
| Cloudflare R2 / S3 | Image storage | $0.015/GB/mo + requests |
| Vercel / Netlify / VPS | Frontend hosting | $0-20/mo |
| Railway / Render / VPS | Backend hosting | $5-25/mo |
| Sentry | Error tracking | Free tier (5k errors/mo) |
| Domain + SSL | Production domain | $10-15/yr |

---

## 7. Phased Implementation Plan

### Phase 0: Stabilize & Clean (Week 1) ✅ **START HERE**
| Task | Files | Verification |
|------|-------|--------------|
| Remove dead `[slug]` directory | `frontend/src/app/[slug]/` | `npm run build` passes |
| Fix `package.json` name | `frontend/package.json` | Name = `"mwanza-hotel"` |
| Align backend models with frontend types | `app/models.py` | Add missing fields; run migration |
| Create API client in frontend | `frontend/src/lib/api.ts` | Type-safe fetch wrapper |
| Connect frontend to backend API | `frontend/src/lib/data.ts` | Replace JSON reads with API calls |
| Seed database with sample data | `app/seed.py` | `python -m app.seed` populates DB |

**Dependencies:** None
**Risks:** Low — cleanup only
**Verification:** `npm run build` ✅, `npm run dev` loads data from API ✅

---

### Phase 1: Hotel Domain & Read API (Week 2)
| Task | Files | Verification |
|------|-------|--------------|
| Add Hotel, RoomType, Room, Amenity models | `app/models/hotel.py` | Tables created on startup |
| Add Alembic migrations | `alembic/versions/...` | `alembic upgrade head` works |
| Create read-only API: `/hotels`, `/hotels/{slug}`, `/room-types`, `/rooms` | `app/api/v1/hotels.py`, `rooms.py` | Swagger UI shows endpoints |
| Frontend: Hotel landing page (replaces `/`) | `frontend/src/app/page.tsx` | Shows real hotel data |
| Frontend: Room type listing + detail | `frontend/src/app/rooms/...` | Lists rooms with rates |
| Frontend: Date picker + availability check | `components/availability-checker.tsx` | Calls `GET /availability` |

**Dependencies:** Phase 0 complete
**Risks:** Medium — schema design must be correct
**Verification:** API returns room types with rates; frontend displays them

---

### Phase 2: Availability Engine (Week 3)
| Task | Files | Verification |
|------|-------|--------------|
| Implement availability query (date range → available rooms) | `app/services/availability.py` | Unit tests pass |
| Add SeasonalRate, RatePlan models | `app/models/pricing.py` | Seasonal pricing works |
| API: `POST /availability/check` | `app/api/v1/availability.py` | Returns available room types + rates |
| Frontend: Availability calendar widget | `components/availability-calendar.tsx` | Visual calendar, date selection |
| Frontend: Rate display (per night, total, taxes) | `components/rate-display.tsx` | Accurate calculations |

**Dependencies:** Phase 1 complete
**Risks:** High — availability logic is complex; test thoroughly
**Verification:** Edge cases: overlapping bookings, min stay, closed dates, sell-out

---

### Phase 3: Booking Flow (Week 4-5)
| Task | Files | Verification |
|------|-------|--------------|
| Add Guest, Booking, BookingRoom, Payment models | `app/models/booking.py` | Tables created |
| Guest registration/login (JWT) | `app/api/v1/auth.py` | Register → login → token |
| Booking creation API | `app/api/v1/bookings.py` | `POST /bookings` creates pending booking |
| Hold inventory during checkout (15 min TTL) | `app/services/inventory_hold.py` | Concurrent bookings handled |
| Frontend: Multi-step booking form | `frontend/src/app/book/[bookingId]/...` | Dates → Room → Guest → Payment |
| Stripe PaymentIntent integration | `app/services/stripe.py`, `frontend/components/payment-form.tsx` | Test mode payment succeeds |
| Booking confirmation page + email | `app/services/email.py`, `frontend/src/app/book/confirmation/...` | Email received |

**Dependencies:** Phase 2 complete
**Risks:** High — payments, concurrency, idempotency
**Verification:** End-to-end test booking in Stripe test mode; confirmation email sent

---

### Phase 4: Admin Dashboard (Week 6)
| Task | Files | Verification |
|------|-------|--------------|
| Admin authentication (separate from guest) | `app/api/v1/admin/auth.py` | Admin login works |
| Role-based access control | `app/core/rbac.py` | `@require_role("admin")` |
| Admin: Room/Type CRUD | `frontend/src/app/admin/rooms/...` | Create/edit/delete room types |
| Admin: Rate/Seasonal management | `frontend/src/app/admin/rates/...` | Set seasonal rates |
| Admin: Booking calendar (month view) | `frontend/src/app/admin/bookings/...` | Drag-drop, status changes |
| Admin: Guest management | `frontend/src/app/admin/guests/...` | View/edit guests |
| Admin: Reports (occupancy, revenue) | `app/services/reports.py` | Basic charts |

**Dependencies:** Phase 3 complete
**Risks:** Medium — admin UI complexity
**Verification:** Admin can manage full booking lifecycle

---

### Phase 5: Production Hardening (Week 7)
| Task | Files | Verification |
|------|-------|--------------|
| Dockerfile (backend + frontend) | `Dockerfile.backend`, `Dockerfile.frontend` | `docker build` succeeds |
| docker-compose.yml (dev + prod) | `docker-compose.yml`, `docker-compose.prod.yml` | `docker compose up` runs stack |
| CI/CD Pipeline (GitHub Actions) | `.github/workflows/ci.yml`, `cd.yml` | Lint → Test → Build → Deploy |
| Environment configs (staging/prod) | `.env.staging`, `.env.prod` | Secrets in GitHub/Vercel/Railway |
| Health checks + readiness probes | `app/main.py` + k8s/compose | `/health` + `/ready` |
| Structured logging + Sentry | `app/core/logging.py` | Errors appear in Sentry |
| Load test (k6/Locust) | `load-test/` | 100 concurrent users < 500ms p95 |

**Dependencies:** Phases 0-4 complete
**Risks:** Medium — infrastructure complexity
**Verification:** Deploy to staging; full regression test

---

### Phase 6: Launch & Iterate (Week 8+)
- Soft launch to internal users
- Monitor errors, performance, conversion
- A/B test booking flow
- Add: Reviews, loyalty, multi-language, PWA, channel manager integration

---

## 8. Remaining Work Estimate (Small Implementation Stages)

| Stage | Description | Est. Days | Risk |
|-------|-------------|-----------|------|
| 0.1 | Remove `[slug]` dead code, fix build | 0.5 | Low |
| 0.2 | Rename project, align models | 1 | Low |
| 0.3 | Create API client + connect frontend | 1 | Low |
| 0.4 | Seed script + verify data flow | 0.5 | Low |
| **Phase 0 Total** | | **3** | |
| 1.1 | Hotel/RoomType/Room models + migration | 1.5 | Medium |
| 1.2 | Read API endpoints + OpenAPI | 1 | Low |
| 1.3 | Frontend hotel landing + room listing | 1.5 | Low |
| 1.4 | Availability checker component | 1 | Medium |
| **Phase 1 Total** | | **5** | |
| 2.1 | Availability service (core logic) | 2 | High |
| 2.2 | Seasonal rates + rate plans | 1 | Medium |
| 2.3 | Availability API + tests | 1 | Medium |
| 2.4 | Frontend calendar + rate display | 1.5 | Medium |
| **Phase 2 Total** | | **5.5** | |
| 3.1 | Booking models + auth (JWT) | 1.5 | Medium |
| 3.2 | Booking API + inventory holds | 2 | High |
| 3.3 | Stripe integration (backend) | 1 | Medium |
| 3.4 | Stripe integration (frontend) | 1 | Medium |
| 3.5 | Multi-step booking form | 2 | Medium |
| 3.6 | Confirmation + email | 1 | Low |
| **Phase 3 Total** | | **8.5** | |
| 4.1 | Admin auth + RBAC | 1 | Medium |
| 4.2 | Room/Rate admin CRUD | 2 | Low |
| 4.3 | Booking calendar admin | 2 | Medium |
| 4.4 | Guest management + reports | 1.5 | Low |
| **Phase 4 Total** | | **6.5** | |
| 5.1 | Docker + Compose | 1 | Low |
| 5.2 | CI/CD Pipeline | 1.5 | Medium |
| 5.3 | Env configs + secrets mgmt | 0.5 | Low |
| 5.4 | Logging + Monitoring + Load test | 1.5 | Medium |
| **Phase 5 Total** | | **4.5** | |
| **GRAND TOTAL** | | **~32.5 days** (≈ 6.5 weeks) | |

**Note:** Estimates assume 1 experienced full-stack engineer. Parallelize where possible (e.g., frontend/backend in same phase). Add 20% buffer for unknowns → **~8 weeks to production-ready MVP**.

---

## 9. Safe, Scoped Fixes to Implement Now (Phase 0)

These are the **only** changes I will make in this audit — they unblock the build and align the codebase without speculative rewrites.

### 9.1 Remove Dead `[slug]` Directory
```bash
rm -rf D:\openroute\frontend\src\app\[slug]
```

### 9.2 Fix `package.json` Name
```json
{
  "name": "mwanza-hotel",
  "version": "0.1.0",
  ...
}
```

### 9.3 Align Backend `Business` Model with Frontend `Business` Type
Add missing fields to `app/models.py`:
- `latitude: float | None`
- `longitude: float | None`
- `opening_hours: str | None`
- `is_featured: bool = False`
- `images: list[BusinessImage]` (link table or JSON column)
- Rename `phone_whatsapp` → `whatsapp` (or add property)

### 9.4 Create Frontend API Client
`frontend/src/lib/api.ts` — typed fetch wrapper with base URL from env.

### 9.5 Replace JSON Reads with API Calls
`frontend/src/lib/data.ts` → `async function getAllBusinesses() { return api.get('/businesses') }`

### 9.6 Seed Database
`app/seed.py` — populate categories, businesses, events from JSON files.

---

## 10. Checks Run & Results

| Check | Command | Result |
|-------|---------|--------|
| Backend dependencies install | `pip install -r requirements.txt` | ✅ Success |
| Backend starts | `uvicorn app.main:app --port 8000` | ✅ Running |
| Health endpoint | `GET /health` | ✅ `{"status":"ok"}` |
| Database created | `mwanza.db` (36 KB) | ✅ 3 tables |
| Frontend dependencies install | `npm install` | ✅ 316 packages |
| Frontend build (before fix) | `npm run build` | ❌ Failed — 5 missing modules in `[slug]` |
| **Frontend build (after fix)** | `npm run build` | ✅ **Passes** (3 warnings: `<img>` vs `<Image />`) |
| Frontend lint | `npm run lint` | ✅ Passes (same 3 warnings) |
| Frontend dev server | `npm run dev` | ✅ Runs |

---

## 11. Next Exact Implementation Stage

**Stage 0.1: Remove Dead Code & Fix Build** ✅ **COMPLETE**
1. ✅ Delete `frontend/src/app/[slug]/` directory
2. ✅ Fix `frontend/package.json` name to `"mwanza-hotel"`
3. ✅ Run `npm run build` — **passes**
4. ✅ Commit: `chore: remove dead Coursify code, fix build`

**Stage 0.2: Align Models & Create API Client** (Next)
1. Extend `app/models.py` `Business` with frontend-required fields
2. Create `app/api/v1/businesses.py` with `GET /businesses`, `GET /businesses/{slug}`
3. Create `frontend/src/lib/api.ts` (typed client)
4. Refactor `frontend/src/lib/data.ts` to use API client
5. Verify: Frontend loads businesses from API, not JSON

**Stage 0.3: Seed & Verify**
1. Create `app/seed.py` loading `businesses.json` → DB
2. Run seed, verify data in SQLite
3. End-to-end: Frontend → API → DB → Frontend

---

## Appendix: File Change Summary (This Audit)

| File | Change |
|------|--------|
| `AUDIT_REPORT.md` | Created (this file) |
| `check_db.py` | Created (temp, for inspection) |
| `frontend/package.json` | `"name": "courses-directory"` → `"mwanza-hotel"` |
| `frontend/src/app/[slug]/` | **Deleted** entire directory (dead Coursify code) |
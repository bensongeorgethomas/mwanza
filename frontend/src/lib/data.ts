import type { Business, Category, Event } from '@/types';
import businessesData from '@/data/businesses.json';
import eventsData from '@/data/events.json';

// ─── Businesses ──────────────────────────────────────────────────────

const businesses: Business[] = businessesData as Business[];

export async function getAllBusinesses(): Promise<Business[]> {
  return businesses;
}

export async function getFeaturedBusinesses(): Promise<Business[]> {
  return businesses.filter((b) => b.is_featured);
}

export async function getBusinessBySlug(
  slug: string,
): Promise<Business | undefined> {
  return businesses.find((b) => b.slug === slug);
}

export async function getBusinessesByCategory(
  category: Category,
): Promise<Business[]> {
  return businesses.filter((b) => b.category === category);
}

export async function searchBusinesses(query: string): Promise<Business[]> {
  const q = query.toLowerCase();
  return businesses.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q),
  );
}

export function getCategories(): Category[] {
  return ['Restaurants & Cafes', 'Hotels & Lodges', 'Tours & Activities'];
}

// ─── Events ──────────────────────────────────────────────────────────

const events: Event[] = eventsData as Event[];

export async function getAllEvents(): Promise<Event[]> {
  return events;
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const now = new Date();
  return events
    .filter((e) => new Date(e.event_date) >= now)
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime(),
    );
}

export async function getPastEvents(): Promise<Event[]> {
  const now = new Date();
  return events
    .filter((e) => new Date(e.event_date) < now)
    .sort(
      (a, b) =>
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime(),
    );
}

export async function getEventBySlug(
  slug: string,
): Promise<Event | undefined> {
  return events.find((e) => e.slug === slug);
}

export type Category =
  | 'Restaurants & Cafes'
  | 'Hotels & Lodges'
  | 'Tours & Activities';

export interface BusinessImage {
  url: string;
  alt: string;
}

export interface Business {
  id: number;
  name: string;
  slug: string;
  description: string;
  whatsapp: string;
  category: Category;
  address: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  is_verified: boolean;
  is_featured: boolean;
  images: BusinessImage[];
}

export interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  event_date: string; // ISO 8601
  location: string;
  image_url: string;
  source_credit: string;
}

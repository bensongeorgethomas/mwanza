import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// This file contains server-side data fetching functions
// In production, these would call the FastAPI backend

export interface RoomType {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  capacity: number
  bedType: string
  size: number
  baseRate: number
  currency: string
  images: { url: string; alt: string }[]
  amenities: string[]
  isAvailable: boolean
  rating?: number
  reviewCount?: number
}

export interface HotelInfo {
  name: string
  tagline: string
  description: string
  address: string
  phone: string
  email: string
  latitude: number
  longitude: number
  checkInTime: string
  checkOutTime: string
  images: { url: string; alt: string }[]
}

const hotelInfo: HotelInfo = {
  name: 'Mwanza Hotel',
  tagline: 'Lake Victoria\'s Finest Address',
  description: 'Perched on the rocky shores of Lake Victoria, Mwanza Hotel offers an unparalleled blend of contemporary luxury and authentic Tanzanian hospitality. Each of our suites frames the endless horizon of Africa\'s largest lake, while our grounds invite exploration of lush gardens and ancient kopjes.',
  address: 'Capri Point, Mwanza, Tanzania',
  phone: '+255 28 250 0000',
  email: 'reservations@mwanza-hotel.com',
  latitude: -2.5164,
  longitude: 32.9176,
  checkInTime: '14:00',
  checkOutTime: '11:00',
  images: [
    { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600', alt: 'Hotel exterior at sunset overlooking Lake Victoria' },
    { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600', alt: 'Luxury suite interior with lake view' },
    { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600', alt: 'Infinity pool overlooking the lake' },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600', alt: 'Fine dining restaurant with terrace' },
  ],
}

const roomTypes: RoomType[] = [
  {
    id: 'lake-view-suite',
    name: 'Lake View Suite',
    slug: 'lake-view-suite',
    description: 'Our signature suites offer an uninterrupted panorama of Lake Victoria from a private balcony. Designed with a seamless indoor-outdoor flow, each suite features a king bed dressed in Egyptian cotton, a spacious sitting area with artisan furnishings, and a marble bathroom with a deep soaking tub and walk-in rain shower. The curated minibar showcases local Tanzanian spirits and organic treats.',
    shortDescription: 'Panoramic lake views, king bed, marble bathroom with soaking tub, private balcony.',
    capacity: 2,
    bedType: 'King Bed',
    size: 65,
    baseRate: 480,
    currency: 'USD',
    images: [
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200', alt: 'Lake View Suite interior with lake view' },
      { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200', alt: 'Lake View Suite bedroom detail' },
      { url: 'https://images.unsplash.com/photo-1596394516093-51052b043c4e?w=1200', alt: 'Lake View Suite marble bathroom' },
      { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200', alt: 'Lake View Suite private balcony' },
    ],
    amenities: ['Lake View', 'Private Balcony', 'King Bed', 'Marble Bathroom', 'Soaking Tub', 'Rain Shower', 'Minibar', 'Air Conditioning', 'WiFi', 'Safe', 'Coffee Maker', 'Bathrobes & Slippers'],
    isAvailable: true,
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: 'kopje-suite',
    name: 'Kopje Suite',
    slug: 'kopje-suite',
    description: 'Nestled among the ancient granite kopjes that define Mwanza\'s landscape, these suites offer a secluded retreat with rock-face views and indigenous gardens. The design celebrates local materials—polished concrete floors, hand-carved wooden accents, and textiles woven by Sukuma artisans. A separate living room and study make this ideal for extended stays.',
    shortDescription: 'Secluded kopje setting, separate living room, Sukuma artisan textiles, study area.',
    capacity: 2,
    bedType: 'King Bed',
    size: 72,
    baseRate: 520,
    currency: 'USD',
    images: [
      { url: 'https://images.unsplash.com/photo-1596394516093-51052b043c4e?w=1200', alt: 'Kopje Suite living area' },
      { url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200', alt: 'Kopje Suite bedroom' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200', alt: 'Kopje Suite bathroom' },
    ],
    amenities: ['Kopje View', 'Separate Living Room', 'Study Area', 'King Bed', 'Artisan Textiles', 'Marble Bathroom', 'Rain Shower', 'Minibar', 'Air Conditioning', 'WiFi', 'Safe', 'Coffee Maker', 'Bathrobes & Slippers'],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: 'garden-suite',
    name: 'Garden Suite',
    slug: 'garden-suite',
    description: 'Opening directly onto manicured gardens with indigenous flowering plants, these suites bring the outdoors in. Floor-to-ceiling glass doors lead to a private patio with an outdoor shower surrounded by tropical foliage. The bedroom features a custom-built king bed with a hand-stitched headboard, while the bathroom includes dual vanities and a freestanding tub.',
    shortDescription: 'Garden access, private patio with outdoor shower, freestanding tub, custom king bed.',
    capacity: 3,
    bedType: 'King Bed + Daybed',
    size: 58,
    baseRate: 420,
    currency: 'USD',
    images: [
      { url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200', alt: 'Garden Suite bedroom' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200', alt: 'Garden Suite outdoor shower' },
      { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200', alt: 'Garden Suite patio' },
    ],
    amenities: ['Garden View', 'Private Patio', 'Outdoor Shower', 'King Bed', 'Daybed', 'Freestanding Tub', 'Dual Vanities', 'Minibar', 'Air Conditioning', 'WiFi', 'Safe', 'Coffee Maker', 'Bathrobes & Slippers'],
    isAvailable: true,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Suite',
    slug: 'presidential-suite',
    description: 'The crown jewel of Mwanza Hotel. This two-bedroom sanctuary spans the entire top floor of our main pavilion, with 180-degree lake views from every room. A grand piano anchors the living room, a private dining room seats eight, and the master suite features a walk-in closet and a bathroom with a double soaking tub overlooking the water. Includes dedicated butler service.',
    shortDescription: 'Two bedrooms, 180° lake views, grand piano, private dining, butler service.',
    capacity: 4,
    bedType: 'Two King Beds',
    size: 180,
    baseRate: 1200,
    currency: 'USD',
    images: [
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200', alt: 'Presidential Suite living room' },
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200', alt: 'Presidential Suite master bedroom' },
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200', alt: 'Presidential Suite dining' },
      { url: 'https://images.unsplash.com/photo-1596394516093-51052b043c4e?w=1200', alt: 'Presidential Suite bathroom' },
    ],
    amenities: ['Panoramic Lake View', 'Two Bedrooms', 'Grand Piano', 'Private Dining Room', 'Butler Service', 'Walk-in Closet', 'Double Soaking Tub', 'King Beds', 'Study', 'Minibar', 'Air Conditioning', 'WiFi', 'Safe', 'Coffee Maker', 'Bathrobes & Slippers', 'Private Elevator Access'],
    isAvailable: true,
    rating: 5.0,
    reviewCount: 23,
  },
]

const experiences = [
  {
    id: 'sunset-dhow',
    title: 'Sunset Dhow Cruise',
    description: 'Board a traditional lateen-sailed dhow for a two-hour cruise as the sun sets over Lake Victoria. Served with canapés and a selection of South African wines.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    duration: '2 hours',
    price: 85,
  },
  {
    id: 'saanane-safari',
    title: 'Saanane Island Safari',
    description: 'Guided walking safari on Tanzania\'s smallest national park. Spot impala, rock hyrax, and over 40 bird species with our resident naturalist.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    duration: 'Half day',
    price: 120,
  },
  {
    id: 'cultural-immersion',
    title: 'Sukuma Cultural Immersion',
    description: 'Visit a local Sukuma homestead for traditional dance, storytelling, and a home-cooked meal. A portion supports community education.',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800',
    duration: 'Full day',
    price: 150,
  },
  {
    id: 'spa-journey',
    title: 'Lake Victoria Spa Journey',
    description: 'Signature treatment using locally sourced shea butter, baobab oil, and lake salts. Includes steam room and hydrotherapy pool access.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
    duration: '2.5 hours',
    price: 180,
  },
]

// Server-side data fetching functions
export async function getHotelInfo(): Promise<HotelInfo> {
  return hotelInfo
}

export async function getRoomTypes(): Promise<RoomType[]> {
  return roomTypes
}

export async function getRoomTypeBySlug(slug: string): Promise<RoomType | null> {
  return roomTypes.find((r) => r.slug === slug) || null
}

export async function getFeaturedRooms(): Promise<RoomType[]> {
  return roomTypes.filter((r) => r.isAvailable).slice(0, 3)
}

export async function getExperiences() {
  return experiences
}

export async function getExperienceBySlug(slug: string) {
  return experiences.find((e) => e.id === slug) || null
}

// Generate static params for room detail pages
export async function generateRoomStaticParams() {
  return roomTypes.map((room) => ({ slug: room.slug }))
}

// Generate static params for experience detail pages
export async function generateExperienceStaticParams() {
  return experiences.map((exp) => ({ slug: exp.id }))
}
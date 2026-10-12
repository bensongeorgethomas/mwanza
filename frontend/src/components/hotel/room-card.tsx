'use client'

import Link from 'next/link'
import { clsx } from 'clsx'
import { Star, MapPin, Bed, Users, Wifi, Sparkles, ChevronRight } from 'lucide-react'
import { Card, CardImage, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

interface RoomCardProps {
  room: RoomType
  variant?: 'default' | 'featured' | 'compact'
  checkIn?: string
  checkOut?: string
  guests?: number
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-4 w-4" aria-hidden="true" />,
  'air conditioning': <span className="text-body-sm">❄</span>,
  'king bed': <Bed className="h-4 w-4" aria-hidden="true" />,
  'lake view': <span className="text-body-sm">🌊</span>,
  balcony: <span className="text-body-sm">🏠</span>,
  bathtub: <span className="text-body-sm">🛁</span>,
  minibar: <span className="text-body-sm">🍾</span>,
  safe: <span className="text-body-sm">🔒</span>,
  'coffee maker': <span className="text-body-sm">☕</span>,
}

function CompactVariant({ room, totalPrice, nights }: { room: RoomType; totalPrice: number; nights: number | null }) {
  return (
    <Link href={`/rooms/${room.slug}`} className="group block h-full" aria-label={`View ${room.name} details`}>
      <Card variant="interactive" padding="none" className="h-full flex flex-col">
        <CardImage src={room.images[0]?.url || '/placeholder-room.jpg'} alt={room.images[0]?.alt || room.name} aspect="landscape" className="h-48" />
        <CardContent className="flex-1 flex flex-col p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display text-heading-sm font-medium text-charcoal group-hover:text-brass transition-colors">{room.name}</h3>
            {room.rating && (
              <span className="flex items-center gap-1 text-body-sm font-medium text-brass bg-brass/10 px-2 py-0.5 rounded-full">
                <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                {room.rating.toFixed(1)}
              </span>
            )}
          </div>
          <p className="text-body-sm text-text-muted line-clamp-2 mb-4 flex-1">{room.shortDescription}</p>
          <div className="flex flex-wrap items-center gap-3 text-body-sm text-text-muted mb-4">
            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" aria-hidden="true" /> Up to {room.capacity}</span>
            <span className="flex items-center gap-1.5"><Bed className="h-3.5 w-3.5" aria-hidden="true" /> {room.bedType}</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
            <div>
              <span className="font-display text-heading-sm font-medium text-charcoal">{room.currency} {totalPrice.toLocaleString()}</span>
              {nights && <span className="text-body-sm text-text-muted ml-1">/ {nights} night{nights > 1 ? 's' : ''}</span>}
            </div>
            <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>View Details</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function FeaturedVariant({ room }: { room: RoomType }) {
  const primaryImage = room.images[0] || { url: '/placeholder-room.jpg', alt: room.name }
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white border border-border-subtle shadow-soft hover:shadow-medium transition-all duration-300">
      <Link href={`/rooms/${room.slug}`} className="block h-full" aria-label={`View ${room.name} details`}>
        <div className="relative aspect-video overflow-hidden">
          <img src={primaryImage.url} alt={primaryImage.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory">
            <h3 className="font-display text-display-sm font-medium">{room.name}</h3>
            <p className="mt-2 text-body text-limestone-dark max-w-md">{room.shortDescription}</p>
          </div>
        </div>
      </Link>
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {room.rating && (
          <span className="bg-white/95 backdrop-blur-sm text-charcoal px-3 py-1.5 rounded-full text-body-sm font-semibold flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-brass" aria-hidden="true" />
            {room.rating.toFixed(1)}
          </span>
        )}
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <Link href={`/rooms/${room.slug}`} className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-brass text-charcoal font-display font-medium rounded-lg hover:bg-brass-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">
          Explore Suite
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

function DefaultVariant({ room, totalPrice, nights }: { room: RoomType; totalPrice: number; nights: number | null }) {
  return (
    <Link href={`/rooms/${room.slug}`} className="group block h-full" aria-label={`View ${room.name} details`}>
      <Card variant="interactive" padding="none" className="h-full flex flex-col">
        <CardImage src={room.images[0]?.url || '/placeholder-room.jpg'} alt={room.images[0]?.alt || room.name} aspect="landscape" className="h-56" />
        <CardContent className="flex-1 flex flex-col p-6">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-display text-heading-md font-medium text-charcoal group-hover:text-brass transition-colors">{room.name}</h3>
            {room.rating && (
              <span className="flex items-center gap-1 text-body-sm font-medium text-brass bg-brass/10 px-2.5 py-1 rounded-full">
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                {room.rating.toFixed(1)}
                {room.reviewCount && <span className="text-text-muted">({room.reviewCount})</span>}
              </span>
            )}
          </div>
          <p className="text-body text-text-muted line-clamp-3 mb-5 flex-1">{room.description}</p>
          <div className="flex flex-wrap gap-2 mb-5" role="list" aria-label="Room amenities">
            {room.amenities.slice(0, 5).map((amenity) => (
              <span key={amenity} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-limestone/50 text-body-sm text-text-secondary" role="listitem">
                {amenityIcons[amenity.toLowerCase()] || <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
                {amenity}
              </span>
            ))}
            {room.amenities.length > 5 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-limestone/50 text-body-sm text-text-muted">
                +{room.amenities.length - 5} more
              </span>
            )}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
            <div className="flex flex-wrap items-center gap-4 text-body-sm text-text-muted">
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" aria-hidden="true" /> Up to {room.capacity} guests</span>
              <span className="flex items-center gap-1.5"><Bed className="h-4 w-4" aria-hidden="true" /> {room.bedType}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden="true" /> {room.size} m²</span>
            </div>
            <div className="text-right">
              <div className="font-display text-heading-md font-medium text-charcoal">{room.currency} {totalPrice.toLocaleString()}</div>
              {nights && <p className="text-body-sm text-text-muted mt-0.5">{room.currency} {room.baseRate.toLocaleString()} / night</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function RoomCard({ room, variant = 'default', checkIn, checkOut, guests }: RoomCardProps) {
  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : null

  const totalPrice = nights ? room.baseRate * nights : room.baseRate

  if (variant === 'compact') {
    return <CompactVariant room={room} totalPrice={totalPrice} nights={nights} />
  }

  if (variant === 'featured') {
    return <FeaturedVariant room={room} />
  }

  return <DefaultVariant room={room} totalPrice={totalPrice} nights={nights} />
}
import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { RoomCard } from '@/components/hotel/room-card'
import { BookingWidget } from '@/components/booking/booking-widget'
import { getHotelInfo, getRoomTypes, generateRoomStaticParams } from '@/lib/hotel-data'
import { ArrowRight, Filter, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rooms & Suites',
  description: 'Explore our luxury suites at Mwanza Hotel. Lake View, Kopje, Garden, and Presidential suites with panoramic Lake Victoria views.',
}

interface PageProps {
  searchParams: Promise<{ checkIn?: string; checkOut?: string; guests?: string; rooms?: string }>
}

export async function generateStaticParams() {
  return generateRoomStaticParams()
}

export default async function RoomsPage({ searchParams }: PageProps) {
  const hotel = await getHotelInfo()
  const roomTypes = await getRoomTypes()
  const params = await searchParams

  const checkIn = params.checkIn || new Date().toISOString().split('T')[0]
  const checkOut = params.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0]
  const guests = parseInt(params.guests || '2', 10)
  const rooms = parseInt(params.rooms || '1', 10)

  const availableRooms = roomTypes.filter((r) => r.isAvailable && r.capacity >= guests)

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Page Header */}
        <section className="relative py-20 lg:py-28 bg-charcoal text-ivory" aria-labelledby="page-title">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
              alt="Hotel exterior at sunset"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/70" aria-hidden="true" />
          </div>
          <div className="container relative z-10">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Rooms & Suites', isCurrent: true },
              ]}
            />
            <h1 id="page-title" className="font-display text-display-md mt-6 mb-4">
              Rooms &{' '}
              <span className="text-brass-light">Suites</span>
            </h1>
            <p className="text-body-lg text-limestone-dark max-w-2xl">
              Each suite is a sanctuary crafted with indigenous materials, artisan textiles, and uninterrupted views of Lake Victoria.
            </p>
          </div>
        </section>

        {/* Booking Bar */}
        <section className="py-8 bg-white border-b border-border-subtle sticky top-20 z-30 lg:static lg:border-0 lg:py-0 lg:shadow-none" aria-labelledby="booking-bar-heading">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-2 text-body-sm text-text-muted">
                <span className="font-medium text-charcoal">{availableRooms.length}</span> suites available
              </div>
              <BookingWidget
                variant="inline"
                defaultCheckIn={checkIn}
                defaultCheckOut={checkOut}
                defaultGuests={guests}
                defaultRooms={rooms}
              />
            </div>
          </div>
        </section>

        {/* Room Grid */}
        <section className="py-16 lg:py-20 bg-ivory" aria-labelledby="rooms-list-heading">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
              <div>
                <h2 id="rooms-list-heading" className="font-display text-heading-xl text-charcoal">
                  {availableRooms.length} Suite{availableRooms.length !== 1 ? 's' : ''} Available
                </h2>
                <p className="text-body text-text-secondary mt-2">
                  Check-in: <span className="font-medium text-charcoal">{new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  {' · '}
                  Check-out: <span className="font-medium text-charcoal">{new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  {' · '}
                  {guests} Guest{guests !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {availableRooms.length === 0 ? (
              <div className="text-center py-20">
                <div className="mx-auto w-20 h-20 rounded-full bg-limestone/50 flex items-center justify-center mb-6">
                  <Filter className="h-10 w-10 text-text-muted" aria-hidden="true" />
                </div>
                <h3 className="font-display text-heading-lg text-charcoal mb-2">No suites match your criteria</h3>
                <p className="text-body text-text-secondary mb-6">Try adjusting your dates or guest count</p>
                <button
                  onClick={() => window.location.href = '/rooms'}
                  className="px-6 py-3 bg-brass text-charcoal font-medium rounded-lg hover:bg-brass-dark transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 stagger">
                {availableRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    variant="default"
                    checkIn={checkIn}
                    checkOut={checkOut}
                    guests={guests}
                  />
                ))}
              </div>
            )}

            <div className="mt-12 text-center">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brass text-charcoal font-display font-medium rounded-lg hover:bg-brass-dark transition-colors"
              >
                Check Availability for Your Dates
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Amenities Overview */}
        <section className="py-20 lg:py-28 bg-white" aria-labelledby="amenities-heading">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-caption text-brass uppercase tracking-widest font-semibold mb-3">Included Amenities</p>
              <h2 id="amenities-heading" className="font-display text-display-sm text-charcoal">
                Everything you need for a{' '}
                <span className="text-brass">seamless stay</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🛏', title: 'Luxury Bedding', desc: 'Egyptian cotton sheets, down pillows, mattress toppers' },
                { icon: '🛁', title: 'Marble Bathrooms', desc: 'Soaking tubs, rain showers, dual vanities, heated floors' },
                { icon: '🌊', title: 'Lake Views', desc: 'Private balconies or patios with panoramic vistas' },
                { icon: '📶', title: 'High-Speed WiFi', desc: 'Complimentary fiber internet throughout the property' },
                { icon: '☕', title: 'Nespresso & Tea', desc: 'Curated selection of Tanzanian coffee and organic teas' },
                { icon: '🍾', title: 'Minibar', desc: 'Local spirits, organic snacks, premium water' },
                { icon: '🔒', title: 'In-Room Safe', desc: 'Electronic safe large enough for laptops' },
                { icon: '🧥', title: 'Bathrobes & Slippers', desc: 'Plush organic cotton robes and leather slippers' },
              ].map((amenity) => (
                <div key={amenity.title} className="p-6 bg-ivory/50 rounded-xl border border-border-subtle hover:border-brass/30 transition-colors">
                  <span className="text-3xl mb-3 block" aria-hidden="true">{amenity.icon}</span>
                  <h3 className="font-display text-heading-sm font-medium text-charcoal mb-2">{amenity.title}</h3>
                  <p className="text-body-sm text-text-secondary">{amenity.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
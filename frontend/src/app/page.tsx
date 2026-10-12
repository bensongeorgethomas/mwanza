import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BookingWidget } from '@/components/booking/booking-widget'
import { RoomCard } from '@/components/hotel/room-card'
import { getHotelInfo, getFeaturedRooms, getExperiences } from '@/lib/hotel-data'
import Link from 'next/link'
import { ArrowRight, Star, MapPin, Utensils, Sailboat, Mountain, Award, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lake Victoria\'s Finest Address',
  description: 'Experience refined hospitality on the shores of Lake Victoria. Luxury rooms, suites, dining, and bespoke experiences in Mwanza, Tanzania.',
  openGraph: {
    title: 'Mwanza Hotel — Lake Victoria\'s Finest Address',
    description: 'Experience refined hospitality on the shores of Lake Victoria.',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200'],
  },
}

export default async function HomePage() {
  const hotel = await getHotelInfo()
  const featuredRooms = await getFeaturedRooms()
  const experiences = await getExperiences()

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden" aria-labelledby="hero-title">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
              alt="Mwanza Hotel exterior at sunset overlooking Lake Victoria"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" aria-hidden="true" />
            <div className="absolute inset-0 grain-overlay" aria-hidden="true" />
          </div>

          <div className="container relative z-10 py-20 lg:py-32">
            <div className="max-w-3xl animate-slide-up">
              <p className="text-caption text-brass-light uppercase tracking-widest font-semibold mb-4">
                Lake Victoria, Tanzania
              </p>
              <h1 id="hero-title" className="font-display text-display-lg text-ivory mb-6 leading-tight">
                Where the lake meets{' '}
                <span className="text-brass-light">luxury</span>
              </h1>
              <p className="text-body-lg text-limestone mb-10 max-w-xl leading-relaxed">
                Perched on ancient kopjes overlooking Africa&apos;s greatest lake, Mwanza Hotel offers an unparalleled blend of contemporary elegance and authentic Tanzanian hospitality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-brass text-charcoal font-display font-medium rounded-lg hover:bg-brass-dark transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">
                    Check Availability
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </Link>
                <Link href="/rooms" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-ivory font-medium rounded-lg hover:bg-white/10 hover:border-white/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">
                  Explore Suites
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
            <svg className="h-8 w-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Booking Widget Section */}
        <section className="relative -mt-10 lg:-mt-16 z-20" aria-labelledby="booking-heading">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <BookingWidget variant="hero" />
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 lg:py-28 bg-white" aria-labelledby="intro-heading">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 animate-slide-up">
                <p className="text-caption text-brass uppercase tracking-widest font-semibold">Our Philosophy</p>
                <h2 id="intro-heading" className="font-display text-display-sm text-charcoal">
                  Hospitality as an{' '}
                  <span className="text-brass">art form</span>
                </h2>
                <p className="text-body-lg text-text-secondary leading-relaxed">
                  {hotel.description}
                </p>
                <p className="text-body text-text-secondary leading-relaxed">
                  Every detail has been considered—from the hand-woven textiles adorning our suites to the seasonal menus crafted by our chefs using ingredients sourced from local farms and fishermen. We invite you to experience Mwanza not as a visitor, but as a welcomed guest in our home.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-body font-medium text-brass hover:text-brass-dark transition-colors mt-4"
                >
                  Discover our story
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="relative animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="aspect-portrait overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
                    alt="Elegant hotel suite interior with lake view"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-strong max-w-sm">
                  <div className="flex items-center gap-3 text-brass mb-2">
                    <Award className="h-6 w-6" aria-hidden="true" />
                    <span className="font-display text-heading-sm font-medium text-charcoal">9.6/10</span>
                  </div>
                  <p className="text-body-sm text-text-secondary">
                    Guest rating based on 395 verified reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Rooms */}
        <section className="py-20 lg:py-28 bg-ivory" aria-labelledby="rooms-heading">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div className="space-y-3">
                <p className="text-caption text-brass uppercase tracking-widest font-semibold">Accommodation</p>
                <h2 id="rooms-heading" className="font-display text-display-sm text-charcoal">
                  Suites designed for{' '}
                  <span className="text-brass">discerning guests</span>
                </h2>
              </div>
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 text-body font-medium text-brass hover:text-brass-dark transition-colors self-end lg:self-auto"
              >
                View all suites
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
              {featuredRooms.map((room) => (
                <RoomCard key={room.id} room={room} variant="default" />
              ))}
            </div>
          </div>
        </section>

        {/* Experiences */}
        <section className="py-20 lg:py-28 bg-white" aria-labelledby="experiences-heading">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div className="space-y-3">
                <p className="text-caption text-brass uppercase tracking-widest font-semibold">Experiences</p>
                <h2 id="experiences-heading" className="font-display text-display-sm text-charcoal">
                  Curated moments on{' '}
                  <span className="text-brass">Lake Victoria</span>
                </h2>
              </div>
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2 text-body font-medium text-brass hover:text-brass-dark transition-colors self-end lg:self-auto"
              >
                View all experiences
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
              {experiences.map((exp) => (
                <article key={exp.id} className="group overflow-hidden rounded-xl bg-white border border-border-subtle hover:shadow-medium transition-all duration-300">
                  <Link href={`/experiences/${exp.id}`} className="block" aria-label={`${exp.title} - ${exp.duration}, $${exp.price}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={exp.image}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-caption text-brass uppercase tracking-wider font-medium">{exp.duration}</span>
                        <span className="font-display text-heading-sm font-medium text-charcoal">${exp.price}</span>
                      </div>
                      <h3 className="font-display text-heading-sm font-medium text-charcoal group-hover:text-brass transition-colors mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-body-sm text-text-muted line-clamp-2">
                        {exp.description}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Dining Preview */}
        <section className="py-20 lg:py-28 bg-limestone/30" aria-labelledby="dining-heading">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative animate-slide-up">
                <div className="aspect-landscape overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000"
                    alt="Fine dining table setting with lake view"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-6 rounded-xl shadow-strong max-w-xs">
                  <div className="flex items-center gap-3 text-brass mb-2">
                    <Utensils className="h-6 w-6" aria-hidden="true" />
                    <span className="font-display text-heading-sm font-medium text-charcoal">Lakeview Restaurant</span>
                  </div>
                  <p className="text-body-sm text-text-secondary">
                    Open daily 7:00–22:00. Reservations recommended.
                  </p>
                </div>
              </div>
              <div className="space-y-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <p className="text-caption text-brass uppercase tracking-widest font-semibold">Dining</p>
                <h2 id="dining-heading" className="font-display text-display-sm text-charcoal">
                  Culinary journeys by the{' '}
                  <span className="text-brass">water</span>
                </h2>
                <p className="text-body-lg text-text-secondary leading-relaxed">
                  Our lakefront restaurant celebrates the bounty of Lake Victoria and the surrounding highlands. Fresh tilapia and nile perch arrive daily from local fishermen, while organic produce comes from our own kitchen gardens and partner farms in the Mwanza region.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-border-subtle">
                    <div className="flex items-center gap-3 mb-2">
                      <Utensils className="h-5 w-5 text-brass" aria-hidden="true" />
                      <span className="font-medium text-charcoal">Lakeview Restaurant</span>
                    </div>
                    <p className="text-body-sm text-text-secondary">Fine dining with panoramic lake views</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-border-subtle">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="h-5 w-5 text-brass" aria-hidden="true" />
                      <span className="font-medium text-charcoal">The Terrace Bar</span>
                    </div>
                    <p className="text-body-sm text-text-secondary">Sunset cocktails and light bites</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-border-subtle">
                    <div className="flex items-center gap-3 mb-2">
                      <Sailboat className="h-5 w-5 text-brass" aria-hidden="true" />
                      <span className="font-medium text-charcoal">Private Dining</span>
                    </div>
                    <p className="text-body-sm text-text-secondary">Bespoke menus for special occasions</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-border-subtle">
                    <div className="flex items-center gap-3 mb-2">
                      <Mountain className="h-5 w-5 text-brass" aria-hidden="true" />
                      <span className="font-medium text-charcoal">In-Suite Dining</span>
                    </div>
                    <p className="text-body-sm text-text-secondary">24-hour private dining service</p>
                  </div>
                </div>
                <Link
                  href="/dining"
                  className="inline-flex items-center gap-2 text-body font-medium text-brass hover:text-brass-dark transition-colors mt-4"
                >
                  Explore dining
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact */}
        <section className="py-20 lg:py-28 bg-charcoal text-ivory" aria-labelledby="location-heading">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-6">
                <p className="text-caption text-brass-light uppercase tracking-widest font-semibold">Visit Us</p>
                <h2 id="location-heading" className="font-display text-display-sm text-ivory">
                  Find us on the shores of{' '}
                  <span className="text-brass-light">Lake Victoria</span>
                </h2>
                <p className="text-body-lg text-limestone-dark leading-relaxed">
                  Mwanza Hotel is located on Capri Point, a dramatic rocky peninsula jutting into Lake Victoria. We are 15 minutes from Mwanza Airport (MWZ) and a short drive from the city center, Bismarck Rock, and the ferry to Saanane Island National Park.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-brass-light flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-ivory">{hotel.address}</p>
                      <p className="text-body-sm text-limestone-dark">GPS: {hotel.latitude.toFixed(4)}°, {hotel.longitude.toFixed(4)}°</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 flex-shrink-0" aria-hidden="true">📞</span>
                    <a href={`tel:${hotel.phone.replace(/\s/g, '')}`} className="text-limestone-dark hover:text-brass-light transition-colors">{hotel.phone}</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 flex-shrink-0" aria-hidden="true">✉</span>
                    <a href={`mailto:${hotel.email}`} className="text-limestone-dark hover:text-brass-light transition-colors">{hotel.email}</a>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-body font-medium text-brass-light hover:text-brass transition-colors mt-4"
                >
                  Get directions
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="relative animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="aspect-video overflow-hidden rounded-2xl">
                  <iframe
                    title="Mwanza Hotel location map"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${hotel.longitude - 0.01}%2C${hotel.latitude - 0.01}%2C${hotel.longitude + 0.01}%2C${hotel.latitude + 0.01}&layer=mapnik&marker=${hotel.latitude}%2C${hotel.longitude}`}
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 lg:py-24 bg-charcoal text-ivory" aria-labelledby="newsletter-heading">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 id="newsletter-heading" className="font-display text-display-sm text-ivory mb-4">
                Stay connected with{' '}
                <span className="text-brass-light">Mwanza Hotel</span>
              </h2>
              <p className="text-body-lg text-limestone-dark mb-8">
                Receive seasonal offers, exclusive experiences, and stories from the lake.
              </p>
              <form action="/api/newsletter" method="POST" className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="footer-email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3.5 rounded-lg bg-limestone/10 border border-limestone/20 text-charcoal placeholder:text-limestone-dark focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-brass text-charcoal font-display font-medium rounded-lg hover:bg-brass-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-3 text-caption text-limestone/50">
                By subscribing, you agree to our <a href="/privacy" className="underline hover:text-brass-light">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Clock,
  Phone,
} from 'lucide-react'
import ShareButton from '@/components/share-button'
import { getBusinessBySlug, getAllBusinesses } from '@/lib/data'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const biz = await getBusinessBySlug(slug)
  if (!biz) return { title: 'Not Found' }
  return {
    title: `${biz.name} — Mwanza Directory`,
    description: biz.description,
  }
}

export async function generateStaticParams() {
  const businesses = await getAllBusinesses()
  return businesses.map((b) => ({ slug: b.slug }))
}

export default async function BusinessDetailPage({ params }: PageProps) {
  const { slug } = await params
  const biz = await getBusinessBySlug(slug)
  if (!biz) notFound()

  const categoryStyles: Record<string, string> = {
    'Restaurants & Cafes': 'bg-orange-100 text-orange-700',
    'Hotels & Lodges': 'bg-blue-100 text-blue-700',
    'Tours & Activities': 'bg-emerald-100 text-emerald-700',
  }

  const whatsappUrl = `https://wa.me/${biz.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I found ${biz.name} on Mwanza Directory!`)}`

  return (
    <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/businesses"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={15} />
        Back to businesses
      </Link>

      {/* Image gallery */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {biz.images.map((img, i) => (
          <div
            key={i}
            className={`overflow-hidden rounded-2xl ${
              i === 0 && biz.images.length > 1 ? 'sm:row-span-2' : ''
            }`}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="h-56 w-full object-cover sm:h-full"
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              categoryStyles[biz.category] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {biz.category}
          </span>
          {biz.is_featured && (
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">
              ★ Featured
            </span>
          )}
          {biz.is_verified && (
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <BadgeCheck size={13} />
              Verified
            </span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold text-text-primary sm:text-4xl">
          {biz.name}
        </h1>
      </div>

      {/* Body content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-text-primary">About</h2>
          <p className="mb-8 leading-relaxed text-text-secondary">
            {biz.description}
          </p>

          {/* Map placeholder */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map of ${biz.name}`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${biz.longitude - 0.005}%2C${biz.latitude - 0.005}%2C${biz.longitude + 0.005}%2C${biz.latitude + 0.005}&layer=mapnik&marker=${biz.latitude}%2C${biz.longitude}`}
              className="h-64 w-full sm:h-80"
              loading="lazy"
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4">
          {/* CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
          >
            <Phone size={16} />
            Chat on WhatsApp
          </a>

          {/* Info card */}
          <div className="rounded-2xl border border-border bg-surface-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-muted">
              Details
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-text-secondary">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span>{biz.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  size={16}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span>{biz.opening_hours}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  size={16}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span>{biz.whatsapp}</span>
              </li>
            </ul>
          </div>

          {/* Share button */}
          <ShareButton title={biz.name} text={biz.description} />
        </aside>
      </div>
    </article>
  )
}

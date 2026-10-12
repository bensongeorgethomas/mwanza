'use client'

import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { Calendar, Users, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, type SelectOption } from '@/components/ui/select'

interface BookingWidgetProps {
  variant?: 'hero' | 'inline' | 'sidebar'
  defaultCheckIn?: string
  defaultCheckOut?: string
  defaultGuests?: number
  defaultRooms?: number
  onSearch?: (params: BookingParams) => void
}

interface BookingParams {
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
}

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const formatDate = (date: Date) => date.toISOString().split('T')[0]

export function BookingWidget({
  variant = 'hero',
  defaultCheckIn = formatDate(today),
  defaultCheckOut = formatDate(tomorrow),
  defaultGuests = 2,
  defaultRooms = 1,
  onSearch,
}: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState(defaultCheckIn)
  const [checkOut, setCheckOut] = useState(defaultCheckOut)
  const [guests, setGuests] = useState(defaultGuests)
  const [rooms, setRooms] = useState(defaultRooms)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [focusedField, setFocusedField] = useState<'checkIn' | 'checkOut' | null>(null)

  // Update min dates when check-in changes
  useEffect(() => {
    const checkInDate = new Date(checkIn)
    const minCheckOut = new Date(checkInDate)
    minCheckOut.setDate(minCheckOut.getDate() + 1)

    if (new Date(checkOut) <= checkInDate) {
      setCheckOut(formatDate(minCheckOut))
    }
  }, [checkIn, checkOut])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch({ checkIn, checkOut, guests, rooms })
    } else {
      const params = new URLSearchParams({
        checkIn,
        checkOut,
        guests: guests.toString(),
        rooms: rooms.toString(),
      })
      window.location.href = `/booking?${params.toString()}`
    }
  }

  const guestOptions: SelectOption[] = Array.from({ length: 8 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} Guest${i > 0 ? 's' : ''}`,
  }))

  const roomOptions: SelectOption[] = Array.from({ length: 4 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} Room${i > 0 ? 's' : ''}`,
  }))

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  )

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-strong border border-border-subtle" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-end">
          <div className="lg:col-span-1">
            <label htmlFor="hero-checkin" className="sr-only">Check-in date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" aria-hidden="true" />
              <input
                id="hero-checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={formatDate(today)}
                max={formatDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()))}
                className="w-full pl-12 pr-4 py-4 bg-white border border-border-default rounded-lg text-body font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-transparent transition-all cursor-pointer"
                onFocus={() => setFocusedField('checkIn')}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <label htmlFor="hero-checkout" className="sr-only">Check-out date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" aria-hidden="true" />
              <input
                id="hero-checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={formatDate(new Date(checkIn))}
                max={formatDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()))}
                className="w-full pl-12 pr-4 py-4 bg-white border border-border-default rounded-lg text-body font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-transparent transition-all cursor-pointer"
                onFocus={() => setFocusedField('checkOut')}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <label htmlFor="hero-guests" className="sr-only">Guests and rooms</label>
            <Select
              id="hero-guests"
              options={guestOptions}
              value={String(guests)}
              onChange={(e) => setGuests(Number(e.target.value))}
              placeholder="Guests"
              className="w-full"
            />
          </div>

          <div className="lg:col-span-1">
            <Button type="submit" variant="brass" size="lg" fullWidth className="py-4">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
              Check Availability
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-body-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden="true" />
            {guests} Guest{guests !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {nights} Night{nights !== 1 ? 's' : ''}
          </span>
        </div>
      </form>
    )
  }

  if (variant === 'sidebar') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label htmlFor="sidebar-checkin" className="block text-caption font-semibold text-text-muted uppercase tracking-wider mb-2">
            Check-in
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" aria-hidden="true" />
            <input
              id="sidebar-checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={formatDate(today)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-border-default rounded-lg text-body font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-transparent transition-all cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label htmlFor="sidebar-checkout" className="block text-caption font-semibold text-text-muted uppercase tracking-wider mb-2">
            Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" aria-hidden="true" />
            <input
              id="sidebar-checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={formatDate(new Date(checkIn))}
              className="w-full pl-12 pr-4 py-3 bg-white border border-border-default rounded-lg text-body font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-transparent transition-all cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sidebar-guests" className="block text-caption font-semibold text-text-muted uppercase tracking-wider mb-2">
              Guests
            </label>
            <Select
              id="sidebar-guests"
              options={guestOptions}
              value={String(guests)}
              onChange={(e) => setGuests(Number(e.target.value))}
              placeholder="Guests"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="sidebar-rooms" className="block text-caption font-semibold text-text-muted uppercase tracking-wider mb-2">
              Rooms
            </label>
            <Select
              id="sidebar-rooms"
              options={roomOptions}
              value={String(rooms)}
              onChange={(e) => setRooms(Number(e.target.value))}
              placeholder="Rooms"
              className="w-full"
            />
          </div>
        </div>

        <Button type="submit" variant="brass" size="lg" fullWidth className="py-4">
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
          Check Availability
        </Button>

        <p className="text-center text-body-sm text-text-muted">
          {nights} Night{nights !== 1 ? 's' : ''} · {guests} Guest{guests !== 1 ? 's' : ''} · {rooms} Room{rooms !== 1 ? 's' : ''}
        </p>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end" noValidate>
      <div>
        <label htmlFor="inline-checkin" className="block text-caption font-semibold text-text-muted uppercase tracking-wider mb-1.5">
          Check-in
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <input
            id="inline-checkin"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={formatDate(today)}
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-border-default rounded-lg text-body-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-transparent transition-all cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label htmlFor="inline-checkout" className="block text-caption font-semibold text-text-muted uppercase tracking-wider mb-1.5">
          Check-out
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <input
            id="inline-checkout"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={formatDate(new Date(checkIn))}
            className="w-full pl-10 pr-3 py-2.5 bg-white border border-border-default rounded-lg text-body-sm font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-transparent transition-all cursor-pointer"
          />
        </div>
      </div>

      <div>
        <label htmlFor="inline-guests" className="block text-caption font-semibold text-text-muted uppercase tracking-wider mb-1.5">
          Guests
        </label>
        <Select
          id="inline-guests"
          options={guestOptions}
          value={String(guests)}
          onChange={(e) => setGuests(Number(e.target.value))}
          placeholder="Guests"
          className="w-full"
        />
      </div>

      <div>
        <Button type="submit" variant="brass" size="md" fullWidth>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          Check Availability
        </Button>
      </div>
    </form>
  )
}
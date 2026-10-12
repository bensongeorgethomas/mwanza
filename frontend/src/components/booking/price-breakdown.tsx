'use client'

import { clsx } from 'clsx'
import { Calendar, Users, Tag, Minus, Plus, Check } from 'lucide-react'

export interface PriceBreakdownItem {
  label: string
  amount: number
  currency: string
  nights?: number
  isTotal?: boolean
  isDiscount?: boolean
  details?: string
}

export interface PriceBreakdownProps {
  items: PriceBreakdownItem[]
  currency: string
  checkIn?: string
  checkOut?: string
  guests?: number
  rooms?: number
  variant?: 'default' | 'compact' | 'sidebar'
  className?: string
}

export function PriceBreakdown({
  items,
  currency,
  checkIn,
  checkOut,
  guests,
  rooms,
  variant = 'default',
  className = '',
}: PriceBreakdownProps) {
  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : null

  const subtotal = items
    .filter((item) => !item.isTotal && !item.isDiscount)
    .reduce((sum, item) => sum + item.amount, 0)

  const discounts = items
    .filter((item) => item.isDiscount)
    .reduce((sum, item) => sum + item.amount, 0)

  const total = items
    .filter((item) => item.isTotal)
    .reduce((sum, item) => sum + item.amount, 0) || subtotal - discounts

  const formatAmount = (amount: number) => `${currency} ${amount.toLocaleString()}`

  if (variant === 'compact') {
    return (
      <div className={clsx('bg-limestone/50 rounded-xl p-4', className)}>
        <div className="flex items-center justify-between text-body-sm">
          <span className="text-text-muted">Subtotal</span>
          <span className="font-semibold text-charcoal">{formatAmount(subtotal)}</span>
        </div>
        {discounts > 0 && (
          <div className="mt-1.5 flex items-center justify-between text-body-sm">
            <span className="text-text-muted flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" aria-hidden="true" />
              Discounts
            </span>
            <span className="font-semibold text-success">-{formatAmount(discounts)}</span>
          </div>
        )}
        <div className="mt-3 pt-3 border-t border-limestone-dark/20 flex items-center justify-between">
          <span className="font-display text-heading-sm font-medium text-charcoal">Total</span>
          <span className="font-display text-heading-sm font-medium text-charcoal">{formatAmount(total)}</span>
        </div>
        {nights && (
          <p className="mt-2 text-center text-body-sm text-text-muted">
            {nights} night{nights > 1 ? 's' : ''} · {guests ?? 1} guest{(guests ?? 1) > 1 ? 's' : ''} · {rooms ?? 1} room{(rooms ?? 1) > 1 ? 's' : ''}
          </p>
        )}
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className={clsx('bg-white border border-border-subtle rounded-xl p-6 sticky top-24', className)}>
        <h3 className="font-display text-heading-sm font-medium text-charcoal mb-5">Price Summary</h3>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={clsx(
                'flex items-center justify-between',
                item.isTotal && 'pt-3 border-t border-border-subtle',
              )}
            >
              <div className="flex items-center gap-2 text-body-sm">
                {item.nights && (
                  <span className="flex items-center gap-1.5 text-text-muted">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {item.nights} night{item.nights > 1 ? 's' : ''}
                  </span>
                )}
                <span className={clsx(
                  item.isTotal ? 'font-display font-medium text-charcoal' : 'text-text-secondary',
                  item.isDiscount && 'text-success',
                )}>
                  {item.label}
                </span>
              </div>
              <span className={clsx(
                'font-medium',
                item.isTotal ? 'font-display text-heading-sm text-charcoal' : 'text-body',
                item.isDiscount ? 'text-success' : 'text-charcoal',
              )}>
                {item.isDiscount ? '-' : ''}{formatAmount(item.amount)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-border-subtle space-y-2 text-body-sm text-text-muted">
          {checkIn && checkOut && (
            <p className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
              {new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          )}
          {guests && (
            <p className="flex items-center gap-1.5">
              <Users className="h-4 w-4" aria-hidden="true" />
              {guests} Guest{guests > 1 ? 's' : ''}
            </p>
          )}
          {rooms && rooms > 1 && (
            <p className="flex items-center gap-1.5">
              <Users className="h-4 w-4" aria-hidden="true" />
              {rooms} Rooms
            </p>
          )}
        </div>

        <p className="mt-4 text-center text-caption text-text-muted">
          Taxes and fees included. No hidden charges.
        </p>
      </div>
    )
  }

  return (
    <div className={clsx('bg-white border border-border-subtle rounded-xl p-6 lg:p-8', className)}>
      <h3 className="font-display text-heading-sm font-medium text-charcoal mb-6">Price Details</h3>

      <dl className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx(
              'flex items-start justify-between gap-4',
              item.isTotal && 'pt-4 border-t border-border-subtle',
              item.isDiscount && 'text-success',
            )}
          >
            <dt className="flex-1 flex items-start gap-3 text-body">
              {item.nights && (
                <span className="flex items-center gap-1.5 text-text-muted shrink-0">
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                  <span className="text-body-sm">{item.nights} night{item.nights > 1 ? 's' : ''}</span>
                </span>
              )}
              <span className={clsx(
                item.isTotal ? 'font-display font-medium text-charcoal' : 'text-text-secondary',
              )}>
                {item.label}
              </span>
              {item.details && (
                <span className="text-body-sm text-text-muted ml-auto shrink-0">
                  {item.details}
                </span>
              )}
            </dt>
            <dd className={clsx(
              'font-medium shrink-0',
              item.isTotal ? 'font-display text-heading-sm text-charcoal' : 'text-body text-charcoal',
              item.isDiscount && 'text-success',
            )}>
              {item.isDiscount ? '-' : ''}{formatAmount(item.amount)}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 pt-6 border-t border-border-subtle space-y-3 text-body-sm text-text-muted">
        {checkIn && checkOut && (() => {
            const stayNights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
            return (
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium text-text-secondary">Stay:</span>{' '}
                {new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })} –{' '}
                {new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                ({stayNights} night{stayNights > 1 ? 's' : ''})
              </p>
            )
          })()}
        {guests && (
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium text-text-secondary">Guests:</span> {guests} Adult{guests > 1 ? 's' : ''}
          </p>
        )}
        {rooms && rooms > 1 && (
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium text-text-secondary">Rooms:</span> {rooms}
          </p>
        )}
        <p className="flex items-center gap-2 text-success">
          <Check className="h-4 w-4" aria-hidden="true" />
          Taxes and fees included. No hidden charges.
        </p>
      </div>
    </div>
  )
}
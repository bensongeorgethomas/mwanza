'use client'

import Link from 'next/link'
import { clsx } from 'clsx'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
  isCurrent?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  separator?: React.ReactNode
}

export function Breadcrumbs({ items, className = '', separator = <ChevronRight className="h-4 w-4" aria-hidden="true" /> }: BreadcrumbsProps) {
  return (
    <nav
      className={clsx('flex flex-wrap items-center gap-2 text-body-sm', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2" role="list">
        {items.map((item, index) => (
          <li key={item.href || item.label} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-text-muted flex-shrink-0" aria-hidden="true">
                {separator}
              </span>
            )}
            {item.isCurrent || index === items.length - 1 ? (
              <span
                className={clsx(
                  'font-medium',
                  item.isCurrent ? 'text-charcoal' : 'text-text-secondary',
                )}
                aria-current={item.isCurrent ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-text-secondary hover:text-charcoal transition-colors flex items-center gap-1.5"
              >
                {index === 0 && <Home className="h-4 w-4" aria-hidden="true" />}
                {item.label}
              </Link>
            ) : (
              <span className="text-text-secondary">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
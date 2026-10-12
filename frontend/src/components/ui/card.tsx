'use client'

import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { clsx } from 'clsx'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const variantStyles = {
  default: 'bg-white border border-border-subtle shadow-ambient',
  elevated: 'bg-white border border-border-subtle shadow-medium',
  outlined: 'bg-transparent border border-border-default shadow-none',
  interactive: 'bg-white border border-border-subtle shadow-ambient transition-all duration-300 ease-out hover:shadow-medium hover:-translate-y-0.5 hover:border-border-default',
}

const paddingStyles = {
  none: '',
  sm: 'p-4 sm:p-5',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-10',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', hover = false, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-xl overflow-hidden',
          variantStyles[variant],
          paddingStyles[padding],
          hover && variant === 'interactive' && 'cursor-pointer',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={clsx('mb-4', className)} {...props}>
      {children}
    </div>
  ),
)

CardHeader.displayName = 'CardHeader'

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, as: Component = 'h3', className = '', ...props }, ref) => (
    <Component
      ref={ref}
      className={clsx('font-display text-heading-md text-charcoal', className)}
      {...props}
    >
      {children}
    </Component>
  ),
)

CardTitle.displayName = 'CardTitle'

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className = '', ...props }, ref) => (
    <p ref={ref} className={clsx('mt-1 text-body-sm text-text-muted', className)} {...props}>
      {children}
    </p>
  ),
)

CardDescription.displayName = 'CardDescription'

export type CardContentProps = HTMLAttributes<HTMLDivElement>

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={clsx(className)} {...props}>
      {children}
    </div>
  ),
)

CardContent.displayName = 'CardContent'

export type CardFooterProps = HTMLAttributes<HTMLDivElement>

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('mt-4 pt-4 border-t border-border-subtle flex items-center gap-3', className)}
      {...props}
    >
      {children}
    </div>
  ),
)

CardFooter.displayName = 'CardFooter'

export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  aspect?: 'square' | 'portrait' | 'landscape' | 'cinematic' | 'golden'
}

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ src, alt, aspect = 'landscape', className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('relative overflow-hidden', `aspect-${aspect}`, className)}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        loading="lazy"
      />
    </div>
  ),
)

CardImage.displayName = 'CardImage'
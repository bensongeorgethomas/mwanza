'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { clsx } from 'clsx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'brass'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const baseStyles = `
  inline-flex items-center justify-center gap-2
  font-body font-semibold
  rounded-lg
  transition-all duration-200 ease-out
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory
  disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
  active:scale-[0.98]
`

const variantStyles = {
  primary: `
    bg-charcoal text-ivory
    hover:bg-charcoal-soft
    shadow-soft hover:shadow-medium
  `,
  secondary: `
    bg-limestone text-charcoal
    hover:bg-limestone-dark
    border border-border-default
    shadow-ambient hover:shadow-soft
  `,
  outline: `
    bg-transparent text-charcoal
    border-2 border-border-default
    hover:bg-limestone hover:border-charcoal/20
    shadow-none
  `,
  ghost: `
    bg-transparent text-charcoal
    hover:bg-limestone
    border border-transparent
    shadow-none
  `,
  brass: `
    bg-brass text-charcoal
    hover:bg-brass-dark
    shadow-soft hover:shadow-medium
    font-display
  `,
}

const sizeStyles = {
  sm: 'px-4 py-2 text-caption gap-1.5',
  md: 'px-6 py-3 text-body-sm gap-2',
  lg: 'px-8 py-4 text-body gap-2.5',
  xl: 'px-10 py-5 text-body-lg gap-3',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      'aria-busy': ariaBusy,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], fullWidth && 'w-full', className)}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'
'use client'

import { forwardRef, type SelectHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
  fullWidth?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder,
      fullWidth = true,
      className = '',
      id,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const errorId = error ? `${selectId}-error` : undefined
    const hintId = hint ? `${selectId}-hint` : undefined
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

    return (
      <div className={clsx('w-full', fullWidth && 'max-w-full', className)}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-body-sm font-medium text-charcoal mb-1.5"
          >
            {label}
            {required && (
              <span className="text-brass ml-0.5" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              'w-full bg-white border rounded-lg appearance-none',
              'text-charcoal',
              'transition-all duration-200 ease-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-limestone',
              'pl-4 pr-10 py-3',
              'text-body',
              error
                ? 'border-error focus-visible:ring-error/40'
                : 'border-border-default hover:border-border-strong',
            )}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            aria-required={required}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted"
            aria-hidden="true"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-body-sm text-error flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-body-sm text-text-muted">
            {hint}
          </p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'
'use client'

import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      fullWidth = true,
      className = '',
      id,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const errorId = error ? `${textareaId}-error` : undefined
    const hintId = hint ? `${textareaId}-hint` : undefined
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

    return (
      <div className={clsx('w-full', fullWidth && 'max-w-full', className)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-body-sm font-medium text-charcoal mb-1.5"
          >
            {label}
            {required && (
              <span className="text-brass ml-0.5" aria-hidden="true">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            'w-full bg-white border rounded-lg resize-y min-h-[100px]',
            'text-charcoal placeholder:text-text-muted',
            'transition-all duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-limestone',
            'p-4',
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
        />
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

Textarea.displayName = 'Textarea'
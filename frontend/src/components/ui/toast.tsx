'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

const typeStyles = {
  success: 'bg-success-bg border-success/20 text-success',
  error: 'bg-error-bg border-error/20 text-error',
  warning: 'bg-warning-bg border-warning/20 text-warning',
  info: 'bg-info-bg border-info/20 text-info',
}

const typeIcons = {
  success: <CheckCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
  error: <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
  warning: <AlertTriangle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
  info: <Info className="h-5 w-5 flex-shrink-0" aria-hidden="true" />,
}

interface ToastProps {
  toast: Toast
  onClose: (id: string) => void
}

export function ToastItem({ toast, onClose }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onClose(toast.id), 200)
    }, toast.duration ?? 5000)

    return () => clearTimeout(timer)
  }, [toast, onClose])

  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-4 rounded-lg border shadow-medium animate-slide-up',
        typeStyles[toast.type],
        isExiting && 'animate-fade-out pointer-events-none',
      )}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex-shrink-0 mt-0.5">{typeIcons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-body-sm">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-body-sm opacity-90">{toast.description}</p>
        )}
        {toast.action && (
          <button
            onClick={() => {
              const action = toast.action
              if (action) {
                action.onClick()
                onClose(toast.id)
              }
            }}
            className="mt-2 text-body-sm font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 p-1 rounded opacity-50 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-currentColor"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

interface ToasterProps {
  toasts: Toast[]
  onClose: (id: string) => void
}

export function Toaster({ toasts, onClose }: ToasterProps) {
  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm sm:max-w-md"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  )
}

export interface AlertProps {
  type: ToastType
  title: string
  description?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export function Alert({ type, title, description, dismissible = false, onDismiss, className = '' }: AlertProps) {
  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-4 rounded-lg border',
        typeStyles[type],
        className,
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5">{typeIcons[type]}</div>
      <div className="flex-1">
        <p className="font-semibold text-body-sm">{title}</p>
        {description && (
          <div className="mt-1 text-body-sm opacity-90">{description}</div>
        )}
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded opacity-50 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-currentColor"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
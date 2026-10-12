'use client'

import { useState, useCallback, useEffect } from 'react'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface GalleryImage {
  url: string
  alt: string
  caption?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  initialIndex?: number
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'cinematic' | 'golden'
  showThumbnails?: boolean
  allowFullscreen?: boolean
  className?: string
}

export function ImageGallery({
  images,
  initialIndex = 0,
  aspectRatio = 'landscape',
  showThumbnails = true,
  allowFullscreen = true,
  className = '',
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-portrait',
    landscape: 'aspect-landscape',
    cinematic: 'aspect-cinematic',
    golden: 'aspect-golden',
  }

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isFullscreen) return
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'Escape') setIsFullscreen(false)
    },
    [goToPrevious, goToNext, isFullscreen],
  )

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext()
      else goToPrevious()
    }
    setTouchStart(null)
  }

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isFullscreen, handleKeyDown])

  const currentImage = images[currentIndex]

  const renderMainImage = (img: GalleryImage, isFull: boolean) => (
    <div className={clsx('relative overflow-hidden rounded-xl', isFull ? 'rounded-none' : '', aspectRatioClasses[aspectRatio])}>
      <img
        src={img.url}
        alt={img.alt}
        className="w-full h-full object-cover transition-opacity duration-300"
        loading={currentIndex === initialIndex ? 'eager' : 'lazy'}
      />
      {img.caption && !isFull && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-ivory">
          <p className="text-body-sm">{img.caption}</p>
        </div>
      )}
    </div>
  )

  const mainContent = (
    <div
      className={clsx('relative', className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Image gallery"
      aria-roledescription="carousel"
    >
      {/* Main Image */}
      <div className="relative">
        {renderMainImage(currentImage, false)}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-charcoal shadow-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-charcoal shadow-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5" role="tablist" aria-label="Image indicators">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={clsx(
                    'w-2 h-2 rounded-full transition-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40',
                    i === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75',
                  )}
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
        {allowFullscreen && images.length > 1 && (
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-charcoal shadow-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40"
            aria-label="View fullscreen"
          >
            <Expand className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div
          className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          role="tablist"
          aria-label="Image thumbnails"
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={clsx(
                'relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 focus-visible:ring-offset-2',
                i === currentIndex
                  ? 'ring-2 ring-brass opacity-100'
                  : 'opacity-60 hover:opacity-100',
                aspectRatio === 'portrait' ? 'w-20 aspect-portrait' : 'w-24 aspect-landscape',
              )}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`View image ${i + 1}${img.caption ? `: ${img.caption}` : ''}`}
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )

  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label="Fullscreen image gallery"
      >
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40"
          aria-label="Close fullscreen"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          onClick={goToPrevious}
          className="absolute left-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 hidden sm:block"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" aria-hidden="true" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40 hidden sm:block"
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" aria-hidden="true" />
        </button>
        <div className="relative w-full h-full max-w-6xl max-h-[90vh] px-4">
          {renderMainImage(currentImage, true)}
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Image indicators">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={clsx(
                'w-2 h-2 rounded-full transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40',
                i === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75',
              )}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return mainContent
}
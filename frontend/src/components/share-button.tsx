'use client'

import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  title: string
  text: string
}

export default function ShareButton({ title, text }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: window.location.href,
        })
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-card px-4 py-3 text-sm font-semibold text-text-secondary transition-colors hover:border-primary/30 hover:text-primary"
    >
      <Share2 size={15} />
      Share this business
    </button>
  )
}

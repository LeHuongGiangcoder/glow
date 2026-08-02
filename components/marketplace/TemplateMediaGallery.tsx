'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { type Template } from '@/lib/templates'

/**
 * E-commerce product imagery viewer for template detail pages.
 * Integrates a prominent vertical hero stage, horizontal thumbnail selection strip,
 * and an immersive Lightbox overlay with keyboard navigation.
 */
export function TemplateMediaGallery({ template }: { template: Template }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const allImages = [
    template.coverImageUrl,
    ...(template.galleryUrls || []),
  ].filter((url): url is string => Boolean(url))

  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))
      }
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, allImages.length])

  if (allImages.length === 0) {
    return (
      <div
        className="aspect-4/5 w-full rounded-md"
        style={{ background: template.imageColor }}
      />
    )
  }

  const activeUrl = allImages[activeIndex] || allImages[0]

  return (
    <div className="flex flex-col gap-3.5">
      {/* Main Exhibition Stage */}
      <div
        className="group relative aspect-4/5 w-full cursor-pointer overflow-hidden rounded-md bg-sunken"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={activeUrl}
          alt={`${template.name} preview ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover transition-opacity duration-base ease-standard"
        />
        <span className="eyebrow absolute right-3.5 top-3.5 z-10 rounded-pill bg-paper-050/82 px-3 py-1.5 transition-opacity duration-fast ease-standard group-hover:opacity-100 md:opacity-0">
          Phóng to
        </span>
      </div>

      {/* Thumbnail Navigation Strip */}
      {allImages.length > 1 && (
        <div className="flex w-full gap-2.5 overflow-x-auto pb-2">
          {allImages.map((url, index) => {
            const isActive = activeIndex === index
            return (
              <button
                key={url}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'relative aspect-4/5 w-20 shrink-0 overflow-hidden rounded-sm transition-opacity duration-fast ease-standard md:w-24',
                  isActive
                    ? 'border-2 border-ink-900 opacity-100'
                    : 'border border-line-strong opacity-60 hover:opacity-100',
                )}
                aria-label={`Xem ảnh ${index + 1}`}
              >
                <Image
                  src={url}
                  alt={`${template.name} thumbnail ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>
      )}

      {/* Fullscreen Immersive Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-page/95 p-4 md:p-8"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh toàn màn hình"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="eyebrow absolute right-6 top-6 z-20 rounded-pill border border-ink-900 bg-page px-4 py-2 transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-fg-inverse"
          >
            Đóng (Esc)
          </button>

          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : allImages.length - 1,
                  )
                }}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-pill border border-line-strong bg-page p-3 text-fg transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-fg-inverse md:left-8"
                aria-label="Ảnh trước"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveIndex((prev) =>
                    prev < allImages.length - 1 ? prev + 1 : 0,
                  )
                }}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-pill border border-line-strong bg-page p-3 text-fg transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-fg-inverse md:right-8"
                aria-label="Ảnh tiếp theo"
              >
                →
              </button>
            </>
          )}

          <div
            className="relative h-full max-h-[85vh] w-full max-w-[90vw] md:max-w-[75vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeUrl}
              alt={`${template.name} full screen view`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {allImages.length > 1 && (
            <div className="eyebrow absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-pill bg-paper-100 px-4 py-2">
              {activeIndex + 1} / {allImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

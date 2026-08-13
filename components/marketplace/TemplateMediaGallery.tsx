'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n/client'
import { interpolate } from '@/lib/i18n/format'
import { type Template } from '@/lib/templates'

/**
 * E-commerce product imagery viewer for template detail pages.
 * Desktop follows the marketplace convention: a vertical thumbnail rail on the
 * left, the stage beside it with prev/next arrows, and an immersive lightbox on
 * click. Below 48rem the rail lies down into a horizontal strip under the stage,
 * where vertical space is the scarce axis.
 */
export function TemplateMediaGallery({ template }: { template: Template }) {
  const t = useT()
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Deduped: editors routinely upload the cover again as the gallery's first
  // frame, which otherwise costs a repeated slide, a repeated thumbnail, and a
  // duplicate React key — the URL is the identity here.
  const allImages = [
    ...new Set(
      [template.coverImageUrl, ...(template.galleryUrls || [])].filter(
        (url): url is string => Boolean(url),
      ),
    ),
  ]

  const count = allImages.length

  /**
   * Per-image alt text from Sanity, already resolved to the reader's locale by
   * the GROQ projection. Keyed by URL because `allImages` is deduped and
   * cover-first, so it no longer lines up with `galleryUrls` by index. Falls
   * back to the template name where an editor left the alt empty.
   */
  const altByUrl = new Map<string, string>()
  ;(template.galleryUrls || []).forEach((url, i) => {
    const alt = template.galleryAlts?.[i]
    if (url && alt) altByUrl.set(url, alt)
  })
  const altFor = (url: string, index: number) =>
    altByUrl.get(url) ?? `${template.name} — ${index + 1}`

  const goPrev = useCallback(
    () => setActiveIndex((prev) => (prev > 0 ? prev - 1 : count - 1)),
    [count],
  )
  const goNext = useCallback(
    () => setActiveIndex((prev) => (prev < count - 1 ? prev + 1 : 0)),
    [count],
  )

  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, goPrev, goNext])

  if (count === 0) {
    return (
      <div className="gallery-xl min-w-0">
        <div
          className="phone-frame phone-frame-lg phone-frame-xl rounded-md"
          style={{ background: template.imageColor }}
        />
      </div>
    )
  }

  const activeUrl = allImages[activeIndex] || allImages[0]

  const thumbButton = (url: string, index: number) => (
    <button
      key={url}
      type="button"
      onClick={() => setActiveIndex(index)}
      className={cn(
        // Width comes from the container — the rail on desktop, a fixed-width
        // cell in the mobile strip — so one button serves both orientations.
        'phone-frame-thumb relative block w-full shrink-0 overflow-hidden rounded-sm transition-opacity duration-fast ease-standard',
        activeIndex === index
          ? 'border-2 border-ink-900 opacity-100'
          : 'border border-line-strong opacity-60 hover:opacity-100',
      )}
      aria-label={interpolate(t.templateDetail.gallery.thumb, {
        index: index + 1,
      })}
      aria-current={activeIndex === index}
    >
      <Image
        src={url}
        alt={altFor(url, index)}
        fill
        sizes="80px"
        className="object-cover object-top"
      />
    </button>
  )

  /**
   * Overlaid on the image at handset width, a column of its own from 48rem up —
   * `.gallery-nav` handles the switch, so one set of buttons serves both.
   */
  const navButton = (
    direction: 'prev' | 'next',
    onClick: (e: React.MouseEvent) => void,
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'gallery-nav flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-paper-050/82 font-body text-sm text-fg transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-fg-inverse md:bg-transparent md:border md:border-line-strong',
        direction === 'prev' ? 'gallery-nav-prev' : 'gallery-nav-next',
      )}
      aria-label={
        direction === 'prev'
          ? t.templateDetail.gallery.prev
          : t.templateDetail.gallery.next
      }
    >
      {direction === 'prev' ? '←' : '→'}
    </button>
  )

  return (
    <div className="w-full min-w-0">
      <div className="gallery-xl min-w-0">
        {/* Vertical rail — desktop only. Scrolls in place once the gallery
            outgrows the stage rather than pushing the stage down the page. */}
        {count > 1 && (
          <div className="phone-frame-rail hidden shrink-0 flex-col gap-2.5 md:flex">
            {allImages.map(thumbButton)}
          </div>
        )}

        <div className="gallery-stage-row min-w-0">
          {count > 1 &&
            navButton('prev', (e) => {
              e.stopPropagation()
              goPrev()
            })}

          {/* Main exhibition stage */}
          <div
            className="phone-frame phone-frame-lg phone-frame-xl group relative cursor-pointer overflow-hidden rounded-md bg-sunken"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={activeUrl}
              alt={altFor(activeUrl, activeIndex)}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover object-top transition-opacity duration-base ease-standard"
            />

            <span className="eyebrow absolute right-3.5 top-3.5 z-10 rounded-pill bg-paper-050/82 px-3 py-1.5 transition-opacity duration-fast ease-standard group-hover:opacity-100 md:opacity-0">
              {t.templateDetail.gallery.zoom}
            </span>

            {count > 1 && (
              <span className="eyebrow absolute bottom-3.5 left-1/2 z-10 -translate-x-1/2 rounded-pill bg-paper-050/82 px-3 py-1.5">
                {activeIndex + 1} / {count}
              </span>
            )}
          </div>

          {count > 1 &&
            navButton('next', (e) => {
              e.stopPropagation()
              goNext()
            })}
        </div>

        {/* Horizontal strip — the rail's mobile form. */}
        {count > 1 && (
          <div className="flex w-full gap-2.5 overflow-x-auto pb-2 md:hidden">
            {allImages.map((url, index) => (
              <div key={url} className="w-20 shrink-0">
                {thumbButton(url, index)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Immersive Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-page/95 p-4 md:p-8"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t.templateDetail.gallery.lightboxLabel}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="eyebrow absolute right-6 top-6 z-20 rounded-pill border border-ink-900 bg-page px-4 py-2 transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-fg-inverse"
          >
            {t.templateDetail.gallery.closeEsc}
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-pill border border-line-strong bg-page p-3 text-fg transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-fg-inverse md:left-8"
                aria-label={t.templateDetail.gallery.prev}
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-pill border border-line-strong bg-page p-3 text-fg transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-fg-inverse md:right-8"
                aria-label={t.templateDetail.gallery.next}
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
              alt={altFor(activeUrl, activeIndex)}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {count > 1 && (
            <div className="eyebrow absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-pill bg-paper-100 px-4 py-2">
              {activeIndex + 1} / {count}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { useT } from '@/lib/i18n/client'

/**
 * Shown once, over the calendar, to anyone arriving from a template's "Choose
 * this template". It sets the expectation the booking flow itself never states:
 * the call is where content is agreed and payment happens, and express costs
 * more. The calendar renders behind it, so dismissing it is a continuation
 * rather than a page change.
 */
export function BookingIntroDialog({ onDismiss }: { onDismiss: () => void }) {
  const t = useT()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', handleKeyDown)

    // The dialog owns the viewport while it is up; the calendar behind it must
    // not scroll away under the scrim.
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
    }
  }, [onDismiss])

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-page/95 p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-intro-title"
      onClick={onDismiss}
    >
      <div
        className="w-full max-w-[520px] rounded-md border border-line-strong bg-card p-7 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="eyebrow text-fg-muted">{t.booking.intro.eyebrow}</p>
        <h2 id="booking-intro-title" className="display-section mt-3">
          {t.booking.intro.title}
        </h2>

        <p className="lede mt-4">{t.booking.intro.body}</p>

        <ul className="point-list hairline-t mt-6 pt-6">
          {t.booking.intro.points.map(([keyword, rest]) => (
            <li key={keyword}>
              <span className="key">{keyword}</span> — {rest}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button
            type="button"
            variant="primary"
            size="md"
            autoFocus
            onClick={onDismiss}
          >
            {t.booking.intro.cta}
          </Button>
        </div>
      </div>
    </div>
  )
}

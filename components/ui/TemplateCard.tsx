'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { useLocale, useT } from '@/lib/i18n/client'
import { formatPrice } from '@/lib/i18n/format'
import { useMarket } from '@/lib/market/client'
import { type Template } from '@/lib/templates'

/**
 * Minimal stroke icon, 2px, no fill — the system's only icon convention.
 * A bolt: the express-order badge reduced to its one idea, because the card is
 * already carrying a name, a price and a cover it needs you to actually look at.
 */
function BoltIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z" />
    </svg>
  )
}

/**
 * Gallery card. Hover lifts 3px — no shadow, never a border colour change.
 * PRD F2 also calls for a hover video/GIF preview on desktop;
 * that arrives with real template media.
 */
export function TemplateCard({
  template,
  className,
}: {
  template: Template
  className?: string
}) {
  const t = useT()
  const locale = useLocale()
  // Both the price and the destination come from the market: a card on
  // /malaysia quotes ringgit and links to /malaysia/<slug>, so a visitor is
  // never handed a đồng price one click after seeing an RM one.
  const market = useMarket()

  return (
    <Link
      href={`${market.catalogPath}/${template.slug}`}
      className={cn(
        'phone-frame-stack group block rounded-md bg-card',
        'transition-transform duration-base ease-out',
        'hover:-translate-y-[3px]',
        className,
      )}
    >
      <div
        className="phone-frame relative overflow-hidden rounded-md"
        style={{ background: template.imageColor }}
      >
        {template.coverImageUrl && (
          <Image
            src={template.coverImageUrl}
            alt={template.name}
            fill
            sizes="(max-width: 768px) 100vw, 268px"
            className="object-cover object-top"
          />
        )}
        {template.expressAvailable && (
          <span
            // Translucent paper tint is the system's only use of transparency.
            className="absolute left-3.5 top-3.5 z-10 flex h-7 w-7 items-center justify-center rounded-pill bg-paper-050/82 text-fg"
            title={t.templates.card.expressTitle}
          >
            <BoltIcon />
            <span className="sr-only">{t.templates.card.express}</span>
          </span>
        )}
      </div>
      {/* Stacked, not a baseline row: names carry SEO keywords and run long, and
          a row let them wrap to five lines while shoving the price into its own
          orphaned column. One clamped line, price beneath — every card in the
          grid now ends at the same height. */}
      <div className="px-1 py-3.5">
        <p className="display-card truncate" title={template.name}>
          {template.name}
        </p>
        <p className="mt-1.5 font-body text-sm text-fg">
          {formatPrice(
            { vnd: template.priceVnd, myr: template.priceMyr },
            market.currency,
            locale,
          )}
        </p>
      </div>
    </Link>
  )
}

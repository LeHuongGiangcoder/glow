import Link from 'next/link'
import { cn } from '@/lib/cn'
import { formatVnd, type Template } from '@/lib/templates'

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
  return (
    <Link
      href={`/templates/${template.slug}`}
      className={cn(
        'group block overflow-hidden rounded-md bg-card',
        'transition-transform duration-base ease-out',
        'hover:-translate-y-[3px]',
        className,
      )}
    >
      <div
        className="relative aspect-4/5"
        style={{ background: template.imageColor }}
      >
        <span
          className="eyebrow absolute left-3.5 top-3.5 rounded-pill bg-paper-050/82 px-2.5 py-1"
          // Translucent paper tint is the system's only use of transparency.
        >
          {template.mood}
        </span>
        {template.expressAvailable && (
          <span className="eyebrow absolute bottom-3.5 left-3.5 rounded-pill bg-paper-050/82 px-2.5 py-1">
            Còn nhận hoả tốc
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3 px-4.5 py-4">
        <span className="display-card">{template.name}</span>
        <span className="font-body text-sm text-fg">
          {formatVnd(template.priceVnd)}
        </span>
      </div>
    </Link>
  )
}

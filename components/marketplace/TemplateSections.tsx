'use client'

import { useState } from 'react'
import { useT } from '@/lib/i18n/client'
import { interpolate } from '@/lib/i18n/format'
import { sectionLabel } from '@/lib/templates'

/** Past this, the pill row stops being scannable and starts being a wall. */
const VISIBLE_COUNT = 6

/**
 * The template's section list. Shows the first six and folds the rest behind
 * a toggle, so a template with fourteen sections does not push the price and
 * the CTA below the fold.
 *
 * `sections` holds the stored vocabulary keys, translated for display here —
 * see the note on `STYLE_TAGS` in `lib/templates.ts`.
 */
export function TemplateSections({ sections }: { sections: string[] }) {
  const t = useT()
  const [expanded, setExpanded] = useState(false)

  const hidden = sections.length - VISIBLE_COUNT
  const visible = expanded ? sections : sections.slice(0, VISIBLE_COUNT)

  return (
    <div>
      <p className="eyebrow text-fg-muted">{t.templateDetail.sectionsTitle}</p>
      <ul className="mt-3.5 flex list-none flex-wrap items-center gap-2.5 p-0">
        {visible.map((section) => (
          <li
            key={section}
            className="rounded-pill border border-line-strong px-3.5 py-[7px] font-body text-xs"
          >
            {sectionLabel(t, section)}
          </li>
        ))}

        {hidden > 0 && (
          <li>
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="font-body text-xs text-fg-muted underline underline-offset-4 transition-opacity duration-fast ease-standard hover:opacity-60"
              aria-expanded={expanded}
            >
              {expanded
                ? t.templateDetail.sectionsLess
                : interpolate(t.templateDetail.sectionsMore, { count: hidden })}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

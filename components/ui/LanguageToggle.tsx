'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

export type Lang = 'VI' | 'EN'

const segment =
  'rounded-pill px-[11px] py-[5px] transition-colors duration-fast ease-standard'

/**
 * Visual-only for now: it holds local state and does not route. PRD F11
 * (`/vi` | `/en` routing, Accept-Language detection, cookie persistence) is a
 * later phase — wire `onChange` to the locale router then.
 */
export function LanguageToggle({
  value,
  onChange,
  className,
}: {
  value?: Lang
  onChange?: (lang: Lang) => void
  className?: string
}) {
  const [internal, setInternal] = useState<Lang>('VI')
  const active = value ?? internal

  function toggle() {
    const next: Lang = active === 'VI' ? 'EN' : 'VI'
    setInternal(next)
    onChange?.(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Ngôn ngữ: ${active}. Đổi sang ${active === 'VI' ? 'English' : 'Tiếng Việt'}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border border-line-strong',
        'cursor-pointer bg-transparent px-1.5 py-[5px] font-body text-xs tracking-wide',
        className,
      )}
    >
      <span
        className={cn(
          segment,
          active === 'VI' ? 'bg-ink-900 text-fg-inverse' : 'text-fg-muted',
        )}
      >
        VI
      </span>
      <span
        className={cn(
          segment,
          active === 'EN' ? 'bg-ink-900 text-fg-inverse' : 'text-fg-muted',
        )}
      >
        EN
      </span>
    </button>
  )
}

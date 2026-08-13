'use client'

import { cn } from '@/lib/cn'
import { useLocale, useSetLocale, useT } from '@/lib/i18n/client'
import { LOCALE_LABEL, LOCALES, type Locale } from '@/lib/i18n/config'
import { interpolate } from '@/lib/i18n/format'

const segment =
  'rounded-pill px-2.5 py-[4px] md:px-[9px] md:py-[3px] md:text-[12px] transition-colors duration-fast ease-standard'

/**
 * Writes the locale cookie and refreshes, so the server re-renders every page
 * in the chosen language. Copy lives on the server, so nothing here has to know
 * what is being translated — see `lib/i18n/client.tsx`.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const active = useLocale()
  const setLocale = useSetLocale()
  const t = useT()

  const other: Locale = active === 'vi' ? 'en' : 'vi'

  return (
    <button
      type="button"
      onClick={() => setLocale(other)}
      aria-label={interpolate(t.nav.languageLabel, {
        current: LOCALE_LABEL[active],
        other: t.nav.languageNames[other],
      })}
      className={cn(
        'inline-flex items-center gap-1 md:gap-1 rounded-pill border border-line-strong',
        'cursor-pointer bg-transparent p-[3px] md:p-[2px] font-body text-[13px] tracking-wide',
        className,
      )}
    >
      {/* Rendered from LOCALES so the order is VI, EN exactly as configured. */}
      {[...LOCALES].reverse().map((locale) => (
        <span
          key={locale}
          className={cn(
            segment,
            locale === active ? 'bg-ink-900 text-fg-inverse' : 'text-fg-muted',
          )}
        >
          {LOCALE_LABEL[locale]}
        </span>
      ))}
    </button>
  )
}

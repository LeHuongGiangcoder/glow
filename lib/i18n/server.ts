// No `server-only` guard: `next/headers` already throws if this is reached from
// a client component, and the package is not a dependency here.
import { cookies } from 'next/headers'
import { en, type Dictionary } from './dictionaries/en'
import { vi } from './dictionaries/vi'
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from './config'

const dictionaries: Record<Locale, Dictionary> = { en, vi }

/**
 * The locale for this request, from the cookie the toggle writes.
 *
 * No `Accept-Language` negotiation on purpose: English is the stated default,
 * so a first-time visitor gets English regardless of what their browser asks
 * for, and only an explicit choice changes it.
 *
 * Reading a cookie opts the caller into dynamic rendering — which is why
 * `app/templates/[slug]` no longer prerenders. That is the cost of picking a
 * cookie over `/[lang]` routing.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies()
  const value = store.get(LOCALE_COOKIE)?.value
  return isLocale(value) ? value : DEFAULT_LOCALE
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

/** The pair almost every server component wants. */
export async function getI18n(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getLocale()
  return { locale, t: getDictionary(locale) }
}

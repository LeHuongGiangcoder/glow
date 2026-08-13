/**
 * Locale configuration, shared by the server resolver and the client provider.
 *
 * Kept free of `server-only` and of React so both halves can import it: the
 * cookie name in particular has to agree between the server that reads it and
 * the toggle that writes it.
 */

export const LOCALES = ['en', 'vi'] as const

export type Locale = (typeof LOCALES)[number]

/** PRD F11 originally made Vietnamese the default; the site now opens in English. */
export const DEFAULT_LOCALE: Locale = 'en'

/** Read on the server via `cookies()`, written on the client by the toggle. */
export const LOCALE_COOKIE = 'glow_locale'

/** A year: the choice should outlive the session that made it. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/** `<html lang>` and `Intl` tag for each locale. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: 'en',
  vi: 'vi',
}

/** OpenGraph `locale`, which wants the underscored form. */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  vi: 'vi_VN',
}

/** The label each segment of the VI | EN toggle shows. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: 'EN',
  vi: 'VI',
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

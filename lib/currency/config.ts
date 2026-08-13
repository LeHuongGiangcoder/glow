/**
 * Currency configuration, deliberately shaped like `lib/i18n/config.ts`: a
 * cookie the server reads and the client writes, a default, and a type guard.
 *
 * Currency is kept independent of locale. A Vietnamese speaker in Kuala Lumpur
 * should be able to read the site in VI and still see ringgit, so nothing here
 * consults `Locale` and nothing in i18n consults this.
 */

export const CURRENCIES = ['VND', 'MYR'] as const

export type Currency = (typeof CURRENCIES)[number]

/** Vietnam is the home market; every other currency is opt-in. */
export const DEFAULT_CURRENCY: Currency = 'VND'

/** Read on the server via `cookies()`, written by the market entry route. */
export const CURRENCY_COOKIE = 'glow_currency'

/** A year, matching the locale cookie: the choice outlives the session. */
export const CURRENCY_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export function isCurrency(value: unknown): value is Currency {
  return (
    typeof value === 'string' && (CURRENCIES as readonly string[]).includes(value)
  )
}

/**
 * Market entry points — the links handed to referral partners.
 * `/malaysia` sets MYR for the whole session; see `app/malaysia/route.ts`.
 *
 * One entry per market. Adding Singapore later is a line here plus a price
 * field in Sanity, not a sweep through components.
 */
export const MARKET_ENTRY: Record<string, Currency> = {
  malaysia: 'MYR',
}

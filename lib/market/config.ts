/**
 * Markets — the replacement for the currency cookie.
 *
 * A cookie made currency a property of the *visitor*: once someone landed on
 * /malaysia they carried ringgit back to the home page, and the same URL showed
 * two different prices to two people. Currency is now a property of the
 * *route*. `/templates` is đồng, `/malaysia` is ringgit, and neither can leak
 * into the other because nothing is stored between requests.
 *
 * That also makes the Malaysia pages shareable and indexable: a partner can
 * paste `gloweb.site/malaysia/<slug>` into a chat and the recipient sees RM,
 * which a cookie-scoped price could never guarantee.
 *
 * Currency stays independent of locale: a Vietnamese speaker in Kuala Lumpur
 * reads /malaysia in VI and still sees ringgit.
 */

export const CURRENCIES = ['VND', 'MYR'] as const

export type Currency = (typeof CURRENCIES)[number]

export type Market = {
  /** Which price field wins; see `formatPrice`. */
  currency: Currency
  /** Root of this market's catalogue — the base for every template link. */
  catalogPath: string
}

/** Vietnam is the home market: everything not under a market route uses it. */
export const VN_MARKET: Market = {
  currency: 'VND',
  catalogPath: '/templates',
}

/**
 * The link handed to Malaysian wedding planners. Adding Singapore later is
 * another entry here plus a price field in Sanity, not a sweep through
 * components.
 */
export const MY_MARKET: Market = {
  currency: 'MYR',
  catalogPath: '/malaysia',
}

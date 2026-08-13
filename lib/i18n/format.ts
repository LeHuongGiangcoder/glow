/**
 * Locale-aware formatting shared by both halves of the app. No React and no
 * `server-only`, so a server page and a client component format a price the
 * same way and hydration does not disagree.
 */

import type { Currency } from '../currency/config'
import type { Locale } from './config'

/**
 * Fill `{name}` placeholders in a dictionary string.
 *
 *   interpolate(t.templateDetail.sectionsMore, { count: 3 }) // "Show 3 more"
 *
 * Deliberately dumb: no pluralisation rules, because Vietnamese has none and
 * the English strings that vary are written to read correctly at any count.
 */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}

/**
 * PRD F9: state clearly whether VAT is included. The amount is in đồng in both
 * locales — only the digit grouping follows the reader.
 */
export function formatVnd(amount: number, locale: Locale = 'en') {
  return `${amount.toLocaleString(locale === 'vi' ? 'vi-VN' : 'en-US')} ₫`
}

/** Ringgit is always grouped the Latin way, whichever language is showing. */
export function formatMyr(amount: number) {
  return `RM ${amount.toLocaleString('en-MY')}`
}

/**
 * Render a template's price in the requested currency.
 *
 * Ringgit is a price the user typed into Sanity, not a conversion of the đồng
 * figure — a foreign market is priced against its own market, and burying a
 * multiplier in code would make the number impossible to audit later.
 *
 * Falls back to đồng whenever a template has no ringgit price, so a document
 * that has not been priced for Malaysia yet shows a real number instead of an
 * empty or invented one.
 */
export function formatPrice(
  price: { vnd: number; myr?: number },
  currency: Currency,
  locale: Locale = 'en',
) {
  if (currency === 'MYR' && typeof price.myr === 'number') {
    return formatMyr(price.myr)
  }
  return formatVnd(price.vnd, locale)
}

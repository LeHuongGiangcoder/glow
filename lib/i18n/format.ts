/**
 * Locale-aware formatting shared by both halves of the app. No React and no
 * `server-only`, so a server page and a client component format a price the
 * same way and hydration does not disagree.
 */

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

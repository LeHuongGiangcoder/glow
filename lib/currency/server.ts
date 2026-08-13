// Mirrors `lib/i18n/server.ts`: no `server-only` guard needed, because
// `next/headers` already throws if a client component reaches this.
import { cookies } from 'next/headers'
import { CURRENCY_COOKIE, DEFAULT_CURRENCY, isCurrency, type Currency } from './config'

/**
 * The currency for this request, from the cookie a market entry route writes.
 *
 * No geo-detection: during the Malaysia test the only way to get ringgit is to
 * arrive through `/malaysia`, which makes the referral traffic unambiguous —
 * anyone seeing MYR came from a partner link.
 *
 * Like the locale cookie, reading this opts the caller into dynamic rendering.
 * Every page that shows a price already reads the locale cookie, so this costs
 * nothing that was not already being paid.
 */
export async function getCurrency(): Promise<Currency> {
  const store = await cookies()
  const value = store.get(CURRENCY_COOKIE)?.value
  return isCurrency(value) ? value : DEFAULT_CURRENCY
}

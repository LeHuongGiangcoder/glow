import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  CURRENCY_COOKIE,
  CURRENCY_COOKIE_MAX_AGE,
  MARKET_ENTRY,
} from '@/lib/currency/config'

/**
 * The link handed to Malaysian wedding planners: gloweb.site/malaysia.
 *
 * A route handler rather than a page, because setting a cookie is only allowed
 * in a Server Function or a Route Handler — and because the market entry is not
 * a destination. It stamps the currency and drops the visitor into the gallery,
 * so every page they see afterwards (cards, template detail) is already in
 * ringgit. A standalone /malaysia page would show ringgit once and then hand
 * them a đồng price the moment they clicked a template.
 */
export async function GET() {
  const store = await cookies()

  store.set(CURRENCY_COOKIE, MARKET_ENTRY.malaysia, {
    path: '/',
    maxAge: CURRENCY_COOKIE_MAX_AGE,
    sameSite: 'lax',
  })

  redirect('/templates')
}

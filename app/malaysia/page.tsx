import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { TemplateGallery } from '@/components/marketplace/TemplateGallery'
import { getI18n } from '@/lib/i18n/server'
import { MarketProvider } from '@/lib/market/client'
import { MY_MARKET } from '@/lib/market/config'
import { getTemplates } from '@/lib/templates'

/**
 * gloweb.site/malaysia — the link handed to Malaysian wedding planners.
 *
 * A page now, not the cookie-setting redirect it used to be. The old version
 * stamped ringgit on the visitor and dropped them at /templates, which meant
 * the home page and the Vietnamese catalogue changed currency behind their
 * back. Ringgit is scoped to this route and the detail pages beneath it, so
 * everything outside `/malaysia` stays đồng no matter where a visitor came
 * from — and this URL can be shared and indexed as itself.
 */

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    title: t.meta.malaysia.title,
    description: t.meta.malaysia.description,
  }
}

export default async function MalaysiaPage() {
  const { locale, t } = await getI18n()
  const templates = await getTemplates(locale)

  return (
    <MarketProvider market={MY_MARKET}>
      <NavBar market={MY_MARKET} />

      <main className="flex-1 screen-transition">
        <section className="container-max section-y">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.malaysia.eyebrow}</p>
              <h1 className="display-hero mt-4">{t.malaysia.title}</h1>
            </div>
            <p className="lede">{t.malaysia.lede}</p>
          </div>

          {/* Three reassurances rather than a second paragraph: a planner
              forwards this link, so the answers a Malaysian couple asks first
              have to survive being skimmed. */}
          <dl className="hairline-t mt-12 grid grid-cols-1 gap-8 pt-9 sm:grid-cols-3">
            {t.malaysia.points.map((point) => (
              <div key={point.label}>
                <dt className="eyebrow text-fg-muted">{point.label}</dt>
                <dd className="lede mt-3 text-sm">{point.body}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14">
            <TemplateGallery templates={templates} />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-md bg-sunken px-8 py-10 md:px-12">
            <div className="max-w-[42ch]">
              <h2 className="display-card">{t.malaysia.bannerTitle}</h2>
              <p className="lede mt-2">{t.malaysia.bannerBody}</p>
            </div>
            <Button href="/book" variant="primary" size="md">
              {t.common.bookFifteen}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </MarketProvider>
  )
}

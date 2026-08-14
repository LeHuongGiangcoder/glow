import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { Hero } from '@/components/marketing/Hero'
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
        {/* The same opening as the home page — a planner forwards this link,
            and the promise a Malaysian couple lands on is the same one. Only
            the market wrapper around it differs, so prices read in ringgit. */}
        <Hero market={MY_MARKET} />

        <section className="container-max section-y">
          <TemplateGallery templates={templates} />

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

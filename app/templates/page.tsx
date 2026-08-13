import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { TemplateGallery } from '@/components/marketplace/TemplateGallery'
import { getI18n } from '@/lib/i18n/server'
import { getTemplates } from '@/lib/templates'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    title: t.meta.templates.title,
    description: t.meta.templates.description,
  }
}

export default async function TemplatesPage() {
  const { locale, t } = await getI18n()
  const templates = await getTemplates(locale)

  return (
    <>
      <NavBar />

      <main className="flex-1 screen-transition">
        <section className="container-max section-y">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.templates.eyebrow}</p>
              <h1 className="display-hero mt-4">{t.templates.title}</h1>
            </div>
            <p className="lede">{t.templates.lede}</p>
          </div>

          <div className="mt-12">
            <TemplateGallery templates={templates} />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-md bg-sunken px-8 py-10 md:px-12">
            <div className="max-w-[42ch]">
              <h2 className="display-card">{t.templates.bannerTitle}</h2>
              <p className="lede mt-2">{t.templates.bannerBody}</p>
            </div>
            <Button href="/bespoke" variant="secondary" size="md">
              {t.common.viewBespoke}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

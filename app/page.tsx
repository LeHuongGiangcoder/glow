import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { Hero } from '@/components/marketing/Hero'
import { ProcessSteps } from '@/components/marketing/ProcessSteps'
import { TemplateGallery } from '@/components/marketplace/TemplateGallery'
import { getI18n } from '@/lib/i18n/server'
import { getTemplates } from '@/lib/templates'

export default async function HomePage() {
  const { locale, t } = await getI18n()
  const templates = await getTemplates(locale)

  return (
    <>
      <NavBar />

      <main className="flex-1 screen-transition">
        <section>
          <Hero />

          {/* Value props sit inside the hero — three lines, no section of
              their own, so the process below stays one scroll away. */}
          <div className="col-rules container-max hairline-t grid grid-cols-1 gap-8 py-12 md:grid-cols-3 md:gap-6">
            {t.home.valueProps.map((prop, i) => (
              <div key={prop.title}>
                <p className="index-numeral">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="display-card mt-3.5">{prop.title}</h2>
                <ul className="point-list mt-4">
                  {prop.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Process — four steps in one row on a laptop, so the whole thing is
            scannable in a single view, arrows tracing 01 → 04. Each step shows
            the screen the couple actually sees at that point. */}
        <section className="container-max hairline-t section-y">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.home.process.eyebrow}</p>
              <h2 className="display-section mt-4">{t.home.process.title}</h2>
            </div>
          </div>

          <div className="mt-12">
            <ProcessSteps steps={t.process.steps} />
          </div>
        </section>

        {/* Gallery */}
        <section className="container-max hairline-t section-y">
          <div className="section-head mb-10">
            <div>
              <p className="eyebrow">{t.home.gallery.eyebrow}</p>
              <h2 className="display-section mt-4">{t.home.gallery.title}</h2>
            </div>
          </div>

          <TemplateGallery templates={templates} />

          {/* PRD F2 — closing banner into the bespoke branch */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-md bg-sunken px-8 py-10 md:px-12">
            <div className="max-w-[42ch]">
              <h3 className="display-card">{t.home.gallery.bannerTitle}</h3>
              <p className="lede mt-2">{t.home.gallery.bannerBody}</p>
            </div>
            <Button href="/bespoke" variant="secondary" size="md">
              {t.common.viewBespoke}
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-max hairline-t section-y">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-24">
                <p className="eyebrow">{t.home.faq.eyebrow}</p>
                <h2 className="display-section mt-4">{t.home.faq.title}</h2>
                <p className="lede mt-4 max-w-[38ch]">{t.home.faq.body}</p>
                <div className="mt-7">
                  <Button href="/book" variant="secondary" size="md">
                    {t.home.faq.cta}
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              {t.home.faq.groups.map((group, groupIndex) => (
                <div key={group.title} className="mt-12 first:mt-0">
                  <p className="eyebrow text-fg-muted">{group.title}</p>
                  <Accordion className="mt-4">
                    {group.items.map((item, i) => (
                      <AccordionItem
                        key={item.q}
                        question={item.q}
                        defaultOpen={groupIndex === 0 && i === 0}
                      >
                        {item.a}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

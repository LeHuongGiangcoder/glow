import Image from 'next/image'
import type { CSSProperties } from 'react'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { ProcessSteps } from '@/components/marketing/ProcessSteps'
import { TemplateGallery } from '@/components/marketplace/TemplateGallery'
import { cn } from '@/lib/cn'
import { getI18n } from '@/lib/i18n/server'
import { getTemplates } from '@/lib/templates'

/**
 * Layout-only data. Every string that a reader sees lives in the dictionaries;
 * what stays here is the geometry — which frame is tall, which survives on a
 * handset — because that does not change with the language. Alt text is matched
 * to these by index, from `home.hero.frameAlts` / `home.hero.stripAlts`.
 */

/** The three frames beside the headline. The tall one carries the hero. */
const heroFrames = [
  {
    src: '/hero/wed1.webp',
    /** Equal widths made three near-equal frames; the lead frame takes more so
        the cluster has a subject instead of three siblings. */
    shape: 'flex-[1] aspect-[4/5]',
    /** Only the lead frame survives on a handset. */
    handset: false,
  },
  {
    src: '/hero/wed4.webp',
    shape: 'flex-[1.5] aspect-[3/4]',
    handset: true,
  },
  {
    src: '/hero/wed7.webp',
    shape: 'flex-[1] aspect-[4/5]',
    handset: false,
  },
]

/** Contact sheet drifting under the hero. Order alternates close-ups with
    wider frames so no two similar crops sit next to each other. */
const heroStrip = [
  '/hero/wed13.webp',
  '/hero/wed3.webp',
  '/hero/wed16.webp',
  '/hero/wed8.webp',
  '/hero/wed5.webp',
  '/hero/wed12.webp',
  '/hero/wed14.webp',
  '/hero/wed11.webp',
  '/hero/wed6.webp',
  '/hero/wed15.webp',
  '/hero/wed17.webp',
  '/hero/wed9.webp',
]

export default async function HomePage() {
  const { locale, t } = await getI18n()
  const templates = await getTemplates(locale)

  return (
    <>
      <NavBar />

      <main className="flex-1 screen-transition">
        {/* Hero — text left, photographs right, bottoms aligned so the two
            frames stagger by their own proportions instead of a nudge. */}
        <section>
          <div className="container-max grid grid-cols-1 gap-12 pb-14 pt-12 md:pt-20 md:pb-16 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pt-[90px] lg:pb-20">
            <div className="rise-in lg:col-span-5">
              <p className="eyebrow">{t.home.hero.eyebrow}</p>
              <h1 className="display-hero mt-5">{t.home.hero.title}</h1>
              <ul className="point-list mt-6 max-w-[40ch]">
                {t.home.hero.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="/templates" variant="primary" size="lg">
                  {t.common.browseTemplates}
                </Button>
                <Button href="/book" variant="secondary" size="lg">
                  {t.common.bookFifteen}
                </Button>
              </div>
            </div>

            {/* One frame on a handset — three 100px frames are thumbnails, not
                photographs. The cluster returns from md up, bottoms aligned so
                the frames stagger by their own proportions. */}
            <figure
              className="rise-in m-0 lg:col-span-7"
              style={{ '--rise-delay': '120ms' } as CSSProperties}
            >
              <div className="flex items-end gap-4 md:gap-5">
                {heroFrames.map((frame, i) => (
                  <div
                    key={frame.src}
                    className={cn(
                      'photo rounded-md',
                      frame.shape,
                      !frame.handset && 'hidden md:block',
                    )}
                  >
                    <Image
                      src={frame.src}
                      alt={t.home.hero.frameAlts[i]}
                      fill
                      // All three are above the fold; only the tall one, which
                      // is also the handset's single frame, gets the LCP hint.
                      priority={frame.handset}
                      loading={frame.handset ? undefined : 'eager'}
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 30vw, 260px"
                    />
                  </div>
                ))}
              </div>
              <figcaption className="lede mt-4 text-xs italic">
                {t.home.hero.caption}
              </figcaption>
            </figure>
          </div>

          {/* Contact sheet — full-bleed, drifting slowly on a strip of film.
              Duplicated once so the loop has something to wrap onto; the copy
              is decorative. */}
          <div className="marquee film-strip">
            <div className="marquee-track">
              {[0, 1].map((copy) =>
                heroStrip.map((src, i) => (
                  <div
                    key={`${copy}-${src}`}
                    // Square-ish corners: film frames are cut, not rounded.
                    className="photo aspect-[4/5] w-[144px] rounded-sm md:w-[200px]"
                  >
                    <Image
                      src={src}
                      alt={copy === 0 ? t.home.hero.stripAlts[i] : ''}
                      aria-hidden={copy === 1}
                      fill
                      // The track never stops moving, so a lazy frame would
                      // drift into view still empty. They are ~200px wide.
                      loading="eager"
                      sizes="(max-width: 768px) 144px, 200px"
                    />
                  </div>
                )),
              )}
            </div>
          </div>

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

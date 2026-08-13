import Image from 'next/image'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { cn } from '@/lib/cn'
import { formatVnd } from '@/lib/i18n/format'
import { getI18n } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    title: t.meta.bespoke.title,
    description: t.meta.bespoke.description,
  }
}

/**
 * Everything on this page is the Glow Proposal deck. The package names and
 * their taglines stay English in both locales — they are the deck's own display
 * copy, the same way the landing page keeps "Creative entrance".
 *
 * Prices live here rather than in the dictionaries: a number is not copy, and
 * duplicating it per locale is how the two drift apart.
 */
const PACKAGE_PRICES = [1799000, 3499000]

/** The ink card: the higher tier, marked by its surface, not a badge. */
const FEATURED_PACKAGE = 1

/** Two frames, not the landing page's three: this page opens on a claim, so
    the photographs support it rather than carry it. Alt text is matched by
    index from `bespoke.hero.frameAlts`. */
const heroFrames = [
  {
    src: '/hero/wed16.webp',
    shape: 'flex-[1.4] aspect-[3/4]',
    handset: true,
  },
  {
    src: '/hero/wed10.webp',
    shape: 'flex-[1] aspect-[4/5]',
    handset: false,
  },
]

export default async function BespokePage() {
  const { locale, t } = await getI18n()

  return (
    <>
      <NavBar />

      <main className="flex-1 screen-transition">
        {/* Hero */}
        <section>
          <div className="container-max grid grid-cols-1 gap-12 pb-14 pt-10 md:pt-14 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-20">
            <div className="rise-in lg:col-span-6">
              <p className="eyebrow">{t.bespoke.hero.eyebrow}</p>
              <h1 className="display-hero mt-5">{t.bespoke.hero.title}</h1>
              <p className="lede mt-5 max-w-[46ch]">{t.bespoke.hero.lede}</p>
              <ul className="point-list mt-6 max-w-[42ch]">
                {t.bespoke.hero.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="/book?type=bespoke" variant="primary" size="lg">
                  {t.common.bookFifteen}
                </Button>
                <Button href="#packages" variant="secondary" size="lg">
                  {t.bespoke.hero.secondaryCta}
                </Button>
              </div>
            </div>

            <figure
              className="rise-in m-0 lg:col-span-6"
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
                      alt={t.bespoke.hero.frameAlts[i]}
                      fill
                      priority={frame.handset}
                      loading={frame.handset ? undefined : 'eager'}
                      sizes="(max-width: 768px) 90vw, 40vw"
                    />
                  </div>
                ))}
              </div>
              <figcaption className="lede mt-4 text-xs italic">
                {t.bespoke.hero.caption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Digital experience — the deck's opening argument, three columns
            separated by a rule in the gutter rather than three cards. */}
        <section className="container-max hairline-t section-y">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.bespoke.experience.eyebrow}</p>
              <h2 className="display-section mt-4">
                {t.bespoke.experience.title}
              </h2>
            </div>
          </div>

          <div className="col-rules mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {t.bespoke.experience.items.map((item, i) => (
              <div key={item.title}>
                <p className="index-numeral">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="display-card mt-3.5">{item.title}</h3>
                <ul className="point-list mt-4">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="pull-quote mt-14">{t.bespoke.experience.quote}</p>
        </section>

        {/* Packages */}
        <section id="packages" className="container-max hairline-t section-y">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.bespoke.packages.eyebrow}</p>
              <h2 className="display-section mt-4">
                {t.bespoke.packages.title}
              </h2>
            </div>
            <p className="lede">{t.bespoke.packages.lede}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {t.bespoke.packages.items.map((pkg, i) => {
              const feature = i === FEATURED_PACKAGE
              return (
                <article
                  key={pkg.name}
                  className={cn('price-card', feature && 'price-card-feature')}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="display-card">{pkg.name}</h3>
                    <p className="price-amount">
                      {formatVnd(PACKAGE_PRICES[i], locale)}
                    </p>
                  </div>
                  <p className="lede mt-3 italic">{pkg.tagline}</p>

                  <ul className="point-list mt-8">
                    {pkg.points.map(([keyword, rest]) => (
                      <li key={keyword}>
                        <span className="key">{keyword}</span> — {rest}
                      </li>
                    ))}
                  </ul>

                  {/* Pushed to the foot so the two cards line up on their rule
                      however many points each tier lists. */}
                  <div className="hairline-t mt-auto pt-6">
                    <p className="lede text-xs italic">{pkg.note}</p>
                    <div className="mt-6">
                      <Button
                        href="/book?type=bespoke"
                        variant={feature ? 'inverse' : 'primary'}
                        size="md"
                      >
                        {t.bespoke.packages.cta}
                      </Button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Flow */}
        <section className="container-max hairline-t section-y">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t.bespoke.flow.eyebrow}</p>
              <h2 className="display-section mt-4">{t.bespoke.flow.title}</h2>
            </div>
            <p className="lede">{t.bespoke.flow.lede}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {t.bespoke.flow.steps.map((step, i) => (
              <article key={step.title} className="step-card">
                <div className="step-card__head">
                  <span className="index-numeral">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="display-card">{step.title}</h3>
                </div>

                <ul className="point-list step-card__points">
                  {step.points.map(([keyword, rest]) => (
                    <li key={keyword}>
                      <span className="key">{keyword}</span> — {rest}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Reference works */}
        <section className="container-max hairline-t section-y">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-md bg-sunken px-8 py-10 md:px-12">
            <div className="max-w-[46ch]">
              <h2 className="display-card">{t.bespoke.reference.title}</h2>
              <p className="lede mt-2">{t.bespoke.reference.body}</p>
            </div>
            <Button href="/templates" variant="secondary" size="md">
              {t.bespoke.reference.cta}
            </Button>
          </div>
        </section>

        {/* Closing */}
        <section className="container-narrow hairline-t section-y text-center">
          <h2 className="display-section text-balance">
            {t.bespoke.closing.title}
          </h2>
          <p className="lede mt-5">{t.bespoke.closing.body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/book?type=bespoke" variant="primary" size="lg">
              {t.common.bookFifteen}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

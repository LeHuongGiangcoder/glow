import Image from 'next/image'
import type { CSSProperties } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { getI18n } from '@/lib/i18n/server'
import { VN_MARKET, type Market } from '@/lib/market/config'

/**
 * The hero shared by the home page and the Malaysia landing page. Both open on
 * the same promise, so they open on the same block — only the market wrapper
 * around them differs.
 *
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

export async function Hero({
  /** Same contract as `NavBar`: the CTA follows the route's catalogue, so the
      Malaysia hero cannot send a visitor into the đồng collection. */
  market = VN_MARKET,
}: {
  market?: Market
}) {
  const { t } = await getI18n()

  return (
    <>
      {/* Hero — text left, photographs right, bottoms aligned so the two
          frames stagger by their own proportions instead of a nudge. */}
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
            <Button href={market.catalogPath} variant="primary" size="lg">
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
    </>
  )
}

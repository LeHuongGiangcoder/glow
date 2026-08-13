import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { RelatedTemplates } from '@/components/marketplace/RelatedTemplates'
import { TemplateMediaGallery } from '@/components/marketplace/TemplateMediaGallery'
import { TemplateSections } from '@/components/marketplace/TemplateSections'
import { formatVnd, interpolate } from '@/lib/i18n/format'
import { getI18n } from '@/lib/i18n/server'
import { getTemplate, getTemplates } from '@/lib/templates'

/**
 * `generateStaticParams` is gone: the locale comes from a cookie, so every page
 * renders per-request anyway and prerendering the slugs would only produce a
 * shell that has to be thrown away. Move to `/[lang]` routing if these pages
 * ever need to be static again.
 */

export async function generateMetadata(
  props: PageProps<'/templates/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params
  const { locale, t } = await getI18n()
  const template = await getTemplate(slug, locale)
  if (!template) return {}

  return {
    title: interpolate(t.meta.templateDetail.title, { name: template.name }),
    description: template.description,
  }
}

export default async function TemplateDetailPage(
  props: PageProps<'/templates/[slug]'>,
) {
  const { slug } = await props.params
  const { locale, t } = await getI18n()
  const [template, templates] = await Promise.all([
    getTemplate(slug, locale),
    getTemplates(locale),
  ])
  if (!template) notFound()

  const bookHref = `/book?type=template&template=${template.slug}`
  const price = formatVnd(template.priceVnd, locale)

  return (
    <>
      <NavBar />

      <main className="flex-1 pb-28 lg:pb-0 screen-transition">
        <div className="container-max hairline-b py-7">
          <Link
            href="/templates"
            className="font-body text-sm text-fg-muted no-underline transition-opacity duration-fast ease-standard hover:opacity-60"
          >
            {t.templateDetail.back}
          </Link>
        </div>

        {/* 60/40: media carries the sale, the buying column stays a readable
            measure beside it. */}
        {/* `grid-rows-[auto_1fr]` + `items-start` matter: the buying column
            spans both rows, and without them the browser splits its height
            across the two, which stretched the card and left a 440px hole under
            the gallery. Row one now measures the gallery, row two absorbs the
            rest. */}
        <div className="container-max grid grid-cols-1 gap-10 py-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-14">
          <div className="w-full min-w-0 lg:col-start-1 lg:row-start-1">
            <TemplateMediaGallery template={template} />
          </div>

          {/* Spans both rows so the reassurance card below can sit directly
              under the gallery rather than under this column's full height. */}
          <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <p className="eyebrow">{t.templateDetail.eyebrow}</p>
            {/* Regular weight, not `.display-hero`: names here run long on
                purpose to carry search keywords. */}
            <h1 className="display-title mt-3">{template.name}</h1>

            {/* Sections sit directly under the name: they are what a buyer is
                actually comparing between templates, so they come before the
                price rather than after the fold. */}
            <div className="mt-6">
              <TemplateSections sections={template.sections} />
            </div>

            <p className="display-section mt-8">{price}</p>
            <p className="font-body text-xs text-fg-muted">
              {t.templateDetail.vatNote}
            </p>

            <div className="mt-7 hidden flex-wrap gap-3.5 lg:flex">
              <Button href={bookHref} variant="primary" size="lg">
                {t.templateDetail.choose}
              </Button>
              {template.demoUrl ? (
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-pill border border-ink-900 px-[34px] py-4 font-body text-base tracking-wide text-ink-900 no-underline transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-fg-inverse"
                >
                  {t.templateDetail.demo}
                </a>
              ) : null}
            </div>

            <p className="lede mt-5 hidden text-xs lg:block">
              {t.templateDetail.moreDistinct}{' '}
              <Link href="/bespoke" className="text-fg underline underline-offset-4">
                {t.common.viewBespoke}
              </Link>
            </p>

            {/* Delivery */}
            <dl className="hairline-t mt-10 grid grid-cols-2 gap-6 pt-7">
              <div>
                <dt className="eyebrow text-fg-muted">
                  {t.templateDetail.deliveryLabel}
                </dt>
                <dd className="mt-2 font-body text-sm">
                  {t.templateDetail.deliveryValue}
                  {template.expressAvailable && t.templateDetail.deliveryExpress}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-fg-muted">
                  {t.templateDetail.revisionsLabel}
                </dt>
                <dd className="mt-2 font-body text-sm">
                  {t.templateDetail.revisionsValue}
                </dd>
              </div>
            </dl>

            {/* Description last: it is the one block a buyer reads only after
                the name, the sections and the price have already sold them. */}
            <div className="hairline-t mt-8 pt-7">
              <p className="eyebrow text-fg-muted">
                {t.templateDetail.aboutTitle}
              </p>
              {/* `whitespace-pre-line` honours the newlines the editor typed in
                  Sanity's text field — HTML collapses them by default, which ran
                  every paragraph of a long description into one block. */}
              <p className="lede mt-3.5 max-w-[46ch] whitespace-pre-line">
                {template.description}
              </p>
            </div>
          </div>

          {/* Under the gallery on a laptop, last on a handset — placed by grid
              rather than by source order, so a marketing card never wedges
              itself between the preview and the price on a phone. */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <div className="rounded-md border border-line-strong p-6">
              <p className="display-card">
                {t.templateDetail.reassuranceTitle}
              </p>
              <p className="lede mt-3">{t.templateDetail.reassuranceBody}</p>
            </div>
          </div>
        </div>

        <RelatedTemplates current={template} templates={templates} />
      </main>

      {/* PRD F3: sticky CTA pinned to the bottom of the screen on mobile */}
      <div className="hairline-t fixed inset-x-0 bottom-0 z-10 bg-page px-6 py-4 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-body text-sm">{price}</p>
            <Link
              href="/bespoke"
              className="font-body text-xs text-fg-muted no-underline underline-offset-4 hover:underline"
            >
              {t.templateDetail.moreDistinctShort}
            </Link>
          </div>
          <Button href={bookHref} variant="primary" size="md">
            {t.templateDetail.choose}
          </Button>
        </div>
      </div>

      <Footer />
    </>
  )
}

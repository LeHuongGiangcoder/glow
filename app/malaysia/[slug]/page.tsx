import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TemplateDetail } from '@/components/marketplace/TemplateDetail'
import { interpolate } from '@/lib/i18n/format'
import { getI18n } from '@/lib/i18n/server'
import { MarketProvider } from '@/lib/market/client'
import { MY_MARKET } from '@/lib/market/config'
import { getTemplate, getTemplates } from '@/lib/templates'

/**
 * The Malaysian half of the template detail screen. Same slugs, same component
 * as `/templates/[slug]` — the only difference is the market, which quotes the
 * price in ringgit and keeps every link on the page inside `/malaysia`.
 */

export async function generateMetadata(
  props: PageProps<'/malaysia/[slug]'>,
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

export default async function MalaysiaTemplateDetailPage(
  props: PageProps<'/malaysia/[slug]'>,
) {
  const { slug } = await props.params
  const { locale } = await getI18n()
  const [template, templates] = await Promise.all([
    getTemplate(slug, locale),
    getTemplates(locale),
  ])
  if (!template) notFound()

  return (
    <MarketProvider market={MY_MARKET}>
      <TemplateDetail
        template={template}
        templates={templates}
        market={MY_MARKET}
      />
    </MarketProvider>
  )
}

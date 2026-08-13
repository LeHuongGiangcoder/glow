/**
 * Template catalogue management via Sanity CMS.
 *
 * Every fetch takes a locale, which the GROQ projection uses to flatten the
 * bilingual CMS fields into plain strings — see `sanity/lib/queries.ts`.
 */

import { client } from '@/sanity/lib/client'
import { templateBySlugQuery, templatesQuery } from '@/sanity/lib/queries'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

/**
 * The stored style vocabulary. These strings are keys, not display copy: the
 * filter compares them and `pickRelated` counts overlaps between them, so they
 * stay Vietnamese in Sanity in both locales. `styleTagLabel` turns one into
 * something a reader sees.
 */
export const STYLE_TAGS = [
  'Tất cả',
  'Tối giản',
  'Lãng mạn',
  'Hiện đại',
  'Cổ điển',
] as const

export type StyleTag = (typeof STYLE_TAGS)[number]

/** The "no filter" member of STYLE_TAGS. */
export const ALL_STYLES: StyleTag = 'Tất cả'

/** Display label for a stored style tag; unknown tags show as stored. */
export function styleTagLabel(t: Dictionary, tag: string) {
  return t.vocab.styleTags[tag] ?? tag
}

/** Display label for a stored section name; unknown sections show as stored. */
export function sectionLabel(t: Dictionary, section: string) {
  return t.vocab.sections[section] ?? section
}

/**
 * PRD F9: one price for every template during the testing phase, but the field
 * stays per-template so Sanity can diverge later. Placeholder amount — confirm
 * the real number before launch.
 */
export const TEMPLATE_PRICE_VND = 4_500_000

export type Template = {
  slug: string
  name: string
  styleTags: StyleTag[]
  priceVnd: number
  coverImageUrl?: string
  galleryUrls?: string[]
  /** Parallel to `galleryUrls`; entries may be null where no alt was written. */
  galleryAlts?: (string | null)[]
  /** Stand-in for coverImage until real screenshots land. */
  imageColor: string
  /** PRD F2: express availability — a bolt icon on the card, set in Sanity. */
  expressAvailable: boolean
  /** Already resolved to the requested locale by the GROQ projection. */
  description: string
  sections: string[]
  /** PRD F3: per-template inclusions, resolved to the requested locale. */
  includes: string[]
  demoUrl?: string
}

export async function getTemplates(locale: Locale): Promise<Template[]> {
  try {
    const data = await client.fetch(templatesQuery, { locale })
    return data || []
  } catch (error) {
    console.error('Failed to fetch templates from Sanity:', error)
    return []
  }
}

export async function getTemplate(
  slug: string,
  locale: Locale,
): Promise<Template | undefined> {
  try {
    const data = await client.fetch(templateBySlugQuery, { slug, locale })
    return data || undefined
  } catch (error) {
    console.error(`Failed to fetch template ${slug} from Sanity:`, error)
    return undefined
  }
}

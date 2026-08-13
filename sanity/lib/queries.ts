import { defineQuery } from 'next-sanity'

/**
 * Both queries take a `$locale` param ("en" | "vi") and flatten the bilingual
 * fields down to plain strings, so nothing downstream of the fetch has to know
 * the content model is per-locale.
 *
 * `select` rather than `field[$locale]`: GROQ has no dynamic attribute lookup,
 * so the branch is written out. Each branch coalesces preferred locale → other
 * locale → the bare field, and that last step is what keeps documents saved
 * before the schema became bilingual (where `description` is still a plain
 * string) rendering instead of going blank.
 */
const localeProjection = `
  "description": select(
    $locale == "vi" => coalesce(description.vi, description.en, description),
    coalesce(description.en, description.vi, description)
  ),
  "includes": select(
    $locale == "vi" => coalesce(includes.vi, includes.en, includes),
    coalesce(includes.en, includes.vi, includes)
  ),
  "galleryAlts": gallery[]{
    "alt": select(
      $locale == "vi" => coalesce(alt.vi, alt.en, alt),
      coalesce(alt.en, alt.vi, alt)
    )
  }.alt
`

const templateProjection = `
  "slug": slug.current,
  name,
  styleTags,
  priceVnd,
  priceMyr,
  "coverImageUrl": coverImage.asset->url,
  "galleryUrls": gallery[].asset->url,
  imageColor,
  expressAvailable,
  sections,
  demoUrl,
  ${localeProjection}
`

export const templatesQuery = defineQuery(`
  *[_type == "template"] | order(priceVnd asc, name asc) {
    ${templateProjection}
  }
`)

export const templateBySlugQuery = defineQuery(`
  *[_type == "template" && slug.current == $slug][0] {
    ${templateProjection}
  }
`)

import { defineQuery } from 'next-sanity'

export const templatesQuery = defineQuery(`
  *[_type == "template"] | order(priceVnd asc, name asc) {
    "slug": slug.current,
    name,
    mood,
    styleTags,
    priceVnd,
    "coverImageUrl": coverImage.asset->url,
    "galleryUrls": gallery[].asset->url,
    imageColor,
    expressAvailable,
    description,
    sections,
    includes,
    demoUrl
  }
`)

export const templateBySlugQuery = defineQuery(`
  *[_type == "template" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    mood,
    styleTags,
    priceVnd,
    "coverImageUrl": coverImage.asset->url,
    "galleryUrls": gallery[].asset->url,
    imageColor,
    expressAvailable,
    description,
    sections,
    includes,
    demoUrl
  }
`)

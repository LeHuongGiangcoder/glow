import { defineField, defineType } from 'sanity'

/**
 * Per-locale content objects.
 *
 * Only free-text fields use these. The closed vocabularies — `styleTags` and
 * `sections` — deliberately stay single-value: their stored strings are keys,
 * compared against each other by the style filter and by related-template
 * matching, so translating them in the CMS would break both. Those are
 * translated for display instead, in `lib/i18n/dictionaries/*` under `vocab`.
 *
 * Vietnamese is optional throughout: an English-only document still renders,
 * because the GROQ queries coalesce down to whichever locale exists.
 */

const LOCALE_FIELDS = [
  { name: 'en', title: 'English' },
  { name: 'vi', title: 'Tiếng Việt' },
] as const

export const localeStringType = defineType({
  name: 'localeString',
  title: 'Text (bilingual)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: LOCALE_FIELDS.map(({ name, title }) =>
    defineField({ name, title, type: 'string' }),
  ),
})

export const localeTextType = defineType({
  name: 'localeText',
  title: 'Long text (bilingual)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: LOCALE_FIELDS.map(({ name, title }) =>
    defineField({ name, title, type: 'text', rows: 5 }),
  ),
})

export const localeStringArrayType = defineType({
  name: 'localeStringArray',
  title: 'List (bilingual)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: LOCALE_FIELDS.map(({ name, title }) =>
    defineField({ name, title, type: 'array', of: [{ type: 'string' }] }),
  ),
})

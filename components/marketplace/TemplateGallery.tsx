'use client'

import { useMemo, useState } from 'react'
import { FilterBar } from '@/components/ui/FilterBar'
import { SearchBar } from '@/components/ui/SearchBar'
import { TemplateCard } from '@/components/ui/TemplateCard'
import { useT } from '@/lib/i18n/client'
import {
  ALL_STYLES,
  STYLE_TAGS,
  styleTagLabel,
  type StyleTag,
  type Template,
} from '@/lib/templates'

export function TemplateGallery({ templates }: { templates: Template[] }) {
  const t = useT()
  const [style, setStyle] = useState<StyleTag>(ALL_STYLES)
  const [query, setQuery] = useState('')

  // Chips carry the stored tag as their value and the translated string as
  // their label, so filtering keeps comparing keys rather than display copy.
  const options = useMemo(
    () =>
      STYLE_TAGS.map((tag) => ({ value: tag, label: styleTagLabel(t, tag) })),
    [t],
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return templates.filter((template) => {
      const matchesStyle =
        style === ALL_STYLES || template.styleTags.includes(style)
      // Style tags are no longer shown anywhere, but they still answer a typed
      // "romantic" — which is the whole reason the field survived. Both the
      // stored tag and its label are searched, so the query works in either
      // language whichever the reader is in.
      const matchesQuery =
        q === '' ||
        template.name.toLowerCase().includes(q) ||
        template.styleTags.some(
          (tag) =>
            tag.toLowerCase().includes(q) ||
            styleTagLabel(t, tag).toLowerCase().includes(q),
        )
      return matchesStyle && matchesQuery
    })
  }, [templates, style, query, t])

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-6">
        <FilterBar
          options={options}
          value={style}
          onChange={setStyle}
          label={t.templates.gallery.filterLabel}
        />
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={t.templates.gallery.searchPlaceholder}
          label={t.templates.gallery.searchLabel}
        />
      </div>

      {visible.length === 0 ? (
        <p className="lede py-16 text-center">{t.templates.gallery.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      )}
    </div>
  )
}

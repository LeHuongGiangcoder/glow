'use client'

import { useMemo, useState } from 'react'
import { FilterBar } from '@/components/ui/FilterBar'
import { SearchBar } from '@/components/ui/SearchBar'
import { TemplateCard } from '@/components/ui/TemplateCard'
import { STYLE_TAGS, type StyleTag, type Template } from '@/lib/templates'

export function TemplateGallery({ templates }: { templates: Template[] }) {
  const [style, setStyle] = useState<StyleTag>('Tất cả')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return templates.filter((t) => {
      const matchesStyle = style === 'Tất cả' || t.styleTags.includes(style)
      const matchesQuery =
        q === '' ||
        t.name.toLowerCase().includes(q) ||
        t.mood.toLowerCase().includes(q)
      return matchesStyle && matchesQuery
    })
  }, [templates, style, query])

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-6">
        <FilterBar options={STYLE_TAGS} value={style} onChange={setStyle} />
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {visible.length === 0 ? (
        <p className="lede py-16 text-center">
          Chưa có mẫu nào khớp. Thử bỏ bớt bộ lọc, hoặc xem thiết kế riêng.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      )}
    </div>
  )
}

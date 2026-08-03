import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TemplateCard } from '@/components/ui/TemplateCard'
import type { Template } from '@/lib/templates'

/** How many sibling templates sit next to the Bespoke card. */
const RELATED_COUNT = 3

/**
 * Templates closest to the one being viewed: most shared style tags first,
 * catalogue order as the tiebreak, then padded with the rest so the row is
 * never short.
 */
export function pickRelated(current: Template, all: Template[]) {
  return all
    .filter((t) => t.slug !== current.slug)
    .map((t, index) => ({
      template: t,
      shared: t.styleTags.filter((tag) => current.styleTags.includes(tag)).length,
      index,
    }))
    .sort((a, b) => b.shared - a.shared || a.index - b.index)
    .slice(0, RELATED_COUNT)
    .map((entry) => entry.template)
}

export function RelatedTemplates({
  current,
  templates,
}: {
  current: Template
  templates: Template[]
}) {
  const related = pickRelated(current, templates)

  return (
    <section className="hairline-t">
      <div className="container-max section-y">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="display-section">Có thể bạn cũng thích</h2>
          <Link
            href="/templates"
            className="font-body text-sm text-fg-muted no-underline transition-opacity duration-fast ease-standard hover:opacity-60"
          >
            Xem tất cả mẫu →
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}

          {/* Last cell of the row hands the undecided visitor over to Bespoke. */}
          <div className="flex flex-col justify-between rounded-md border border-line-strong p-6">
            <div>
              <p className="eyebrow text-fg-muted">Thiết kế riêng</p>
              <p className="display-card mt-3">Không mẫu nào đúng ý?</p>
              <p className="lede mt-3 text-xs">
                Glow Bespoke dựng website cưới từ đầu theo câu chuyện và bảng màu
                của riêng hai bạn.
              </p>
            </div>
            <div className="mt-7">
              <Button href="/bespoke" variant="secondary" size="md">
                Xem Bespoke
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import {
  formatVnd,
  getTemplate,
  getTemplates,
  TEMPLATE_ALWAYS_INCLUDED,
  TEMPLATE_NOT_INCLUDED,
} from '@/lib/templates'

export async function generateStaticParams() {
  const templates = await getTemplates()
  return templates.map((template) => ({ slug: template.slug }))
}

export async function generateMetadata(
  props: PageProps<'/templates/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params
  const template = await getTemplate(slug)
  if (!template) return {}

  return {
    title: `Mẫu ${template.name}`,
    description: template.description,
  }
}

export default async function TemplateDetailPage(
  props: PageProps<'/templates/[slug]'>,
) {
  const { slug } = await props.params
  const template = await getTemplate(slug)
  if (!template) notFound()

  const bookHref = `/book?type=template&template=${template.slug}`

  return (
    <>
      <NavBar />

      <main className="flex-1 pb-28 lg:pb-0">
        <div className="container-max hairline-b py-7">
          <Link
            href="/templates"
            className="font-body text-sm text-fg-muted no-underline transition-opacity duration-fast ease-standard hover:opacity-60"
          >
            ← Quay lại bộ sưu tập
          </Link>
        </div>

        <div className="container-max grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Preview. PRD F3 wants a device-preview iframe here — needs a real
              demo build before it can be embedded. */}
          <div
            className="aspect-4/5 rounded-md"
            style={{ background: template.imageColor }}
          />

          <div>
            <p className="eyebrow">{template.mood}</p>
            <h1 className="display-hero mt-3">{template.name}</h1>
            <p className="lede mt-5 max-w-[46ch]">{template.description}</p>

            <p className="display-section mt-8">{formatVnd(template.priceVnd)}</p>
            <p className="font-body text-xs text-fg-muted">
              Đã bao gồm VAT. Không cần thanh toán trước khi đặt lịch.
            </p>

            <div className="mt-7 hidden flex-wrap gap-3.5 lg:flex">
              <Button href={bookHref} variant="primary" size="lg">
                Chọn mẫu này
              </Button>
              <a
                href={template.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-pill border border-ink-900 px-[34px] py-4 font-body text-base tracking-wide text-ink-900 no-underline transition-colors duration-fast ease-standard hover:bg-ink-900 hover:text-fg-inverse"
              >
                Xem demo thật
              </a>
            </div>

            <p className="lede mt-5 hidden text-xs lg:block">
              Cần riêng biệt hơn?{' '}
              <Link href="/bespoke" className="text-fg underline underline-offset-4">
                Xem Bespoke
              </Link>
            </p>

            {/* Delivery */}
            <dl className="hairline-t mt-10 grid grid-cols-2 gap-6 pt-7">
              <div>
                <dt className="eyebrow text-fg-muted">Thời gian bàn giao</dt>
                <dd className="mt-2 font-body text-sm">
                  Trung bình 7–10 ngày
                  {template.expressAvailable && ', hoả tốc 1–3 ngày'}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-fg-muted">Số vòng sửa</dt>
                <dd className="mt-2 font-body text-sm">Không giới hạn</dd>
              </div>
            </dl>

            {/* Sections */}
            <div className="hairline-t mt-8 pt-7">
              <p className="eyebrow text-fg-muted">Các section có sẵn</p>
              <ul className="mt-3.5 flex list-none flex-wrap gap-2.5 p-0">
                {template.sections.map((section) => (
                  <li
                    key={section}
                    className="rounded-pill border border-line-strong px-3.5 py-[7px] font-body text-xs"
                  >
                    {section}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* What's included / not included — PRD F3 */}
        <section className="container-max hairline-t section-y">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="display-section">Bao gồm</h2>
              <ul className="mt-6 list-none space-y-3.5 p-0">
                {[...TEMPLATE_ALWAYS_INCLUDED, ...template.includes].map((item) => (
                  <li key={item} className="lede flex gap-3">
                    <span aria-hidden className="text-fg">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="display-section">Không bao gồm</h2>
              <ul className="mt-6 list-none space-y-3.5 p-0">
                {TEMPLATE_NOT_INCLUDED.map((item) => (
                  <li key={item} className="lede flex gap-3">
                    <span aria-hidden className="text-fg-muted">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* PRD F3: sticky CTA pinned to the bottom of the screen on mobile */}
      <div className="hairline-t fixed inset-x-0 bottom-0 z-10 bg-page px-6 py-4 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-body text-sm">{formatVnd(template.priceVnd)}</p>
            <Link
              href="/bespoke"
              className="font-body text-xs text-fg-muted no-underline underline-offset-4 hover:underline"
            >
              Cần riêng biệt hơn? Xem Bespoke
            </Link>
          </div>
          <Button href={bookHref} variant="primary" size="md">
            Chọn mẫu này
          </Button>
        </div>
      </div>

      <Footer />
    </>
  )
}

import type { Metadata } from 'next'
import { BookingFlow } from '@/components/booking/BookingFlow'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { todayIso } from '@/lib/booking'
import { getI18n } from '@/lib/i18n/server'
import { getTemplate } from '@/lib/templates'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    title: t.meta.book.title,
    description: t.meta.book.description,
    robots: { index: false },
  }
}

/** Availability depends on the current date, so this page is never prerendered. */
export const dynamic = 'force-dynamic'

export default async function BookingPage(props: PageProps<'/book'>) {
  const params = await props.searchParams
  const { locale } = await getI18n()
  const type = params.type === 'bespoke' ? 'bespoke' : 'template'
  const slug = typeof params.template === 'string' ? params.template : undefined
  const template = slug ? await getTemplate(slug, locale) : undefined

  return (
    <>
      <NavBar />

      <main className="flex-1 screen-transition">
        <BookingFlow
          today={todayIso()}
          type={type}
          templateSlug={template?.slug}
          templateName={template?.name}
          exitHref={template ? `/templates/${template.slug}` : '/'}
        />
      </main>

      <Footer />
    </>
  )
}

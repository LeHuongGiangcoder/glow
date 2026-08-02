import type { Metadata } from 'next'
import { BookingFlow } from '@/components/booking/BookingFlow'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { todayIso } from '@/lib/booking'
import { getTemplate } from '@/lib/templates'

export const metadata: Metadata = {
  title: 'Đặt lịch trò chuyện',
  description:
    'Đặt buổi Intro 15 phút qua Google Meet với hai người sẽ trực tiếp làm website cưới cho bạn.',
  robots: { index: false },
}

/** Availability depends on the current date, so this page is never prerendered. */
export const dynamic = 'force-dynamic'

export default async function BookingPage(props: PageProps<'/book'>) {
  const params = await props.searchParams
  const type = params.type === 'bespoke' ? 'bespoke' : 'template'
  const slug = typeof params.template === 'string' ? params.template : undefined
  const template = slug ? await getTemplate(slug) : undefined

  return (
    <>
      <NavBar />

      <BookingFlow
        today={todayIso()}
        type={type}
        templateSlug={template?.slug}
        templateName={template?.name}
        exitHref={template ? `/templates/${template.slug}` : '/'}
      />

      <Footer />
    </>
  )
}

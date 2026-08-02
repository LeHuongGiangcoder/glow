import type { Metadata } from 'next'
import { BookingRail, BookingShell } from '@/components/booking/BookingShell'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import {
  formatDateLong,
  formatSlotCompact,
  formatTimeRange,
  MEETING,
} from '@/lib/booking'
import { getTemplate } from '@/lib/templates'

export const metadata: Metadata = {
  title: 'Đã đặt lịch',
  robots: { index: false },
}

/** Minimal stroke checkmark — 2px, rounded caps, no fill. */
function CheckIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default async function BookingConfirmedPage(
  props: PageProps<'/book/confirmed'>,
) {
  const params = await props.searchParams
  const type = params.type === 'bespoke' ? 'bespoke' : 'template'
  const slug = typeof params.template === 'string' ? params.template : undefined
  const template = slug ? await getTemplate(slug) : undefined

  // The slot the flow just booked. PRD F8 will echo these back from the Apps
  // Script response instead of trusting the query string.
  const date = typeof params.date === 'string' ? params.date : undefined
  const time = typeof params.time === 'string' ? params.time : undefined
  const meetingTime =
    date && time ? `${formatDateLong(date)}, ${formatTimeRange(time)}` : undefined

  const railRows = [
    { label: 'Thời lượng', value: `${MEETING.durationMin} phút` },
    { label: 'Hình thức', value: MEETING.platform },
    { label: 'Múi giờ', value: MEETING.timezoneLabel },
    {
      label: type === 'bespoke' ? 'Nội dung' : 'Mẫu đã chọn',
      value: type === 'bespoke' ? 'Tư vấn Bespoke' : (template?.name ?? 'Mẫu có sẵn'),
    },
    {
      label: 'Đã chọn',
      value: date && time ? formatSlotCompact(date, time) : 'Glow sẽ xác nhận qua email',
    },
    { label: 'Thanh toán', value: 'Chưa cần' },
  ]

  return (
    <>
      <NavBar />

      <main className="flex-1 screen-transition">
        <BookingShell current={3}>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
          <BookingRail rows={railRows}>
            <p className="lede mt-5 text-sm">{MEETING.description}</p>
          </BookingRail>

          <div className="flex items-center justify-center px-6 py-16 md:px-10">
            <div className="max-w-[52ch] text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-pill bg-ink-900 text-fg-inverse">
                <CheckIcon />
              </div>

              <h1 className="display-section mt-7 text-balance">
                Đã giữ chỗ cho buổi trò chuyện.
              </h1>

              {meetingTime && <p className="eyebrow mt-5">{meetingTime}</p>}

              <p className="lede mx-auto mt-4 max-w-[44ch]">
                Glow đã nhận yêu cầu của bạn. Chúng tôi sẽ gửi email xác nhận kèm
                link Google Meet, và liên hệ lại trong vòng 12 giờ.
              </p>

              {/* PRD F8: the bespoke branch surfaces the Proposal one last time. */}
              {type === 'bespoke' && (
                <p className="field-hint mt-6">
                  Bạn có thể xem lại bản Proposal trước buổi meeting.
                </p>
              )}

              <div className="mt-9">
                <Button href="/" variant="primary" size="lg">
                  Về trang chủ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BookingShell>
      </main>

      <Footer />
    </>
  )
}

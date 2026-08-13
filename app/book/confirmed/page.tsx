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
import { interpolate } from '@/lib/i18n/format'
import { getI18n } from '@/lib/i18n/server'
import { getTemplate } from '@/lib/templates'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    title: t.meta.booked.title,
    robots: { index: false },
  }
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
  const { locale, t } = await getI18n()
  const type = params.type === 'bespoke' ? 'bespoke' : 'template'
  const slug = typeof params.template === 'string' ? params.template : undefined
  const template = slug ? await getTemplate(slug, locale) : undefined

  // The slot the flow just booked. PRD F8 will echo these back from the Apps
  // Script response instead of trusting the query string.
  const date = typeof params.date === 'string' ? params.date : undefined
  const time = typeof params.time === 'string' ? params.time : undefined
  const meetingTime =
    date && time ? `${formatDateLong(t, date)}, ${formatTimeRange(time)}` : undefined

  const railRows = [
    {
      label: t.booking.rail.duration,
      value: interpolate(t.booking.durationValue, {
        minutes: MEETING.durationMin,
      }),
    },
    { label: t.booking.rail.platform, value: MEETING.platform },
    { label: t.booking.rail.timezone, value: MEETING.timezoneLabel },
    {
      label: type === 'bespoke' ? t.booking.rail.topic : t.booking.rail.template,
      value:
        type === 'bespoke'
          ? t.booking.confirmed.bespokeTopic
          : (template?.name ?? t.booking.confirmed.fallbackTemplate),
    },
    {
      label: t.booking.rail.selected,
      value:
        date && time
          ? formatSlotCompact(t, date, time)
          : t.booking.confirmed.pendingSlot,
    },
    {
      label: t.booking.rail.payment,
      value: t.booking.confirmed.noPaymentYet,
    },
  ]

  return (
    <>
      <NavBar />

      <main className="flex-1 screen-transition">
        <BookingShell current={3}>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
          <BookingRail rows={railRows}>
            <p className="lede mt-5 text-sm">{t.booking.meetingDescription}</p>
          </BookingRail>

          <div className="flex items-center justify-center px-6 py-16 md:px-10">
            <div className="max-w-[52ch] text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-pill bg-ink-900 text-fg-inverse">
                <CheckIcon />
              </div>

              <h1 className="display-section mt-7 text-balance">
                {t.booking.confirmed.title}
              </h1>

              {meetingTime && <p className="eyebrow mt-5">{meetingTime}</p>}

              <p className="lede mx-auto mt-4 max-w-[44ch]">
                {t.booking.confirmed.body}
              </p>

              {/* PRD F8: the bespoke branch surfaces the Proposal one last time. */}
              {type === 'bespoke' && (
                <p className="field-hint mt-6">
                  {t.booking.confirmed.bespokeNote}
                </p>
              )}

              <div className="mt-9">
                <Button href="/" variant="primary" size="lg">
                  {t.common.backToHome}
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

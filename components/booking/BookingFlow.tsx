'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BookingIntroDialog } from '@/components/booking/BookingIntroDialog'
import { BookingRail, BookingShell } from '@/components/booking/BookingShell'
import {
  DetailsStep,
  EMPTY_DETAILS,
  validateDetails,
  type BookingDetails,
  type DetailsErrors,
} from '@/components/booking/DetailsStep'
import { DateTimeStep } from '@/components/booking/DateTimeStep'
import { Button } from '@/components/ui/Button'
import {
  formatDateLong,
  formatSlotCompact,
  formatTimeRange,
  MEETING,
} from '@/lib/booking'

export function BookingFlow({
  today,
  type,
  templateSlug,
  templateName,
  exitHref,
}: {
  /** Resolved on the server so both renders agree on which day is today. */
  today: string
  type: 'template' | 'bespoke'
  templateSlug?: string
  templateName?: string
  exitHref: string
}) {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  // Only the template route promises a finished site for a fixed price, so only
  // it owes the buyer the call-and-payment expectation up front. Bespoke has its
  // own quoting conversation.
  const [introOpen, setIntroOpen] = useState(type === 'template')
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [details, setDetails] = useState<BookingDetails>(EMPTY_DETAILS)
  const [errors, setErrors] = useState<DetailsErrors>({})
  const [pending, setPending] = useState(false)

  const railRows = [
    { label: 'Thời lượng', value: `${MEETING.durationMin} phút` },
    { label: 'Hình thức', value: MEETING.platform },
    { label: 'Múi giờ', value: MEETING.timezoneLabel },
    ...(templateName ? [{ label: 'Mẫu đã chọn', value: templateName }] : []),
    ...(date
      ? [
          {
            label: 'Đã chọn',
            value: formatSlotCompact(date, time),
            // Both steps already show the chosen slot in their own header.
            inSummary: false,
          },
        ]
      : []),
  ]

  async function handleSubmit() {
    const found = validateDetails(details)
    setErrors(found)
    if (Object.keys(found).length > 0 || !date || !time) return

    setPending(true)

    try {
      await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          templateSlug: templateSlug ?? '',
          templateName:
            templateName ?? (type === 'bespoke' ? 'Bespoke' : 'Mẫu có sẵn'),
          date,
          time,
          ...details,
        }),
      })
    } catch (e) {
      console.error('Lỗi khi gửi form booking:', e)
    } finally {
      setPending(false)
      const params = new URLSearchParams({ type, date, time })
      if (type === 'template' && templateSlug)
        params.set('template', templateSlug)
      router.push(`/book/confirmed?${params.toString()}`)
    }
  }

  return (
    <>
      {introOpen && (
        <BookingIntroDialog onDismiss={() => setIntroOpen(false)} />
      )}

      <BookingShell current={step} exitHref={exitHref}>
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">
          <BookingRail rows={railRows}>
            <p className="lede mt-5 text-sm">{MEETING.description}</p>
          </BookingRail>

          <div>
            {step === 1 ? (
              <>
                <DateTimeStep
                  today={today}
                  date={date}
                  time={time}
                  onSelectDate={(iso) => {
                    setDate(iso)
                    setTime(null)
                  }}
                  onSelectTime={setTime}
                />
                <div className="hairline-t flex flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-10">
                  <p className="field-hint">
                    {date && time
                      ? `${formatDateLong(date)}, ${formatTimeRange(time)}`
                      : 'Chọn ngày và giờ để đi tiếp.'}
                  </p>
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    disabled={!date || !time}
                    onClick={() => setStep(2)}
                  >
                    Tiếp tục
                  </Button>
                </div>
              </>
            ) : (
              date &&
              time && (
                <DetailsStep
                  date={date}
                  time={time}
                  details={details}
                  errors={errors}
                  pending={pending}
                  onChange={(patch) => {
                    setDetails((prev) => ({ ...prev, ...patch }))
                    // Clear a field's error as soon as it is touched again.
                    setErrors((prev) => {
                      const next = { ...prev }
                      for (const key of Object.keys(
                        patch,
                      ) as (keyof BookingDetails)[]) {
                        delete next[key]
                      }
                      return next
                    })
                  }}
                  onBack={() => setStep(1)}
                  onSubmit={handleSubmit}
                />
              )
            )}
          </div>
        </div>
      </BookingShell>
    </>
  )
}

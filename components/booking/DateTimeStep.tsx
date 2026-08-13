'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n/client'
import { interpolate } from '@/lib/i18n/format'
import {
  formatDateShort,
  formatTimeRange,
  isBookable,
  MEETING,
  monthGrid,
  monthLabel,
  monthOf,
  shiftMonth,
  slotsFor,
  toIso,
  weekdayHeadings,
  type MonthCursor,
} from '@/lib/booking'

/** Minimal stroke chevrons for month navigation — 2px, no fill. */
function Arrow({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points={direction === 'prev' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
    </svg>
  )
}

function MonthNavButton({
  direction,
  label,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next'
  label: string
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'flex size-9 cursor-pointer items-center justify-center rounded-pill border border-transparent',
        'text-fg transition-colors duration-fast ease-standard hover:bg-ink-900/6',
        'disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent',
      )}
    >
      <Arrow direction={direction} />
    </button>
  )
}

export function DateTimeStep({
  today,
  date,
  time,
  onSelectDate,
  onSelectTime,
}: {
  today: string
  date: string | null
  time: string | null
  onSelectDate: (iso: string) => void
  onSelectTime: (time: string) => void
}) {
  const t = useT()
  const [cursor, setCursor] = useState<MonthCursor>(() => monthOf(date ?? today))

  const cells = monthGrid(cursor)
  // Split into calendar rows so each week is its own `role="row"`.
  const weeks = Array.from({ length: Math.ceil(cells.length / 7) }, (_, i) =>
    cells.slice(i * 7, i * 7 + 7),
  )
  const slots = date ? slotsFor(date, today) : []
  // Never let the user page back past the month that contains today.
  const atFirstMonth =
    toIso(cursor.year, cursor.month, 1) <= toIso(monthOf(today).year, monthOf(today).month, 1)

  const currentMonth = monthLabel(t, cursor)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px]">
      {/* Calendar */}
      <div className="hairline-b px-6 py-8 md:px-10 lg:border-b-0 lg:border-r lg:border-line">
        <div className="flex items-center justify-between gap-4">
          <p className="display-card">{currentMonth}</p>
          <div className="flex items-center gap-1">
            <MonthNavButton
              direction="prev"
              label={t.booking.calendar.prevMonth}
              disabled={atFirstMonth}
              onClick={() => setCursor(shiftMonth(cursor, -1))}
            />
            <MonthNavButton
              direction="next"
              label={t.booking.calendar.nextMonth}
              onClick={() => setCursor(shiftMonth(cursor, 1))}
            />
          </div>
        </div>

        <div
          role="grid"
          aria-label={interpolate(t.booking.calendar.gridLabel, {
            month: currentMonth,
          })}
          // Capped so the day cells stay a comfortable square instead of
          // stretching into tall blocks on wide screens.
          className="mt-7 max-w-[520px]"
        >
          <div role="row" className="grid grid-cols-7 gap-1.5">
            {weekdayHeadings(t).map((day) => (
              <div
                key={day}
                role="columnheader"
                className="eyebrow pb-2 text-center text-fg-muted"
              >
                {day}
              </div>
            ))}
          </div>

          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} role="row" className="grid grid-cols-7 gap-1.5">
              {week.map((iso, index) => {
                if (!iso) return <div key={`pad-${index}`} role="gridcell" aria-hidden />

                const day = Number(iso.slice(-2))
                const open = isBookable(iso, today)
                const selected = iso === date

                return (
                  <div key={iso} role="gridcell" aria-selected={selected}>
                    <button
                      type="button"
                      disabled={!open}
                      onClick={() => onSelectDate(iso)}
                      className={cn(
                        'flex aspect-square w-full cursor-pointer items-center justify-center rounded-sm border',
                        'font-body text-sm transition-colors duration-fast ease-standard',
                        selected
                          ? 'border-ink-900 bg-ink-900 text-fg-inverse'
                          : 'border-transparent text-fg hover:border-line-strong',
                        !open &&
                          'cursor-not-allowed border-transparent text-line-strong hover:border-transparent',
                      )}
                    >
                      {day}
                    </button>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <p className="field-hint mt-7 italic">{t.booking.calendar.openDays}</p>
      </div>

      {/* Slots */}
      <div className="px-6 py-8 md:px-10 lg:px-6">
        {date ? (
          <>
            <p className="eyebrow">{formatDateShort(t, date)}</p>
            <ul className="mt-5 flex list-none flex-col gap-2.5 p-0">
              {slots.map((slot) => {
                const selected = slot === time
                return (
                  <li key={slot}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onSelectTime(slot)}
                      className={cn(
                        'w-full cursor-pointer rounded-sm border px-4 py-3.5',
                        'font-body text-sm tracking-wide',
                        'transition-colors duration-fast ease-standard',
                        selected
                          ? 'border-ink-900 bg-ink-900 text-fg-inverse'
                          : 'border-line-strong text-fg hover:bg-ink-900/6',
                      )}
                    >
                      {selected ? formatTimeRange(slot) : slot}
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <p className="field-hint">
            {interpolate(t.booking.calendar.pickDay, {
              minutes: MEETING.durationMin,
            })}
          </p>
        )}
      </div>
    </div>
  )
}

/**
 * Booking flow: meeting definition and date helpers.
 *
 * PLACEHOLDER AVAILABILITY — PRD F8 replaces `slotsFor` with the Apps Script /
 * Google Calendar free-busy response. The shape here (a list of "HH:mm" strings
 * for a given "YYYY-MM-DD") is exactly what that endpoint should return, so the
 * swap stays a data-source change rather than a rewrite.
 *
 * Dates are plain "YYYY-MM-DD" strings and every calculation runs in UTC, so a
 * server in one timezone and a browser in another always agree on which square
 * of the calendar is "today". The only place a real timezone appears is
 * `todayIso`, which asks explicitly for the Vietnam day.
 *
 * Everything a reader sees — weekday names, month names, the meeting blurb, the
 * question options — lives in the dictionaries. The formatters below take the
 * dictionary as their first argument rather than reaching for it themselves, so
 * this module stays importable from both a server page and a client component.
 */

import type { Dictionary } from '@/lib/i18n/dictionaries/en'

export const MEETING = {
  /** Display name comes from the dictionary; this is the stable key. */
  id: 'intro',
  /** First meeting is deliberately short. */
  durationMin: 15,
  platform: 'Google Meet',
  timezoneLabel: 'Asia / Ho Chi Minh',
  /** IANA zone used to resolve "today" consistently. */
  timezone: 'Asia/Ho_Chi_Minh',
} as const

/** PRD F8: intros are held Tuesday to Saturday. 1 = Mon … 6 = Sat, 0 = Sun. */
const OPEN_WEEKDAYS = [2, 3, 4, 5, 6]

/**
 * Placeholder slot grid. Meetings are 15 minutes but are offered on the half
 * hour so there is a buffer between calls.
 */
const MORNING = ['09:30', '10:00', '10:30', '11:00', '11:30']
const AFTERNOON = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

/**
 * The stable value stored for "Wedding Planner", which reveals the follow-up
 * asking which planner. Compared against the option `value`, never the label,
 * so the follow-up still appears in Vietnamese.
 */
export const REFERRAL_PLANNER = 'wedding-planner'

/** Monday-first, matching how Vietnamese calendars are printed. */
export function weekdayHeadings(t: Dictionary) {
  return t.booking.dates.weekdaysShort
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function toIso(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`
}

/** Today in Vietnam, regardless of where the server or the browser sits. */
export function todayIso(now: Date = new Date()) {
  // en-CA renders as YYYY-MM-DD, which is already the format we store.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: MEETING.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

function utcOf(iso: string) {
  return new Date(`${iso}T00:00:00Z`)
}

/** 0 = Monday … 6 = Sunday. */
function mondayIndex(iso: string) {
  return (utcOf(iso).getUTCDay() + 6) % 7
}

export function isOpenDay(iso: string) {
  return OPEN_WEEKDAYS.includes(utcOf(iso).getUTCDay())
}

/** Slots for a day; empty when the day is closed or already past. */
export function slotsFor(iso: string, today: string): string[] {
  if (iso < today || !isOpenDay(iso)) return []
  return [...MORNING, ...AFTERNOON]
}

export function isBookable(iso: string, today: string) {
  return slotsFor(iso, today).length > 0
}

export type MonthCursor = { year: number; month: number }

export function monthOf(iso: string): MonthCursor {
  const [year, month] = iso.split('-').map(Number)
  return { year, month: month - 1 }
}

export function shiftMonth({ year, month }: MonthCursor, by: number): MonthCursor {
  const total = year * 12 + month + by
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 }
}

/**
 * The month laid out as calendar rows: leading `null`s pad the first week so
 * the 1st lands under the right weekday heading.
 */
export function monthGrid({ year, month }: MonthCursor): (string | null)[] {
  const first = toIso(year, month, 1)
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  const lead = Array<string | null>(mondayIndex(first)).fill(null)
  const days = Array.from({ length: daysInMonth }, (_, i) => toIso(year, month, i + 1))
  return [...lead, ...days]
}

/** "August 2026" / "Tháng 8 2026" */
export function monthLabel(t: Dictionary, { year, month }: MonthCursor) {
  return `${t.booking.dates.months[month]} ${year}`
}

/** "Wednesday, 12 August 2026" / "Thứ Tư, 12 tháng 8 2026" */
export function formatDateLong(t: Dictionary, iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  const weekday = t.booking.dates.weekdaysLong[mondayIndex(iso)]
  return `${weekday}, ${day} ${monthWord(t, month)} ${year}`
}

/** "12 August, 11:00" — the rail is narrow, so it gets the short form. */
export function formatSlotCompact(t: Dictionary, iso: string, time?: string | null) {
  const [, month, day] = iso.split('-').map(Number)
  const date = `${day} ${monthWord(t, month)}`
  return time ? `${date}, ${time}` : date
}

/** "Wed 12" / "T4 12" — the compact form used above the slot column. */
export function formatDateShort(t: Dictionary, iso: string) {
  const [, , day] = iso.split('-').map(Number)
  return `${t.booking.dates.weekdaysShort[mondayIndex(iso)]} ${day}`
}

/**
 * The month inside a date. Vietnamese labels are already "Tháng 8", which reads
 * correctly mid-sentence; English ones are the bare month name.
 */
function monthWord(t: Dictionary, month: number) {
  return t.booking.dates.monthsInline[month - 1]
}

/** "11:00 — 11:15" from a start time and the meeting length. */
export function formatTimeRange(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  const end = hours * 60 + minutes + MEETING.durationMin
  return `${time} — ${pad(Math.floor(end / 60) % 24)}:${pad(end % 60)}`
}

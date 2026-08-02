/**
 * Booking flow: meeting definition, question options, and date helpers.
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
 */

export const MEETING = {
  /** Shown as the title of the left rail. */
  name: 'Intro',
  description: 'Buổi trò chuyện ngắn với hai người sẽ trực tiếp làm website cho bạn.',
  /** First meeting is deliberately short — 15 phút. */
  durationMin: 15,
  platform: 'Google Meet',
  timezoneLabel: 'Asia / Ho Chi Minh',
  /** IANA zone used to resolve "hôm nay" consistently. */
  timezone: 'Asia/Ho_Chi_Minh',
} as const

/** PRD F8: intros are held Tuesday to Saturday. 1 = Mon … 6 = Sat, 0 = Sun. */
const OPEN_WEEKDAYS = [2, 3, 4, 5, 6]

/**
 * Placeholder slot grid. Meetings are 15 phút but are offered on the half hour
 * so there is a buffer between calls.
 */
const MORNING = ['09:30', '10:00', '10:30', '11:00', '11:30']
const AFTERNOON = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

/** "Khi nào cần website ready" — coarse ranges, not an exact date. */
export const READY_WHEN_OPTIONS = [
  'Trong 1–2 tuần (cần hoả tốc)',
  'Trong vòng 1 tháng',
  '1–3 tháng nữa',
  'Hơn 3 tháng nữa',
  'Chưa chắc chắn',
] as const

/**
 * "Sao bạn biết đến Glow". Picking Wedding Planner reveals a follow-up asking
 * which planner, so referrals can be credited back.
 */
export const REFERRAL_OPTIONS = [
  'Google',
  'Facebook',
  'Instagram',
  'Wedding Planner',
  'Khác',
] as const

export const REFERRAL_PLANNER = 'Wedding Planner'

export type ReadyWhen = (typeof READY_WHEN_OPTIONS)[number]
export type ReferralSource = (typeof REFERRAL_OPTIONS)[number]

const VI_WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'] as const
const VI_WEEKDAYS_LONG = [
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
  'Chủ Nhật',
] as const

/** Monday-first, matching how Vietnamese calendars are printed. */
export const WEEKDAY_HEADINGS = VI_WEEKDAYS

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

export function monthLabel({ year, month }: MonthCursor) {
  return `Tháng ${month + 1} ${year}`
}

/** "Thứ Tư, 12 tháng 8 2026" */
export function formatDateLong(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return `${VI_WEEKDAYS_LONG[mondayIndex(iso)]}, ${day} tháng ${month} ${year}`
}

/** "12 tháng 8, 11:00" — the rail is narrow, so it gets the short form. */
export function formatSlotCompact(iso: string, time?: string | null) {
  const [, month, day] = iso.split('-').map(Number)
  const date = `${day} tháng ${month}`
  return time ? `${date}, ${time}` : date
}

/** "T4 12" — the compact form used above the slot column. */
export function formatDateShort(iso: string) {
  const [, , day] = iso.split('-').map(Number)
  return `${VI_WEEKDAYS[mondayIndex(iso)]} ${day}`
}

/** "11:00 — 11:15" from a start time and the meeting length. */
export function formatTimeRange(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  const end = hours * 60 + minutes + MEETING.durationMin
  return `${time} — ${pad(Math.floor(end / 60) % 24)}:${pad(end % 60)}`
}

import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const BOOKING_STEPS = ['Ngày & giờ', 'Thông tin', 'Xác nhận'] as const

/**
 * The frame shared by all three booking steps: numbered stepper, an escape
 * hatch, and a hairline-ruled panel. Steps 1–2 live in `BookingFlow`; step 3 is
 * the server-rendered confirmation page, which reuses this so the chrome does
 * not jump when the flow completes.
 */
export function BookingShell({
  current,
  exitHref = '/',
  children,
}: {
  /** 1-indexed step number. */
  current: 1 | 2 | 3
  exitHref?: string
  children: ReactNode
}) {
  return (
    <main className="flex-1 bg-sunken py-0 md:py-12">
      <div className="container-max">
        <div className="hairline-t hairline-b border-x border-line bg-card">
          <div className="hairline-b flex items-center justify-between gap-6 px-6 py-5 md:px-10">
            <ol className="flex list-none items-center gap-x-7 p-0">
              {BOOKING_STEPS.map((label, index) => {
                const step = index + 1
                const active = step === current
                return (
                  <li
                    key={label}
                    aria-current={active ? 'step' : undefined}
                    className={cn(
                      'eyebrow flex items-center gap-2.5 transition-opacity duration-base ease-standard',
                      active ? 'text-fg' : 'text-fg-muted',
                      // Narrow screens carry only the step you are on; the full
                      // ladder needs more width than Vietnamese labels allow.
                      !active && 'hidden md:flex',
                    )}
                  >
                    <span className={cn(!active && 'opacity-60')}>
                      ({String(step).padStart(2, '0')})
                    </span>
                    <span>{label}</span>
                  </li>
                )
              })}
            </ol>

            <Link
              href={exitHref}
              className="eyebrow text-fg-muted no-underline transition-opacity duration-fast ease-standard hover:opacity-60"
            >
              Đóng
            </Link>
          </div>

          {children}
        </div>
      </div>
    </main>
  )
}

/**
 * Left rail: what the meeting is, plus the facts that stay true across steps.
 * Becomes a plain stacked block above the content on narrow screens.
 */
export function BookingRail({
  rows,
  children,
}: {
  /**
   * `inSummary: false` keeps a row out of the one-line mobile summary — used
   * for facts the step itself already states, so they are not said twice.
   */
  rows: { label: string; value: ReactNode; inSummary?: boolean }[]
  children?: ReactNode
}) {
  return (
    <aside className="hairline-b flex flex-col gap-6 px-6 py-8 md:px-10 lg:h-full lg:gap-10 lg:border-b-0 lg:border-r lg:border-line">
      <div>
        <p className="eyebrow text-fg-muted">Glow Wedding</p>
        <p className="display-hero mt-2">Intro</p>
        {children}
      </div>

      {/* Narrow screens get the facts as one line so the rail does not push the
          calendar below the fold; the ruled list returns on the wide layout. */}
      <p className="field-hint lg:hidden">
        {rows
          .filter((row) => row.inSummary !== false && typeof row.value === 'string')
          .map((row) => row.value)
          .join(' · ')}
      </p>

      <dl className="mt-auto hidden list-none space-y-0 p-0 lg:block">
        {rows.map((row) => (
          <div
            key={row.label}
            className="hairline-b flex items-baseline justify-between gap-4 py-3.5 last:border-b-0"
          >
            <dt className="eyebrow shrink-0 whitespace-nowrap text-fg-muted">
              {row.label}
            </dt>
            <dd className="text-right font-body text-sm text-balance text-fg">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

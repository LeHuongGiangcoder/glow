'use client'

import { Button } from '@/components/ui/Button'
import { SelectField, TextField } from '@/components/ui/Field'
import { useT } from '@/lib/i18n/client'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'
import { formatDateLong, formatTimeRange, REFERRAL_PLANNER } from '@/lib/booking'

export type BookingDetails = {
  name: string
  phone: string
  email: string
  social: string
  /** Stable option values, not labels — see `booking.details.*Options`. */
  readyWhen: string
  referral: string
  referralPlanner: string
}

export const EMPTY_DETAILS: BookingDetails = {
  name: '',
  phone: '',
  email: '',
  social: '',
  readyWhen: '',
  referral: '',
  referralPlanner: '',
}

export type DetailsErrors = Partial<Record<keyof BookingDetails, string>>

/**
 * Server-side validation lands with the Apps Script endpoint (PRD F8); this is
 * the client half, so nobody loses a filled form to a typo'd email.
 *
 * Takes the dictionary rather than reaching for it, so it stays a plain
 * function the caller can also run outside a component.
 */
export function validateDetails(
  details: BookingDetails,
  t: Dictionary,
): DetailsErrors {
  const errors: DetailsErrors = {}
  const messages = t.booking.details.errors

  if (!details.name.trim()) errors.name = messages.name

  const phone = details.phone.replace(/[\s.-]/g, '')
  if (!phone) errors.phone = messages.phoneRequired
  else if (!/^\+?\d{9,12}$/.test(phone)) errors.phone = messages.phoneInvalid

  if (!details.email.trim()) errors.email = messages.emailRequired
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim()))
    errors.email = messages.emailInvalid

  if (!details.readyWhen) errors.readyWhen = messages.readyWhen
  if (!details.referral) errors.referral = messages.referral
  else if (details.referral === REFERRAL_PLANNER && !details.referralPlanner.trim())
    errors.referralPlanner = messages.referralPlanner

  return errors
}

export function DetailsStep({
  date,
  time,
  details,
  errors,
  pending,
  onChange,
  onBack,
  onSubmit,
}: {
  date: string
  time: string
  details: BookingDetails
  errors: DetailsErrors
  pending: boolean
  onChange: (patch: Partial<BookingDetails>) => void
  onBack: () => void
  onSubmit: () => void
}) {
  const t = useT()
  const copy = t.booking.details
  const showPlanner = details.referral === REFERRAL_PLANNER

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      className="px-6 py-8 md:px-10"
    >
      <button
        type="button"
        onClick={onBack}
        className="eyebrow flex cursor-pointer items-baseline gap-2.5 border-0 bg-transparent p-0 text-left text-fg transition-opacity duration-fast ease-standard hover:opacity-60"
      >
        <span aria-hidden>←</span>
        {formatDateLong(t, date)}, {formatTimeRange(time)}
      </button>

      <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
        <TextField
          label={copy.name}
          name="name"
          autoComplete="name"
          value={details.name}
          error={errors.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />

        <TextField
          label={copy.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
          value={details.email}
          error={errors.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />

        <TextField
          label={copy.phone}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={copy.phonePlaceholder}
          value={details.phone}
          error={errors.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />

        <TextField
          label={copy.social}
          name="social"
          optional
          placeholder={copy.socialPlaceholder}
          value={details.social}
          error={errors.social}
          onChange={(e) => onChange({ social: e.target.value })}
        />

        <SelectField
          label={copy.readyWhen}
          name="readyWhen"
          options={copy.readyWhenOptions}
          placeholder={copy.readyWhenPlaceholder}
          value={details.readyWhen}
          error={errors.readyWhen}
          onChange={(e) => onChange({ readyWhen: e.target.value })}
        />

        <SelectField
          label={copy.referral}
          name="referral"
          options={copy.referralOptions}
          placeholder={copy.referralPlaceholder}
          value={details.referral}
          error={errors.referral}
          onChange={(e) =>
            // Drop the planner name when the answer moves away from it, so a
            // stale value never rides along with the submission.
            onChange({
              referral: e.target.value,
              ...(e.target.value === REFERRAL_PLANNER ? {} : { referralPlanner: '' }),
            })
          }
        />

        {showPlanner && (
          <TextField
            label={copy.planner}
            name="referralPlanner"
            placeholder={copy.plannerPlaceholder}
            hint={copy.plannerHint}
            value={details.referralPlanner}
            error={errors.referralPlanner}
            onChange={(e) => onChange({ referralPlanner: e.target.value })}
          />
        )}
      </div>

      <div className="hairline-t mt-10 flex flex-wrap items-center justify-between gap-4 pt-7">
        <p className="field-hint max-w-[42ch]">{copy.noPayment}</p>
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? copy.submitting : copy.submit}
        </Button>
      </div>
    </form>
  )
}

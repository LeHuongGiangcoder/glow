'use client'

import { Button } from '@/components/ui/Button'
import { SelectField, TextField } from '@/components/ui/Field'
import {
  formatDateLong,
  formatTimeRange,
  READY_WHEN_OPTIONS,
  REFERRAL_OPTIONS,
  REFERRAL_PLANNER,
} from '@/lib/booking'

export type BookingDetails = {
  name: string
  phone: string
  email: string
  social: string
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
 */
export function validateDetails(details: BookingDetails): DetailsErrors {
  const errors: DetailsErrors = {}

  if (!details.name.trim()) errors.name = 'Cho Glow biết tên bạn nhé.'

  const phone = details.phone.replace(/[\s.-]/g, '')
  if (!phone) errors.phone = 'Cần số điện thoại để liên hệ khi lỡ hẹn.'
  else if (!/^\+?\d{9,12}$/.test(phone)) errors.phone = 'Số điện thoại chưa hợp lệ.'

  if (!details.email.trim()) errors.email = 'Cần email để gửi link Google Meet.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim()))
    errors.email = 'Email chưa hợp lệ.'

  if (!details.readyWhen) errors.readyWhen = 'Chọn mốc thời gian gần đúng cũng được.'
  if (!details.referral) errors.referral = 'Chọn một mục giúp Glow nhé.'
  else if (details.referral === REFERRAL_PLANNER && !details.referralPlanner.trim())
    errors.referralPlanner = 'Cho Glow biết tên Wedding Planner nhé.'

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
        {formatDateLong(date)}, {formatTimeRange(time)}
      </button>

      <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
        <TextField
          label="Tên bạn"
          name="name"
          autoComplete="name"
          value={details.name}
          error={errors.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="nơi Glow gửi lời mời họp"
          value={details.email}
          error={errors.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />

        <TextField
          label="Số điện thoại"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0901 234 567"
          value={details.phone}
          error={errors.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />

        <TextField
          label="Kênh liên hệ khác"
          name="social"
          optional
          placeholder="Instagram, Facebook, Zalo…"
          value={details.social}
          error={errors.social}
          onChange={(e) => onChange({ social: e.target.value })}
        />

        <SelectField
          label="Khi nào cần website ready"
          name="readyWhen"
          options={READY_WHEN_OPTIONS}
          placeholder="Chọn mốc thời gian"
          value={details.readyWhen}
          error={errors.readyWhen}
          onChange={(e) => onChange({ readyWhen: e.target.value })}
        />

        <SelectField
          label="Sao bạn biết đến Glow"
          name="referral"
          options={REFERRAL_OPTIONS}
          placeholder="Chọn một mục"
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
            label="Tên Wedding Planner"
            name="referralPlanner"
            placeholder="Tên planner hoặc studio"
            hint="Glow gửi lời cảm ơn tới nơi đã giới thiệu bạn."
            value={details.referralPlanner}
            error={errors.referralPlanner}
            onChange={(e) => onChange({ referralPlanner: e.target.value })}
          />
        )}
      </div>

      <div className="hairline-t mt-10 flex flex-wrap items-center justify-between gap-4 pt-7">
        <p className="field-hint max-w-[42ch]">
          Chưa cần thanh toán. Bạn có thể đổi hoặc huỷ lịch bất cứ lúc nào qua
          email xác nhận.
        </p>
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? 'Đang giữ chỗ…' : 'Đặt lịch'}
        </Button>
      </div>
    </form>
  )
}

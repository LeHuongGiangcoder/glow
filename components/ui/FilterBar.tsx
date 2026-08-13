'use client'

import { cn } from '@/lib/cn'

export function FilterChip({
  label,
  active = false,
  onClick,
}: {
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'cursor-pointer whitespace-nowrap rounded-pill border px-[18px] py-[9px]',
        'font-body text-xs tracking-wide',
        'transition-colors duration-fast ease-standard',
        active
          ? 'border-ink-900 bg-ink-900 text-fg-inverse'
          : 'border-line-strong bg-transparent text-fg hover:bg-ink-900/6',
      )}
    >
      {label}
    </button>
  )
}

/**
 * An option is either a bare string — value and label in one — or a
 * `{ value, label }` pair, for the case where the stored value is a key and the
 * label is translated. `label` (the group's accessible name) has no default:
 * it is copy, so the caller passes it from the dictionary.
 */
export type FilterOption<T extends string> = T | { value: T; label: string }

export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: readonly FilterOption<T>[]
  value: T
  onChange?: (value: T) => void
  label: string
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('flex flex-wrap gap-2.5', className)}
    >
      {options.map((opt) => {
        const optValue = typeof opt === 'string' ? opt : opt.value
        const optLabel = typeof opt === 'string' ? opt : opt.label
        return (
          <FilterChip
            key={optValue}
            label={optLabel}
            active={optValue === value}
            onClick={() => onChange?.(optValue)}
          />
        )
      })}
    </div>
  )
}

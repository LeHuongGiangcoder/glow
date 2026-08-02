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

export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  label = 'Lọc theo phong cách',
  className,
}: {
  options: readonly T[]
  value: T
  onChange?: (value: T) => void
  label?: string
  className?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('flex flex-wrap gap-2.5', className)}
    >
      {options.map((opt) => (
        <FilterChip
          key={opt}
          label={opt}
          active={opt === value}
          onClick={() => onChange?.(opt)}
        />
      ))}
    </div>
  )
}

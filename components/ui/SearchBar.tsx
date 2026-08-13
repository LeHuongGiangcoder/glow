'use client'

import { useId } from 'react'
import { cn } from '@/lib/cn'

/** Minimal stroke icon, 2px, no fill — the system's only icon convention. */
function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="shrink-0 text-fg-muted"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

/** `placeholder` and `label` are copy — the caller passes them from the dictionary. */
export function SearchBar({
  placeholder,
  label,
  value,
  onChange,
  className,
}: {
  placeholder: string
  label: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}) {
  const id = useId()

  return (
    <div
      className={cn(
        'flex w-full max-w-[480px] items-center gap-2.5 rounded-pill',
        'border border-line bg-card px-5 py-[13px]',
        'focus-within:border-line-strong transition-colors duration-fast ease-standard',
        className,
      )}
    >
      <SearchIcon />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 border-none bg-transparent font-body text-sm text-fg outline-none placeholder:text-fg-muted"
      />
    </div>
  )
}

'use client'

import type { ComponentProps, ReactNode } from 'react'
import { useId } from 'react'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n/client'

/**
 * Ruled-line form fields. The visual rules live in `globals.css`
 * (`.field-label`, `.field-control`, `.field-error`) so every surface that
 * grows a form inherits the same treatment — do not restyle inputs locally.
 */

function FieldFrame({
  id,
  label,
  optional,
  error,
  hint,
  className,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}) {
  const optionalLabel = useT().common.optional

  return (
    <div className={cn('w-full', className)}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && (
          <span className="ml-2 normal-case tracking-normal">
            {optionalLabel}
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error mt-2" aria-live="polite">
          {error}
        </p>
      ) : (
        hint && <p className="field-hint mt-2">{hint}</p>
      )}
    </div>
  )
}

type FieldProps = {
  label: string
  optional?: boolean
  error?: string
  hint?: string
  wrapperClassName?: string
}

export function TextField({
  label,
  optional,
  error,
  hint,
  wrapperClassName,
  className,
  ...rest
}: FieldProps & Omit<ComponentProps<'input'>, 'className'> & { className?: string }) {
  const id = useId()
  return (
    <FieldFrame
      id={id}
      label={label}
      optional={optional}
      error={error}
      hint={hint}
      className={wrapperClassName}
    >
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn('field-control mt-1', className)}
        {...rest}
      />
    </FieldFrame>
  )
}

export function TextAreaField({
  label,
  optional,
  error,
  hint,
  wrapperClassName,
  className,
  ...rest
}: FieldProps & Omit<ComponentProps<'textarea'>, 'className'> & { className?: string }) {
  const id = useId()
  return (
    <FieldFrame
      id={id}
      label={label}
      optional={optional}
      error={error}
      hint={hint}
      className={wrapperClassName}
    >
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn('field-control mt-1 resize-y', className)}
        {...rest}
      />
    </FieldFrame>
  )
}

/**
 * A select option is either a bare string — value and label in one — or a
 * `{ value, label }` pair, for the case where the submitted value is a stable
 * key and only the label is translated.
 */
export type SelectOption = string | { value: string; label: string }

/** Minimal stroke chevron, matching SearchBar's icon convention. */
function ChevronIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute right-1 bottom-4 text-fg-muted"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function SelectField({
  label,
  optional,
  error,
  hint,
  wrapperClassName,
  className,
  options,
  placeholder,
  ...rest
}: FieldProps & {
  options: readonly SelectOption[]
  placeholder?: string
  className?: string
} & Omit<ComponentProps<'select'>, 'className' | 'children'>) {
  const id = useId()
  return (
    <FieldFrame
      id={id}
      label={label}
      optional={optional}
      error={error}
      hint={hint}
      className={wrapperClassName}
    >
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'field-control mt-1 cursor-pointer appearance-none pr-8',
            // Unset selects read as placeholder text, like an empty input.
            rest.value === '' && 'text-line-strong italic',
            className,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            const value = typeof option === 'string' ? option : option.value
            const optionLabel =
              typeof option === 'string' ? option : option.label
            return (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            )
          })}
        </select>
        <ChevronIcon />
      </div>
    </FieldFrame>
  )
}

import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Note: Button owns its own `display` (inline-flex). Passing `hidden` via
 * className will not reliably win — wrap the Button in an element that carries
 * the responsive visibility classes instead.
 */

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill border font-body tracking-wide ' +
  'transition-[background-color,color,border-color,opacity] duration-fast ease-standard ' +
  'cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 text-center'

const sizes: Record<ButtonSize, string> = {
  sm: 'px-[18px] py-[9px] text-xs',
  md: 'px-[26px] py-[13px] text-sm',
  lg: 'px-[34px] py-4 text-base',
}

// Hover only ever gets darker/heavier — the palette never brightens on interaction.
const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-ink-900 text-fg-inverse border-ink-900 hover:bg-ink-700 hover:border-ink-700',
  secondary:
    'bg-transparent text-ink-900 border-ink-900 hover:bg-ink-900 hover:text-fg-inverse',
  ghost:
    'bg-transparent text-fg border-transparent hover:bg-ink-900/6',
  // For ink surfaces (the featured package card). Hover still only ever goes
  // heavier: the paper fill steps down a tone rather than lighting up.
  inverse:
    'bg-paper-050 text-ink-900 border-paper-050 hover:bg-paper-100 hover:border-paper-100',
}

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<'button'>, keyof CommonProps> & { href?: never }

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps> & { href: string }

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props
  const classes = cn(base, sizes[size], variants[variant], className)

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as ButtonAsLink
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }

  // `href` is already known to be absent on this branch.
  const buttonRest = rest as Omit<ButtonAsButton, 'href'>
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  )
}

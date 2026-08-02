import Link from 'next/link'
import { cn } from '@/lib/cn'

/**
 * The "Glow" logotype. Ahsing is reserved strictly for this — never headings or
 * body copy. The word is Latin-only, so Ahsing's missing Vietnamese diacritics
 * are not a problem here.
 */
export function Wordmark({
  className,
  href = '/',
  onInverse = false,
}: {
  className?: string
  href?: string | null
  onInverse?: boolean
}) {
  const content = (
    <span
      className={cn(
        'wordmark',
        onInverse && 'text-fg-inverse',
        className ?? 'text-2xl',
      )}
    >
      Glow
    </span>
  )

  if (href === null) return content

  return (
    <Link href={href} aria-label="Glow — trang chủ" className="inline-block">
      {content}
    </Link>
  )
}

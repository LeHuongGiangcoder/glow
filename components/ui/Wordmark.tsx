import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

/**
 * The "Glow" brand logo image.
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
    <Image
      src="/glow-logo.png"
      alt="Glow Wedding Logo"
      width={240}
      height={80}
      priority
      className={cn(
        'w-auto object-contain transition-opacity duration-fast ease-standard hover:opacity-85',
        onInverse && 'brightness-0 invert',
        className ?? 'h-6 md:h-7',
      )}
    />
  )

  if (href === null) return content

  return (
    <Link
      href={href}
      aria-label="Glow — trang chủ"
      className="inline-flex items-center"
    >
      {content}
    </Link>
  )
}


import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { getI18n } from '@/lib/i18n/server'

/**
 * The "Glow" brand logo image.
 */
export async function Wordmark({
  className,
  href = '/',
  onInverse = false,
}: {
  className?: string
  href?: string | null
  onInverse?: boolean
}) {
  const { t } = await getI18n()

  const content = (
    <Image
      src="/glow-logo.png"
      alt={t.wordmark.logoAlt}
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
      aria-label={t.wordmark.homeLabel}
      className="inline-flex items-center"
    >
      {content}
    </Link>
  )
}


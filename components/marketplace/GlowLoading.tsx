'use client'

import Image from 'next/image'
import { useT } from '@/lib/i18n/client'

/**
 * Takes a `variant` rather than a message string: this renders as a Suspense
 * fallback from `loading.tsx`, which cannot be an async server component and so
 * cannot read the locale itself. Resolving the copy here, on the client, keeps
 * the fallback synchronous.
 */
export type LoadingVariant = 'default' | 'templates' | 'booking'

/**
 * White loading screen with progress indicators. The wordmark pulses gently
 * above a sweeping progress bar.
 */
export function GlowLoading({
  variant = 'default',
}: {
  variant?: LoadingVariant
}) {
  const t = useT()

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade-in flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-5 bg-page py-16"
    >
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/glow-logo.png"
          alt={t.loading.logoAlt}
          width={280}
          height={90}
          priority
          className="animate-glow-pulse h-10 w-auto object-contain md:h-12"
        />
        <div className="loading-progress-track">
          <div className="loading-progress-bar" />
        </div>
      </div>

      <p className="eyebrow text-fg-muted">{t.loading[variant]}</p>
    </div>
  )
}

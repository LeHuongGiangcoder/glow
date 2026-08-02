/**
 * Full-bleed inverse loading screen. The wordmark pulses gently (1.8s) — the
 * only animation in the system with any glow to it.
 */
export function GlowLoading({
  message = 'Đang chuẩn bị bản xem trước…',
}: {
  message?: string
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-5 bg-inverse"
    >
      <span className="wordmark animate-glow-pulse text-4xl text-fg-inverse">
        Glow
      </span>
      <p className="eyebrow text-line-inverse">{message}</p>
    </div>
  )
}

/**
 * White loading screen with progress indicators. The wordmark pulses gently
 * above a sweeping progress bar and rotating spinner circle.
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
      className="animate-fade-in flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-5 bg-page py-16"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="wordmark animate-glow-pulse text-4xl text-fg">
          Glow
        </span>
        <div className="loading-progress-track">
          <div className="loading-progress-bar" />
        </div>
      </div>

      <p className="eyebrow text-fg-muted">{message}</p>
    </div>
  )
}

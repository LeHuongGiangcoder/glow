/**
 * The system's one directional glyph: a hairline shaft with an open head, so
 * it sits at the same weight as the rules it is drawn between. Used between
 * the process cards and along the bespoke flow chain.
 */
export function Chevron({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M1.5 7h11M8 2.5 12.5 7 8 11.5" />
    </svg>
  )
}

import Image from 'next/image'

export type ProcessStep = {
  title: string
  image: string
  alt: string
  /** [keyword, rest] — the keyword carries the step, the rest qualifies it. */
  points: [string, string][]
}

/** Chevron sitting in the gutter between two steps. Rotated by `.step-arrow`
    per breakpoint, so it always points at the step that comes next. */
function FlowArrow() {
  return (
    <span className="step-arrow" aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1.5 7h11M8 2.5 12.5 7 8 11.5" />
      </svg>
    </span>
  )
}

/**
 * All four steps in one view: stacked on a handset, 2x2 on a tablet, and a
 * single row of four from 64rem, with an arrow in each gutter tracing the
 * path from step one to step four.
 */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="step-flow">
      {steps.map((step, i) => (
        <article key={step.title} className="step-card">
          <div className="step-card__head">
            <span className="index-numeral">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="display-card">{step.title}</h3>
          </div>

          <div className="illustration mt-5 aspect-[16/9] w-full rounded-md">
            <Image
              src={step.image}
              alt={step.alt}
              fill
              priority={i < 2}
              sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 45vw, 300px"
              className="object-contain"
            />
          </div>

          <ul className="point-list step-card__points">
            {step.points.map(([keyword, rest]) => (
              <li key={keyword}>
                <span className="key">{keyword}</span> — {rest}
              </li>
            ))}
          </ul>

          {i < steps.length - 1 && <FlowArrow />}
        </article>
      ))}
    </div>
  )
}

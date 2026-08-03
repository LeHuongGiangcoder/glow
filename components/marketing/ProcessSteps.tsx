import Image from 'next/image'

export type ProcessStep = {
  title: string
  image: string
  alt: string
  /** [keyword, rest] — the keyword carries the step, the rest qualifies it. */
  points: [string, string][]
}

/**
 * Two steps per row on desktop (2-column grid).
 * Each step card stacks index numeral and title in one row, followed by the
 * illustration artwork, and body text below it.
 */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
      {steps.map((step, i) => (
        <article key={step.title} className="step-card">
          <div className="flex items-baseline gap-4">
            <span className="index-numeral">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="display-card">{step.title}</h3>
          </div>

          <div className="illustration mt-6 aspect-[16/9] w-full rounded-md">
            <Image
              src={step.image}
              alt={step.alt}
              fill
              priority={i < 2}
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-contain"
            />
          </div>

          <ul className="point-list mt-6">
            {step.points.map(([keyword, rest]) => (
              <li key={keyword}>
                <span className="key">{keyword}</span> — {rest}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

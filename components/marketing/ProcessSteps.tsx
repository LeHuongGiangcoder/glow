'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/cn'

export type ProcessStep = {
  title: string
  image: string
  alt: string
  /** [keyword, rest] — the keyword carries the step, the rest qualifies it. */
  points: [string, string][]
}

/**
 * Steps on the left, one illustration panel on the right. Selecting a step
 * swaps the panel; the first step is selected on load so the panel is never
 * empty and no copy is behind an interaction.
 */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="grid gap-8 rounded-md border border-line p-4 md:grid-cols-[minmax(0,440px)_1fr] md:gap-10 md:p-8">
      <ol className="m-0 flex list-none flex-col gap-2 p-0" role="tablist">
        {steps.map((step, i) => (
          <li key={step.title}>
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="step-panel"
              className="step-option rounded-sm"
              onClick={() => setActive(i)}
            >
              <span className="index-numeral block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="display-card mt-2 block">{step.title}</span>
              <ul className="point-list mt-3">
                {step.points.map(([keyword, rest]) => (
                  <li key={keyword}>
                    <span className="key">{keyword}</span> — {rest}
                  </li>
                ))}
              </ul>
            </button>
          </li>
        ))}
      </ol>

      <div
        id="step-panel"
        role="tabpanel"
        // Taller than the 16:9 files so the panel comes closer to the height of
        // the list beside it; `contain` letterboxes onto paper, and the files
        // are white to the edge, so the letterbox is invisible.
        className="illustration aspect-[16/9] rounded-md md:aspect-[4/3] md:self-center"
      >
        {/* All four are rendered and cross-faded rather than swapped: a step
            the visitor clicks must appear at once, and a lazily-mounted image
            shows the empty frame first. `fill` already stacks them. */}
        {steps.map((step, i) => (
          <Image
            key={step.image}
            src={step.image}
            alt={i === active ? step.alt : ''}
            aria-hidden={i !== active}
            fill
            priority={i === 0}
            sizes="(max-width: 768px) 90vw, 700px"
            className={cn(
              'object-contain transition-opacity duration-base ease-standard',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Native <details> disclosure — no client JS, so the section stays a server
 * component and answers remain findable with the browser's find-in-page.
 * Styling lives in `.accordion-*` in globals.css.
 */

export function Accordion({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('border-t border-line', className)}>{children}</div>
}

export function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: string
  children: ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details className="accordion-item" open={defaultOpen}>
      {/* A heading inside <summary> is valid and keeps the FAQ navigable by
          heading, which is how screen-reader users skim a long list. */}
      <summary className="accordion-trigger">
        <h3 className="display-card">{question}</h3>
        <span className="accordion-icon" aria-hidden="true" />
      </summary>
      <div className="accordion-panel lede">{children}</div>
    </details>
  )
}

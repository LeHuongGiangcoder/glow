import { Wordmark } from './Wordmark'

const social = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'hello@glow.vn', href: 'mailto:hello@glow.vn' },
]

export function Footer() {
  return (
    <footer className="hairline-t">
      <div className="container-max flex flex-wrap items-center justify-between gap-6 py-12">
        <Wordmark className="h-6" />
        <div className="flex flex-wrap gap-8 font-body text-sm text-fg-muted">
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="no-underline transition-opacity duration-fast ease-standard hover:opacity-60"
            >
              {item.label}
            </a>
          ))}
        </div>
        <p className="font-body text-xs text-fg-muted">© 2026 Glow Studio, Việt Nam</p>
      </div>
    </footer>
  )
}

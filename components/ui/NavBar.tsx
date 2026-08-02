import Link from 'next/link'
import { Button } from './Button'
import { LanguageToggle } from './LanguageToggle'
import { Wordmark } from './Wordmark'

const links = [
  { href: '/templates', label: 'Mẫu có sẵn' },
  { href: '/bespoke', label: 'Bespoke' },
  { href: '/features/guest-list', label: 'Quản lý khách mời' },
  { href: '/faq', label: 'Câu hỏi' },
]

/** Opaque, not sticky-blurred — the system uses no glass/blur in navigation. */
export function NavBar() {
  return (
    <header className="hairline-b bg-page">
      <nav className="container-max flex items-center justify-between gap-4 py-3.5 md:py-[11px] lg:gap-6 lg:py-[10px]">
        <Wordmark className="text-xl md:text-[23px] lg:text-[24px]" />

        <div className="hidden items-center gap-7 lg:flex lg:gap-[30px]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm tracking-wide text-fg no-underline transition-opacity duration-fast ease-standard lg:text-[15px] hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 lg:gap-3.5">
          <LanguageToggle />
          <Button
            href="/templates"
            variant="primary"
            size="sm"
            className="md:px-3.5 md:py-[6px] md:text-[13px]"
          >
            Bắt đầu
          </Button>
        </div>
      </nav>
    </header>
  )
}

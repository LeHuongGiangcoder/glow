import type { Metadata } from 'next'
import { fontVariables } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Glow — Website cưới thiết kế riêng và mẫu có sẵn',
    template: '%s · Glow',
  },
  description:
    'Glow thiết kế website cưới cho từng cặp đôi: chọn mẫu có sẵn để làm nhanh, hoặc đặt thiết kế riêng. Kèm quản lý khách mời và Smart RSVP.',
  icons: {
    icon: '/glow-logo.png',
    shortcut: '/glow-logo.png',
    apple: '/glow-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // PRD F11 makes Vietnamese the default locale; `/en` routing comes later.
  return (
    <html lang="vi" className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/gl-icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Glow — Website cưới thiết kế riêng và mẫu có sẵn',
    description:
      'Glow thiết kế website cưới cho từng cặp đôi: chọn mẫu có sẵn để làm nhanh, hoặc đặt thiết kế riêng. Kèm quản lý khách mời và Smart RSVP.',
    url: 'https://glowwedding.vn',
    siteName: 'Glow Wedding',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 1600,
        alt: 'Glow Wedding — Website cưới thiết kế riêng và mẫu có sẵn',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glow — Website cưới thiết kế riêng và mẫu có sẵn',
    description:
      'Glow thiết kế website cưới cho từng cặp đôi: chọn mẫu có sẵn để làm nhanh, hoặc đặt thiết kế riêng. Kèm quản lý khách mời và Smart RSVP.',
    images: ['/opengraph-image.jpg'],
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
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

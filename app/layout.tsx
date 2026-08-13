import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { fontVariables } from './fonts'
import { I18nProvider } from '@/lib/i18n/client'
import { LOCALE_TAG, OG_LOCALE } from '@/lib/i18n/config'
import { getI18n } from '@/lib/i18n/server'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n()

  return {
    title: {
      default: t.meta.titleDefault,
      template: t.meta.titleTemplate,
    },
    description: t.meta.description,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/gl-icon.png', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: '/apple-icon.png',
    },
    openGraph: {
      title: t.meta.titleDefault,
      description: t.meta.description,
      url: 'https://glowwedding.vn',
      siteName: t.meta.siteName,
      images: [
        {
          url: '/opengraph-image.jpg',
          width: 1200,
          height: 1600,
          alt: t.meta.ogImageAlt,
        },
      ],
      locale: OG_LOCALE[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.titleDefault,
      description: t.meta.description,
      images: ['/opengraph-image.jpg'],
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // English is the default; the cookie the language toggle writes is the only
  // thing that changes it.
  const { locale, t } = await getI18n()

  return (
    <html lang={LOCALE_TAG[locale]} className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col">
        <I18nProvider locale={locale} dictionary={t}>
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}

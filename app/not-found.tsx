import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { getI18n } from '@/lib/i18n/server'

export default async function NotFound() {
  const { t } = await getI18n()

  return (
    <>
      <NavBar />

      <main className="flex flex-1 items-center justify-center">
        <div className="container-narrow section-y text-center">
          <p className="eyebrow text-fg-muted">{t.notFound.eyebrow}</p>
          <h1 className="display-section mt-4">{t.notFound.title}</h1>
          <p className="lede mx-auto mt-4 max-w-[42ch]">{t.notFound.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/templates" variant="primary" size="md">
              {t.common.browseTemplates}
            </Button>
            <Button href="/" variant="secondary" size="md">
              {t.common.backToHome}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

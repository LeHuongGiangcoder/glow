import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'

export default function NotFound() {
  return (
    <>
      <NavBar />

      <main className="flex flex-1 items-center justify-center">
        <div className="container-narrow section-y text-center">
          <p className="eyebrow text-fg-muted">404</p>
          <h1 className="display-section mt-4">Trang này chưa có ở đây.</h1>
          <p className="lede mx-auto mt-4 max-w-[42ch]">
            Có thể đường dẫn đã đổi, hoặc phần này của Glow đang được dựng.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/templates" variant="primary" size="md">
              Xem mẫu có sẵn
            </Button>
            <Button href="/" variant="secondary" size="md">
              Về trang chủ
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

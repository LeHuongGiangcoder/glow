import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { TemplateGallery } from '@/components/marketplace/TemplateGallery'
import { getTemplates } from '@/lib/templates'

export const metadata: Metadata = {
  title: 'Mẫu website cưới có sẵn',
  description:
    'Bộ sưu tập mẫu website cưới của Glow. Giá công khai, có demo thật, bàn giao 7–10 ngày hoặc hoả tốc 1–3 ngày.',
}

export default async function TemplatesPage() {
  const templates = await getTemplates()
  return (
    <>
      <NavBar />

      <main className="flex-1">
        <section className="container-max section-y">
          <div className="max-w-[46ch]">
            <p className="eyebrow">Bộ sưu tập</p>
            <h1 className="display-hero mt-4">Mẫu có sẵn</h1>
            <p className="lede mt-5">
              Cùng một mức giá cho mọi mẫu trong giai đoạn này. Mỗi mẫu đổi được
              nội dung và màu sắc theo bảng màu có sẵn, và đều có bản demo mở
              được ngay.
            </p>
          </div>

          <div className="mt-12">
            <TemplateGallery templates={templates} />
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-md bg-sunken px-8 py-10 md:px-12">
            <div className="max-w-[42ch]">
              <h2 className="display-card">Không thấy mẫu hợp gu?</h2>
              <p className="lede mt-2">
                Bespoke thiết kế từ đầu theo câu chuyện riêng của bạn.
              </p>
            </div>
            <Button href="/bespoke" variant="secondary" size="md">
              Xem Bespoke
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

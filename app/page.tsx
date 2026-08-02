import Link from 'next/link'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { TemplateGallery } from '@/components/marketplace/TemplateGallery'
import { getTemplates } from '@/lib/templates'

/** PRD F1 — three value props. */
const valueProps = [
  {
    title: 'Mẫu đẹp có sẵn, xem demo thật',
    body: 'Mỗi mẫu đều có bản demo mở được ngay, không phải đoán qua ảnh chụp. Không thấy mẫu hợp gu thì đặt thiết kế riêng.',
  },
  {
    title: 'Quản lý khách mời theo nhóm',
    body: 'Chia nhà trai, nhà gái, bạn bè, đồng nghiệp. Gộp cả gia đình thành một lời mời, gửi link riêng cho từng nhóm.',
  },
  {
    title: 'Smart RSVP',
    body: 'Khách gõ tên là hệ thống tự nhận ra cả nhà. Câu hỏi đổi theo từng nhóm, trả lời ghi thẳng vào đúng bản ghi.',
  },
]

/** PRD F1 — the branch point. Two cards, deliberately equal in weight. */
const branches = [
  {
    href: '/templates',
    eyebrow: 'Mẫu có sẵn',
    title: 'Xem mẫu có sẵn',
    body: 'Giá công khai, chọn xong là bắt đầu. Trung bình 7–10 ngày, hoặc hoả tốc 1–3 ngày.',
    cta: 'Xem bộ sưu tập',
  },
  {
    href: '/bespoke',
    eyebrow: 'Bespoke',
    title: 'Thiết kế riêng — Bespoke',
    body: 'Thiết kế từ đầu theo câu chuyện của bạn, không giới hạn bố cục có sẵn. Giá nằm trong bản Proposal xem công khai.',
    cta: 'Xem Proposal',
  },
]

/** PRD F1 — trust bar. PLACEHOLDER figures; PRD F10 sources these from Sanity. */
const trustStats = [
  { value: '120+', label: 'Website đã bàn giao' },
  { value: '12 giờ', label: 'Thời gian phản hồi' },
  { value: '1–3 ngày', label: 'Bàn giao hoả tốc' },
  { value: 'Không giới hạn', label: 'Số vòng sửa' },
]

/** PRD F1 — FAQ. Grouped so the list of eleven reads as three short lists. */
const faqGroups = [
  {
    title: 'Quy trình',
    items: [
      {
        q: 'Đặt lịch xong thì chuyện gì xảy ra?',
        a: 'Glow liên hệ xác nhận trong vòng 12 giờ. Buổi meeting 30–45 phút qua Google Meet để thu thập nội dung, ảnh, và thanh toán. Sau đó Glow bắt tay vào làm ngay.',
      },
      {
        q: 'Bao lâu thì xong?',
        a: 'Trung bình 7–10 ngày. Cần gấp thì có lựa chọn hoả tốc 1–3 ngày, áp dụng cho cả mẫu có sẵn lẫn thiết kế riêng.',
      },
      {
        q: 'Sửa được mấy lần?',
        a: 'Không giới hạn số vòng sửa nội dung, hình ảnh, màu sắc theo đúng bố cục đã chọn.',
      },
      {
        q: 'Domain và hosting thế nào?',
        a: 'Mặc định dùng subdomain glow.vn miễn phí, hosting 12 tháng. Muốn domain riêng, Glow hỗ trợ trỏ domain, phụ phí báo cụ thể khi tư vấn.',
      },
    ],
  },
  {
    title: 'Mẫu có sẵn & Bespoke',
    items: [
      {
        q: 'Mẫu có sẵn thì tôi đổi được gì?',
        a: 'Đổi toàn bộ thông tin cá nhân (tên, ngày giờ, địa điểm, nội dung chữ) và đổi màu theo bảng màu có sẵn của mẫu. Tối đa 60 ảnh.',
      },
      {
        q: 'Tôi không đổi được gì?',
        a: 'Không đổi cấu trúc section, không thiết kế lại từ đầu, không chụp ảnh hay viết nội dung thay bạn. Muốn thứ khác biệt hơn, đó là lúc nên xem Bespoke.',
      },
      {
        q: 'Bespoke khác mẫu có sẵn ở đâu?',
        a: 'Thiết kế từ đầu theo câu chuyện riêng của hai bạn, không giới hạn theo bố cục có sẵn. Giá nằm trong bản Proposal, xem công khai ngay trên site trước khi đặt lịch.',
      },
      {
        q: 'Bespoke có mắc hơn không?',
        a: 'Giá theo Proposal, không cố định như mẫu có sẵn vì mỗi dự án khác nhau. Xem Proposal trước để biết chính xác trước khi quyết định.',
      },
      {
        q: 'Bespoke có nhận hoả tốc không?',
        a: 'Có, thời gian cụ thể tuỳ độ phức tạp, thoả thuận trong buổi meeting.',
      },
    ],
  },
  {
    title: 'Tính năng & sử dụng',
    items: [
      {
        q: 'Tính năng Smart RSVP có tính phí thêm không?',
        a: 'Không, đã bao gồm sẵn trong cả mẫu có sẵn và Bespoke.',
      },
      {
        q: 'Ai dùng được, khách lớn tuổi có dùng nổi không?',
        a: 'Cô dâu chú rể là người quản lý, tự đăng nhập dashboard sau khi Glow bàn giao. Khách mời chỉ cần gõ tên vào link RSVP, không cần biết dùng công nghệ.',
      },
    ],
  },
]

export default async function HomePage() {
  const templates = await getTemplates()
  return (
    <>
      <NavBar />

      <main className="flex-1 screen-transition">
        {/* Hero */}
        <section className="container-narrow section-y text-center">
          <p className="eyebrow">Wedding Website Studio</p>
          <h1 className="display-hero mt-4">
            Câu chuyện của bạn, kể thật đẹp.
          </h1>
          <p className="lede mx-auto mt-6 max-w-[46ch]">
            Glow làm website cưới thiết kế riêng cho từng cặp đôi, và có sẵn
            những mẫu đẹp để bạn chọn nhanh. Một nơi yên tĩnh để khách mời tìm
            thấy đúng điều cần biết.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/templates" variant="primary" size="lg">
              Xem mẫu có sẵn
            </Button>
            <Button href="/bespoke" variant="secondary" size="lg">
              Thiết kế riêng
            </Button>
          </div>
        </section>

        {/* Value props */}
        <section className="container-max hairline-t section-y">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {valueProps.map((prop, i) => (
              <div key={prop.title}>
                <p className="eyebrow text-fg-muted">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="display-card mt-4">{prop.title}</h2>
                <p className="lede mt-3">{prop.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Branch point — neither card outranks the other */}
        <section className="container-max hairline-t section-y">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {branches.map((branch) => (
              <Link
                key={branch.href}
                href={branch.href}
                className="group flex flex-col rounded-md bg-card p-8 transition-transform duration-base ease-out hover:-translate-y-[3px] md:p-12"
              >
                <p className="eyebrow text-fg-muted">{branch.eyebrow}</p>
                <h2 className="display-section mt-4">{branch.title}</h2>
                <p className="lede mt-4 flex-1">{branch.body}</p>
                <span className="mt-8 font-body text-sm tracking-wide text-fg">
                  {branch.cta} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust bar */}
        <section className="container-max hairline-t section-y">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {trustStats.map((stat) => (
              <div key={stat.label}>
                <p className="display-card">{stat.value}</p>
                <p className="eyebrow mt-2 text-fg-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="container-max hairline-t section-y">
          <div className="mb-10 max-w-[46ch]">
            <p className="eyebrow">Bộ sưu tập</p>
            <h2 className="display-section mt-4">Chọn mẫu hợp gu của bạn</h2>
            <p className="lede mt-4">
              Cùng một mức giá cho mọi mẫu trong giai đoạn này. Mỗi mẫu đều đổi
              được nội dung và màu sắc theo bảng màu có sẵn.
            </p>
          </div>

          <TemplateGallery templates={templates} />

          {/* PRD F2 — closing banner into the bespoke branch */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-md bg-sunken px-8 py-10 md:px-12">
            <div className="max-w-[42ch]">
              <h3 className="display-card">Không thấy mẫu hợp gu?</h3>
              <p className="lede mt-2">
                Bespoke thiết kế từ đầu theo câu chuyện riêng của bạn.
              </p>
            </div>
            <Button href="/bespoke" variant="secondary" size="md">
              Xem Bespoke
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-max hairline-t section-y">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-24">
                <p className="eyebrow">Câu hỏi thường gặp</p>
                <h2 className="display-section mt-4">
                  Những điều hai bạn hay hỏi
                </h2>
                <p className="lede mt-4 max-w-[38ch]">
                  Chưa thấy câu trả lời mình cần? Đặt lịch một buổi tư vấn, Glow
                  trả lời trực tiếp.
                </p>
                <div className="mt-7">
                  <Button href="/book" variant="secondary" size="md">
                    Đặt lịch tư vấn
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              {faqGroups.map((group) => (
                <div key={group.title} className="mt-12 first:mt-0">
                  <p className="eyebrow text-fg-muted">{group.title}</p>
                  <Accordion className="mt-4">
                    {group.items.map((item, i) => (
                      <AccordionItem
                        key={item.q}
                        question={item.q}
                        defaultOpen={group === faqGroups[0] && i === 0}
                      >
                        {item.a}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

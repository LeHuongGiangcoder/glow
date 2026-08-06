import Image from 'next/image'
import type { CSSProperties } from 'react'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { PROCESS_STEPS, ProcessSteps } from '@/components/marketing/ProcessSteps'
import { TemplateGallery } from '@/components/marketplace/TemplateGallery'
import { cn } from '@/lib/cn'
import { getTemplates } from '@/lib/templates'

/** PRD F1 — three value props, stated inside the hero rather than as their own
    section. Creative entrance leads: it is the thing no template shop offers. */
const valueProps = [
  {
    title: 'Creative entrance',
    points: [
      'Mở đầu bằng một thứ thuộc về riêng hai bạn',
      'Phím đàn piano, ống kính máy ảnh, nét cọ vẽ, chiếc đĩa than',
      'Mỗi cặp đôi một cách vào, không lặp lại',
    ],
  },
  {
    title: 'Theo dõi khách mời',
    points: [
      'Biết ai đã mở thiệp, ai đã trả lời, ai còn để ngỏ',
      'Chia nhà trai, nhà gái, bạn bè, đồng nghiệp',
      'Link mời riêng cho từng nhóm',
    ],
  },
  {
    title: 'Smart RSVP',
    points: [
      'Khách gõ tên, hệ thống nhận ra cả nhà',
      'Câu hỏi đổi theo từng nhóm khách',
      'Câu trả lời ghi thẳng vào đúng bản ghi',
    ],
  },
]

/** The hero standfirst, broken into points so it is read rather than skimmed
    past — same list treatment as the sections below it. */
const heroPoints = [
  // Kept under ~40 characters: a wrapped hero bullet reads as a paragraph
  // again, which is the thing the list was meant to break up.
  'Mang câu chuyện riêng của từng cặp đôi',
  'Mở nhanh, mượt trên mọi thiết bị',
  'Dễ dùng cho cả hai bạn lẫn khách mời',
]

/** Shown under the hero frames. */
const heroCaption = 'Mỗi cặp đôi mở đầu bằng một thứ của riêng mình.'

/** The three frames beside the headline. The tall one carries the hero. */
const heroFrames = [
  {
    src: '/hero/wed1.webp',
    alt: 'Hai bàn tay trao nhẫn cưới',
    /** Equal widths made three near-equal frames; the lead frame takes more so
        the cluster has a subject instead of three siblings. */
    shape: 'flex-[1] aspect-[4/5]',
    /** Only the lead frame survives on a handset. */
    handset: false,
  },
  {
    src: '/hero/wed4.webp',
    alt: 'Cô dâu chú rể dưới tấm voan bay trong nắng',
    shape: 'flex-[1.5] aspect-[3/4]',
    handset: true,
  },
  {
    src: '/hero/wed7.webp',
    alt: 'Cô dâu chú rể nắm tay nhau bước lên bậc thang',
    shape: 'flex-[1] aspect-[4/5]',
    handset: false,
  },
]

/** Contact sheet drifting under the hero. Order alternates close-ups with
    wider frames so no two similar crops sit next to each other. */
const heroStrip = [
  { src: '/hero/wed13.webp', alt: 'Cô dâu chú rể sát bên nhau trong ánh sáng dịu' },
  { src: '/hero/wed3.webp', alt: 'Nụ hôn dưới nền trời' },
  { src: '/hero/wed16.webp', alt: 'Cô dâu chú rể trên chiếc xe mui trần' },
  { src: '/hero/wed8.webp', alt: 'Đôi tay cô dâu với nhẫn cưới' },
  { src: '/hero/wed5.webp', alt: 'Bóng cô dâu chú rể giữa cánh hoa bay' },
  { src: '/hero/wed12.webp', alt: 'Chú rể buộc dây giày cho cô dâu' },
  { src: '/hero/wed14.webp', alt: 'Cô dâu chú rể băng qua đường phố' },
  { src: '/hero/wed11.webp', alt: 'Khui rượu mừng bên tháp ly' },
  { src: '/hero/wed6.webp', alt: 'Cô dâu chú rể trong tấm voan dài' },
  { src: '/hero/wed15.webp', alt: 'Cô dâu chú rể trên con đường vắng' },
  { src: '/hero/wed17.webp', alt: 'Nhìn từ trên xuống chiếc xe cưới' },
  { src: '/hero/wed9.webp', alt: 'Cô dâu chú rể khoe nhẫn cưới' },
]

/** PRD F1 — FAQ. Grouped so the list of eleven reads as three short lists. */
const faqGroups = [
  {
    title: 'Quy trình',
    items: [
      {
        q: 'Đặt lịch xong thì chuyện gì xảy ra?',
        a: 'Glow liên hệ xác nhận trong vòng 12 giờ. Buổi meeting 15 phút qua Google Meet để chốt nội dung, ảnh, và thanh toán. Sau đó Glow bắt tay vào làm ngay.',
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
        {/* Hero — text left, photographs right, bottoms aligned so the two
            frames stagger by their own proportions instead of a nudge. */}
        <section>
          <div className="container-max grid grid-cols-1 gap-12 pb-14 pt-12 md:pt-20 md:pb-16 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pt-[90px] lg:pb-20">
            <div className="rise-in lg:col-span-5">
              <p className="eyebrow">Wedding Website Studio</p>
              <h1 className="display-hero mt-5">
                Chia sẻ đám cưới theo cách của hai bạn.
              </h1>
              <ul className="point-list mt-6 max-w-[40ch]">
                {heroPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="/templates" variant="primary" size="lg">
                  Xem mẫu có sẵn
                </Button>
                <Button href="/book" variant="secondary" size="lg">
                  Đặt lịch 15 phút
                </Button>
              </div>
            </div>

            {/* One frame on a handset — three 100px frames are thumbnails, not
                photographs. The cluster returns from md up, bottoms aligned so
                the frames stagger by their own proportions. */}
            <figure
              className="rise-in m-0 lg:col-span-7"
              style={{ '--rise-delay': '120ms' } as CSSProperties}
            >
              <div className="flex items-end gap-4 md:gap-5">
                {heroFrames.map((frame) => (
                  <div
                    key={frame.src}
                    className={cn(
                      'photo rounded-md',
                      frame.shape,
                      !frame.handset && 'hidden md:block',
                    )}
                  >
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      fill
                      // All three are above the fold; only the tall one, which
                      // is also the handset's single frame, gets the LCP hint.
                      priority={frame.handset}
                      loading={frame.handset ? undefined : 'eager'}
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 30vw, 260px"
                    />
                  </div>
                ))}
              </div>
              <figcaption className="lede mt-4 text-xs italic">
                {heroCaption}
              </figcaption>
            </figure>
          </div>

          {/* Contact sheet — full-bleed, drifting slowly on a strip of film.
              Duplicated once so the loop has something to wrap onto; the copy
              is decorative. */}
          <div className="marquee film-strip">
            <div className="marquee-track">
              {[0, 1].map((copy) =>
                heroStrip.map((frame) => (
                  <div
                    key={`${copy}-${frame.src}`}
                    // Square-ish corners: film frames are cut, not rounded.
                    className="photo aspect-[4/5] w-[144px] rounded-sm md:w-[200px]"
                  >
                    <Image
                      src={frame.src}
                      alt={copy === 0 ? frame.alt : ''}
                      aria-hidden={copy === 1}
                      fill
                      // The track never stops moving, so a lazy frame would
                      // drift into view still empty. They are ~200px wide.
                      loading="eager"
                      sizes="(max-width: 768px) 144px, 200px"
                    />
                  </div>
                )),
              )}
            </div>
          </div>

          {/* Value props sit inside the hero — three lines, no section of
              their own, so the process below stays one scroll away. */}
          <div className="col-rules container-max hairline-t grid grid-cols-1 gap-8 py-12 md:grid-cols-3 md:gap-6">
            {valueProps.map((prop, i) => (
              <div key={prop.title}>
                <p className="index-numeral">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="display-card mt-3.5">{prop.title}</h2>
                <ul className="point-list mt-4">
                  {prop.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Process — four steps in one row on a laptop, so the whole thing is
            scannable in a single view, arrows tracing 01 → 04. Each step shows
            the screen the couple actually sees at that point. */}
        <section className="container-max hairline-t section-y">
          <div className="section-head">
            <div>
              <p className="eyebrow">Quy trình</p>
              <h2 className="display-section mt-4">
                Website của hai bạn ra đời thế nào
              </h2>
            </div>
          </div>

          <div className="mt-12">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </section>

        {/* Gallery */}
        <section className="container-max hairline-t section-y">
          <div className="section-head mb-10">
            <div>
              <p className="eyebrow">Bộ sưu tập</p>
              <h2 className="display-section mt-4">Chọn mẫu hợp gu của bạn</h2>
            </div>
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

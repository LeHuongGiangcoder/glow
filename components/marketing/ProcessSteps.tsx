import Image from 'next/image'
import { Chevron } from '@/components/ui/Chevron'

export type ProcessStep = {
  title: string
  image: string
  alt: string
  /** [keyword, rest] — the keyword carries the step, the rest qualifies it. */
  points: [string, string][]
}

/** The four steps between choosing a template and going live. Each bullet
    leads with the keyword; the copy is kept to one line per bullet so all four
    steps and the illustration panel fit one screen. Shared by the home page and
    every template detail page — the process is the same either way. */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: 'Chọn mẫu',
    image: '/step/1.png',
    alt: 'Trang chi tiết một mẫu website cưới, con trỏ đang bấm nút Chọn mẫu này',
    points: [
      ['Demo thật', 'mở được ngay, không đoán qua ảnh'],
      ['Giá công khai', 'chưa cần thanh toán ở bước này'],
    ],
  },
  {
    title: 'Meeting 15 phút',
    image: '/step/2.png',
    alt: 'Form đặt lịch buổi Intro 15 phút qua Google Meet',
    points: [
      ['Chốt thông tin', 'tên, ngày giờ, địa điểm, ảnh'],
      ['Cách mở đầu', 'trang sẽ mở ra bằng điều gì'],
    ],
  },
  {
    title: 'Glow tinh chỉnh',
    image: '/step/3.png',
    alt: 'Hình vẽ một đầu bếp đang nêm nếm món ăn',
    points: [
      ['Đúng mẫu đã chọn', 'không dựng lại từ đầu'],
      ['Sửa không giới hạn', 'tới khi hai bạn ưng'],
    ],
  },
  {
    title: 'Bàn giao',
    image: '/step/4.png',
    alt: 'Thanh địa chỉ tên miền riêng của cặp đôi và bảng danh sách khách mời đã trả lời',
    points: [
      ['Link website', 'kèm dashboard khách mời'],
      ['7–10 ngày', 'hoả tốc 1–3 ngày'],
    ],
  },
]

/** Chevron sitting in the gutter between two steps. Rotated by `.step-arrow`
    per breakpoint, so it always points at the step that comes next. */
function FlowArrow() {
  return (
    <span className="step-arrow" aria-hidden="true">
      <Chevron />
    </span>
  )
}

/**
 * All four steps in one view: stacked on a handset, 2x2 on a tablet, and a
 * single row of four from 64rem, with an arrow in each gutter tracing the
 * path from step one to step four.
 */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="step-flow">
      {steps.map((step, i) => (
        <article key={step.title} className="step-card">
          <div className="step-card__head">
            <span className="index-numeral">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="display-card">{step.title}</h3>
          </div>

          <div className="illustration mt-5 aspect-[16/9] w-full rounded-md">
            <Image
              src={step.image}
              alt={step.alt}
              fill
              priority={i < 2}
              sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 45vw, 300px"
              className="object-contain"
            />
          </div>

          <ul className="point-list step-card__points">
            {step.points.map(([keyword, rest]) => (
              <li key={keyword}>
                <span className="key">{keyword}</span> — {rest}
              </li>
            ))}
          </ul>

          {i < steps.length - 1 && <FlowArrow />}
        </article>
      ))}
    </div>
  )
}

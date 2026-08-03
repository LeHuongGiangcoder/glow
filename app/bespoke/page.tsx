import Image from 'next/image'
import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { Button } from '@/components/ui/Button'
import { Chevron } from '@/components/ui/Chevron'
import { Footer } from '@/components/ui/Footer'
import { NavBar } from '@/components/ui/NavBar'
import { cn } from '@/lib/cn'
import { formatVnd } from '@/lib/templates'

export const metadata: Metadata = {
  title: 'Bespoke — website cưới thiết kế riêng',
  description:
    'Website cưới dựng từ đầu theo câu chuyện, moodboard và phong cách riêng của hai bạn. Hai gói Memories và Lifelong, giá công khai.',
}

/** Everything on this page is the Glow Proposal deck, restated in Vietnamese
    for a site that is Vietnamese throughout. The English lines that survive —
    package names and the three taglines — are the ones the deck uses as
    display copy, the same way the landing page keeps "Creative entrance". */

/** Hero standfirst. One line each, same treatment as the landing hero. */
const heroPoints = [
  'Thiết kế từ đầu theo câu chuyện của riêng hai bạn',
  'Song ngữ Việt – Anh cho khách ở khắp nơi',
  'Một nơi khách muốn quay lại, không chỉ trong ngày cưới',
]

/** Deck slide 2 — "A living space full of memories". Same three-column rule
    treatment as the landing page's value props. */
const experience = [
  {
    title: 'Không chỉ là một website',
    points: [
      'Nơi câu chuyện của hai người được kể, được cảm, và được giữ lại',
    ],
  },
  {
    title: 'Sinh ra từ chất riêng',
    points: [
      'Dựng từ chính phong cách, cảm xúc và hành trình của mỗi cặp đôi',
    ],
  },
  {
    title: 'Trước, trong và sau',
    points: [
      'Một trải nghiệm khách mời muốn quay lại, không chỉ trong ngày cưới',
    ],
  },
]

type Package = {
  name: string
  priceVnd: number
  /** The deck's own English line for the tier — kept as the card's promise. */
  tagline: string
  points: [string, string][]
  /** Closing line printed under the rule at the foot of the card. */
  note: string
  /** The ink card: the higher tier, marked by its surface, not a badge. */
  feature?: boolean
}

const packages: Package[] = [
  {
    name: 'Memories Package',
    priceVnd: 1799000,
    tagline: 'Where your story has an address',
    points: [
      [
        'Đúng màu, đúng chất',
        'khách mở link là thấy phong cách riêng của hai bạn, không phải mẫu ai cũng có',
      ],
      [
        'Kể bằng hình ảnh',
        'câu chuyện tình yêu theo đúng cách hai bạn muốn người thân hiểu',
      ],
      ['Một nơi duy nhất', 'RSVP, địa điểm, lịch trình và dress code'],
      ['Song ngữ Việt – Anh', 'cho gia đình và bạn bè ở nhiều nơi'],
      ['Bắt đầu sớm', 'câu chuyện mở ra từ trước ngày cưới'],
    ],
    note: 'Đã bao gồm VAT. Chưa cần thanh toán trước khi đặt lịch.',
  },
  {
    name: 'Lifelong Package',
    priceVnd: 3499000,
    tagline: 'A wedding lived before, during, and forever after',
    points: [
      [
        'Trước ngày cưới',
        'khách đã sống trong câu chuyện của hai bạn qua từng tấm hình, từng lời mời riêng',
      ],
      [
        'Trong ngày cưới',
        'mini-game, check-in và sổ lưu bút trực tiếp trên website',
      ],
      [
        'Sau ngày cưới',
        'không gian riêng để khách lưu ảnh, và một trang hai bạn mở lại mỗi năm',
      ],
      ['Hỗ trợ kỹ thuật', 'trực suốt ngày cưới'],
    ],
    note: 'The wedding ends in one day. The experience does not.',
    feature: true,
  },
]

/** Deck slide 12. Stages, not screens — stated as one line rather than cards. */
const flow = [
  'Brief',
  'Bản thiết kế đầu',
  'Feedback',
  'Đặt cọc',
  'Hoàn thiện',
  'Bàn giao',
]

/** Two frames, not the landing page's three: this page opens on a claim, so
    the photographs support it rather than carry it. */
const heroFrames = [
  {
    src: '/hero/wed16.webp',
    alt: 'Cô dâu chú rể trên chiếc xe mui trần',
    shape: 'flex-[1.4] aspect-[3/4]',
    handset: true,
  },
  {
    src: '/hero/wed10.webp',
    alt: 'Cô dâu chú rể trong khoảnh khắc riêng tư',
    shape: 'flex-[1] aspect-[4/5]',
    handset: false,
  },
]

export default function BespokePage() {
  return (
    <>
      <NavBar />

      <main className="flex-1 screen-transition">
        {/* Hero */}
        <section>
          <div className="container-max grid grid-cols-1 gap-12 pb-14 pt-10 md:pt-14 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-20">
            <div className="rise-in lg:col-span-6">
              <p className="eyebrow">Bespoke</p>
              <h1 className="display-hero mt-5">
                Nơi câu chuyện của hai bạn có một địa chỉ.
              </h1>
              <p className="lede mt-5 max-w-[46ch]">
                Không chỉ là một website, mà là nơi câu chuyện của hai người
                được kể, được cảm, và được giữ lại.
              </p>
              <ul className="point-list mt-6 max-w-[42ch]">
                {heroPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="/book?type=bespoke" variant="primary" size="lg">
                  Đặt lịch 15 phút
                </Button>
                <Button href="#packages" variant="secondary" size="lg">
                  Xem hai gói
                </Button>
              </div>
            </div>

            <figure
              className="rise-in m-0 lg:col-span-6"
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
                      priority={frame.handset}
                      loading={frame.handset ? undefined : 'eager'}
                      sizes="(max-width: 768px) 90vw, 40vw"
                    />
                  </div>
                ))}
              </div>
              <figcaption className="lede mt-4 text-xs italic">
                Mỗi bản Bespoke bắt đầu từ moodboard của chính hai bạn.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Digital experience — the deck's opening argument, three columns
            separated by a rule in the gutter rather than three cards. */}
        <section className="container-max hairline-t section-y">
          <div className="max-w-[46ch]">
            <p className="eyebrow">Digital Experience</p>
            <h2 className="display-section mt-4">
              Một không gian sống, đầy kỷ niệm
            </h2>
          </div>

          <div className="col-rules mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {experience.map((item, i) => (
              <div key={item.title}>
                <p className="index-numeral">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="display-card mt-3.5">{item.title}</h3>
                <ul className="point-list mt-4">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="pull-quote mt-14">
            Because every love has its own language.
          </p>
        </section>

        {/* Packages */}
        <section id="packages" className="container-max hairline-t section-y">
          <div className="max-w-[46ch]">
            <p className="eyebrow">Bảng giá</p>
            <h2 className="display-section mt-4">Hai gói Bespoke</h2>
            <p className="lede mt-4">
              Cả hai đều được thiết kế từ đầu. Khác nhau ở chỗ câu chuyện dừng
              lại ở ngày cưới, hay còn sống tiếp sau đó.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {packages.map((pkg) => (
              <article
                key={pkg.name}
                className={cn('price-card', pkg.feature && 'price-card-feature')}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="display-card">{pkg.name}</h3>
                  <p className="price-amount">{formatVnd(pkg.priceVnd)}</p>
                </div>
                <p className="lede mt-3 italic">{pkg.tagline}</p>

                <ul className="point-list mt-8">
                  {pkg.points.map(([keyword, rest]) => (
                    <li key={keyword}>
                      <span className="key">{keyword}</span> — {rest}
                    </li>
                  ))}
                </ul>

                {/* Pushed to the foot so the two cards line up on their rule
                    however many points each tier lists. */}
                <div className="hairline-t mt-auto pt-6">
                  <p className="lede text-xs italic">{pkg.note}</p>
                  <div className="mt-6">
                    <Button
                      href="/book?type=bespoke"
                      variant={pkg.feature ? 'inverse' : 'primary'}
                      size="md"
                    >
                      Đặt lịch cho gói này
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Flow */}
        <section className="container-max hairline-t section-y">
          <div className="max-w-[46ch]">
            <p className="eyebrow">Quy trình</p>
            <h2 className="display-section mt-4">
              Bắt đầu đơn giản, hoàn thiện tới từng chi tiết
            </h2>
          </div>

          <ol className="flow-chain mt-10">
            {flow.map((stage, i) => (
              <li key={stage}>
                <span className="font-body text-sm text-fg">{stage}</span>
                {i < flow.length - 1 && (
                  <span className="flow-chain__sep">
                    <Chevron size={12} />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <p className="lede mt-8">
            Quy trình linh hoạt theo từng cặp đôi — bước nào cần thêm thời gian,
            Glow giãn ra ở bước đó.
          </p>
        </section>

        {/* Reference works */}
        <section className="container-max hairline-t section-y">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-md bg-sunken px-8 py-10 md:px-12">
            <div className="max-w-[46ch]">
              <h2 className="display-card">Xem các bản đã làm</h2>
              <p className="lede mt-2">
                Tất cả đều dựng từ câu chuyện và moodboard của chính từng cặp
                đôi.
              </p>
            </div>
            <Button href="/templates" variant="secondary" size="md">
              Xem mẫu tham khảo
            </Button>
          </div>
        </section>

        {/* Closing */}
        <section className="container-narrow hairline-t section-y text-center">
          <h2 className="display-section text-balance">
            Vì câu chuyện của hai bạn xứng đáng có một nơi để sống.
          </h2>
          <p className="lede mt-5">
            Glow rất mong được đồng hành cùng hai bạn.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/book?type=bespoke" variant="primary" size="lg">
              Đặt lịch 15 phút
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

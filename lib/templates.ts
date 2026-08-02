/**
 * Template catalogue management via Sanity CMS.
 */

import { client } from '@/sanity/lib/client'
import { templateBySlugQuery, templatesQuery } from '@/sanity/lib/queries'

export const STYLE_TAGS = [
  'Tất cả',
  'Tối giản',
  'Lãng mạn',
  'Hiện đại',
  'Cổ điển',
] as const

export type StyleTag = (typeof STYLE_TAGS)[number]

/**
 * PRD F9: one price for every template during the testing phase, but the field
 * stays per-template so Sanity can diverge later. Placeholder amount — confirm
 * the real number before launch.
 */
export const TEMPLATE_PRICE_VND = 4_500_000

export type Template = {
  slug: string
  name: string
  mood: string
  styleTags: StyleTag[]
  priceVnd: number
  /** Stand-in for coverImage until real screenshots land. */
  imageColor: string
  /** PRD F2: "Còn nhận đơn hoả tốc" badge, toggled per template in Sanity. */
  expressAvailable: boolean
  description: string
  sections: string[]
  /** PRD F3: per-template inclusions. The fixed two live in TEMPLATE_ALWAYS_INCLUDED. */
  includes: string[]
  demoUrl: string
}

/** PRD F3: fixed copy shared by every template — not a per-template Sanity field. */
export const TEMPLATE_ALWAYS_INCLUDED = [
  'Đổi thông tin cá nhân: tên cô dâu chú rể, ngày giờ, địa điểm, toàn bộ nội dung chữ',
  'Đổi màu theo bảng màu có sẵn của mẫu',
] as const

/** PRD F3: identical across templates. */
export const TEMPLATE_NOT_INCLUDED = [
  'Chụp ảnh cưới',
  'Viết nội dung thay bạn',
  'Đổi cấu trúc các section',
  'Thiết kế lại từ đầu',
] as const

export const MOCK_TEMPLATES: Template[] = [
  {
    slug: 'willow',
    name: 'Willow',
    mood: 'Lãng mạn · Tối giản',
    styleTags: ['Lãng mạn', 'Tối giản'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-paper-100)',
    expressAvailable: true,
    description:
      'Bố cục yên tĩnh, nhiều khoảng thở, dành cho cặp đôi muốn câu chuyện của mình được kể chậm rãi. Song ngữ, tối ưu cho điện thoại.',
    sections: ['Trang chủ', 'Câu chuyện', 'Dòng thời gian', 'RSVP', 'Album', 'Mừng cưới'],
    includes: [
      'Tối đa 40 ảnh',
      'Subdomain glow.vn miễn phí, hosting 12 tháng',
      'Guest List + Smart RSVP',
    ],
    demoUrl: 'https://demo.glow.vn/willow',
  },
  {
    slug: 'marble',
    name: 'Marble',
    mood: 'Hiện đại · Tạp chí',
    styleTags: ['Hiện đại'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-warm-gray-100)',
    expressAvailable: true,
    description:
      'Kiểu dàn trang tạp chí, chữ lớn và ảnh tràn viền. Hợp với bộ ảnh cưới mạnh về bố cục.',
    sections: ['Trang chủ', 'Câu chuyện', 'Sự kiện', 'RSVP', 'Album'],
    includes: [
      'Tối đa 60 ảnh',
      'Subdomain glow.vn miễn phí, hosting 12 tháng',
      'Guest List + Smart RSVP',
    ],
    demoUrl: 'https://demo.glow.vn/marble',
  },
  {
    slug: 'linen',
    name: 'Linen',
    mood: 'Tối giản · Nhẹ nhàng',
    styleTags: ['Tối giản'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-warm-gray-300)',
    expressAvailable: false,
    description:
      'Ít chi tiết nhất trong bộ sưu tập. Chữ, khoảng trắng và một vài bức ảnh — không gì khác.',
    sections: ['Trang chủ', 'Thông tin lễ cưới', 'RSVP', 'Album'],
    includes: [
      'Tối đa 25 ảnh',
      'Subdomain glow.vn miễn phí, hosting 12 tháng',
      'Guest List + Smart RSVP',
    ],
    demoUrl: 'https://demo.glow.vn/linen',
  },
  {
    slug: 'amber',
    name: 'Amber',
    mood: 'Cổ điển · Ấm',
    styleTags: ['Cổ điển'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-ink-500)',
    expressAvailable: true,
    description:
      'Cảm giác thiệp giấy cũ: chữ serif đậm, viền mảnh, tông ấm. Dành cho tiệc cưới truyền thống.',
    sections: ['Trang chủ', 'Câu chuyện', 'Gia đình', 'Dòng thời gian', 'RSVP', 'Album'],
    includes: [
      'Tối đa 40 ảnh',
      'Subdomain glow.vn miễn phí, hosting 12 tháng',
      'Guest List + Smart RSVP',
    ],
    demoUrl: 'https://demo.glow.vn/amber',
  },
  {
    slug: 'orchid',
    name: 'Orchid',
    mood: 'Lãng mạn · Đậm',
    styleTags: ['Lãng mạn'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-ink-700)',
    expressAvailable: false,
    description:
      'Nền tối, chữ sáng, ảnh làm nhân vật chính. Hợp với tiệc cưới buổi tối.',
    sections: ['Trang chủ', 'Câu chuyện', 'Sự kiện', 'RSVP', 'Album', 'Mừng cưới'],
    includes: [
      'Tối đa 50 ảnh',
      'Subdomain glow.vn miễn phí, hosting 12 tháng',
      'Guest List + Smart RSVP',
    ],
    demoUrl: 'https://demo.glow.vn/orchid',
  },
  {
    slug: 'stone',
    name: 'Stone',
    mood: 'Hiện đại · Tĩnh',
    styleTags: ['Hiện đại', 'Tối giản'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-ink-900)',
    expressAvailable: true,
    description:
      'Đen trắng tuyệt đối, không hoa văn. Bố cục lưới chặt chẽ, đọc rất nhanh trên điện thoại.',
    sections: ['Trang chủ', 'Thông tin lễ cưới', 'Dòng thời gian', 'RSVP', 'Album'],
    includes: [
      'Tối đa 30 ảnh',
      'Subdomain glow.vn miễn phí, hosting 12 tháng',
      'Guest List + Smart RSVP',
    ],
    demoUrl: 'https://demo.glow.vn/stone',
  },
]

export async function getTemplates(): Promise<Template[]> {
  try {
    const data = await client.fetch(templatesQuery)
    return data || []
  } catch (error) {
    console.error('Failed to fetch templates from Sanity:', error)
    return []
  }
}

export async function getTemplate(slug: string): Promise<Template | undefined> {
  try {
    const data = await client.fetch(templateBySlugQuery, { slug })
    return data || undefined
  } catch (error) {
    console.error(`Failed to fetch template ${slug} from Sanity:`, error)
    return undefined
  }
}

/** PRD F9: state clearly whether VAT is included. */
export function formatVnd(amount: number) {
  return `${amount.toLocaleString('vi-VN')} ₫`
}

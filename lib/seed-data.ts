/**
 * Seed documents for `/api/seed`. Shaped like Sanity documents rather than like
 * the flattened `Template` the app reads, because that is what gets written:
 * `description` and `includes` are the bilingual objects the schema now
 * defines, so a freshly seeded dataset works in both languages.
 *
 * `styleTags` and `sections` stay Vietnamese in both locales on purpose — they
 * are keys, translated for display in `lib/i18n/dictionaries/*` under `vocab`.
 */

import { TEMPLATE_PRICE_VND, type StyleTag } from './templates'

export type SeedTemplate = {
  slug: string
  name: string
  styleTags: StyleTag[]
  priceVnd: number
  imageColor: string
  expressAvailable: boolean
  description: { en: string; vi: string }
  sections: string[]
  includes: { en: string[]; vi: string[] }
  demoUrl?: string
}

const HOSTING = {
  en: 'Free glow.vn subdomain, 12 months of hosting',
  vi: 'Subdomain glow.vn miễn phí, hosting 12 tháng',
}

const RSVP = {
  en: 'Guest List + Smart RSVP',
  vi: 'Guest List + Smart RSVP',
}

function includes(photosEn: string, photosVi: string) {
  return {
    en: [photosEn, HOSTING.en, RSVP.en],
    vi: [photosVi, HOSTING.vi, RSVP.vi],
  }
}

export const MOCK_TEMPLATES: SeedTemplate[] = [
  {
    slug: 'willow',
    name: 'Willow',
    styleTags: ['Lãng mạn', 'Tối giản'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-paper-100)',
    expressAvailable: true,
    description: {
      en: 'A quiet layout with room to breathe, for a couple who want their story told slowly. Bilingual, and built for the phone first.',
      vi: 'Bố cục yên tĩnh, nhiều khoảng thở, dành cho cặp đôi muốn câu chuyện của mình được kể chậm rãi. Song ngữ, tối ưu cho điện thoại.',
    },
    sections: [
      'Trang chủ',
      'Câu chuyện',
      'Dòng thời gian',
      'RSVP',
      'Album',
      'Mừng cưới',
    ],
    includes: includes('Up to 40 photos', 'Tối đa 40 ảnh'),
    demoUrl: 'https://demo.glow.vn/willow',
  },
  {
    slug: 'marble',
    name: 'Marble',
    styleTags: ['Hiện đại'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-warm-gray-100)',
    expressAvailable: true,
    description: {
      en: 'A magazine layout: large type and full-bleed photography. Suits a wedding shoot with strong composition.',
      vi: 'Kiểu dàn trang tạp chí, chữ lớn và ảnh tràn viền. Hợp với bộ ảnh cưới mạnh về bố cục.',
    },
    sections: ['Trang chủ', 'Câu chuyện', 'Sự kiện', 'RSVP', 'Album'],
    includes: includes('Up to 60 photos', 'Tối đa 60 ảnh'),
    demoUrl: 'https://demo.glow.vn/marble',
  },
  {
    slug: 'linen',
    name: 'Linen',
    styleTags: ['Tối giản'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-warm-gray-300)',
    expressAvailable: false,
    description: {
      en: 'The plainest template in the collection. Type, white space and a few photographs — nothing else.',
      vi: 'Ít chi tiết nhất trong bộ sưu tập. Chữ, khoảng trắng và một vài bức ảnh — không gì khác.',
    },
    sections: ['Trang chủ', 'Thông tin lễ cưới', 'RSVP', 'Album'],
    includes: includes('Up to 25 photos', 'Tối đa 25 ảnh'),
    demoUrl: 'https://demo.glow.vn/linen',
  },
  {
    slug: 'amber',
    name: 'Amber',
    styleTags: ['Cổ điển'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-ink-500)',
    expressAvailable: true,
    description: {
      en: 'The feel of an old paper invitation: heavy serifs, fine rules, warm tones. Made for a traditional reception.',
      vi: 'Cảm giác thiệp giấy cũ: chữ serif đậm, viền mảnh, tông ấm. Dành cho tiệc cưới truyền thống.',
    },
    sections: [
      'Trang chủ',
      'Câu chuyện',
      'Gia đình',
      'Dòng thời gian',
      'RSVP',
      'Album',
    ],
    includes: includes('Up to 40 photos', 'Tối đa 40 ảnh'),
    demoUrl: 'https://demo.glow.vn/amber',
  },
  {
    slug: 'orchid',
    name: 'Orchid',
    styleTags: ['Lãng mạn'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-ink-700)',
    expressAvailable: false,
    description: {
      en: 'Dark ground, light type, photographs in the lead role. Suits an evening reception.',
      vi: 'Nền tối, chữ sáng, ảnh làm nhân vật chính. Hợp với tiệc cưới buổi tối.',
    },
    sections: [
      'Trang chủ',
      'Câu chuyện',
      'Sự kiện',
      'RSVP',
      'Album',
      'Mừng cưới',
    ],
    includes: includes('Up to 50 photos', 'Tối đa 50 ảnh'),
    demoUrl: 'https://demo.glow.vn/orchid',
  },
  {
    slug: 'stone',
    name: 'Stone',
    styleTags: ['Hiện đại', 'Tối giản'],
    priceVnd: TEMPLATE_PRICE_VND,
    imageColor: 'var(--color-ink-900)',
    expressAvailable: true,
    description: {
      en: 'Absolute black and white, no ornament. A tight grid that reads very fast on a phone.',
      vi: 'Đen trắng tuyệt đối, không hoa văn. Bố cục lưới chặt chẽ, đọc rất nhanh trên điện thoại.',
    },
    sections: ['Trang chủ', 'Thông tin lễ cưới', 'Dòng thời gian', 'RSVP', 'Album'],
    includes: includes('Up to 30 photos', 'Tối đa 30 ảnh'),
    demoUrl: 'https://demo.glow.vn/stone',
  },
]

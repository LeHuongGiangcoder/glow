import { defineField, defineType } from 'sanity'

/**
 * The section vocabulary, offered as a checklist so section names stay spelled
 * one way across the catalogue. Declared here rather than imported from
 * `lib/templates`: that module pulls in the Sanity fetch client, which has no
 * business inside the Studio bundle.
 */
const SECTION_OPTIONS = [
  'Trang chủ',
  'Câu chuyện',
  'Thông tin lễ cưới',
  'Album',
  'Dresscode',
  'Nhạc tự chọn',
  'Smart RSVP',
  'Mừng cưới',
  'E-visa',
  'Travel guide',
]

/**
 * Pre-filled on every new template so the editor unticks what a mẫu lacks
 * instead of retyping the whole list.
 */
const DEFAULT_SECTIONS = [
  'Trang chủ',
  'Câu chuyện',
  'Album',
  'Dresscode',
  'Nhạc tự chọn',
  'Smart RSVP',
  'Mừng cưới',
]

export const templateType = defineType({
  name: 'template',
  title: 'Mẫu giao diện (Template)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên mẫu',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Đường dẫn)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'styleTags',
      title: 'Thẻ phong cách (chỉ dùng để lọc)',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Không hiển thị trên card hay trang chi tiết. Chỉ dùng cho thanh lọc ở trang Mẫu có sẵn và để gợi ý mẫu tương tự.',
      options: {
        list: [
          'Tất cả',
          'Tối giản',
          'Lãng mạn',
          'Hiện đại',
          'Cổ điển',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceVnd',
      title: 'Giá tiền (VNĐ)',
      type: 'number',
      initialValue: 4500000,
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'priceMyr',
      title: 'Giá tiền (RM — thị trường Malaysia)',
      type: 'number',
      description:
        'Giá bán tại Malaysia, nhập trực tiếp bằng Ringgit — KHÔNG quy đổi từ VNĐ. ' +
        'Chỉ hiển thị cho khách vào từ link /malaysia. Bỏ trống thì mẫu này vẫn hiện giá VNĐ.',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Ảnh bìa (Cover Image - Display chính)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Ảnh chính hiển thị trên danh sách mẫu và trang chi tiết.',
    }),
    defineField({
      name: 'gallery',
      title: 'Danh sách ảnh (Gallery - View more khi vào chi tiết)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'localeString',
              title: 'Mô tả ảnh (Alt Text) — song ngữ',
            },
          ],
        },
      ],
      description: 'Các góc nhìn hoặc giao diện trang khác nhau của mẫu.',
    }),
    defineField({
      name: 'imageColor',
      title: 'Màu nền / CSS Variable (Khối xem trước khi chưa có ảnh)',
      type: 'string',
      description: 'Ví dụ: var(--color-paper-100)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'expressAvailable',
      title: 'Có sẵn cho hoả tốc (1-3 ngày)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Mô tả mẫu (song ngữ)',
      type: 'localeText',
      description:
        'Điền cả hai ngôn ngữ. Thiếu một bên thì site tự dùng bên còn lại.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Các section có sẵn',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Đã tick sẵn các section mặc định — chỉ cần bỏ tick section mà mẫu này không có.',
      // `initialValue` applies to new documents only; existing templates keep
      // whatever they were saved with.
      initialValue: DEFAULT_SECTIONS,
      options: {
        list: SECTION_OPTIONS,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'includes',
      title: 'Quyền lợi / Nội dung bao gồm (song ngữ)',
      type: 'localeStringArray',
      description:
        'Điền cả hai ngôn ngữ. Thiếu một bên thì site tự dùng bên còn lại.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'demoUrl',
      title: 'Đường dẫn Demo',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'coverImage',
    },
  },
})

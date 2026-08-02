import { defineField, defineType } from 'sanity'

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
      name: 'mood',
      title: 'Phục vụ tâm trạng / Phong cách',
      type: 'string',
      description: 'Ví dụ: Lãng mạn · Tối giản',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'styleTags',
      title: 'Thẻ phong cách (Style Tags)',
      type: 'array',
      of: [{ type: 'string' }],
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
      name: 'imageColor',
      title: 'Màu nền / CSS Variable (Khối xem trước)',
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
      title: 'Mô tả mẫu',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Các section có sẵn',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'includes',
      title: 'Quyền lợi / Nội dung bao gồm',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'demoUrl',
      title: 'Đường dẫn Demo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'mood',
    },
  },
})

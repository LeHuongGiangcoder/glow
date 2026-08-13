import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'
import { MOCK_TEMPLATES } from '@/lib/seed-data'

export async function GET() {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json(
        { error: 'Missing SANITY_API_TOKEN in environment variables.' },
        { status: 500 },
      )
    }

    const results = []

    for (const item of MOCK_TEMPLATES) {
      const doc = {
        _id: `template-${item.slug}`,
        _type: 'template',
        name: item.name,
        slug: {
          _type: 'slug',
          current: item.slug,
        },
        styleTags: item.styleTags,
        priceVnd: item.priceVnd,
        imageColor: item.imageColor,
        expressAvailable: item.expressAvailable,
        // Bilingual objects, matching `localeText` / `localeStringArray`.
        description: { _type: 'localeText', ...item.description },
        sections: item.sections,
        includes: { _type: 'localeStringArray', ...item.includes },
        demoUrl: item.demoUrl,
      }

      const res = await writeClient.createOrReplace(doc)
      results.push({ slug: item.slug, id: res._id })
    }

    return NextResponse.json({
      message: 'Successfully seeded templates into Sanity!',
      count: results.length,
      templates: results,
    })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const scriptUrl = process.env.GOOGLE_SCRIPT_BOOKING_URL

    if (!scriptUrl) {
      return NextResponse.json(
        { error: 'Chưa cấu hình GOOGLE_SCRIPT_BOOKING_URL' },
        { status: 500 },
      )
    }

    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      redirect: 'follow',
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Lỗi kết nối server'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

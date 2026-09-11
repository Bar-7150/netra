export async function POST(request) {
  try {
    const { targetUrl } = await request.json()

    if (!targetUrl) {
      return Response.json({ message: 'Target URL is required' }, { status: 400 })
    }

    const url = new URL(targetUrl)
    const response = await fetch(url, { method: 'GET', redirect: 'follow', cache: 'no-store' })
    const requiredHeaders = [
      'strict-transport-security',
      'x-frame-options',
      'x-content-type-options',
    ]
    const missingHeaders = requiredHeaders.filter((header) => !response.headers.has(header))
    const https = url.protocol === 'https:'
    const score = Math.max(0, 100 - (missingHeaders.length * 12) - (https ? 0 : 18))

    return Response.json({
      targetUrl,
      status: response.ok ? 'ok' : 'warning',
      https,
      missingHeaders,
      score,
    })
  } catch (error) {
    return Response.json(
      { message: error.message || 'Security scan failed' },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const { identifier } = await request.json()
    const trimmed = identifier?.trim()

    if (!trimmed) {
      return Response.json({ message: 'Identifier is required' }, { status: 400 })
    }

    const response = await fetch(
      `https://haveibeenpwned.com/api/v2/breachedaccount/${encodeURIComponent(trimmed)}`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'sunfolio-security-tools',
        },
        cache: 'no-store',
      },
    )

    if (response.status === 404) {
      return Response.json({
        identifier: trimmed,
        pwned: false,
        count: 0,
        source: 'Have I Been Pwned (free v2)',
        message: null,
      })
    }

    if (!response.ok) {
      return Response.json({
        identifier: trimmed,
        pwned: false,
        count: 0,
        source: 'HIBP unavailable',
        message: 'The breach lookup service is unavailable right now.',
      })
    }

    const breaches = await response.json()
    return Response.json({
      identifier: trimmed,
      pwned: Array.isArray(breaches) && breaches.length > 0,
      count: Array.isArray(breaches) ? breaches.length : 0,
      source: 'Have I Been Pwned (free v2)',
      message: null,
    })
  } catch {
    return Response.json({ message: 'HIBP lookup failed' }, { status: 500 })
  }
}

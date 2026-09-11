export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 },
      )
    }

    return Response.json({
      success: true,
      message: 'Contact message received successfully.',
    }, { status: 201 })
  } catch {
    return Response.json(
      { success: false, message: 'Unable to process contact message.' },
      { status: 400 },
    )
  }
}

import { connectToDatabase } from '../../../lib/mongodb'
import ContactMessage from '../../../lib/models/ContactMessage'

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 },
      )
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json(
        { success: false, message: 'A valid email address is required.' },
        { status: 400 },
      )
    }

    await connectToDatabase()
    await ContactMessage.create({ name, email, subject, message })

    return Response.json({
      success: true,
      message: 'Contact message saved successfully.',
    }, { status: 201 })
  } catch (error) {
    console.error('Contact message failed:', error)
    return Response.json(
      { success: false, message: 'Unable to save contact message.' },
      { status: 500 },
    )
  }
}

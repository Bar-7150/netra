import zxcvbn from 'zxcvbn'

export async function POST(request) {
  try {
    const { password } = await request.json()

    if (!password) {
      return Response.json({ message: 'Password is required' }, { status: 400 })
    }

    const result = zxcvbn(password)
    const label = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][result.score] || 'Unknown'

    return Response.json({
      score: result.score,
      label,
      feedback: result.feedback,
      estimatedGuesses: result.guesses,
    })
  } catch {
    return Response.json({ message: 'Password analysis failed' }, { status: 500 })
  }
}

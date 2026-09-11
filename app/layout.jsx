import '../src/index.css'
import '../src/App.css'

export const metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
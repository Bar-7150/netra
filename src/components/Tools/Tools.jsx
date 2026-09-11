import { useMemo, useState } from 'react'
import zxcvbn from 'zxcvbn'
import './Tools.css'

const API_BASE = '/api/tools'

function Tools() {
  const [email, setEmail] = useState('')
  const [pwnedResult, setPwnedResult] = useState(null)
  const [password, setPassword] = useState('')
  const [scanUrl, setScanUrl] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const passwordScore = useMemo(() => zxcvbn(password), [password])

  const strengthLabel = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordScore.score] || 'Empty'
  const strengthTone = ['danger', 'warn', 'warn', 'good', 'strong'][passwordScore.score] || 'idle'

  const handlePwnedCheck = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setMessage('Enter an email or username to check against HIBP.')
      return
    }

    setLoading(true)
    setMessage('')
    try {
      const response = await fetch(`${API_BASE}/pwned-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email.trim() })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to check HIBP status')

      setPwnedResult(data)
      setMessage(data.pwned ? 'This account appears in a known breach history.' : 'No breach record was found for this account.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordCheck = async (e) => {
    e.preventDefault()
    if (!password.trim()) {
      setMessage('Enter a password to measure its strength.')
      return
    }

    setLoading(true)
    setMessage('')
    try {
      const response = await fetch(`${API_BASE}/password-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, label: email || 'user-input' })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to assess password strength')

      setMessage(`Password score: ${data.score}/4 (${data.label}).`)
      setPwnedResult(null)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSecurityScan = async (e) => {
    e.preventDefault()
    if (!scanUrl.trim()) {
      setMessage('Enter a URL to start the security scan.')
      return
    }

    setLoading(true)
    setMessage('')
    try {
      const response = await fetch(`${API_BASE}/security-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUrl: scanUrl.trim() })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to run the security scan')

      setScanResult(data)
      setMessage('Security scan completed.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="tools-section">
      <p className="tools-label">// security_tools.v1</p>
      <h2>Security Tools</h2>
      <p className="tools-intro">
        Test breach exposure, measure password strength, and run a quick security scan.
      </p>
      
      

      <div className="tools-grid">
        <article className="">
          <div className="tool-header">
            <h3>HIBP Breach Check</h3>
            <span className="tool-chip">Have I Been Pwned</span>
          </div>
          <p>Check whether an email or username is linked to a known breach.</p>
          <form onSubmit={handlePwnedCheck} className="tool-form">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email or username" />
            <button type="submit" disabled={loading}>Check breach</button>
          </form>
          {pwnedResult && (
            <div className="result-box">
              <strong>Status:</strong> {pwnedResult.pwned ? 'Pwned' : 'Clear'}
              <br />
              <strong>Breaches:</strong> {pwnedResult.count || 0}
              <br />
              <strong>Source:</strong> {pwnedResult.source || 'Have I Been Pwned'}
            </div>
          )}
        </article>

        <article className="">
          <div className="tool-header">
            <h3>Password Strength</h3>
            <span className="tool-chip">zxcvbn</span>
          </div>
          <p>Measure password quality in real time.</p>
          <form onSubmit={handlePasswordCheck} className="tool-form">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a password" />
            <button type="submit" disabled={loading}>Analyse strength</button>
          </form>
          <div className="meter-wrap">
            <div className="meter-bar">
              <div className={`meter-fill ${strengthTone}`} style={{ width: `${(passwordScore.score + 1) * 20}%` }} />
            </div>
            <span className={`strength-text ${strengthTone}`}>{password ? `${strengthLabel} (${passwordScore.score + 1}/5)` : 'Waiting for input'}</span>
          </div>
          {passwordScore.feedback?.warning && <p className="feedback">Warning: {passwordScore.feedback.warning}</p>}
          {passwordScore.feedback?.suggestions?.length > 0 && <p className="feedback">Tip: {passwordScore.feedback.suggestions[0]}</p>}
        </article>

        <article className="wide-card">
          <div className="tool-header">
            <h3>Security Scan API</h3>
            <span className="tool-chip">Quick audit</span>
          </div>
          <p>Run a lightweight security review on a target URL.</p>
          <form onSubmit={handleSecurityScan} className="tool-form">
            <input value={scanUrl} onChange={(e) => setScanUrl(e.target.value)} placeholder="https://example.com" />
            <button type="submit" disabled={loading}>Run scan</button>
          </form>
          {scanResult && (
            <div className="result-box">
              <strong>Target:</strong> {scanResult.targetUrl}
              <br />
              <strong>Status:</strong> {scanResult.status}
              <br />
              <strong>HTTPS:</strong> {scanResult.https ? 'Yes' : 'No'}
              <br />
              <strong>Security Score:</strong> {scanResult.score}/100
              <br />
              <strong>Missing headers:</strong> {scanResult.missingHeaders.length ? scanResult.missingHeaders.join(', ') : 'None found'}
            </div>
          )}
        </article>
      </div>

      {message && <p className="tools-message">{message}</p>}
    </section>
  )
}

export default Tools

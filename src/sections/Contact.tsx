import { useState, type FormEvent } from 'react'
import './Contact.css'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

type ContactSubmitResponse = {
  ok?: boolean
  message?: string
  error?: string
}

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
  const functionEndpoint = supabaseUrl
    ? `${supabaseUrl}/functions/v1/contact-submit`
    : ''

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!functionEndpoint) {
      setSubmitState('error')
      setSubmitMessage('Missing Supabase URL configuration.')
      return
    }

    setSubmitState('submitting')
    setSubmitMessage('')

    try {
      const response = await fetch(functionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim() || null,
          email: email.trim(),
          message: message.trim(),
          website: '',
        }),
      })

      const rawResponseText = await response.text()
      let data: ContactSubmitResponse = {}

      if (rawResponseText) {
        try {
          data = JSON.parse(rawResponseText) as ContactSubmitResponse
        } catch {
          data = {}
        }
      }

      if (!response.ok || !data.ok) {
        setSubmitState('error')
        setSubmitMessage(data.error || 'Unable to send your message. Please try again.')
        return
      }

      setSubmitState('success')
      setSubmitMessage(data.message || 'Message sent successfully.')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setSubmitState('error')
      setSubmitMessage('Network error while sending message. Please retry.')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-card">
        <div className="contact-form-pane">
          <h2 className="contact-title">C O N T A C T</h2>
          <p className="contact-subtitle">
            Let us talk about your next build. Share your message and I will reply soon.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value=""
                readOnly
              />
            </div>

            <label htmlFor="contact-name">Name (Optional)</label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              maxLength={120}
            />

            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />

            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message here..."
              rows={6}
              minLength={10}
              maxLength={4000}
            />

            {submitMessage ? (
              <p className={`contact-status ${submitState}`} role="status" aria-live="polite">
                {submitMessage}
              </p>
            ) : null}

            <button
              className="primary-button"
              type="submit"
              disabled={submitState === 'submitting'}
            >
              {submitState === 'submitting' ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </div>

        <aside className="contact-meta-pane">
          <p className="contact-meta-label">Email</p>
          <a href="mailto:zafeer02@gmail.com">zafeer02@gmail.com</a>

          <p className="contact-meta-label">Base</p>
          <p>Dallas | TX | USA</p>
        </aside>
      </div>
    </section>
  )
}

export default Contact

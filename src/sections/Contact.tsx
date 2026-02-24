import { useState, type FormEvent } from 'react'
import './Contact.css'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = `Portfolio Contact from ${name.trim() || 'Visitor'}`
    const body = [
      `Name: ${name.trim() || 'Not provided'}`,
      `Email: ${email.trim()}`,
      '',
      'Message:',
      message.trim(),
    ].join('\n')

    const params = new URLSearchParams({
      subject,
      body,
    })

    window.location.href = `mailto:zafeer02@gmail.com?${params.toString()}`
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
            <label htmlFor="contact-name">Name (Optional)</label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
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
            />

            <button className="primary-button" type="submit">
              Send message
            </button>
          </form>
        </div>

        <aside className="contact-meta-pane">
          <p className="contact-meta-label">Email</p>
          <a href="mailto:your.email@example.com">zafeer02@gmail.com</a>

          <p className="contact-meta-label">Base</p>
          <p>Dallas | TX | USA</p>
        </aside>
      </div>
    </section>
  )
}

export default Contact

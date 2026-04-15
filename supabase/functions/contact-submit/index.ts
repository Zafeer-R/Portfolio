import { createClient } from 'npm:@supabase/supabase-js@2'

type ContactSubmissionRequest = {
  name?: string | null
  email: string
  message: string
}

type ContactSubmissionResponse = {
  ok: boolean
  message?: string
  error?: string
  details?: string
}

type ValidationResult =
  | { ok: true; value: ContactSubmissionRequest }
  | { ok: false; error: string }

type ResendSendResponse = {
  id?: string
  message?: string
  error?: string
}
const RESEND_SEND_URL = 'https://api.resend.com/emails'
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_SUBMISSIONS = 5

const DEFAULT_ALLOWED_ORIGINS = [
  'https://zafeerrangoonwala.com',
  'https://www.zafeerrangoonwala.com',
  'https://website-v1.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

function getAllowedOrigins(): Set<string> {
  const configuredOrigins = (Deno.env.get('CONTACT_ALLOWED_ORIGINS') ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...configuredOrigins])
}

function isOriginAllowed(origin: string | null, allowedOrigins: Set<string>): boolean {
  if (!origin) {
    return true
  }

  return allowedOrigins.has(origin)
}

function getCorsHeaders(origin: string | null, allowedOrigins: Set<string>) {
  const firstAllowedOrigin = allowedOrigins.values().next().value as
    | string
    | undefined
  const fallbackOrigin = firstAllowedOrigin ?? DEFAULT_ALLOWED_ORIGINS[0]
  const allowOrigin = origin && allowedOrigins.has(origin) ? origin : fallbackOrigin

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type',
    Vary: 'Origin',
  }
}

function jsonResponse(
  body: ContactSubmissionResponse,
  status: number,
  origin: string | null,
  allowedOrigins: Set<string>
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...getCorsHeaders(origin, allowedOrigins),
      'Content-Type': 'application/json',
    },
  })
}

function extractClientIp(request: Request): string | null {
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(',')
    return firstIp?.trim() ?? null
  }

  return null
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validateRequestBody(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Validation failed' }
  }

  const raw = body as {
    name?: unknown
    email?: unknown
    message?: unknown
    website?: unknown
  }

  const name = typeof raw.name === 'string' ? raw.name.trim() : ''
  const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : ''
  const message = typeof raw.message === 'string' ? raw.message.trim() : ''
  const website = typeof raw.website === 'string' ? raw.website.trim() : ''

  if (website) {
    return { ok: false, error: 'Validation failed' }
  }

  if (!email || !isValidEmail(email) || email.length > 320) {
    return { ok: false, error: 'Validation failed' }
  }

  if (!message || message.length < 10 || message.length > 4000) {
    return { ok: false, error: 'Validation failed' }
  }

  if (name.length > 120) {
    return { ok: false, error: 'Validation failed' }
  }

  return {
    ok: true,
    value: {
      name: name || null,
      email,
      message,
    },
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function buildEmailText(payload: {
  name: string | null
  email: string
  message: string
}) {
  return [
    'New contact submission from zafeerrangoonwala.com',
    '',
    `Name: ${payload.name ?? 'Not provided'}`,
    `Email: ${payload.email}`,
    '',
    'Message:',
    payload.message,
  ].join('\n')
}

function buildEmailHtml(payload: {
  name: string | null
  email: string
  message: string
}) {
  const safeName = escapeHtml(payload.name ?? 'Not provided')
  const safeEmail = escapeHtml(payload.email)
  const safeMessage = escapeHtml(payload.message).replaceAll('\n', '<br />')

  return `
    <h2>New contact submission from zafeerrangoonwala.com</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Message:</strong></p>
    <p>${safeMessage}</p>
  `
}

async function sendWithResend(params: {
  apiKey: string
  fromEmail: string
  toEmail: string
  payload: {
    name: string | null
    email: string
    message: string
  }
}): Promise<{ ok: true; providerMessageId: string } | { ok: false; error: string }> {
  const response = await fetch(RESEND_SEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: params.fromEmail,
      to: [params.toEmail],
      reply_to: params.payload.email,
      subject: `New portfolio contact: ${params.payload.email}`,
      text: buildEmailText(params.payload),
      html: buildEmailHtml(params.payload),
    }),
  })

  const rawText = await response.text()
  let data: ResendSendResponse = {}

  if (rawText) {
    try {
      data = JSON.parse(rawText) as ResendSendResponse
    } catch {
      data = {}
    }
  }

  if (!response.ok || !data.id) {
    return {
      ok: false,
      error:
        data.message || data.error || 'Resend rejected the email send request.',
    }
  }

  return {
    ok: true,
    providerMessageId: data.id,
  }
}

async function isRateLimited(params: {
  supabase: ReturnType<typeof createClient>
  sourceIp: string | null
}): Promise<boolean> {
  if (!params.sourceIp) {
    return false
  }

  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
  const { count, error } = await params.supabase
    .from('contact_submissions')
    .select('id', { count: 'exact', head: true })
    .eq('source_ip', params.sourceIp)
    .gte('created_at', windowStart)

  if (error) {
    console.error('Failed to check contact submission rate limit:', error)
    return false
  }

  return (count ?? 0) >= RATE_LIMIT_MAX_SUBMISSIONS
}

Deno.serve(async (request) => {
  const origin = request.headers.get('origin')
  const allowedOrigins = getAllowedOrigins()

  try {
    if (!isOriginAllowed(origin, allowedOrigins)) {
      return jsonResponse(
        { ok: false, error: 'Origin not allowed' },
        403,
        origin,
        allowedOrigins
      )
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(origin, allowedOrigins),
      })
    }

    if (request.method !== 'POST') {
      return jsonResponse(
        { ok: false, error: 'Method not allowed' },
        405,
        origin,
        allowedOrigins
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? ''
    const contactFromEmail = Deno.env.get('CONTACT_FROM_EMAIL') ?? ''
    const contactToEmail = Deno.env.get('CONTACT_TO_EMAIL') ?? 'zafeer02@gmail.com'

    if (
      !supabaseUrl ||
      !supabaseServiceRoleKey ||
      !resendApiKey ||
      !contactFromEmail
    ) {
      return jsonResponse(
        { ok: false, error: 'Server configuration error' },
        500,
        origin,
        allowedOrigins
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return jsonResponse(
        { ok: false, error: 'Validation failed' },
        400,
        origin,
        allowedOrigins
      )
    }

    const validation = validateRequestBody(body)
    if (!validation.ok) {
      return jsonResponse(
        { ok: false, error: validation.error },
        400,
        origin,
        allowedOrigins
      )
    }

    const payload = validation.value
    const sourceIp = extractClientIp(request)
    const userAgent = request.headers.get('user-agent')

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    if (await isRateLimited({ supabase, sourceIp })) {
      return jsonResponse(
        { ok: false, error: 'Too many submissions. Please try again later.' },
        429,
        origin,
        allowedOrigins
      )
    }

    const { data: insertedSubmission, error: insertError } = await supabase
      .from('contact_submissions')
      .insert({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        source_ip: sourceIp,
        user_agent: userAgent,
        status: 'received',
      })
      .select('id')
      .single()

    if (insertError || !insertedSubmission) {
      console.error('Failed to store contact submission:', insertError)

      return jsonResponse(
        { ok: false, error: 'Failed to store submission' },
        500,
        origin,
        allowedOrigins
      )
    }

    const sendResult = await sendWithResend({
      apiKey: resendApiKey,
      fromEmail: contactFromEmail,
      toEmail: contactToEmail,
      payload: {
        name: payload.name,
        email: payload.email,
        message: payload.message,
      },
    })

    if (!sendResult.ok) {
      await supabase
        .from('contact_submissions')
        .update({
          status: 'failed',
          error_message: sendResult.error,
        })
        .eq('id', insertedSubmission.id)

      return jsonResponse(
        { ok: false, error: 'Unable to send your message. Please try again later.' },
        502,
        origin,
        allowedOrigins
      )
    }

    await supabase
      .from('contact_submissions')
      .update({
        status: 'sent',
        provider_message_id: sendResult.providerMessageId,
        error_message: null,
      })
      .eq('id', insertedSubmission.id)

    return jsonResponse(
      {
        ok: true,
        message: 'Message sent successfully.',
      },
      200,
      origin,
      allowedOrigins
    )
  } catch (error) {
    console.error('Unhandled error in contact-submit:', error)

    return new Response(
      JSON.stringify({ ok: false, error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          ...getCorsHeaders(origin, allowedOrigins),
          'Content-Type': 'application/json',
        },
      }
    )
  }
})

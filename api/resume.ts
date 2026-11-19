/**
 * Serves the resume as a PDF, exported live from a Google Doc (Vercel function).
 * The doc must be shared as "Anyone with the link can view".
 * The doc id below can be overridden with RESUME_DOC_ID in the Vercel dashboard.
 *   GET /api/resume -> the PDF, cached at the CDN for 10 minutes
 * If Google is unavailable it redirects to the bundled copy in /public.
 */
const FALLBACK = '/Zafeer_Resume.pdf'
const DOC_ID = process.env.RESUME_DOC_ID ?? '15TFAFYSvZGz0pt8TjdUAY-JJjTDNtev7FvPnQB1aARM'

const fallback = () => new Response(null, { status: 302, headers: { location: FALLBACK, 'cache-control': 'no-store' } })

export async function GET() {
  try {
    const res = await fetch(`https://docs.google.com/document/d/${encodeURIComponent(DOC_ID)}/export?format=pdf`)
    // Google answers with an HTML sign-in page when the doc is private or the id is wrong, so only accept a real PDF.
    if (!res.ok || !res.body || !(res.headers.get('content-type') ?? '').includes('application/pdf')) return fallback()
    return new Response(res.body, {
      headers: {
        'content-type': 'application/pdf',
        'content-disposition': 'attachment; filename="Zafeer_Resume.pdf"',
        'cache-control': 'public, s-maxage=600, stale-while-revalidate=86400',
      },
    })
  } catch {
    return fallback()
  }
}

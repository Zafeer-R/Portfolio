/**
 * Visitor counter for the welcome page (Vercel function).
 * Stores one number in Upstash Redis, which you add from the Vercel dashboard (Storage tab).
 *   GET  /api/views  -> { count }
 *   POST /api/views  -> adds 1, then { count }
 */
const KEY = 'zr:visitors'

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN

async function redis(command: string): Promise<number> {
  const res = await fetch(`${url}/${command}/${KEY}`, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) throw new Error(`redis ${res.status}`)
  const body = (await res.json()) as { result: number | string | null }
  return Number(body.result ?? 0)
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } })

export async function GET() {
  if (!url || !token) return json({ error: 'counter not configured' }, 503)
  try {
    return json({ count: await redis('get') })
  } catch {
    return json({ error: 'counter unavailable' }, 502)
  }
}

export async function POST() {
  if (!url || !token) return json({ error: 'counter not configured' }, 503)
  try {
    return json({ count: await redis('incr') })
  } catch {
    return json({ error: 'counter unavailable' }, 502)
  }
}

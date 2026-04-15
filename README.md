# Raycast-Inspired Loader Site

A modular React + Vite site with a Raycast-style loading screen that fades into the main layout.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build locally

## Structure

- `src/components` - Loader and layout components
- `src/sections` - Page sections such as the hero and highlights
- `src/index.css` - Global styles and design tokens

## Customize

- Update copy in `LoaderScreen`, `Hero`, and `Highlights`.
- Adjust the loader duration in `App.tsx`.
- Tweak colors in `src/index.css` and background layers in `src/App.css`.

## Contact Backend Setup

This project includes a direct-to-inbox pipeline via Supabase Edge Functions, Resend, and Postgres.

1. Frontend env:
- Copy `.env.example` to `.env.local`.
- Fill `VITE_SUPABASE_URL`.

2. Supabase database:
- Run the migration in `supabase/migrations/20260304120000_create_contact_submissions.sql`.

3. Supabase function secrets:
- Use `supabase/functions/contact-submit/.env.example` as reference.
- Set the Supabase service role and Resend values with `supabase secrets set ...` in your Supabase project.
- Optional: set `CONTACT_ALLOWED_ORIGINS` as a comma-separated list when adding domains or preview deployments.

4. Deploy edge function:
- `supabase functions deploy contact-submit --no-verify-jwt`

5. DNS and provider wiring:
- Verify `zafeerrangoonwala.com` in Resend and configure SPF/DKIM.

## Contact Delivery Troubleshooting

If a local form submission appears in Supabase but does not show up in Gmail, inspect the latest rows:

```sql
select created_at, email, status, provider_message_id, error_message
from public.contact_submissions
order by created_at desc
limit 10;
```

- `status = 'failed'`: Resend rejected the send. Check `error_message`, the `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and domain verification.
- `status = 'sent'`: Resend accepted the send. Check Resend delivery logs, Gmail spam, filters, and All Mail.
- `status = 'received'`: The database insert finished, but the send/update step did not. Check Supabase Edge Function logs.

The contact function rejects filled honeypot submissions and limits each source IP to 5 submissions per 10 minutes.

After changing function secrets or DNS/provider settings, redeploy:

```bash
supabase functions deploy contact-submit --no-verify-jwt
```

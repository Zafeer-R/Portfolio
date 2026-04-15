create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null check (char_length(trim(email)) > 0),
  message text not null check (char_length(trim(message)) > 0),
  source_ip text,
  user_agent text,
  status text not null default 'received' check (status in ('received', 'sent', 'failed')),
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_email_idx
  on public.contact_submissions (email);

alter table public.contact_submissions enable row level security;

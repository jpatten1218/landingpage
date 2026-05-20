-- Whole Dad Movement: 1:1 coaching application intake.
-- Writes are made from the Next.js API route using the service-role key,
-- so RLS is enabled and no public policies are granted.

create extension if not exists "pgcrypto";

create table if not exists public.applications (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  full_name   text not null,
  email       text not null,
  phone       text,
  age         smallint check (age is null or (age between 13 and 120)),
  role        text,

  struggle    text,
  story       text not null,
  readiness   text,
  investment  text,
  consent     boolean not null default false,

  user_agent  text,
  referer     text,

  status      text not null default 'new'
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

create index if not exists applications_email_idx
  on public.applications (email);

alter table public.applications enable row level security;

-- No policies on purpose: only the service-role key (server-side) can read/write.

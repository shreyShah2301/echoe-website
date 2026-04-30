-- Echoe waitlist
-- All writes go through the `subscribe-waitlist` Edge Function (service_role insert).
-- No anon/authenticated policies are granted on this table; direct PostgREST writes are denied.
-- Reads are also denied to anon/authenticated; only service_role (Edge Function, dashboard) can read.

create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id          uuid        primary key default gen_random_uuid(),
  email       text        not null unique,
  source      text,
  created_at  timestamptz not null default now(),
  -- DB-level canonicalization guarantee. Edge Function lowercases before insert.
  constraint waitlist_email_lowercase check (email = lower(email))
);

alter table public.waitlist enable row level security;

-- No policies are granted intentionally.
-- With RLS enabled and zero policies, anon/authenticated cannot insert/select/update/delete.
-- service_role bypasses RLS by default in Supabase, so the Edge Function still works.

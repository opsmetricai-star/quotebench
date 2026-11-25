-- QuoteBench schema. Run in Supabase SQL editor.
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  company text,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'trial' check (plan in ('trial','plan47','plan97')),
  status text not null default 'active' check (status in ('active','canceled','pending')),
  activated_by text,            -- admin email that verified the payment
  payment_reference text,       -- Selar order reference checked by the admin
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.benchmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  supplier text not null,
  purchase_type text not null check (purchase_type in ('new','renewal')),
  line_items jsonb not null,
  quoted_total numeric not null,
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  supplier text,
  file_path text,
  contract_text text,
  review jsonb,
  renewal_date date,
  annual_value numeric,
  created_at timestamptz not null default now()
);

create table if not exists public.negotiations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  benchmark_id uuid references public.benchmarks(id) on delete set null,
  supplier text not null,
  current_price numeric not null,
  target_price numeric,
  status text not null default 'draft' check (status in ('draft','approved','in_progress','closed')),
  plan jsonb not null,
  final_price numeric,
  created_at timestamptz not null default now()
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('benchmark','contract_review','negotiation_plan')),
  created_at timestamptz not null default now()
);
create index if not exists usage_events_user_month on public.usage_events (user_id, created_at);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security: every table is owner-only.
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.benchmarks enable row level security;
alter table public.contracts enable row level security;
alter table public.negotiations enable row level security;
alter table public.usage_events enable row level security;
alter table public.notifications enable row level security;

create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);
-- Subscriptions are read-only for users; only the service role (admin flow) writes them.
create policy "own subscription read" on public.subscriptions for select using (auth.uid() = user_id);

create policy "own benchmarks" on public.benchmarks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own contracts" on public.contracts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own negotiations" on public.negotiations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own usage read" on public.usage_events for select using (auth.uid() = user_id);
create policy "own notifications" on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- usage_events inserts happen server-side only (service role) so users cannot reset their own quota.

-- Create profile + trial subscription on signup.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, company)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'company');
  insert into public.subscriptions (user_id, plan, status) values (new.id, 'trial', 'active');
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Private storage bucket for contract uploads, scoped to <user_id>/ folders.
insert into storage.buckets (id, name, public) values ('contracts', 'contracts', false)
on conflict (id) do nothing;
create policy "contracts upload own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'contracts' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "contracts read own folder" on storage.objects for select to authenticated
  using (bucket_id = 'contracts' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "contracts delete own folder" on storage.objects for delete to authenticated
  using (bucket_id = 'contracts' and (storage.foldername(name))[1] = auth.uid()::text);

-- Public demo requests: written by the server (service role) only; no client policies.
create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, company text, message text,
  created_at timestamptz not null default now()
);
alter table public.demo_requests enable row level security;

-- Table privileges (newer Supabase projects do not auto-grant). RLS still limits rows to the owner.
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant select, update on public.profiles to authenticated;
grant select on public.subscriptions to authenticated;
grant select, insert, update, delete on public.benchmarks, public.contracts, public.negotiations, public.notifications to authenticated;
grant select on public.usage_events to authenticated;

-- Execute in the Supabase SQL editor. No visitor data is accessible to anon or authenticated roles.
create table if not exists public.portfolio_visits (
  session_id uuid not null,
  path text not null,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  views integer not null default 1,
  device text not null,
  os text not null,
  browser text not null,
  country text not null default '',
  city text not null default '',
  primary key (session_id, path)
);
create table if not exists public.portfolio_rate_limits (
  bucket text primary key,
  started timestamptz not null default now(),
  hits integer not null default 1
);
alter table public.portfolio_visits enable row level security;
alter table public.portfolio_rate_limits enable row level security;
revoke all on public.portfolio_visits, public.portfolio_rate_limits from anon, authenticated;

create or replace function public.portfolio_take_rate_limit(bucket text, maximum integer, window_seconds integer)
returns boolean language plpgsql security invoker set search_path = public as $$
declare count_hits integer;
begin
  insert into portfolio_rate_limits as limits (bucket) values (portfolio_take_rate_limit.bucket)
  on conflict on constraint portfolio_rate_limits_pkey do update set
    hits = case when limits.started < now() - make_interval(secs => window_seconds) then 1 else limits.hits + 1 end,
    started = case when limits.started < now() - make_interval(secs => window_seconds) then now() else limits.started end
  returning hits into count_hits;
  delete from portfolio_rate_limits where started < now() - interval '1 day';
  return count_hits <= maximum;
end;
$$;

create or replace function public.portfolio_record_visit(
  visit_session uuid, visit_path text, visit_device text, visit_os text, visit_browser text,
  visit_country text, visit_city text, page_view boolean
) returns void language plpgsql security invoker set search_path = public as $$
begin
  insert into portfolio_visits as visits (session_id, path, device, os, browser, country, city)
  values (visit_session, visit_path, visit_device, visit_os, visit_browser, visit_country, visit_city)
  on conflict (session_id, path) do update set
    last_seen = now(),
    views = visits.views + case when page_view then 1 else 0 end;
  -- Retain a rolling 30 days of sessions.
  delete from portfolio_visits where last_seen < now() - interval '30 days';
end;
$$;

create or replace function public.portfolio_visit_report(since_time timestamptz)
returns jsonb language sql security invoker set search_path = public as $$
  select jsonb_build_object(
    'sessions', (select count(distinct session_id) from portfolio_visits where last_seen >= since_time),
    'views', (select coalesce(sum(views), 0) from portfolio_visits where last_seen >= since_time),
    'active', (select count(distinct session_id) from portfolio_visits where last_seen >= now() - interval '5 minutes'),
    'rows', coalesce((select jsonb_agg(row_data) from (
      select session_id, path, first_seen, last_seen, views, device, os, browser, country, city
      from portfolio_visits where last_seen >= since_time order by last_seen desc limit 200
    ) row_data), '[]'::jsonb)
  );
$$;
revoke all on function public.portfolio_take_rate_limit(text, integer, integer) from public, anon, authenticated;
revoke all on function public.portfolio_record_visit(uuid, text, text, text, text, text, text, boolean) from public, anon, authenticated;
revoke all on function public.portfolio_visit_report(timestamptz) from public, anon, authenticated;
grant all on public.portfolio_visits, public.portfolio_rate_limits to service_role;
grant execute on function public.portfolio_take_rate_limit(text, integer, integer) to service_role;
grant execute on function public.portfolio_record_visit(uuid, text, text, text, text, text, text, boolean) to service_role;
grant execute on function public.portfolio_visit_report(timestamptz) to service_role;

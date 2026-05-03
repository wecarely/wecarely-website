-- filter_clicks: tracks every QuickFilter tile click for future ranking
-- Run this in Supabase Dashboard → SQL Editor

create table if not exists filter_clicks (
  id          bigserial primary key,
  filter_key  text        not null,  -- e.g. 'lang=spanish', 'ins=medicaid', 'svc=dementia'
  city        text        not null,  -- slug, e.g. 'houston', 'dallas'
  clicked_at  timestamptz not null default now()
);

-- Fast aggregation: count clicks per filter per city in a date range
create index if not exists filter_clicks_key_city_time
  on filter_clicks (filter_key, city, clicked_at desc);

-- RLS: anyone can insert (fire-and-forget tracking), only service role reads
alter table filter_clicks enable row level security;

create policy "allow_anon_insert" on filter_clicks
  for insert
  to anon, authenticated
  with check (
    filter_key in (
      'lang=spanish', 'lang=vietnamese', 'lang=chinese',
      'ins=medicaid',
      'svc=dementia', 'svc=hospice'
    )
    and length(city) < 100
  );

-- Helper view: top filters per city, last 30 days
-- Use this later when implementing dynamic ranking
create or replace view filter_click_counts as
select
  filter_key,
  city,
  count(*)                   as clicks,
  max(clicked_at)            as last_clicked_at
from filter_clicks
where clicked_at > now() - interval '30 days'
group by filter_key, city
order by clicks desc;

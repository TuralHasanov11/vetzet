create extension if not exists pgcrypto;

create type public.language_code as enum ('az', 'en', 'ru');

create table public.species (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon_url text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.species_translations (
  species_id uuid not null references public.species(id) on delete cascade,
  language public.language_code not null,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (species_id, language)
);

create table public.analysis_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.analysis_category_translations (
  category_id uuid not null references public.analysis_categories(id) on delete cascade,
  language public.language_code not null,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (category_id, language)
);

create table public.analysis_methods (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.analysis_method_translations (
  method_id uuid not null references public.analysis_methods(id) on delete cascade,
  language public.language_code not null,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (method_id, language)
);

create table public.sample_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sample_type_translations (
  sample_type_id uuid not null references public.sample_types(id) on delete cascade,
  language public.language_code not null,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (sample_type_id, language)
);

create table public.analyses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  species_id uuid not null references public.species(id) on delete cascade,
  category_id uuid references public.analysis_categories(id) on delete set null,
  method_id uuid references public.analysis_methods(id) on delete set null,
  sample_type_id uuid not null references public.sample_types(id) on delete restrict,
  sample_amount text,
  storage_conditions text,
  turnaround_time text,
  display_order int not null default 0,
  price numeric(10, 2),
  currency text not null default 'AZN',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.analysis_translations (
  analysis_id uuid not null references public.analyses(id) on delete cascade,
  language public.language_code not null,
  name text not null,
  required_material text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (analysis_id, language)
);

create table public.analysis_species (
  analysis_id uuid not null references public.analyses(id) on delete cascade,
  species_id uuid not null references public.species(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (analysis_id, species_id)
);

create index analysis_methods_display_order_idx on public.analysis_methods(display_order);
create index analysis_methods_is_active_idx on public.analysis_methods(is_active);
create index sample_types_display_order_idx on public.sample_types(display_order);
create index sample_types_is_active_idx on public.sample_types(is_active);
create index analyses_category_id_idx on public.analyses(category_id);
create index analyses_display_order_idx on public.analyses(display_order);
create index analyses_is_active_idx on public.analyses(is_active);
create index analyses_method_id_idx on public.analyses(method_id);
create index analyses_sample_type_id_idx on public.analyses(sample_type_id);
create index analyses_species_id_idx on public.analyses(species_id);
create index analysis_species_species_id_idx on public.analysis_species(species_id);

create or replace function public.tg_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger species_set_updated_at
before update on public.species
for each row execute procedure public.tg_set_updated_at();

create trigger species_translations_set_updated_at
before update on public.species_translations
for each row execute procedure public.tg_set_updated_at();

create trigger analysis_categories_set_updated_at
before update on public.analysis_categories
for each row execute procedure public.tg_set_updated_at();

create trigger analysis_methods_set_updated_at
before update on public.analysis_methods
for each row execute procedure public.tg_set_updated_at();

create trigger analysis_method_translations_set_updated_at
before update on public.analysis_method_translations
for each row execute procedure public.tg_set_updated_at();

create trigger sample_types_set_updated_at
before update on public.sample_types
for each row execute procedure public.tg_set_updated_at();

create trigger sample_type_translations_set_updated_at
before update on public.sample_type_translations
for each row execute procedure public.tg_set_updated_at();

create trigger analysis_category_translations_set_updated_at
before update on public.analysis_category_translations
for each row execute procedure public.tg_set_updated_at();

create trigger analyses_set_updated_at
before update on public.analyses
for each row execute procedure public.tg_set_updated_at();

create trigger analysis_translations_set_updated_at
before update on public.analysis_translations
for each row execute procedure public.tg_set_updated_at();

create trigger analysis_species_set_updated_at
before update on public.analysis_species
for each row execute procedure public.tg_set_updated_at();

create policy "Enable read access for all users"
on "public"."species"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users"
on "public"."species_translations"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users"
on "public"."analysis_categories"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users"
on "public"."analysis_methods"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users"
on "public"."analysis_method_translations"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users"
on "public"."sample_types"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users"
on "public"."sample_type_translations"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users"
on "public"."analysis_category_translations"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users"
on "public"."analyses"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users"
on "public"."analysis_translations"
as PERMISSIVE
for SELECT
to public
using (true);

create policy "Enable read access for all users"
on "public"."analysis_species"
as PERMISSIVE
for SELECT
to public
using (true);

alter table public.species enable row level security;
alter table public.species_translations enable row level security;
alter table public.analysis_categories enable row level security;
alter table public.analysis_methods enable row level security;
alter table public.analysis_method_translations enable row level security;
alter table public.sample_types enable row level security;
alter table public.sample_type_translations enable row level security;
alter table public.analysis_category_translations enable row level security;
alter table public.analyses enable row level security;
alter table public.analysis_translations enable row level security;
alter table public.analysis_species enable row level security;

grant usage on schema public to anon, authenticated;

grant usage on type public.language_code to anon, authenticated;

grant select on table public.species to anon, authenticated;
grant select on table public.species_translations to anon, authenticated;
grant select on table public.analysis_categories to anon, authenticated;
grant select on table public.analysis_methods to anon, authenticated;
grant select on table public.analysis_method_translations to anon, authenticated;
grant select on table public.sample_types to anon, authenticated;
grant select on table public.sample_type_translations to anon, authenticated;
grant select on table public.analysis_category_translations to anon, authenticated;
grant select on table public.analyses to anon, authenticated;
grant select on table public.analysis_translations to anon, authenticated;
grant select on table public.analysis_species to anon, authenticated;

alter default privileges in schema public
grant select on tables to anon, authenticated;
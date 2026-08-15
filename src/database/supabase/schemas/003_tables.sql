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

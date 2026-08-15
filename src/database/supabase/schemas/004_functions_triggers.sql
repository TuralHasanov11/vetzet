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
insert into public.species (slug, display_order)
values
  ('it', 1),
  ('pisik', 2),
  ('mal-qara', 3),
  ('qoyun', 4),
  ('at', 5),
  ('qus', 6),
  ('ari', 7),
  ('eqzotik', 8)
on conflict (slug) do update
set display_order = excluded.display_order;

insert into public.species_translations (species_id, language, name, description)
select s.id, v.language::public.language_code, v.name, v.description
from public.species s
join (
  values
    ('it', 'az', 'İt', null),
    ('it', 'en', 'Dog', null),
    ('it', 'ru', 'Собака', null),
    ('pisik', 'az', 'Pişik', null),
    ('pisik', 'en', 'Cat', null),
    ('pisik', 'ru', 'Кошка', null),
    ('mal-qara', 'az', 'Mal-Qara', null),
    ('mal-qara', 'en', 'Cattle', null),
    ('mal-qara', 'ru', 'Крупный рогатый скот', null),
    ('qoyun', 'az', 'Qoyun', null),
    ('qoyun', 'en', 'Sheep', null),
    ('qoyun', 'ru', 'Овца', null),
    ('at', 'az', 'At', null),
    ('at', 'en', 'Horse', null),
    ('at', 'ru', 'Лошадь', null),
    ('qus', 'az', 'Quş', null),
    ('qus', 'en', 'Bird', null),
    ('qus', 'ru', 'Птица', null),
    ('ari', 'az', 'Arı', null),
    ('ari', 'en', 'Bee', null),
    ('ari', 'ru', 'Пчела', null),
    ('eqzotik', 'az', 'Eqzotik', null),
    ('eqzotik', 'en', 'Exotic', null),
    ('eqzotik', 'ru', 'Экзотические животные', null)
) as v(slug, language, name, description)
  on v.slug = s.slug
on conflict (species_id, language) do update
set name = excluded.name,
    description = excluded.description,
    updated_at = now();

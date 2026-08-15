import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '#shared/types/database.types'

export default defineEventHandler(async (event) => {
  const language = tryHeaderLocale(event)?.toString()
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client
    .from('species')
    .select('id,slug,icon_url,display_order,is_active,created_at,updated_at,translations:species_translations(language,name,description)')
    .eq('is_active', true)
    .order('display_order')

  if (error) throw createError({ statusCode: 500, message: error.message })

  return data.map((row): Species => {
    const selected = row.translations?.find((t) => t.language === language)
    return {
      id: row.id,
      slug: row.slug,
      icon_url: row.icon_url,
      display_order: row.display_order,
      is_active: row.is_active,
      created_at: row.created_at,
      updated_at: row.updated_at,
      name: selected?.name,
      description: selected?.description ?? null,
    }
  })
})

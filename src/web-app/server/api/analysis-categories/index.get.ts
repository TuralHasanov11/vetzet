import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '#shared/types/database.types'

export default defineEventHandler(async (event) => {
  const language = tryHeaderLocale(event)?.toString()
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client
    .from('analysis_categories')
    .select('id,slug,display_order,is_active,created_at,updated_at,translations:analysis_category_translations(language,name,description)')
    .eq('is_active', true)
    .order('display_order')

  if (error) throw createError({ statusCode: 500, message: error.message })

  return data.map((row): AnalysisCategory => {
    return {
      id: row.id,
      slug: row.slug,
      display_order: row.display_order,
      is_active: row.is_active,
      created_at: row.created_at,
      updated_at: row.updated_at,
      name: row.translations?.find((t) => t.language === language)?.name,
      description: row.translations?.find((t) => t.language === language)?.description,
    }
  })
})

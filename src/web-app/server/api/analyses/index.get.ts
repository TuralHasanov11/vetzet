import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '#shared/types/database.types'

export default defineEventHandler(async (event) => {
    const query = getQuery<{ species?: string; category?: string, q?: string }>(event)
    const language = tryHeaderLocale(event)?.toString()
    const client = await serverSupabaseClient<Database>(event)
    
    let request = client
        .from('analyses')
        .select(`
            id,slug,species_id,category_id,method_id,sample_type_id,sample_amount,storage_conditions,turnaround_time,display_order,price,currency,is_active,created_at,updated_at,
            translations:analysis_translations(language,name,required_material,notes),
            method:analysis_methods(
                id,slug,display_order,is_active,created_at,updated_at,
                translations:analysis_method_translations(language,name,description)
            ),
            sample_type:sample_types(
                id,slug,display_order,is_active,created_at,updated_at,
                translations:sample_type_translations(language,name,description)
            ),
            category:analysis_categories(
                id,slug,display_order,is_active,created_at,updated_at,
                translations:analysis_category_translations(language,name,description)
            ),
            species:analysis_species(
                species:species(
                    id,slug,icon_url,display_order,is_active,created_at,updated_at,
                    translations:species_translations(language,name,description)
                )
            )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (query.category) {
        const { data: categoryRow } = await client
            .from('analysis_categories')
            .select('id')
            .eq('slug', String(query.category))
            .single()
        if (categoryRow) request = request.eq('category_id', categoryRow.id)
    }

    if(query.species) {
        const { data: speciesRow } = await client
            .from('species')
            .select('id')
            .eq('slug', String(query.species))
            .single()
        if (speciesRow) request = request.eq('species_id', speciesRow.id)
    }

    if (query.q) {
        request = request.ilike('translations.name', `%${query.q}%`)
    }

    const { data, error } = await request
    if (error) {
        console.error('Error fetching analyses:', error)
        throw createError({ statusCode: 500, message: error.message })
    }

    return data.map((row) => {
        return {
            id: row.id,
            slug: row.slug,
            species_id: row.species_id,
            category_id: row.category_id,
            method_id: row.method_id,
            sample_type_id: row.sample_type_id,
            sample_amount: row.sample_amount,
            storage_conditions: row.storage_conditions,
            turnaround_time: row.turnaround_time,
            display_order: row.display_order,
            price: row.price,
            currency: row.currency,
            is_active: row.is_active,
            created_at: row.created_at,
            updated_at: row.updated_at,
            name: row.translations?.find((t) => t.language === language)?.name,
            required_material: row.translations?.find((t) => t.language === language)?.required_material ?? null,
            notes: row.translations?.find((t) => t.language === language)?.notes ?? null,
            method: row.method
                ? {
                        id: row.method.id,
                        slug: row.method.slug,
                        display_order: row.method.display_order,
                        is_active: row.method.is_active,
                        created_at: row.method.created_at,
                        updated_at: row.method.updated_at,
                        name: row.method.translations?.find((t) => t.language === language)?.name,
                        description: row.method.translations?.find((t) => t.language === language)?.description ?? null,
                    }
                : null,
            sample_type: row.sample_type
                ? {
                        id: row.sample_type.id,
                        slug: row.sample_type.slug,
                        display_order: row.sample_type.display_order,
                        is_active: row.sample_type.is_active,
                        created_at: row.sample_type.created_at,
                        updated_at: row.sample_type.updated_at,
                        name: row.sample_type.translations?.find((t) => t.language === language)?.name,
                        description: row.sample_type.translations?.find((t) => t.language === language)?.description ?? null,
                    }
                : undefined,
            category: row.category
                ? {
                        id: row.category.id,
                        slug: row.category.slug,
                        display_order: row.category.display_order,
                        is_active: row.category.is_active,
                        created_at: row.category.created_at,
                        updated_at: row.category.updated_at,
                        name: row.category?.translations?.find((t) => t.language === language)?.name,
                        description: row.category?.translations?.find((t) => t.language === language)?.description ?? null,
                    }
                : null,
            species: (row.species ?? []).map((speciesJoin) => {
                return {
                    species: {
                        id: speciesJoin.species?.id ?? '',
                        slug: speciesJoin.species?.slug ?? '',
                        icon_url: speciesJoin.species?.icon_url ?? null,
                        display_order: speciesJoin.species?.display_order ?? 0,
                        is_active: speciesJoin.species?.is_active ?? true,
                        created_at: speciesJoin.species?.created_at ?? new Date(0).toISOString(),
                        updated_at: speciesJoin.species?.updated_at ?? new Date(0).toISOString(),
                        name: speciesJoin.species?.translations?.find((t) => t.language === language)?.name,
                        description: speciesJoin.species?.translations?.find((t) => t.language === language)?.description ?? null,
                    },
                }
            }),
        }
    })
})

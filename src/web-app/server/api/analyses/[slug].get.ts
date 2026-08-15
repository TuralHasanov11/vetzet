import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '#shared/types/database.types'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')
    if (!slug) throw createError({ statusCode: 400, message: 'Missing analysis slug' })
    const language = tryHeaderLocale(event)?.toString()
    const client = await serverSupabaseClient<Database>(event)

    const { data, error } = await client
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
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

    if (error || !data) throw createError({ statusCode: 404, message: 'Analysis not found' })

    const analysis: Analysis = {
        id: data.id,
        slug: data.slug,
        species_id: data.species_id,
        category_id: data.category_id,
        method_id: data.method_id,
        sample_type_id: data.sample_type_id,
        sample_amount: data.sample_amount,
        storage_conditions: data.storage_conditions,
        turnaround_time: data.turnaround_time,
        display_order: data.display_order,
        price: data.price,
        currency: data.currency,
        is_active: data.is_active,
        created_at: data.created_at,
        updated_at: data.updated_at,
        name: data.translations?.find((t) => t.language === language)?.name,
        required_material: data.translations?.find((t) => t.language === language)?.required_material ?? null,
        notes: data.translations?.find((t) => t.language === language)?.notes ?? null,
        method: data.method
            ? {
                    id: data.method.id,
                    slug: data.method.slug,
                    display_order: data.method.display_order,
                    is_active: data.method.is_active,
                    created_at: data.method.created_at,
                    updated_at: data.method.updated_at,
                    name: data.method.translations?.find((t) => t.language === language)?.name,
                    description: data.method.translations?.find((t) => t.language === language)?.description ?? null,
                }
            : null,
        sample_type: data.sample_type
            ? {
                    id: data.sample_type.id,
                    slug: data.sample_type.slug,
                    display_order: data.sample_type.display_order,
                    is_active: data.sample_type.is_active,
                    created_at: data.sample_type.created_at,
                    updated_at: data.sample_type.updated_at,
                    name: data.sample_type.translations?.find((t) => t.language === language)?.name,
                    description: data.sample_type.translations?.find((t) => t.language === language)?.description ?? null,
                }
            : undefined,
        category: data.category
            ? {
                    id: data.category.id,
                    slug: data.category.slug,
                    display_order: data.category.display_order,
                    is_active: data.category.is_active,
                    created_at: data.category.created_at,
                    updated_at: data.category.updated_at,
                    name: data.category?.translations?.find((t) => t.language === language)?.name,
                    description: data.category?.translations?.find((t) => t.language === language)?.description ?? null,
                }
            : null,
        species: (data.species ?? []).map((speciesJoin) => {
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

    return analysis
})

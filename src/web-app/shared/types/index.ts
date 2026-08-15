export type LanguageCode = "az" | "en" | "ru"

export interface Species {
	id: string
    readonly name?: string
	readonly description?: string | null
	slug: string
	icon_url: string | null
	display_order: number
	is_active: boolean
	created_at: string
	updated_at: string
}

export interface SpeciesTranslation {
	species_id: string
	language: LanguageCode
	name: string
	description: string | null
	created_at: string
	updated_at: string
}

export interface AnalysisCategory {
	id: string
    readonly name?: string
	readonly description?: string | null
	slug: string
	display_order: number
	is_active: boolean
	created_at: string
	updated_at: string
}

export interface AnalysisCategoryTranslation {
	category_id: string
	language: LanguageCode
	name: string
	description: string | null
	created_at: string
	updated_at: string
}

export interface AnalysisMethod {
	id: string
	readonly name?: string
	readonly description?: string | null
	slug: string
	display_order: number
	is_active: boolean
	created_at: string
	updated_at: string
}

export interface AnalysisMethodTranslation {
	method_id: string
	language: LanguageCode
	name: string
	description: string | null
	created_at: string
	updated_at: string
}

export interface SampleType {
	id: string
	readonly name?: string
	readonly description?: string | null
	slug: string
	display_order: number
	is_active: boolean
	created_at: string
	updated_at: string
}

export interface SampleTypeTranslation {
	sample_type_id: string
	language: LanguageCode
	name: string
	description: string | null
	created_at: string
	updated_at: string
}

export interface Analysis {
	id: string
    readonly name?: string
	readonly required_material?: string | null
	readonly notes?: string | null
	slug: string
	species_id: string
	category_id: string | null
	method_id: string | null
	sample_type_id: string
	sample_amount: string | null
	storage_conditions: string | null
	turnaround_time: string | null
	display_order: number
	price: number | null
	currency: string
	is_active: boolean
	created_at: string
	updated_at: string
    readonly category?: AnalysisCategory | null
    readonly method?: AnalysisMethod | null
    readonly sample_type?: SampleType
    readonly species?: AnalysisSpeciesRelation[]
}

export interface AnalysisInsert {
	id?: string
	slug: string
	species_id: string
	category_id?: string | null
	method_id?: string | null
	sample_type_id: string
	sample_amount?: string | null
	storage_conditions?: string | null
	turnaround_time?: string | null
	display_order?: number
	price?: number | null
	currency?: string
	is_active?: boolean
	created_at?: string
	updated_at?: string
}

export interface AnalysisUpdate {
	id?: string
	slug?: string
	species_id?: string
	category_id?: string | null
	method_id?: string | null
	sample_type_id?: string
	sample_amount?: string | null
	storage_conditions?: string | null
	turnaround_time?: string | null
	display_order?: number
	price?: number | null
	currency?: string
	is_active?: boolean
	created_at?: string
	updated_at?: string
}

export interface AnalysisTranslation {
	analysis_id: string
	language: LanguageCode
	name: string
	required_material: string | null
	notes: string | null
	created_at: string
	updated_at: string
}

export interface AnalysisTranslationInsert {
	analysis_id: string
	created_at?: string
	language: LanguageCode
	name: string
	notes?: string | null
	required_material?: string | null
	updated_at?: string
}

export interface AnalysisTranslationUpdate {
	analysis_id?: string
	created_at?: string
	language: LanguageCode
	name?: string
	notes?: string | null
	required_material?: string | null
	updated_at?: string
}

export interface AnalysisSpecies {
	analysis_id: string
	species_id: string
	created_at: string
	updated_at: string
}

// Insert/Update helpers (schema-aligned)
export interface SpeciesInsert {
	id?: string
	slug: string
	icon_url?: string | null
	display_order?: number
	is_active?: boolean
	created_at?: string
	updated_at?: string
}

export interface SpeciesUpdate {
	id?: string
	slug?: string
	icon_url?: string | null
	display_order?: number
	is_active?: boolean
	created_at?: string
	updated_at?: string
}

export interface AnalysisCategoryInsert {
	id?: string
	slug: string
	display_order?: number
	is_active?: boolean
	created_at?: string
	updated_at?: string
}

export interface AnalysisCategoryUpdate {
	id?: string
	slug?: string
	display_order?: number
	is_active?: boolean
	created_at?: string
	updated_at?: string
}

export interface AnalysisSpeciesRelation {
	species: Species
}

export interface AnalysisFilters {
	species?: string
	category?: string
	q?: string
}

export interface ContactForm {
	name: string
	email: string
	subject: string
	message: string
}

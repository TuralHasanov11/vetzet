<template>
  <div>
    <UPageSection 
      :title="$t('analyses.title')"
      :description="$t('analyses.subtitle')"
    />  
    
      <div class="flex flex-wrap gap-3 mb-8 justify-center">
        <UInput
          v-model="search"
          :placeholder="$t('analyses.search_placeholder')"
          icon="i-lucide-search"
          class="w-full sm:w-64"
          :loading="analysesStatus === 'pending'" 
          loading-icon="i-lucide-loader"
          @update:model-value="router.push({ query: { ...route.query, q: search } })"
        />
        <USelect
          v-model="selectedSpecies"
          :items="speciesOptions"
          :disabled="speciesStatus === 'pending'"
          class="w-full sm:w-48"
          @update:model-value="(s) => {
            if (s === 'all') {
              router.push({ query: { ...route.query, species: undefined } })
            } else {
              router.push({ query: { ...route.query, species: s } })
            }
          }"
        />
        <USelect
          v-model="selectedCategory"
          :items="categoryOptions"
          :disabled="categoriesStatus === 'pending'"
          class="w-full sm:w-56"
          @update:model-value="(c) => {
            if(c === 'all') {
              router.push({ query: { ...route.query, category: undefined } })
            } else {
              router.push({ query: { ...route.query, category: c } })
            }
          }"
        />
      </div>

      <!-- Results -->
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-12">          
      <SkeletonList v-if="analysesStatus === 'pending'" :count="8" />
      <UAlert 
        v-else-if="analysesStatus === 'error'"
        :title="$t('common.error')"
        color="error"
        variant="outline"
        :description="analysesError?.message"
      />
      <AnalysisList v-else :analyses="analyses ?? []" />
    </div>
    
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

useHead({ title: t('pages.analyses.title') })

useSeoMeta({
    title: t('pages.analyses.title'),
    description: t('pages.analyses.description'),
    ogTitle: t('pages.analyses.title'),
    ogDescription: t('pages.analyses.description'),
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.analyses.title'),
    twitterDescription: t('pages.analyses.description'),
})

const route = useRoute()
const router = useRouter()
const search = ref<string>((route.query.q as string) ?? '')
const selectedSpecies = ref<string>((route.query.species as string) ?? 'all')
const selectedCategory = ref<string>((route.query.category as string) ?? 'all')

const { data: species, status: speciesStatus} = await useLazyFetch<Species[]>('/api/species', {
    headers: { "accept-language": locale },
    lazy: true,
  })
const { data: categories, status: categoriesStatus } = await useLazyFetch<AnalysisCategory[]>('/api/analysis-categories', {
    headers: { "accept-language": locale },
    lazy: true,
  })
const { data: analyses, status: analysesStatus, error: analysesError } = await useLazyFetch<Analysis[]>('/api/analyses', {
    headers: { "accept-language": locale },
    query: {
      category: selectedCategory,
      species: selectedSpecies,
      q: search,
    },
    lazy: true,
  })

const speciesOptions = computed(() => [
  { label: t('analyses.all_species'), value: 'all' },
  ...(species.value ?? []).map(s => ({
    label: s.name ?? s.slug,
    value: s.slug,
  })),
])

const categoryOptions = computed(() => [
  { label: t('analyses.all_categories'), value: 'all' },
  ...(categories.value ?? []).map(c => ({
    label: c.name ?? c.slug,
    value: c.slug,
  })),
])
</script>

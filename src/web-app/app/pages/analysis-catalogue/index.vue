<template>
  <UMain>
    <UPageSection 
      :title="$t('analysis_catalogue.title')"
      :description="$t('analysis_catalogue.subtitle')"/>
    <SkeletonList v-if="speciesStatus === 'pending'" :count="8" />
    <UAlert 
      v-else-if="speciesStatus === 'error'"
      :title="$t('common.error')"
      color="error"
      variant="outline"
      :description="speciesError?.message"
    />
    <SpeciesList v-else :species="species ?? []" />
  </UMain>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

useHead({ title: t('pages.analysis_catalogue.title') })

useSeoMeta({
    title: t('pages.analysis_catalogue.title'),
    description: t('pages.analysis_catalogue.description'),
    ogTitle: t('pages.analysis_catalogue.title'),
    ogDescription: t('pages.analysis_catalogue.description'),
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.analysis_catalogue.title'),
    twitterDescription: t('pages.analysis_catalogue.description'),
})

const { data: species, status: speciesStatus, error: speciesError } = await useLazyFetch<Species[]>('/api/species', {
  headers: { "accept-language": locale },
  lazy: true,
})
</script>

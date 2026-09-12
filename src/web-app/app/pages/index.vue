<template>
  <UMain>
    <!-- Hero -->
    <UPageHero
      :title="$t('home.hero_title')"
      :description="$t('home.hero_subtitle')"
      orientation="horizontal"
      :links="heroLinks"
    >
      
      <UCarousel 
        v-slot="{ item }"
        dots 
        :items="carouselItems" 
        :autoplay="{ delay: 2000 }"
        loop
        :aria-label="$t('home.hero_image_alt')"
        class="w-full max-w-xs mx-auto aspect-2/3">
        <img
          :src="item"
          :alt="$t('home.hero_image_alt')"
          :loading="item === carouselItems[0] ? 'eager' : 'lazy'"
          class="w-full h-full rounded-lg shadow-2xl ring ring-default object-cover"
        />
      </UCarousel>
    </UPageHero>

    <UPageSection :title="$t('home.elisa.title')" :description="$t('home.elisa.subtitle')">
      <UAccordion :items="elisaItems" />
    </UPageSection>
    
    <!-- Species cards -->
    <UPageSection :title="$t('home.featured_species')" :links="[{ label: $t('home.view_all'), to: '/analysis-catalogue' }]">
      <SkeletonList v-if="speciesStatus === 'pending'" :count="8" />
      <UAlert 
        v-else-if="speciesStatus === 'error'"
        :title="$t('common.error')"
        color="error"
        variant="outline"
        :description="speciesError?.message"
      />
      <SpeciesList v-else :species="species ?? []" />
    </UPageSection>
  </UMain>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import heroImage1 from '~/assets/images/hero1.jpg'
import heroImage2 from '~/assets/images/hero2.jpg'
import heroImage3 from '~/assets/images/hero3.jpg'
import heroImage4 from '~/assets/images/hero4.jpg'

const { t, locale } = useI18n()
const localeRoute = useLocaleRoute()
const img = useImage()

useHead({ title: t('pages.home.title') })

useSeoMeta({
    title: t('pages.home.title'),
    description: t('pages.home.description'),
    ogTitle: t('pages.home.title'),
    ogDescription: t('pages.home.description'),
    ogType: 'website',
})

const { data: species, status: speciesStatus, error: speciesError } = await useLazyFetch<Species[]>('/api/species', {
  headers: { "accept-language": locale },
  lazy: true,
})

const heroLinks = ref<ButtonProps[]>([
  {
    label: t('home.cta_analyses'),
    to: localeRoute({ name: 'analyses' }),
    icon: 'i-lucide-dog'
  },
  {
    label: t('home.cta_catalogue'),
    to: localeRoute({ name: 'analysis-catalogue' }),
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-briefcase-medical'
  }
])

const elisaItems = computed(() => [
  {
    label: t('home.elisa.points.early_diagnosis.label'),
    content: t('home.elisa.points.early_diagnosis.content'),
  },
  {
    label: t('home.elisa.points.herd_monitoring.label'),
    content: t('home.elisa.points.herd_monitoring.content')
  },
  {
    label: t('home.elisa.points.vaccination_assessment.label'),
    content: t('home.elisa.points.vaccination_assessment.content')
  },
  {
    label: t('home.elisa.points.epidemiological_surveillance.label'),
    content: t('home.elisa.points.epidemiological_surveillance.content')
  },
  {
    label: t('home.elisa.points.poultry_importance.label'),
    content: t('home.elisa.points.poultry_importance.content')
  }
])

const carouselItems = computed(() => {
  return [heroImage1, heroImage2, heroImage3, heroImage4]
})
</script>
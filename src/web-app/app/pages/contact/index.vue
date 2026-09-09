<template>
  <UMain>
    <UPageSection 
      :title="$t('contact.title')"
    /> 

    <UPageBody>
      <UPageCard class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div class="space-y-3 text-slate-700">
          <div class="flex gap-3 items-start">
            <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <p>{{ t('about.location', { appName }) }}</p>
          </div>
          <div class="flex gap-3 items-start">
            <UIcon name="i-lucide-mail" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <p>{{ contactEmail }}</p>
          </div>
          <div class="flex gap-3 items-start">
            <UIcon name="i-lucide-phone" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <p>{{ contactPhone }}</p>
          </div>
        </div>
      </UPageCard>
    </UPageBody>
  </UMain>
</template>

<script setup lang="ts">
// import { z } from 'zod'

const { t } = useI18n()

useHead({ title: t('pages.contact.title') })

useSeoMeta({
    title: t('pages.contact.title'),
    description: t('pages.contact.description'),
    ogTitle: t('pages.contact.title'),
    ogDescription: t('pages.contact.description'),
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.contact.title'),
    twitterDescription: t('pages.contact.description'),
})

const appConfig = useAppConfig()

const appName = computed(() => appConfig.appName)
const contactEmail = computed(() => appConfig.contactEmail)
const contactPhone = computed(() => appConfig.contactPhone)
</script>

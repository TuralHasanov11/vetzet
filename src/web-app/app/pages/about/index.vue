<template>
  <UMain>

    <UPageHero
      :title="$t('about.title')"      
      :description="$t('about.portal_intro', { appName }) + ' ' + $t('about.portal_mission')"
      :links="[
        {
          label: $t('nav.contact'),
          to: $localePath({ name: 'contact' }),
        },
      ]"
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
const appConfig = useAppConfig()
const { t } = useI18n()
const appName = computed(() => appConfig.appName || 'Vetzet')
const contactEmail = computed(() => appConfig.contactEmail)
const contactPhone = computed(() => appConfig.contactPhone)

useHead({ title: t('pages.about.title') })

useSeoMeta({
  title: t('pages.about.title'),
  description: t('pages.about.description'),
})
</script>

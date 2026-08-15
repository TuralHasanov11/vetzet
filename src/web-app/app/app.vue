<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#0d9488" />
    <NuxtErrorBoundary>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <template #error="{ error }">
        <UAlert
          :title="$t('common.error_occurred')"
          :description="error.message"
          color="error"
          variant="outline"
        />
      </template>
    </NuxtErrorBoundary>
  </UApp>
</template>

<script setup lang="ts">

const { t } = useI18n()

useSeoMeta({
  description: t('common.site_description'),
  ogDescription: t('common.site_description'),
  ogImage: '~/assets/images/hero1.jpg'
})

</script>

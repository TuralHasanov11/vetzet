<template>
  <UHeader mode="slideover" :title="appConfig.appName" :to="$localePath({ name: 'index' })">
    <UNavigationMenu :items="navLinks" />

    <template #right>
      <USelectMenu 
        v-model="selectedLocale" 
        :items="localeOptions"
        :search-input="false"
        class="w-48" 
        @update:model-value="(l) => navigateTo(switchLocalePath(l.code))" 
      />
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="navLinks" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t, locale, locales } = useI18n()
const localeRoute = useLocaleRoute()
const route = useRoute()

const switchLocalePath = useSwitchLocalePath()

const appConfig = useAppConfig()

const selectedLocale = ref({ code: locale.value, label: locales.value.find((l) => l.code === locale.value)?.name ?? locale.value })
const localeOptions = computed(() => locales.value.map((l) => ({ code: l.code, label: l.name })))

const navLinks = computed<NavigationMenuItem[]>(() => [
  { to: localeRoute({ name: 'index' }), label: t('nav.home'), active: route.name === 'index' },
  { to: localeRoute({ name: 'analysis-catalogue' }), label: t('nav.catalogue'), active: route.name === 'analysis-catalogue' },
  { to: localeRoute({ name: 'analyses' }), label: t('nav.analyses'), active: route.name === 'analyses' },
  { to: localeRoute({ name: 'about' }), label: t('nav.about'), active: route.name === 'about' },
  { to: localeRoute({ name: 'contact' }), label: t('nav.contact'), active: route.name === 'contact' },
])

</script>
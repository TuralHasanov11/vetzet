<template>
  <footer class="bg-slate-800 text-slate-300 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <p class="text-white font-bold text-lg mb-1">{{ appName }}</p>
          <p class="text-sm">{{ $t('site.tagline') }}</p>
        </div>
        <div class="flex flex-col gap-1 text-sm">
          <NuxtLink :to="$localePath({ name: 'about' })" class="hover:text-white transition-colors">{{ $t('nav.about') }}</NuxtLink>
          <NuxtLink :to="$localePath({ name: 'contact' })" class="hover:text-white transition-colors">{{ $t('nav.contact') }}</NuxtLink>
        </div>
      </div>
      <div class="border-t border-slate-700 mt-8 pt-6 text-xs text-slate-400">
        &copy; {{ new Date().getFullYear() }} {{ appName }}. {{ $t('footer.rights') }}.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const appName = computed(() => appConfig.appName)
</script>
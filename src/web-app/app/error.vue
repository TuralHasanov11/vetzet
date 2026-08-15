<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <p class="text-8xl font-bold text-teal-600 mb-4">{{ error.status }}</p>
      <h1 class="text-2xl font-bold text-slate-800 mb-2">
        {{ error.status === 404 ? $t('common.not_found') : $t('common.error') }}
      </h1>
      <p v-if="error.message" class="text-slate-500 mb-8">{{ error.message }}</p>
      <UButton :to="$localePath({ name: 'index' })" color="primary" icon="i-lucide-home">
        {{ $t('nav.home') }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useHead({ title: `${props.error.status} — Vetzet` })
</script>

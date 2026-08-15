<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <UCard
          v-for="s in species"
          :key="s.id"
          class="hover:shadow-lg transition-shadow group"
        >
          <div class="flex flex-col items-center text-center gap-3 py-4">
            <div class="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center group-hover:bg-teal-100 transition-colors">
              <img :src="s.icon_url ?? ''" class="w-8 h-8 text-teal-600" :alt="s.name" >
            </div>
            <h2 class="text-lg font-bold text-slate-800">{{ s.name ?? s.slug }}</h2>
            <p v-if="s.description" class="text-sm text-slate-500 line-clamp-2">
              {{ s.description }}
            </p>
            <UButton
              :to="$localePath({ name: 'analyses', query: { species: s.slug } })"
              color="primary"
              variant="soft"
              size="sm"
              trailing-icon="i-lucide-arrow-right"
            >
              {{ $t('analysis_catalogue.view_analyses') }}
            </UButton>
          </div>
        </UCard>
      </div>
</template>

<script setup lang="ts">

defineProps<{
    species: Species[]
}>() 

</script>
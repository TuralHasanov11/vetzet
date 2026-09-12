<template>
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <NuxtLink v-for="a in analyses" :key="a.id" :to="$localePath({ name: 'analyses-slug', params: { slug: a.slug } })" class="block">
            <UCard class="h-full hover:shadow-md transition-shadow hover:border-teal-300">
                <div class="flex items-start justify-between gap-2 mb-2">
                    <h3 class="font-semibold text-slate-800">{{ a.name ?? a.slug }}</h3>
                    <UBadge
                        v-if="a.category" :label="a.category.name ?? a.category.slug" color="secondary"
                        variant="subtle" size="sm" class="shrink-0" />
                </div>
                <div class="space-y-1 text-sm text-slate-600">
                    <p v-if="a.required_material">
                        <span class="font-medium text-slate-600">{{ $t('analyses.material') }}:</span>
                        {{ a.required_material }}
                    </p>

                    <p v-if="a.price">
                        <span class="font-medium text-slate-600">{{ $t('analyses.price') }}:</span>
                        {{ a.price }} {{ a.currency }}
                    </p>
                </div>
            </UCard>
        </NuxtLink>
    </div>

</template>

<script setup lang="ts">

defineProps<{
    analyses: Analysis[]
}>()

</script>
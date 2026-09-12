<template>
  <UMain>
    <SkeletonList v-if="analysisStatus === 'pending'" :count="8" />
    <UAlert
v-else-if="analysisStatus === 'error'" :title="$t('common.error')" color="error" variant="outline"
      :description="analysisError?.message" />
    <div v-else-if="analysis" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <UButton :to="$localePath({ name: 'analyses' })" variant="ghost" color="neutral" icon="i-lucide-arrow-left" class="mb-6">
        {{ $t('common.back') }}
      </UButton>

      <div class="flex flex-wrap gap-2 mb-4">
        <NuxtLink v-for="speciesItem in analysis.species" :key="speciesItem.species.id" :to="$localePath({ name: 'analyses', query: { species: speciesItem.species.slug } })">
          <UBadge
            :label="speciesItem.species.name ?? speciesItem.species.slug"
            color="info" variant="subtle" />
        </NuxtLink>

        <NuxtLink
          :to="$localePath({ name: 'analyses', query: { category: analysis.category?.slug } })"
          class="text-slate-500 hover:text-teal-600 transition-colors">
          <UBadge
            v-if="analysis.category" :label="analysis.category.name ?? analysis.category.slug" color="secondary"
            variant="subtle" />
        </NuxtLink>
      </div>

      <UPageCard :title="analysis.name" spotlight spotlight-color="primary">
        <div class="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-if="analysis.method" class="flex gap-3">
              <UIcon name="i-lucide-flask-conical" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide">{{ $t('analyses.method') }}</p>
                <p class="text-slate-700">{{ analysis.method.name ?? analysis.method.slug }}</p>
              </div>
            </div>
            <div v-if="analysis.sample_type" class="flex gap-3">
              <UIcon name="i-lucide-test-tube-diagonal" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide">{{ $t('analyses.sample_type') }}
                </p>
                <p class="text-slate-700">{{ analysis.sample_type.name ?? analysis.sample_type.slug }}</p>
              </div>
            </div>
            <div v-if="analysis.sample_amount" class="flex gap-3">
              <UIcon name="i-lucide-beaker" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide">{{ $t('analyses.sample_amount')
                }}</p>
                <p class="text-slate-700">{{ analysis.sample_amount }}</p>
              </div>
            </div>
            <div v-if="analysis.storage_conditions" class="flex gap-3">
              <UIcon name="i-lucide-thermometer" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide">{{
                  $t('analyses.storage_conditions') }}</p>
                <p class="text-slate-700">{{ analysis.storage_conditions }}</p>
              </div>
            </div>
            <div v-if="analysis.turnaround_time" class="flex gap-3">
              <UIcon name="i-lucide-clock-3" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide">{{ $t('analyses.turnaround') }}
                </p>
                <p class="text-slate-700">{{ analysis.turnaround_time }}</p>
              </div>
            </div>
          </div>

          <div v-if="analysis.required_material" class="flex gap-3">
            <UIcon name="i-lucide-package" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide">{{ $t('analyses.material') }}</p>
              <p class="text-slate-700">{{ analysis.required_material }}</p>
            </div>
          </div>
          <div v-if="analysis.price" class="flex gap-3">
            <UIcon name="i-lucide-circle-dollar-sign" class="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide">{{ $t('analyses.price') }}</p>
              <p class="text-slate-700">{{ analysis.price }} {{ analysis.currency }}</p>
            </div>
          </div>
          <div v-if="analysis.notes" class="border-t border-slate-100 pt-4">
            <p class="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{{ $t('analyses.notes') }}</p>
            <p class="text-slate-600">{{ analysis.notes }}</p>
          </div>
        </div>
      </UPageCard>

    </div>
  </UMain>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()

const { data: analysis, status: analysisStatus, error: analysisError } = await useLazyFetch<Analysis>(`/api/analyses/${route.params.slug}`, {
  headers: { "accept-language": locale },
  lazy: true,
})

const analysisName = computed(() => analysis.value?.name ?? analysis.value?.slug ?? '')

useHead({ title: t('pages.analysis_detail.title', { name: analysisName.value }) })

useSeoMeta({
    title: t('pages.analysis_detail.title', { name: analysisName.value }),
    description: t('pages.analysis_detail.description', { name: analysisName.value }),
    ogTitle: t('pages.analysis_detail.title', { name: analysisName.value }),
    ogDescription: t('pages.analysis_detail.description', { name: analysisName.value }),
    ogType: 'website',
})
</script>

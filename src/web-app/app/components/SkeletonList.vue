<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <USkeleton v-for="n in count" :key="n" class="size-12 rounded-full" />
    </div>
</template>

<script setup lang="ts">

defineProps<{
    count: number
}>()

</script>
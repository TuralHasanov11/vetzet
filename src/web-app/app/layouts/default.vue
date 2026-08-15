<template>
  <div class="flex flex-col flex-1">
    <BaseHeader />
    <main class="flex-1 mx-auto lg:py-12 w-full">
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>

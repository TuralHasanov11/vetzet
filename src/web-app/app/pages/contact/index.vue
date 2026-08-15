<template>
  <UMain>
    <UPageSection 
      :title="$t('contact.title')"
    /> 

    <div  class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
<UAlert
      v-if="success"
      color="success"
      variant="soft"
      :title="$t('contact.success')"
      class="mb-6"
    />
    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      :title="$t('contact.error')"
      class="mb-6"
    />

    <UForm :schema="schema" :state="form" class="space-y-4" @submit="submit">
      <UFormField :label="$t('contact.name')" name="name">
        <UInput v-model="form.name" class="w-full" />
      </UFormField>
      <UFormField :label="$t('contact.email')" name="email">
        <UInput v-model="form.email" type="email" class="w-full" />
      </UFormField>
      <UFormField :label="$t('contact.subject')" name="subject">
        <UInput v-model="form.subject" class="w-full" />
      </UFormField>
      <UFormField :label="$t('contact.message')" name="message">
        <UTextarea v-model="form.message" :rows="5" class="w-full" />
      </UFormField>
      <UButton type="submit" color="primary" :loading="pending">
        {{ $t('contact.send') }}
      </UButton>
    </UForm>

    </div>
  </UMain>
</template>

<script setup lang="ts">
import { z } from 'zod'

const { t } = useI18n()

useHead({ title: t('pages.contact.title') })

useSeoMeta({
  title: t('pages.contact.title'),
  description: t('pages.contact.description'),
})

const form = reactive({ name: '', email: '', subject: '', message: '' })
const pending = ref(false)
const success = ref(false)
const error = ref(false)

const schema = z.object({
  name:    z.string().min(2),
  email:   z.email(),
  subject: z.string().optional(),
  message: z.string().min(10),
})

async function submit() {
  pending.value = true
  success.value = false
  error.value = false
  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    success.value = true
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch {
    error.value = true
  } finally {
    pending.value = false
  }
}
</script>

import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { fetch, setup } from '@nuxt/test-utils/e2e'

const rootDir = fileURLToPath(new URL('../../', import.meta.url))

describe('contact API', async () => {
  await setup({ rootDir })

  it('rejects a submission missing required fields', async () => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: '', email: '', message: '' }),
      headers: { 'content-type': 'application/json' },
    })
    expect(res.status).toBe(400)
  })

  it('rejects a submission with an invalid email address', async () => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Jane Doe', email: 'not-an-email', message: 'Hello there, this is a test message.' }),
      headers: { 'content-type': 'application/json' },
    })
    expect(res.status).toBe(400)
  })

  it('accepts a valid submission', async () => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Jane Doe', email: 'jane@example.com', subject: 'Question', message: 'Hello there, this is a test message.' }),
      headers: { 'content-type': 'application/json' },
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ success: true })
  })
})

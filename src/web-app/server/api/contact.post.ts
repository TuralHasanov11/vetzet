import type { ContactForm } from '#shared/types'

export default defineEventHandler(async (event) => {
    const body = await readBody<ContactForm>(event)

    // Validate required fields at the API boundary
    if (!body.name || !body.email || !body.message) {
        throw createError({ statusCode: 400, message: 'Name, email, and message are required.' })
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(body.email)) {
        throw createError({ statusCode: 400, message: 'Invalid email address.' })
    }

    // TODO: integrate an email service (e.g. Resend, Mailpit in dev)
    // For now, log and return success
    console.info('[contact]', { name: body.name, email: body.email, subject: body.subject })

    return { success: true }
})

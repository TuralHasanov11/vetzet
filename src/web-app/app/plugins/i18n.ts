export default defineNuxtPlugin(nuxtApp => {
  // called right before setting a new locale
  nuxtApp.hook('i18n:beforeLocaleSwitch', (options) => {
    console.log('onBeforeLanguageSwitch', options.oldLocale, options.newLocale, options.initialSetup)
  })

  // called right after a new locale has been set
  nuxtApp.hook('i18n:localeSwitched', (options) => {
    console.log('onLanguageSwitched', options.oldLocale, options.newLocale)
  })
})

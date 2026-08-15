// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    app: {
        head: {
            title: 'Vetzet', // default fallback title
            htmlAttrs: {
                lang: 'az',
            },
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
        },
        pageTransition: { name: 'page', mode: 'out-in' },
    },

    ui: {
        // Prevent @nuxt/ui from auto-installing @nuxt/fonts (which queries remote providers like Bunny).
        fonts: false,
    },

    modules: [
        '@nuxt/icon',
        "@nuxt/ui",
        "@nuxtjs/i18n",
        "@nuxtjs/supabase",
        "@nuxt/test-utils/module",
        "@nuxt/image",
        "@nuxt/eslint",
        "@nuxt/scripts",
    ],

    i18n: {
        langDir: "locales/",
        locales: [
            { code: "az", language: 'az-AZ', name: "AZ", file: "az.json" },
            { code: "en", language: 'en-US', name: "EN", file: "en.json" },
            { code: "ru", language: 'ru-RU', name: "RU", file: "ru.json" },
        ],
        defaultLocale: "az",
        detectBrowserLanguage: false,
        strategy: 'prefix_except_default',
    },

    runtimeConfig: {
        public: {
            i18n: {
                baseUrl: 'http://localhost:3000'
            }
        }
    },

    supabase: {
        redirect: false,
        types: "~~/shared/types/database.types.ts"
    },

    css: ["~/assets/css/main.css"],

    sourcemap: {
        server: true,
        client: true,
    },

    typescript: {
        // Run `npm run typecheck` explicitly; avoids checker path issues on Windows paths with spaces.
        typeCheck: false,
    },

    routeRules: {
        // Set layout for specific route
        // '/admin/**': { appLayout: 'admin' },
    },

    icon: {
        serverBundle: {
            collections: ['uil', 'mdi'] 
        },
        clientBundle: {
            scan: true
        }
    }
});

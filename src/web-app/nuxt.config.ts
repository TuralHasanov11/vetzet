// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: {
      enabled: true,

      timeline: {
        enabled: true,
      },
    },
    app: {
        head: {
            title: 'Heyvan Sağlamlığı Diaqnostik Mərkəzi', // default fallback title
            titleTemplate: '%s | Vetzet',
            htmlAttrs: {
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
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
        'nuxt-schema-org',
        'nuxt-link-checker',
        '@nuxtjs/web-vitals',
        "@nuxtjs/html-validator",
        'nuxt-security',
        'nuxt-seo-utils',
        'nuxt-gtag'
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
    },

    site: {
        url: 'https://vetzet.com',
        name: 'Heyvan Sağlamlığı Diaqnostik Mərkəzi',
        description: 'Heyvan sağlamlığı, laborator diaqnostika və baytarlıq xidmətləri.',
    },

    robots: {
        // provide simple disallow rules for all robots `user-agent: *`
        // disallow: ['/admin'],
        // allow: '/admin/login',
        groups: [
            {
                userAgent: '*',
                allow: '/',
                contentUsage: {
                'bots': 'y',
                'train-ai': 'n'
                },
                contentSignal: {
                'ai-train': 'no',
                'search': 'yes'
                }
            }
        ]
    },

    schemaOrg: {
        identity: {
            type: 'VeterinaryCare',
            name: 'Heyvan Sağlamlığı Diaqnostik Mərkəzi',
            logo: '/images/logo.png',
            url: 'https://vetzet.com',
            email: 'hsdm@vetzetcom.net',
            telephone: '+994555605534',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Gəncə',
                streetAddress: 'Əziz Əliyev küç. 11B',
                addressCountry: 'AZ',
            },
        },
    },

    htmlValidator: { 
    },

    security: {
        headers: {
            contentSecurityPolicy: {
                'img-src': ["'self'", 'data:', 'https://vetzet.com', 'http://127.0.0.1:55421', 'https://iycszcvxibuqhniqecna.supabase.co'],
            },
        }
    },

    gtag: {
        enabled: process.env.NODE_ENV === 'production',
        id: 'G-XXXXXXXXXX'
    }
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// devtools: { enabled: true },
	css: ['~/assets/css/main.css'],

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	ssr: true,
	modules: ['@nuxt/image', '@pinia/nuxt', 'nuxt-shiki', '@vueuse/nuxt', '@nuxtjs/robots'],
	shiki: {
		defaultTheme: 'github-dark-default',
	},

	pinia: {
		storesDirs: ['./stores/**', './custom-folder/stores/**'],
	},

	app: {
		pageTransition: { name: 'page', mode: 'out-in', type: 'transition' },
		// Prevent automatic URL changes
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			htmlAttrs: {
				lang: 'en',
			},
		},
	},

	// Configure router to prevent unwanted URL changes
	router: {
		options: {
			strict: true,
		},
	},

	devtools: {
		enabled: true,
	},

	compatibilityDate: '2025-02-27',
})

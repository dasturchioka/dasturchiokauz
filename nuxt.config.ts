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
	ssr: false,
	modules: ['@nuxt/image', '@pinia/nuxt'],
	pinia: {
		storesDirs: ['./stores/**', './custom-folder/stores/**'],
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in', type: 'transition' },
	},
})

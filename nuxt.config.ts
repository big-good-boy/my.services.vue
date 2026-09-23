import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	css: ['~/assets/global.css', '~/assets/main.css'],

	modules: ['@nuxt/icon'],

	vite: { plugins: [tailwindcss()] },
});

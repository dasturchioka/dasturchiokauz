import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: { plugins: [tailwindcss()] },
  ssr: true,
  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-shiki",
    "@vueuse/nuxt",
    "@nuxtjs/robots",
    "nuxt-marquee",
    "@artmizu/yandex-metrika-nuxt",
    "nuxt-lucide-icons",
  ],
  shiki: {
    defaultTheme: "github-dark-default",
  },

  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },

  app: {
    pageTransition: { name: "page", mode: "out-in", type: "transition" },
    // Prevent automatic URL changes
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css",
        },
      ],
    },
  },

  // Configure router to prevent unwanted URL changes
  router: {
    options: {
      strict: true,
      scrollBehaviorType: "smooth", // Optional: for smooth scrolling after transition
    },
  },

  devtools: {
    enabled: false,
  },

  compatibilityDate: "2025-02-27",
  runtimeConfig: {
    public: {
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
  },
});

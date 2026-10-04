import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: { plugins: [tailwindcss()] },
  ssr: true,
  features: {
    inlineStyles: true,
  },
  $development: {
    app: {
      head: {
        link: [
          {
            // Load CSS before painting SSR HTML instead of waiting for Vite's JS.
            key: "site-styles",
            rel: "stylesheet",
            href: "/_nuxt/assets/css/main.css?direct",
          },
        ],
      },
    },
  },
  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-shiki",
    "@vueuse/nuxt",
    "@nuxtjs/robots",
    "nuxt-marquee",
    "@artmizu/yandex-metrika-nuxt",
    "nuxt-lucide-icons",
    "shadcn-nuxt",
    "@nuxtjs/mdc",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
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
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
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
    enabled: true,
  },

  compatibilityDate: "2025-02-27",
  runtimeConfig: {
    public: {
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
  },
});

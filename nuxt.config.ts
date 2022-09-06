import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  css: ["@/assets/main.css"],
  head: {
    title: "Sardor Aminov | dasturchioka",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Dasturchi, mentor, content maker. G'irt iplos odam.",
      },
      {
        name: "keywords",
        content:
          "dasturchioka, dasturchilar, dasturchiaka, sardor aminov, aminov sardor, sardoraminov, dasturchi oka, javascript dasturchi",
      },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "robots",
        content: "index, follow",
      },

      { property: "og:type", content: "website" },
      { property: "og:title", content: "Sardor Aminov | dasturchioka" },
      {
        property: "og:description",
        content: "Dasturchi, mentor, content maker. G'irt iplos odam.",
      },
      { property: "og:image", content: "/brand.jpg" },
      {
        property: "og:url",
        content: ["https://dasturchioka.com", "https://aminovdev.uz"],
      },
      { property: "og:site_name", content: "dasturchioka" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "am_HY" },
      { property: "og:locale:alternate", content: "ru_RU" },
      { property: "og:locale:alternate", content: "uz_UZ" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:locale:alternate", content: "en_GB" },
      { property: "og:locale:alternate", content: "en_CA" },
      { property: "og:locale:alternate", content: "en_AU" },
      { property: "og:locale:alternate", content: "en_NZ" },
      { property: "og:locale:alternate", content: "en_IE" },
      { property: "og:locale:alternate", content: "en_ZA" },
      { property: "og:locale:alternate", content: "en_HK" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/brand.jpg" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: true,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@400;500;700&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
      },
    ],
    script: [
      {
        type: "nomodule",
        src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js",
      },

      {
        nomodule: true,
        src: "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js",
      },
    ],
  },
});

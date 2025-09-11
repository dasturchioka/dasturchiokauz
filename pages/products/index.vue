<script setup lang="ts">
import KanbanBoard from "~/components/kanban-board/KanbanBoard.vue";
useHead({
  title: "Dasturchioka | Products",
  link: [
    {
      rel: "canonical",
      href: "https://dasturchioka.uz/products/",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        headline: "Products by Dasturchioka",
        description:
          "Browse a collection of projects and products built by Dasturchioka (Sardor Aminov), including web apps, platforms, and tools.",
        url: "https://dasturchioka.uz/products",
        author: {
          "@type": "Person",
          name: "Sardor Aminov",
          url: "https://dasturchioka.uz",
        },
      }),
      tagPriority: "low",
    },
  ],
  meta: [
    { name: "robots", content: "index, follow" },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      key: "description",
      name: "description",
      content:
        "Explore all products and projects developed by Dasturchioka (Sardor Aminov), ranging from web apps and mobile apps to AI-powered platforms.",
    },
    { key: "og:title", property: "og:title", content: "Dasturchioka | Products" },
    {
      key: "og:description",
      property: "og:description",
      content:
        "Discover the projects and products by Dasturchioka (Sardor Aminov), including successful platforms and experiments.",
    },
    {
      key: "og:image",
      property: "og:image",
      content: "https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100",
    },
    {
      key: "og:url",
      property: "og:url",
      content: "https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100",
    },
  ],
});

useSeoMeta({
  title: "Dasturchioka | Products",
  description:
    "Collection of projects and products developed by Sardor Aminov (Dasturchioka): web platforms, mobile apps, AI tools and more.",
  ogTitle: "Dasturchioka | Products",
  ogDescription:
    "Browse the products and projects built by Sardor Aminov (Dasturchioka).",
  ogImage: "https://dasturchioka.uz/images/products-banner.jpg",
  ogUrl: "https://dasturchioka.uz/products",
  author: "Sardor Aminov",
  robots: "index, follow",
  charset: "utf-8",
});

definePageMeta({layout: "non-container"})
</script>
<template>
  <div
    class="h-screen font-sfpro container  mx-auto text-black dark:text-white transition-all"
  >
    <div class="toggler sm:my-10 my-4 flex items-center justify-between w-full">
      <h1
        class="font-bold sm:text-lg text-base font-sfpro dark:text-white text-black transition-all"
      >
        My Products <span class="text-[#00a6fb]">.</span>
      </h1>
    </div>
    <KanbanBoard />
  </div>
</template>

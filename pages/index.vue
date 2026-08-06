<script setup lang="ts">
definePageMeta({
  layout: "default",
});
useHead({
  title: "Dasturchioka | Sardor Aminov",
  meta: [
    { name: "robots", content: "index, follow" },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      key: "description",
      name: "description",
      content:
        "Sardor Aminov, also known as dasturchioka, fullstack web and mobile developer since 2020, also mentor",
    },
    {
      key: "og:title",
      property: "og:title",
      content: "Dasturchioka | Sardor Aminov",
    },
    {
      key: "og:description",
      property: "og:description",
      content:
        "Sardor Aminov, also known as dasturchioka, fullstack web and mobile developer since 2020, also mentor",
    },
    {
      key: "og:image",
      property: "og:image",
      content:
        "https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100",
    },
    { key: "og:url", property: "og:url", content: "https://dasturchioka.uz" },
  ],
});
</script>

<template>
  <div
    class="home-page h-screen flex items-center justify-center container mx-auto sm:px-4 px-2 dark:text-white text-black font-sfpro"
  >
    <div class="text-container flex flex-col space-y-2">
      <div class="top flex flex-col items-start my-4">
        <h1 class="title font-bold md:text-6xl sm:text-4xl text-4xl">
          Sardor Aminov
        </h1>
      </div>
      <div class="middle">
        <p class="font-mont text-3xl font-sfpro italic flex items-center gap-2">Software Engineer @ <a href="https://modme.uz" target="_blank" class="border px-2 py-1 transition-all rounded-lg hover:border-[#ff8000]">Modme</a></p>
      </div>
    </div>
  </div>
</template>

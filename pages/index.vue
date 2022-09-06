<script setup>
useHead({
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
    { property: "og:image", content: "../assets/brand.jpg" },
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
});
</script>

<template>
  <div
    class="home flex flex-col items-center justify-center sm:px-16 px-5 pb-10 min-h-screen"
  >
    <div class="home-content mx-3 flex flex-col items-center justify-center">
      <div class="content-img w-72">
        <img
          class="w-full object-cover rounded-full"
          src="../assets/dasturchi.jpg"
          alt="dasturchioka"
        />
      </div>
      <div class="content-titles text-center mt-6 text-white">
        <h1 class="font-mont text-3xl font-bold">
          Sardor Aminov <span class="text-green">.</span>
        </h1>
        <p class="text-xl mb-3">Dasturchi, mentor, content maker, YouTuber</p>
        <div class="links sm:space-x-2 space-x-1">
          <a
            target="_blank"
            class="link font-dmMono"
            href="https://t.me/dasturchiokauz"
            >telegram</a
          >
          <span class="text-green">/</span>
          <a
            target="_blank"
            class="link font-dmMono"
            href="https://instagram.com/dasturchioka"
            >instagram</a
          >
          <span class="text-green">/</span>
          <a
            target="_blank"
            class="link font-dmMono"
            href="https://www.youtube.com/channel/UC0gFVZdSnt4gAGsSQE_nlHw"
            >youtube</a
          >
        </div>
      </div>
    </div>
    <h1 class="title">DASTURCHIOKA</h1>

    <NuxtLink
      href="/tweets"
      class="nuxt-link text-white px-4 py-2 font-dmMono mt-12 rounded relative"
    >
      <p class="">My tweets</p>
    </NuxtLink>
  </div>
</template>

<style scoped>
.nuxt-link::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  background: #fff;
  width: 100%;
  height: 2px;
  transform: scaleX(0.1);
  transform-origin: left;
  z-index: 1;
  transition: all 0.4s ease;
}

.nuxt-link::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  background: #fff;
  width: 100%;
  height: 2px;
  transform: scaleX(0.1);
  transform-origin: right;
  z-index: 1;
  transition: all 0.4s ease;
}

.nuxt-link:hover::before,
.nuxt-link:hover::after {
  background: #41b883;
  transform: scaleX(1);
}

.nuxt-link:hover::before {
  transform-origin: right;
}
.nuxt-link:hover::after {
  transform-origin: left;
}

.nuxt-link p {
  z-index: -1;
}
@media (max-width: 436px) {
  .text-xl {
    font-size: 14px;
    margin-top: 0;
    margin-bottom: 15px;
  }
}

@media (max-width: 314px) {
  .content-img {
    width: 100%;
  }

  h1 span {
    display: none;
  }
}

.home-content {
  z-index: 999;
}
.title {
  font-weight: 700;
  font-size: 80vw;
  line-height: 140px;
  -webkit-text-stroke: 4px;
  -webkit-text-stroke-color: #fff;
  color: #ffffff4a;
  z-index: -99;
  opacity: 0.1;
  position: fixed;
  top: 35%;
  left: 0;
  transform: translateX(20%);
  animation: move 30s linear infinite;
  z-index: 1;
  user-select: none;
  pointer-events: none;
}

@keyframes move {
  to {
    transform: translateX(-100%);
  }
}

body {
  user-select: none;
  overflow-x: hidden;
  background: #111111;
  animation: opacity 2s ease-in-out;
}

*::-webkit-scrollbar {
  display: none;
}

@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

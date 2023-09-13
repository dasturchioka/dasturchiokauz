<script setup>
const quotes = [
  "passion for programming",
  "remaking myself",
  "intelligence is the sexiest thing humanity ever has",
  "Hurry up and live",
  "The best answer to anger is silence",
  "The past is not just the past",
  "Man conquers the world by conquering himself",
];
</script>

<template>
  <div
    class="layout h-[100dvh] bg-[#090909] flex flex-col items-center justify-between pb-6"
  >
    <Vue3Marquee class="bg-[#151515] text-white">
      <div
        class="uppercase font-poppins font-medium tracking-wide flex items-center"
        v-for="(quote, index) in quotes"
        :key="index"
      >
        <p class="mx-4">•</p>
        <p>{{ quote }}</p>
      </div>
    </Vue3Marquee>
    <NuxtPage></NuxtPage>
    <nav
      class="nav-links flex items-center space-x-2 font-mono sm:text-lg text-base"
    >
      <NuxtLink to="/">home</NuxtLink>
      <p class="text-[#565656]">/</p>
      <NuxtLink to="/startups">start-ups</NuxtLink>
      <p class="text-[#565656]">/</p>
      <NuxtLink to="/stack">stack</NuxtLink>
      <p class="text-[#565656]">/</p>
      <NuxtLink to="/blog">blog</NuxtLink>
    </nav>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:wght@300;400;500&display=swap");
a.router-link-active,
a.router-link-exact-active {
  @apply text-white transition font-bold;
}

a:not(.router-link-active, .router-link-exact-active) {
  @apply text-[#565656];
}
</style>

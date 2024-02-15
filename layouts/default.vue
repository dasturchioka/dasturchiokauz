<script setup lang="ts">
const quotes = [
  "passion for programming",
  "the more calm he is, the more strength he has",
  "intelligence is the sexiest thing humanity ever has",
  "Hurry up and live",
  "The best answer to anger is silence",
  "Don't care",
  "Man conquers the world by conquering himself",
];
</script>

<template>
  <div
    class="layout h-[100dvh] overflow-hidden bg-[#090909] flex flex-col items-center justify-between pb-6"
  >
    <Vue3Marquee class="bg-[#151515] text-white enter-transition-layout">
      <div
        class="uppercase font-poppins font-medium tracking-wide flex items-center"
        v-for="(quote, index) in quotes"
        :key="index"
      >
        <p class="mx-4">•</p>
        <p>{{ quote }}</p>
      </div>
    </Vue3Marquee>
    <slot
      class="enter-transition-layout scroll-none container mx-auto sm:px-4 px-2 overflow-x-hidden max-h-full overflow-y-scroll"
    ></slot>
    <nav
      class="nav-links enter-transition-layout flex items-center space-x-2 font-mono sm:text-lg text-base"
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

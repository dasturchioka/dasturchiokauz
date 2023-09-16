<script setup>
useHead({
  title: "My stack",
});
</script>

<template>
  <div
    class="stacks text-white h-screen sm:py-10 py-6 gap-2 flex items-center justify-center flex-col text-center container mx-auto sm:px-4 px-2"
  >
  <span class="page-name bg-zinc-900 rounded px-4 py-1 font-mono">/stack</span>
    <h1 class="font-mont font-bold text-2xl">Coming soon...</h1>
    <p class="text-lg">I am still developing this page</p>
  </div>
</template>

<style scoped>
.stack img {
  transition: all 0.2s ease;
}
.stack:hover img {
  @apply grayscale-0;
}
</style>

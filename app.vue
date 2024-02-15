<script setup lang="ts">
definePageMeta({
  layout: "default"
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:wght@300;400;500&display=swap");
a.router-link-active,
a.router-link-exact-active {
  @apply text-white transition font-bold;
}

a:not(.router-link-active, .router-link-exact-active) {
  @apply text-[#565656];
}

.scroll-none::-webkit-scrollbar {
  display: none;
}

*,
* * {
  user-select: none;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
  opacity: 1;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.enter-transition-layout {
  transition: all 0.5s;
  opacity: 1;
  animation-name: enter;
  animation-duration: 0.6s;
}

@keyframes enter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

a {
  -webkit-tap-highlight-color: transparent;
}
</style>

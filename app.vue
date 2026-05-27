<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import "./assets/css/main.css";
</script>

<template>
  <div>
    <div
      class="bg-white text-black dark:bg-[#151515] dark:text-white transition-all duration-500"
    >
      <NuxtLayout class="still this container tho">
        <div
          class="h-[100dvh] overflow-x-hidden  overflow-y-scroll"
        >
          <div
            class="scroll-none bg-[#151515] w-full text-white enter-transition-layout"
          >
            <NuxtLoadingIndicator color="#00a6fb" />
          </div>
          <NuxtPage
            class="enter-transition-layout scroll-none container mx-auto sm:px-4 px-2 overflow-x-hidden max-h-full overflow-y-scroll pb-12"
          ></NuxtPage>
          <SpeedInsights />
          <Analytics />
        </div>
      </NuxtLayout>
    </div>
  </div>
</template>

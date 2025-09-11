<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { useTheme } from "#imports";
import "./assets/css/main.css";
import BubbleMenu from "./components/bits/BubbleMenu.vue";
import WebsiteLoader from "./components/Loader/WebsiteLoader.vue";

const { theme } = useTheme();
const router = useRouter();
const route = useRoute();

const showLoader = ref(true);
const showFallback = ref(true); // NEW: controls fallback div separately

// Disable automatic scroll changes on navigation
onMounted(() => {
  router.options.scrollBehavior = (to: any, from: any, savedPosition: any) => {
    if (savedPosition) return savedPosition;
    if (to.path === from.path) return false;
    return { top: 0 };
  };
});

// Check if loader already dismissed in this session
onMounted(() => {
  if (import.meta.client) {
    if (route.query.access === "granted-by-dasturchioka") {
      showLoader.value = false;
      sessionStorage.setItem("loaderDismissed", "true");
    }

    if (sessionStorage.getItem("loaderDismissed") === "true") {
      showLoader.value = false;
    }
  }
});

if (import.meta.client) {
  watch(
    () => route.query.access,
    (newVal: string) => {
      if (newVal === "granted-by-dasturchioka") {
        showLoader.value = false;
        sessionStorage.setItem("loaderDismissed", "true");
      }
    }
  );
}

function handleLoaderDismissed() {
  sessionStorage.setItem("loaderDismissed", "true");

  // Start fading out fallback
  showFallback.value = false;

  // Wait for CSS transition to finish before killing layout
  setTimeout(() => {
    showLoader.value = false;
    router.push("/");
  }, 600); // match this to transition duration
}
</script>

<template>
  <div>
    <div
      class="bg-white text-black dark:bg-[#151515] dark:text-white transition-all duration-500"
    >
      <NuxtLayout name="non-container" v-if="showLoader">
        <ClientOnly>
          <WebsiteLoader @dismissed="handleLoaderDismissed" />
          <template #fallback>
            <div
              v-if="showLoader"
              class="bg-white text-black dark:bg-[#151515] dark:text-white font-sfpro w-screen h-screen flex items-center justify-center fixed inset-0 z-[100]"
            >
              <LucideLoader class="size-10 animate-spin" />
            </div>
          </template>
        </ClientOnly>
      </NuxtLayout>

      <NuxtLayout v-else>
        <div
          class="h-[100dvh] overflow-x-hidden flex flex-col items-center justify-between overflow-y-scroll"
        >
          <div
            class="scroll-none bg-[#151515] w-full text-white enter-transition-layout"
          >
            <NuxtLoadingIndicator color="#00a6fb" />
          </div>
          <NuxtPage
            class="enter-transition-layout scroll-none container mx-auto sm:px-4 px-2 overflow-x-hidden max-h-full overflow-y-scroll pb-12"
          ></NuxtPage>

          <nav class="flex items-center gap-4 py-4">
            <BubbleMenu
              menu-aria-label="Toggle navigation"
              :use-fixed-position="false"
              animation-ease="back.out(1.5)"
              :animation-duration="0.5"
              :stagger-delay="0.12"
            />
            <ThemeToggle />
          </nav>
          <SpeedInsights />
          <Analytics />
        </div>
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "#imports";
import { LucideGithub } from "#components";
import { LucideLink, LucideVideo } from "lucide-vue-next";

const { theme } = useTheme();
const isDark = computed(() => theme.value === "dark");

const route = useRoute();
const product = ref<any | null>(null);
const loading = ref<boolean>(true);

onMounted(async () => {
  try {
    product.value = await $fetch(`/api/products/${route.params.id}`);

    if (product.value) {
      // SEO & Meta setup
      useHead({
        title: `${product.value.title} | Dasturchioka`,
        link: [
          {
            rel: "canonical",
            href: `https://dasturchioka.uz/products/${route.params.id}`,
          },
        ],
        script: [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: product.value.title,
              description:
                product.value.paragraphs?.[0] ||
                `Details about ${product.value.title}`,
              applicationCategory: "WebApplication",
              image:
                product.value.bannerUrl ??
                "https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100",
              url: `https://dasturchioka.uz/products/${route.params.id}`,
              author: {
                "@type": "Person",
                name: "Sardor Aminov",
                url: "https://dasturchioka.uz",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
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
              product.value.paragraphs?.[0] ||
              `Learn more about ${product.value.title} by Dasturchioka.`,
          },
          {
            key: "og:title",
            property: "og:title",
            content: `${product.value.title} | Dasturchioka`,
          },
          {
            key: "og:description",
            property: "og:description",
            content:
              product.value.paragraphs?.[0] ||
              `Explore ${product.value.title}, a project by Dasturchioka.`,
          },
          {
            key: "og:image",
            property: "og:image",
            content:
              product.value.bannerUrl ||
              "https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100",
          },
          {
            key: "og:url",
            property: "og:url",
            content: `https://dasturchioka.uz/products/${route.params.id}`,
          },
          { name: "twitter:card", content: "summary_large_image" },
        ],
      });

      useSeoMeta({
        title: `${product.value.title} | Dasturchioka`,
        description:
          product.value.paragraphs?.[0] ||
          `Detailed information about ${product.value.title}, a project by Dasturchioka.`,
        ogTitle: `${product.value.title} | Dasturchioka`,
        ogDescription:
          product.value.paragraphs?.[0] ||
          `Explore ${product.value.title}, built by Dasturchioka.`,
        ogImage:
          product.value.bannerUrl ||
          "https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100",
        ogUrl: `https://dasturchioka.uz/products/${route.params.id}`,
        author: "Sardor Aminov",
        robots: "index, follow",
        charset: "utf-8",
      });
    }
  } catch (err) {
    console.error("Failed to load product:", err);
    product.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="product && !loading" class="max-w-4xl mx-auto px-4 py-8 space-y-8">
    <!-- Banner -->
    <div v-if="product.bannerUrl" class="rounded-xl overflow-hidden shadow">
      <img :src="product.bannerUrl" :alt="product.title" class="w-full object-cover" />
    </div>

    <div class="titles">
      <h1 class="font-bold font-sfpro text-4xl dark:text-white text-black">
        {{ product.title }}
      </h1>
      <p class="text-black dark:text-white font-sfpro mt-2">
        {{ product.description }}
      </p>
    </div>

    <!-- Links -->
    <div class="flex flex-wrap gap-3 items-center">
      <NuxtLink
        v-for="(demo, i) in product.demoLink || []"
        :key="'demo-' + i"
        :to="demo"
        target="_blank"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-black"
      >
        <LucideLink class="size-4 dark:text-white text-black" />
        Demo {{ i + 1 }}
      </NuxtLink>

      <NuxtLink
        v-for="(src, i) in product.sourceCode || []"
        :key="'src-' + i"
        :to="src"
        target="_blank"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-md shadow-sm border text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-black"
      >
        <LucideGithub class="size-4" /> Code {{ i + 1 }}
      </NuxtLink>

      <NuxtLink
        v-if="product.demoVideo"
        :to="product.demoVideo"
        target="_blank"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-md shadow-sm border text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-black"
      >
        <LucideVideo class="size-4" /> Video
      </NuxtLink>
    </div>

    <!-- Tech Stack -->
    <div class="text-black dark:text-white">
      <h2 class="font-bold text-lg mb-3">Tech Stack</h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(tech, i) in product.stack"
          :key="i"
          class="px-2 py-1 text-sm font-medium rounded-md border bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- Status -->
    <div class="text-black dark:text-white">
      <h2 class="font-bold text-lg mb-2">Status</h2>
      <span
        class="inline-block px-3 py-1 rounded-full text-sm font-medium border"
        :class="{
          'bg-green-100 text-green-700 border-green-300': product.status === 'successful',
          'bg-yellow-100 text-yellow-700 border-yellow-300': product.status === 'in-progress',
          'bg-red-100 text-red-700 border-red-300': product.status === 'failed',
          'bg-gray-100 text-gray-600 border-gray-300': product.status === 'archived',
        }"
      >
        {{ product.status }}
      </span>
    </div>

    <!-- Paragraphs -->
    <div v-if="product.paragraphs?.length">
      <h2 class="font-bold text-lg mb-3 text-black dark:text-white">Details</h2>
      <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <MDC
          v-for="(para, i) in product.paragraphs"
          :key="i"
          class="mdc-content"
          :value="para"
          tag="article"
        />
      </div>
    </div>
  </div>

  <div v-else-if="!product && !loading" class="text-center py-16 text-gray-500 dark:text-gray-400">
    Product not found.
  </div>

  <div v-else-if="loading" class="text-center py-16 text-gray-500 dark:text-gray-400">
    Loading...
  </div>
</template>

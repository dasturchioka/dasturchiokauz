<script setup lang="ts">
import { LucideGithub } from "#components";
import { LucideLink, LucideVideo } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { useProjects } from "~/composables/useProjects";

const route = useRoute();
const { project, loadOneProject, loading } = useProjects();

onMounted(async () => {
  await loadOneProject(String(route.params.id));

  if (project.value) {
    // SEO & Meta setup
    useHead({
      title: `${project.value.title} | Dasturchioka`,
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
            name: project.value.title,
            description:
              project.value.paragraphs?.[0] ||
              `Details about ${project.value.title}`,
            applicationCategory: "WebApplication",
            image:
              project.value.bannerUrl ??
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
            project.value.paragraphs?.[0] ||
            `Learn more about ${project.value.title} by Dasturchioka.`,
        },
        {
          key: "og:title",
          property: "og:title",
          content: `${project.value.title} | Dasturchioka`,
        },
        {
          key: "og:description",
          property: "og:description",
          content:
            project.value.paragraphs?.[0] ||
            `Explore ${project.value.title}, a project by Dasturchioka.`,
        },
        {
          key: "og:image",
          property: "og:image",
          content:
            project.value.bannerUrl ||
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
      title: `${project.value.title} | Dasturchioka`,
      description:
        project.value.paragraphs?.[0] ||
        `Detailed information about ${project.value.title}, a project by Dasturchioka.`,
      ogTitle: `${project.value.title} | Dasturchioka`,
      ogDescription:
        project.value.paragraphs?.[0] ||
        `Explore ${project.value.title}, built by Dasturchioka.`,
      ogImage:
        project.value.bannerUrl ||
        "https://www.dasturchioka.uz/_vercel/image?url=%2Fimages%2Fprofile1.jpg&w=1536&q=100",
      ogUrl: `https://dasturchioka.uz/products/${route.params.id}`,
      author: "Sardor Aminov",
      robots: "index, follow",
      charset: "utf-8",
    });
  }
});
</script>

<template>
  <div v-if="project && !loading" class="max-w-4xl mx-auto px-4 py-8 space-y-8">
    <!-- 1. Banner -->
    <div v-if="project.bannerUrl" class="rounded-xl overflow-hidden shadow">
      <img
        :src="project.bannerUrl"
        :alt="project.title"
        class="w-full object-cover"
      />
    </div>

    <h1
      class="font-bold font-sfpro text-4xl transition-all dark:text-white text-black"
    >
      {{ project.title }}
    </h1>

    <!-- 2. Links -->
    <div class="flex flex-wrap gap-3 items-center">
      <!-- Demo Links -->
      <NuxtLink
        v-for="(demo, i) in project.demoLink || []"
        :key="'demo-' + i"
        :to="demo"
        target="_blank"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-black"
      >
        <LucideLink class="size-4 dark:text-white text-black transition-all" />
        Demo {{ i + 1 }}
      </NuxtLink>

      <!-- Source Code -->
      <NuxtLink
        v-for="(src, i) in project.sourceCode || []"
        :key="'src-' + i"
        :to="src"
        target="_blank"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-md shadow-sm border text-sm font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-black"
      >
        <LucideGithub class="size-4" /> Code {{ i + 1 }}
      </NuxtLink>

      <!-- Demo Video -->
      <NuxtLink
        v-if="project.demoVideo"
        :to="project.demoVideo"
        target="_blank"
        class="inline-flex items-center gap-2 px-3 py-2 rounded-md shadow-sm border text-sm font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-black"
      >
        <LucideVideo class="size-4" /> Video
      </NuxtLink>
    </div>

    <!-- 3. Tech Stack -->
    <div class="text-black dark:text-white transition-all">
      <h2 class="font-bold text-lg mb-3">Tech Stack</h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(tech, i) in project.stack"
          :key="i"
          class="px-2 py-1 text-sm font-medium rounded-md border bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 transition-all"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- 4. Status -->
    <div class="text-black dark:text-white transition-all">
      <h2 class="font-bold text-lg mb-2">Status</h2>
      <span
        class="inline-block px-3 py-1 rounded-full text-sm font-medium border transition-all"
        :class="{
          'bg-green-100 text-green-700 border-green-300':
            project.status === 'successful',
          'bg-yellow-100 text-yellow-700 border-yellow-300':
            project.status === 'in-progress',
          'bg-red-100 text-red-700 border-red-300': project.status === 'failed',
          'bg-gray-100 text-gray-600 border-gray-300':
            project.status === 'archived',
        }"
      >
        {{ project.status }}
      </span>
    </div>

    <!-- 5. Paragraphs -->
    <div v-if="project.paragraphs?.length">
      <h2
        class="font-bold text-lg mb-3 text-black dark:text-white transition-all"
      >
        Details
      </h2>
      <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <MDC
          v-for="(para, i) in project.paragraphs"
          :key="i"
          :value="para"
          tag="article"
        />
      </div>
    </div>
  </div>

  <div
    v-else-if="!project && !loading"
    class="text-center py-16 text-gray-500 dark:text-gray-400"
  >
    Project not found.
  </div>
  <div
    v-else-if="loading"
    class="text-center py-16 text-gray-500 dark:text-gray-400"
  >
    Loading...
  </div>
</template>

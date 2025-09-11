<script setup lang="ts">
import ProjectCard from "./ProjectCard.vue";

defineProps<{
  status: string;
  category: any;
  projects: any[];
}>();
</script>

<template>
  <div class="flex flex-col h-full transition-all">
    <!-- Category Header -->
    <div
      class="border rounded-xl p-4 mb-4 shadow-sm transition-all"
      :class="[
        category.light.bg,
        category.light.border,
        category.light.text,
        category.dark.bg,
        category.dark.border,
        category.dark.text,
      ]"
    >
      <h2
        class="font-bold text-lg font-sfpro flex items-center justify-between transition-all"
      >
        {{ category.title }}
        <span
          class="text-sm px-2 py-1 rounded-full transition-all bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-400"
        >
          {{ projects.length }}
        </span>
      </h2>
    </div>

    <!-- Projects List -->
    <div class="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 transition-all">
      <ProjectCard
        v-for="proj in projects"
        :key="proj.id"
        :project="proj"
        :theme="{
          cardBg: category.light.cardBg + ' ' + category.dark.cardBg,
          cardBorder:
            category.light.cardBorder + ' ' + category.dark.cardBorder,
          text: category.light.text + ' ' + category.dark.text,
        }"
      />
      <div
        v-if="projects.length === 0"
        class="text-center py-8 text-gray-400 dark:text-gray-500 font-mono text-sm transition-all"
      >
        More projects will be added soon
      </div>
    </div>
  </div>
</template>

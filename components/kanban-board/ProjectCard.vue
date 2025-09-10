<script setup lang="ts">
defineProps<{
  project: any;
  theme: any;
}>();
</script>

<template>
  <NuxtLink :to="`/products/${project.id}`">
    <div
      :class="[
        theme.cardBg,
        theme.cardBorder,
        'border rounded-xl p-4 transition-all  shadow-sm hover:shadow-md',
      ]"
    >
      <!-- Title + Desc -->
      <div class="mb-3">
        <h3
          class="font-semibold text-lg leading-tight mb-1 font-sfpro transition-all text-black dark:text-white"
        >
          {{ project.title }}
        </h3>
        <p
          class="text-sm leading-relaxed font-sfpro transition-all text-gray-600 dark:text-gray-400"
        >
          {{ project.description }}
        </p>
      </div>

      <!-- Tech Stack -->
      <div class="mb-3">
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="(tech, i) in project.stack"
            :key="i"
            class="px-2 py-1 text-xs font-medium rounded-md border transition-all bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex justify-between items-center pt-2 border-t border-opacity-20"
      >
        <span
          class="text-sm font-medium transition-all text-gray-500 dark:text-gray-400"
        >
          {{ project.year }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

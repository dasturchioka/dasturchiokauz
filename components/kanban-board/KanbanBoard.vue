<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import KanbanColumn from "./KanbanColumn.vue";
import { useTheme } from "#imports";

const { theme } = useTheme();
const isDark = computed(() => theme.value === "dark");

const products = ref<any[]>([]);
const categories = ref<Record<string, any> | null>(null);
const loading = ref<boolean>(false);

async function loadProducts() {
  loading.value = true;
  try {
    const res = await $fetch("/api/products");
    console.log("Products loaded:", products.value); // Debug log

    if (!res) throw "Error on loading products";
    products.value = res ?? [];
  } catch (e) {
    console.error("Failed to load products:", e);
    products.value = [];
  } finally {
    loading.value = false;
  }
}

async function loadCategories() {
  try {
    const res = await $fetch("/api/products/categories");
    console.log("Categories response:", res); // Debug log
    if (!res) throw "Error on loading categories";
    categories.value = res ?? {};
    console.log("Categories loaded:", categories.value); // Debug log
  } catch (e) {
    console.error("Failed to load categories:", e);
    categories.value = {};
  }
}

onMounted(async () => {
  await loadCategories();
  await loadProducts();
});

// Group products by their status
const groupedProducts = computed(() => {
  const grouped: Record<string, any[]> = {};

  if (!categories.value) {
    console.log("No categories available");
    return grouped;
  }

  Object.keys(categories.value).forEach((status) => {
    grouped[status] = products.value.filter((p) => p.status === status);
    console.log(`Status ${status}:`, grouped[status].length, "products"); // Debug log
  });

  console.log("Grouped products:", grouped); // Debug log
  return grouped;
});
</script>

<template>
  <div class="min-h-screen w-full font-sfpro transition-all">
    <!-- Loading -->
    <div
      v-if="loading"
      class="min-h-[50vh] flex justify-center items-center text-black dark:text-white transition-all"
    >
      <div class="flex items-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
        ></div>
        <span class="ml-3 font-sfpro">Loading products...</span>
      </div>
    </div>

    <!-- No Data State -->
    <div
      v-else-if="!categories || Object.keys(categories).length === 0"
      class="min-h-[50vh] flex justify-center items-center text-black dark:text-white"
    >
      <div class="text-center">
        <p class="text-lg font-medium">No categories found</p>
        <p class="text-sm text-gray-500">Check your API endpoint</p>
      </div>
    </div>

    <!-- Kanban Board -->
    <div
      v-else
      class="kanban-scrollbar flex justify-between gap-6 min-h-screen overflow-x-auto pb-6 transition-all"
    >
      <KanbanColumn
        v-for="(cat, status) in categories"
        :key="status"
        :status="status"
        :category="cat"
        :projects="groupedProducts[status] || []"
        class="w-80 flex-shrink-0 transition-all"
      />
    </div>
  </div>
</template>

<style scoped>
.kanban-scrollbar {
  -ms-overflow-style: auto !important;
  scrollbar-width: thin !important;
  overflow-y: hidden;
}

.kanban-scrollbar::-webkit-scrollbar {
  height: 8px !important;
  display: block !important;
}

.kanban-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 9999px;
  background: rgba(100, 100, 100, 0.32);
  transition: background 150ms;
}

.kanban-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

:deep(.dark) .kanban-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(200, 200, 200, 0.18);
}

.kanban-scrollbar {
  scrollbar-color: rgba(100, 100, 100, 0.32) transparent !important;
}

:deep(.dark) .kanban-scrollbar {
  scrollbar-color: rgba(200, 200, 200, 0.18) transparent !important;
}

.kanban-scrollbar > * {
  padding-bottom: 2px;
}
</style>

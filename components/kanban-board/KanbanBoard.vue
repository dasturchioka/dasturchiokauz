<script setup lang="ts">
import { computed, onMounted } from "vue";
import KanbanColumn from "./KanbanColumn.vue";
import { useProjects } from "~/composables/useProjects";
import { useTheme } from "#imports";

const { theme } = useTheme();
const { projects, loading, loadProjects, categories } = useProjects();

const isDark = computed(() => theme.value === "dark");

onMounted(() => {
  loadProjects();
});

const groupedProjects = computed(() => {
  const grouped: Record<string, any[]> = {};
  Object.keys(categories).forEach((status) => {
    grouped[status] = projects.value.filter((p: any) => p.status === status);
  });
  return grouped;
});
</script>

<template>
  <div
    class="min-h-screen w-full font-sfpro transition-all "
  >
    <!-- Loading -->
    <div
      v-if="loading"
      class="min-h-[50vh] flex justify-center items-center text-black dark:text-white transition-all"
    >
      <div class="flex items-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
        ></div>
        <span class="ml-3 font-sfpro">Loading projects...</span>
      </div>
    </div>

    <!-- Kanban Board: horizontal scroll container -->
    <div
      v-else
      class="kanban-scrollbar flex gap-6 h-[calc(100vh-200px)] overflow-x-auto pb-6 transition-all"
    >
      <!-- fixed width columns, don't shrink -->
      <KanbanColumn
        v-for="(cat, status) in categories"
        :key="status"
        :status="status"
        :category="cat"
        :projects="groupedProjects[status] || []"
        class="w-80 flex-shrink-0 transition-all"
      />
    </div>
  </div>
</template>

<style scoped>
/* FORCE visible thin scrollbar for the kanban area only (overrides global hide) */
.kanban-scrollbar {
  -ms-overflow-style: auto !important; /* IE/Edge */
  scrollbar-width: thin !important; /* Firefox */
  overflow-y: hidden;
}

/* WebKit horizontal scrollbar (Chrome, Safari) */
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

/* Dark-mode thumb color */
:deep(.dark) .kanban-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(200, 200, 200, 0.18);
}

/* Firefox colors (thin) */
.kanban-scrollbar {
  scrollbar-color: rgba(100, 100, 100, 0.32) transparent !important;
}
:deep(.dark) .kanban-scrollbar {
  scrollbar-color: rgba(200, 200, 200, 0.18) transparent !important;
}

/* small padding so scrollbar doesn't overlap column shadows on some UIs */
.kanban-scrollbar > * {
  /* little visual breathing */
  padding-bottom: 2px;
}
</style>

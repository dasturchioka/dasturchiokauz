<template>
  <ClientOnly>
    <button
      class="theme-toggle"
      :class="{ 'theme-toggle--toggled': themeLocal === 'dark' }"
      @click="toggleTheme"
      aria-label="Toggle theme"
    >
      <svg
        class="theme-toggle__svg"
        aria-hidden="true"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <title>
          {{
            themeLocal === "dark"
              ? "Switch to light theme"
              : "Switch to dark theme"
          }}
        </title>

        <clipPath id="theme-toggle-clip">
          <path class="theme-toggle__path" :d="currentPath" />
        </clipPath>

        <g class="theme-toggle__group" clip-path="url(#theme-toggle-clip)">
          <!-- Central circle (sun/moon body) -->
          <circle
            class="theme-toggle__circle theme-toggle__circle--center"
            cx="16"
            cy="16"
            r="8.4"
          />

          <!-- Sun rays (6 small circles) -->
          <circle
            v-for="(ray, index) in sunRays"
            :key="index"
            class="theme-toggle__circle theme-toggle__circle--ray"
            :cx="ray.cx"
            :cy="ray.cy"
            :r="ray.r"
            :style="{ '--delay': ray.delay }"
          />
        </g>
      </svg>
    </button>
    
    <template #fallback>
      <!-- Simple placeholder during SSR -->
      <button 
        class="theme-toggle" 
        aria-label="Toggle theme"
        disabled
      >
        <svg
          class="theme-toggle__svg"
          aria-hidden="true"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <title>Toggle theme</title>
          
          <!-- Default light theme state for SSR -->
          <g class="theme-toggle__group">
            <!-- Central circle (sun body) -->
            <circle
              class="theme-toggle__circle theme-toggle__circle--center"
              cx="16"
              cy="16"
              r="8.4"
              fill="currentColor"
            />
            
            <!-- Sun rays (6 small circles) -->
            <circle cx="16" cy="4" r="2.5" fill="currentColor" />
            <circle cx="25.66" cy="8" r="2.5" fill="currentColor" />
            <circle cx="25.66" cy="24" r="2.5" fill="currentColor" />
            <circle cx="16" cy="28" r="2.5" fill="currentColor" />
            <circle cx="6.34" cy="24" r="2.5" fill="currentColor" />
            <circle cx="6.34" cy="8" r="2.5" fill="currentColor" />
          </g>
        </svg>
      </button>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useTheme } from "#imports";

// Theme state
const { theme, toggleTheme } = useTheme();
const themeLocal = ref(theme);

watch(
  () => theme.value,
  (val) => {
    if (val) {
      themeLocal.value = val;
      console.log(val);
      console.log(themeLocal.value);
    }
  },
  { immediate: true, deep: true }
);

// Sun ray positions (6 circles around the center)
const sunRays = [
  { cx: 16, cy: 4, r: 2.5, delay: "126.5ms" }, // top
  { cx: 25.66, cy: 8, r: 2.5, delay: "174ms" }, // top-right
  { cx: 25.66, cy: 24, r: 2.5, delay: "221.5ms" }, // bottom-right
  { cx: 16, cy: 28, r: 2.5, delay: "269ms" }, // bottom
  { cx: 6.34, cy: 24, r: 2.5, delay: "316.5ms" }, // bottom-left
  { cx: 6.34, cy: 8, r: 2.5, delay: "364ms" }, // top-left
];

// Path morphing between day and night shapes
const dayPath = "M0 0h42v30a1 1 0 00-16 13H0Z";
const nightPath = "M-12-14h42v30a1 1 0 00-16 13H0Z";

const currentPath = computed(() => {
  return themeLocal.value === "dark" ? nightPath : dayPath;
});
</script>

<style scoped>
.theme-toggle {
  --theme-toggle__around--duration: 500ms;

  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.theme-toggle:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

.theme-toggle__svg {
  display: block;
}

.theme-toggle__group {
  transition: transform ease;
  transition-duration: var(--theme-toggle__around--duration);
  transform-origin: 16px 16px;
}

.theme-toggle--toggled .theme-toggle__group {
  transform: rotate(-90deg);
}

.theme-toggle__circle {
  fill: currentColor;
  transition: transform ease;
  transform-origin: center;
}

.theme-toggle__circle--center {
  transition-duration: 300ms;
}

.theme-toggle--toggled .theme-toggle__circle--center {
  transform: scale(1.4);
}

.theme-toggle__circle--ray {
  transition-duration: 100ms;
  transition-delay: var(--delay);
}

.theme-toggle--toggled .theme-toggle__circle--ray {
  transform: scale(0);
  transition-duration: 200ms;
}

.theme-toggle__path {
  transition: d ease var(--theme-toggle__around--duration);
}

/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .theme-toggle__group,
  .theme-toggle__circle,
  .theme-toggle__path {
    transition: none !important;
  }

  .theme-toggle--animate .theme-toggle__group,
  .theme-toggle--animate .theme-toggle__circle,
  .theme-toggle--animate .theme-toggle__path {
    transition: none !important;
  }
}

/* Dark theme styles */
.theme-toggle--toggled {
  color: #fbbf24; /* moon color */
}

.theme-toggle:not(.theme-toggle--toggled) {
  color: #f59e0b; /* sun color */
}

/* Additional hover effects */
.theme-toggle:hover:not(.theme-toggle--toggled) {
  background-color: rgba(245, 158, 11, 0.1);
}

.theme-toggle--toggled:hover {
  background-color: rgba(251, 191, 36, 0.1);
}

/* Fallback styles for SSR placeholder */
.theme-toggle:disabled {
  opacity: 0.7;
  cursor: default;
}

.theme-toggle:disabled:hover {
  background-color: transparent;
}
</style>
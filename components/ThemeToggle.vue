<template>
    <button
      @click="toggleTheme"
      class="theme-toggle"
      :class="{ dark: theme === 'dark' }"
      aria-label="Toggle theme"
    >
      <!-- Sun icon -->
      <svg
        v-if="theme !== 'dark'"
        xmlns="http://www.w3.org/2000/svg"
        class="theme-toggle__icon"
        viewBox="0 0 24 24"
        fill="black"
      >
        <circle cx="12" cy="12" r="5" />
        <g>
          <line x1="12" y1="1" x2="12" y2="4" stroke="black" stroke-width="2"/>
          <line x1="12" y1="20" x2="12" y2="23" stroke="black" stroke-width="2"/>
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="black" stroke-width="2"/>
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="black" stroke-width="2"/>
          <line x1="1" y1="12" x2="4" y2="12" stroke="black" stroke-width="2"/>
          <line x1="20" y1="12" x2="23" y2="12" stroke="black" stroke-width="2"/>
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="black" stroke-width="2"/>
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="black" stroke-width="2"/>
        </g>
      </svg>
  
      <!-- Moon icon -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="theme-toggle__icon"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M21 12.79A9 9 0 1111.21 3
             a7 7 0 009.79 9.79z"
        />
      </svg>
    </button>
  </template>
  
  <script setup lang="ts">
  import { useTheme } from "@/composables/useTheme"; // adjust path if needed
  
  const { theme, toggleTheme } = useTheme();
  </script>
  
  <style scoped>
  .theme-toggle {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
  }
  .theme-toggle:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .theme-toggle.dark:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .theme-toggle__icon {
    width: 32px;
    height: 32px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  /* animate switching */
  .theme-toggle__icon {
    opacity: 1;
  }
  .theme-toggle__icon[style*="display: none"] {
    opacity: 0;
    transform: scale(0.8);
  }
  </style>
  
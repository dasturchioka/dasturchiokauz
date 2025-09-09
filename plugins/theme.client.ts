export default defineNuxtPlugin(() => {
  // This runs on client-side before Vue hydration
  if (import.meta.client) {
    try {
      const theme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const isDark = theme === "dark" || (!theme && prefersDark);

      document.documentElement.classList.toggle("dark", isDark);
    } catch (e) {
      // Handle localStorage errors (private browsing, etc.)
    }
  }
});

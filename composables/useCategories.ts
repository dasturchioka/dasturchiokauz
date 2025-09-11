import type { ProductStatus } from "~/server/api/products/types";

interface CategoryTheme {
  title: string;
  light: {
    bg: string;
    border: string;
    text: string;
    cardBg: string;
    cardBorder: string;
  };
  dark: {
    bg: string;
    border: string;
    text: string;
    cardBg: string;
    cardBorder: string;
  };
}

export function useCategories() {
  const categories = ref<Record<ProductStatus, CategoryTheme> | null>(null);
  const loading = ref<boolean>(false);

  async function loadCategories() {
    loading.value = true;
    try {
      const { data, error } = await useFetch<Record<ProductStatus, CategoryTheme>>(
        "/api/products/categories"
      );
      if (error.value) throw error.value;
      categories.value = data.value ?? null;
    } catch (e) {
      console.error("Failed to load categories:", e);
      categories.value = null;
    } finally {
      loading.value = false;
    }
  }

  return {
    categories,
    loading,
    loadCategories,
  };
}

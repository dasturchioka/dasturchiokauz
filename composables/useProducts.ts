import type { Product } from "~/server/api/products/types";

export function useProducts() {
  const products = ref<Product[]>([]);
  const product = ref<Product | null>(null);
  const loading = ref<boolean>(false);

  async function loadProducts() {
    loading.value = true;
    try {
      const { data, error } = await useFetch<Product[]>("/api/products");
      console.log(data);
      
      if (error.value) throw error.value;
      products.value = data.value ?? [];
    } catch (e) {
      console.error("Failed to load products:", e);
      products.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function loadOneProduct(id: string) {
    loading.value = true;
    try {
      const { data, error } = await useFetch<Product>(`/api/products/${id}`);
      if (error.value) throw error.value;
      product.value = data.value ?? null;
    } catch (e) {
      console.error("Failed to load product:", e);
      product.value = null;
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    product,
    loading,
    loadProducts,
    loadOneProduct,
  };
}

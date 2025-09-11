import type { Product } from "./types";
import products from "../../data/products/products.json";

export default defineEventHandler(async () => {
  // Return only summary fields
  return (products as Product[]).map(({ id, title, description, stack, year, status }) => ({
    id,
    title,
    description,
    stack,
    year,
    status
  }));
});

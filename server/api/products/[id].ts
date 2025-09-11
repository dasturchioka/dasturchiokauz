import type { Product } from "./types";
import products from "../../data/products/products.json";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const project = (products as Product[]).find((p) => p.id === id);

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: `Product with id "${id}" not found`,
    });
  }

  return project;
});
 
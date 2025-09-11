export interface Product {
  id: string;
  title: string;
  description: string;
  status: "successful" | "in-progress" | "failed" | "archived";
  year: string;
  stack: string[];

  // extended fields
  paragraphs?: string[];
  sourceCode?: string[];
  demoLink?: string[];
  demoVideo?: string;
  bannerUrl?: string;
}

export type ProductStatus = "successful" | "in-progress" | "failed" | "archived";
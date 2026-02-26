import { useQuery } from "@tanstack/react-query";
import {
  PRODUCTS,
  getFeaturedProducts,
  getProductBySlug,
  searchProducts,
} from "@/data/products";
import type { FilterOptions, PaginatedProducts, Product } from "@/types";

// Simulate async fetch
async function fetchProducts(filters: FilterOptions): Promise<PaginatedProducts> {
  await new Promise((res) => setTimeout(res, 300));

  let result = [...PRODUCTS];

  if (filters.search) {
    result = searchProducts(filters.search);
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.subcategory) {
    result = result.filter((p) => p.subcategory === filters.subcategory);
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.sizes?.length) {
    result = result.filter((p) =>
      p.sizes.some(
        (s) => filters.sizes!.includes(s.label) && s.available
      )
    );
  }

  // Sort
  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "popular":
    default:
      result.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 12;
  const total = result.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const products = result.slice(start, start + limit);

  return {
    products,
    total,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
}

async function fetchProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((res) => setTimeout(res, 200));
  return getProductBySlug(slug) ?? null;
}

export function useProducts(filters: FilterOptions = {}) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
  });
}

export function useFeaturedProducts(limit?: number) {
  return useQuery({
    queryKey: ["featured-products", limit],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 100));
      return getFeaturedProducts(limit);
    },
  });
}

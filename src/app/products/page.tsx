"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Grid2X2, Grid3X3, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/product/ProductCard";
import { useProducts } from "@/hooks/use-products";
import type { FilterOptions, ProductCategory } from "@/types";

const CATEGORIES = ["men", "women", "kids", "accessories", "gifts"];
const SUBCATEGORIES = [
  "hoodies", "jackets", "jeans", "shirts", "sneakers",
  "bags", "hats", "scarves", "gloves", "trainers",
];
const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [filters, setFilters] = useState<FilterOptions>({
    category: (searchParams.get("category") as ProductCategory) || undefined,
    subcategory: (searchParams.get("sub") as FilterOptions["subcategory"]) || undefined,
    search: searchParams.get("search") || undefined,
    sortBy: "popular",
    page: 1,
    limit: 12,
  });

  const { data, isLoading } = useProducts(filters);

  const updateFilter = useCallback(
    (key: keyof FilterOptions, value: FilterOptions[keyof FilterOptions]) => {
      setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    },
    []
  );

  const clearFilters = () => {
    setFilters({ sortBy: "popular", page: 1, limit: 12 });
    router.push("/products");
  };

  const activeFiltersCount = [
    filters.category,
    filters.subcategory,
    filters.search,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-[#f5f5f5] py-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">
            Explore
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight uppercase">
            {filters.search
              ? `Search: "${filters.search}"`
              : filters.category
              ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1)
              : "All Products"}
          </h1>
          {data && (
            <p className="text-sm text-gray-400 mt-2 tracking-wide">
              {data.total} products
            </p>
          )}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b">
          {/* Left: Category + Sub filters */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Category */}
            <div className="flex gap-1.5 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    updateFilter(
                      "category",
                      filters.category === cat ? undefined : (cat as ProductCategory)
                    )
                  }
                  className={`text-[10px] tracking-[0.15em] uppercase px-3.5 py-1.5 border transition-colors duration-200 ${
                    filters.category === cat
                      ? "bg-brand-dark text-white border-brand-dark"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Active filter badge */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-[10px] tracking-wider text-brand-red hover:text-brand-red/80"
              >
                <X className="h-3 w-3" />
                Clear filters
              </button>
            )}
          </div>

          {/* Right: Sort + Grid toggle */}
          <div className="flex items-center gap-4">
            <Select
              value={filters.sortBy}
              onValueChange={(v) =>
                updateFilter("sortBy", v as FilterOptions["sortBy"])
              }
            >
              <SelectTrigger className="w-44 text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 transition-colors ${
                  gridCols === 3 ? "text-black" : "text-gray-300 hover:text-gray-600"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 transition-colors ${
                  gridCols === 4 ? "text-black" : "text-gray-300 hover:text-gray-600"
                }`}
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subcategory pills */}
        <div className="flex gap-2 flex-wrap mb-8 overflow-x-auto scrollbar-hide">
          {SUBCATEGORIES.map((sub) => (
            <button
              key={sub}
              onClick={() =>
                updateFilter(
                  "subcategory",
                  filters.subcategory === sub ? undefined : (sub as FilterOptions["subcategory"])
                )
              }
              className={`text-[10px] tracking-[0.15em] uppercase px-4 py-1.5 whitespace-nowrap transition-colors duration-200 ${
                filters.subcategory === sub
                  ? "bg-brand-dark text-white"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div
            className={`grid gap-x-4 gap-y-10 ${
              gridCols === 4
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-2 sm:grid-cols-3"
            }`}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-[3/4] mb-3" />
                <div className="h-3 bg-gray-100 w-1/2 mb-2" />
                <div className="h-3 bg-gray-100 w-3/4 mb-2" />
                <div className="h-4 bg-gray-100 w-1/3" />
              </div>
            ))}
          </div>
        ) : data?.products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg font-medium tracking-wider uppercase mb-2">
              No products found
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Try adjusting your filters or search term.
            </p>
            <Button onClick={clearFilters} variant="outline" className="border-black">
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div
            className={`grid gap-x-4 gap-y-10 ${
              gridCols === 4
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-2 sm:grid-cols-3"
            }`}
          >
            {data?.products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-16">
            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, page }))
                  }
                  className={`w-10 h-10 text-sm font-medium transition-colors ${
                    filters.page === page
                      ? "bg-brand-dark text-white"
                      : "border border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

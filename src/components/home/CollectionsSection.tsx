"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

interface CollectionsSectionProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function CollectionsSection({
  products,
  title = "Winter Collections",
  subtitle = "Let us love winter for it is the spring of genius.",
}: CollectionsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const visibleProducts = products.slice(0, visibleCount);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-[0.1em] uppercase mb-3">
            {title}
          </h2>
          <p className="text-sm text-gray-500 tracking-wider">{subtitle}</p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {visibleProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < products.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            <Button
              onClick={() => setVisibleCount((c) => c + 8)}
              variant="outline"
              className="border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white px-14 h-11 text-xs tracking-[0.2em]"
            >
              Load More Products
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

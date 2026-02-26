"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED_CATEGORIES } from "@/data/categories";

export function FeaturedCategories() {
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
            Featured Collections
          </h2>
          <p className="text-sm text-gray-500 tracking-wider">
            Top new collections with MODO brands — explore now
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-3 gap-3 h-[640px] lg:h-[700px]">
          {/* Row 1 */}
          {/* Jeans - tall left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="row-span-2 relative overflow-hidden group cursor-pointer"
          >
            <Link href="/products?sub=jeans" className="block h-full relative">
              <Image
                src={FEATURED_CATEGORIES[0].image}
                alt="Jeans collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white font-semibold text-lg tracking-[0.15em] uppercase">
                  Jeans
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Hoodie - tall center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="row-span-2 relative overflow-hidden group cursor-pointer bg-[#f0ede8]"
          >
            <Link href="/products?sub=hoodies" className="block h-full relative">
              <Image
                src={FEATURED_CATEGORIES[1].image}
                alt="Hoodie collection"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              {/* Special offer badge */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] tracking-[0.1em] px-3 py-1 text-center whitespace-nowrap z-10">
                OPEN WITH BUY AND APPLY CODE HOOD25
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-semibold text-lg tracking-[0.15em] uppercase mb-3">
                  Hoodie
                </p>
                <Link
                  href="/products?sub=hoodies"
                  className="inline-flex items-center gap-2 bg-white text-black text-[10px] tracking-[0.15em] uppercase px-4 py-2 hover:bg-brand-red hover:text-white transition-colors"
                >
                  Discover
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </Link>
          </motion.div>

          {/* Bags - top right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden group cursor-pointer"
          >
            <Link href="/products?sub=bags" className="block h-full relative">
              <Image
                src={FEATURED_CATEGORIES[2].image}
                alt="Bags collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold tracking-[0.15em] uppercase">
                  Bags
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Row 2 */}
          {/* Shirts - bottom of left column (but col 3 already taken) */}
          {/* Actually we need to re-think the layout since we only have 3 cols */}
          {/* Sneakers - bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden group cursor-pointer"
          >
            <Link href="/products?sub=sneakers" className="block h-full relative">
              <Image
                src={FEATURED_CATEGORIES[4].image}
                alt="Sneakers collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold tracking-[0.15em] uppercase">
                  Sneakers
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Second Row - 3 columns */}
        <div className="grid grid-cols-3 gap-3 mt-3 h-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden group cursor-pointer"
          >
            <Link href="/products?sub=shirts" className="block h-full relative">
              <Image
                src={FEATURED_CATEGORIES[3].image}
                alt="Shirts collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold tracking-[0.15em] uppercase">
                  Shirts
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden group cursor-pointer col-span-2"
          >
            <Link href="/products?sub=jackets" className="block h-full relative">
              <Image
                src={FEATURED_CATEGORIES[5].image}
                alt="Jacket collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="66vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold tracking-[0.15em] uppercase">
                  Jacket
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

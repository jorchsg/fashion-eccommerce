"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

const genderCategories = CATEGORIES.filter((c) =>
  ["men", "women", "kids"].includes(c.id)
);

export function GenderCategories() {
  return (
    <section className="py-16 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {genderCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group relative block overflow-hidden aspect-[3/4]"
              >
                <Image
                  src={cat.image}
                  alt={`${cat.name} fashion`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Label */}
                <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-white font-serif text-3xl font-bold tracking-wide uppercase">
                      {cat.name}
                    </p>
                  </div>
                  <motion.div
                    className="bg-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowRight className="h-4 w-4 text-black" />
                  </motion.div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

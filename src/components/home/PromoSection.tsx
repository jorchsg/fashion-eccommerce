"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoSection() {
  return (
    <section className="py-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden min-h-[320px]"
        >
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=80"
            alt="Promo – store interior"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/20" />
          {/* Italic script overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-serif italic text-white text-4xl lg:text-5xl font-bold opacity-60 select-none">
              Tailor
              <br />
              collections
            </p>
          </div>
        </motion.div>

        {/* Right - Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-[#f9f9f9] flex items-center px-10 py-16 lg:px-20"
        >
          <div className="max-w-md">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-4">
              Exclusive Offer
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight leading-tight uppercase mb-6">
              Find Your Perfect
              <br />
              Look At MODO — New
              <br />
              Collection In Store
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Discover our curated selection of premium fashion pieces. From
              casual everyday wear to statement pieces, we have everything you
              need to express your unique style.
            </p>
            <div className="mb-8">
              <p className="text-xs tracking-wider uppercase text-gray-400 mb-1">
                Sales and Discount
              </p>
              <p className="font-serif text-5xl font-bold text-brand-dark">
                87%
              </p>
            </div>
            <Button
              asChild
              className="bg-brand-dark text-white hover:bg-brand-dark/90 group"
            >
              <Link href="/products" className="flex items-center gap-2">
                Find The Store
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

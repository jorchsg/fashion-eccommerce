"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function SeasonBanner() {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden my-16 mx-4 lg:mx-8 rounded-none">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1600&q=80"
        alt="Wear to winter – season collection"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-3">
            New Season Arrivals
          </p>
          <h2 className="font-serif text-white text-4xl lg:text-6xl font-bold uppercase tracking-tight mb-2">
            Wear To Winter
          </h2>
          <p className="text-white/70 text-sm tracking-wider mb-6">
            Let us love winter for it is the spring of genius.
          </p>
        </motion.div>
      </div>

      {/* Shop Now button - bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute bottom-10 right-10 z-10"
      >
        <Link
          href="/products?filter=new"
          className="flex items-center gap-3 bg-brand-dark text-white px-6 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 group"
        >
          <ArrowRight className="h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform" />
          Shop Now
        </Link>
      </motion.div>
    </section>
  );
}

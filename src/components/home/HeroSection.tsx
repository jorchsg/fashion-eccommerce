"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] bg-[#1a1a1a] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=85"
          alt="Hero background – fashion collection"
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Model images */}
      <div className="absolute right-0 bottom-0 h-full w-1/2 hidden lg:flex items-end justify-end">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative h-[88%] w-[340px] mr-32"
        >
          <Image
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=700&q=85"
            alt="Model wearing MODO collection"
            fill
            priority
            className="object-cover object-top"
            sizes="340px"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="absolute right-4 bottom-0 h-[75%] w-[260px]"
        >
          <Image
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=85"
            alt="Model wearing MODO collection"
            fill
            className="object-cover object-top"
            sizes="260px"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl lg:max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/70 text-xs tracking-[0.3em] uppercase mb-4"
            >
              New Collection 2025
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-serif text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight uppercase mb-8"
            >
              In The
              <br />
              Right
              <br />
              <span className="italic font-light">Outfit</span>
              <br />
              Anything
              <br />
              Is Possible
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                variant="white-outline"
                className="text-xs tracking-[0.2em]"
              >
                <Link href="/products">Collections</Link>
              </Button>
              <Button
                asChild
                variant="white"
                className="text-xs tracking-[0.2em] group"
              >
                <Link href="/products" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-white/60"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

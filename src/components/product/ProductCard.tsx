"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { toast } from "@/components/ui/use-toast";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useUIStore();
  const inWishlist = isInWishlist(product.id);

  const defaultSize =
    product.sizes.find((s) => s.available)?.label ?? product.sizes[0]?.label ?? "M";
  const defaultColor =
    product.colors[0]?.name ?? "Default";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, defaultSize, defaultColor, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: product.name,
    });
  };

  const discountPercent =
    product.originalPrice
      ? calculateDiscount(product.price, product.originalPrice)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        {/* Image Container */}
        <div
          className="relative overflow-hidden bg-[#f4f4f4] aspect-[3/4]"
          onMouseEnter={() => {
            setIsHovered(true);
            if (product.images.length > 1) setImgIndex(1);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setImgIndex(0);
          }}
        >
          <Image
            src={product.images[imgIndex] ?? product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge variant="new" className="text-[10px]">New</Badge>
            )}
            {product.isSale && discountPercent && (
              <Badge variant="sale" className="text-[10px]">-{discountPercent}%</Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isHovered || inWishlist ? "opacity-100" : "opacity-0"
            } ${
              inWishlist
                ? "bg-brand-red text-white"
                : "bg-white text-gray-600 hover:text-brand-red"
            } shadow-md`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-3.5 w-3.5 ${inWishlist ? "fill-current" : ""}`} />
          </button>

          {/* Add to cart overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            <div className="p-3 flex gap-2">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-brand-dark text-white hover:bg-brand-dark/90 h-9 text-[10px] tracking-widest"
              >
                <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                Add to Cart
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-9 w-9 p-0 bg-white border-white hover:bg-gray-100"
                size="icon"
              >
                <Link href={`/products/${product.slug}`}>
                  <Eye className="h-3.5 w-3.5 text-black" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-3 pb-1">
          <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1">
            {product.brand}
          </p>
          <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-brand-dark group-hover:text-gray-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-bold text-brand-dark">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, Share2, Star, Truck, RotateCcw, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { toast } from "@/components/ui/use-toast";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name ?? null
  );
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useUIStore();
  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? calculateDiscount(product.price, product.originalPrice)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    addItem(product, selectedSize, selectedColor ?? "Default", quantity);
    toast({
      title: "Added to cart!",
      description: `${product.name} × ${quantity} has been added to your cart.`,
      variant: "success",
    });
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    toast({
      title: inWishlist ? "Removed from wishlist" : "Saved to wishlist",
      description: product.name,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard" });
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8 tracking-wide">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-black transition-colors">
          Products
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-black transition-colors capitalize"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-black truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Image Gallery */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex flex-col gap-3 w-20 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square overflow-hidden border-2 transition-colors ${
                    selectedImage === i
                      ? "border-brand-dark"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Image */}
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative flex-1 aspect-[3/4] bg-[#f4f4f4] overflow-hidden group"
          >
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-103"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge variant="new">New</Badge>
              )}
              {product.isSale && discountPercent && (
                <Badge variant="sale">-{discountPercent}%</Badge>
              )}
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          {/* Brand */}
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2">
            {product.brand}
          </p>

          {/* Name */}
          <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight uppercase mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 tracking-wide">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-3xl font-bold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-sm text-brand-red font-semibold">
                  Save {discountPercent}%
                </span>
              </>
            )}
          </div>

          <Separator className="mb-8" />

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-xs tracking-[0.15em] uppercase font-medium mb-3">
                Color:{" "}
                <span className="text-gray-500 normal-case tracking-normal">
                  {selectedColor}
                </span>
              </p>
              <div className="flex gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-brand-dark scale-110"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Color: ${color.name}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-[0.15em] uppercase font-medium">
                Size:{" "}
                <span className="text-gray-500 normal-case tracking-normal">
                  {selectedSize ?? "Select a size"}
                </span>
              </p>
              <button className="text-xs text-gray-400 underline underline-offset-2 hover:text-black transition-colors">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={() => size.available && setSelectedSize(size.label)}
                  disabled={!size.available}
                  className={`min-w-[48px] h-11 px-3 border text-xs font-medium tracking-wider transition-all duration-200 ${
                    selectedSize === size.label
                      ? "bg-brand-dark text-white border-brand-dark"
                      : size.available
                      ? "border-gray-200 text-gray-700 hover:border-gray-400"
                      : "border-gray-100 text-gray-300 cursor-not-allowed relative"
                  }`}
                >
                  {size.label}
                  {!size.available && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-full h-px bg-gray-200 rotate-45 absolute" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex gap-3 mb-5">
            <div className="flex items-center border border-gray-200 h-12">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors text-lg"
              >
                −
              </button>
              <span className="w-12 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors text-lg"
              >
                +
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-brand-dark text-white hover:bg-brand-dark/90 h-12 text-xs tracking-[0.2em]"
            >
              Add to Cart
            </Button>

            <button
              onClick={handleWishlist}
              className={`h-12 w-12 border flex items-center justify-center transition-all duration-200 ${
                inWishlist
                  ? "bg-brand-red border-brand-red text-white"
                  : "border-gray-200 text-gray-500 hover:border-brand-red hover:text-brand-red"
              }`}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`h-4.5 w-4.5 ${inWishlist ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-black transition-colors tracking-wider mb-8"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share this product
          </button>

          <Separator className="mb-8" />

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Truck, text: "Free shipping over $150" },
              { icon: RotateCcw, text: "30-day free returns" },
              { icon: Shield, text: "Secure payments" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center gap-2">
                <Icon className="h-5 w-5 text-gray-400" />
                <p className="text-[10px] text-gray-500 leading-tight">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

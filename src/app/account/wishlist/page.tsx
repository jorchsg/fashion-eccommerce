"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function WishlistPage() {
  const { wishlistIds, removeFromWishlist } = useUIStore();
  const addItem = useCartStore((s) => s.addItem);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const defaultSize =
      product.sizes.find((s) => s.available)?.label ?? product.sizes[0]?.label ?? "M";
    const defaultColor = product.colors[0]?.name ?? "Default";
    addItem(product, defaultSize, defaultColor, 1);
    removeFromWishlist(productId);
    toast({
      title: "Moved to cart",
      description: `${product.name} has been moved to your cart.`,
      variant: "success",
    });
  };

  return (
    <div className="container mx-auto px-6 py-16 min-h-[60vh]">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-[0.08em] uppercase mb-2">
          My Wishlist
        </h1>
        <p className="text-sm text-gray-500">
          {wishlistProducts.length === 0
            ? "Your wishlist is empty"
            : `${wishlistProducts.length} item${wishlistProducts.length !== 1 ? "s" : ""} saved`}
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Heart className="h-16 w-16 text-gray-200 mb-6" />
          <h2 className="font-serif text-2xl font-bold mb-3">Nothing saved yet</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-sm">
            Browse our collections and add items you love to your wishlist.
          </p>
          <Button asChild className="bg-brand-dark text-white hover:bg-brand-dark/90 px-10">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 mb-10">
            {wishlistProducts.map((product, i) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} index={i} />
                <div className="mt-2 flex gap-2">
                  <Button
                    onClick={() => handleMoveToCart(product.id)}
                    className="flex-1 bg-brand-dark text-white hover:bg-brand-dark/90 h-9 text-[10px] tracking-widest"
                  >
                    <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                    Move to Cart
                  </Button>
                  <Button
                    onClick={() => removeFromWishlist(product.id)}
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 p-0 border-gray-200 hover:border-red-300 hover:text-red-500"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-8 flex justify-end">
            <Button
              onClick={() => wishlistProducts.forEach((p) => removeFromWishlist(p.id))}
              variant="ghost"
              className="text-xs text-gray-500 hover:text-red-500"
            >
              Clear Wishlist
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

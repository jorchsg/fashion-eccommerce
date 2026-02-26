"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
  } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#f5f5f5] py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl font-bold tracking-tight uppercase">
            Shopping Cart
          </h1>
          <nav className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3 tracking-wide">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-black">Cart</span>
          </nav>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <ShoppingBag className="h-20 w-20 text-gray-200 mx-auto mb-6" />
            <h2 className="text-xl font-medium tracking-wider uppercase mb-3">
              Your cart is empty
            </h2>
            <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">
              Looks like you haven&apos;t added anything to your cart yet. Start
              shopping to fill it up!
            </p>
            <Button asChild className="bg-brand-dark text-white h-12 px-10 text-xs tracking-[0.2em]">
              <Link href="/products">Explore Products</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold tracking-[0.15em] uppercase">
                  {items.length} {items.length === 1 ? "Item" : "Items"}
                </h2>
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-brand-red transition-colors tracking-wider"
                >
                  Clear All
                </button>
              </div>

              {/* Header row */}
              <div className="hidden sm:grid grid-cols-12 gap-4 text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4 pb-4 border-b">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-b py-6"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Product */}
                      <div className="col-span-12 sm:col-span-6 flex gap-4">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="relative w-24 h-32 shrink-0 bg-gray-100 overflow-hidden"
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </Link>
                        <div className="min-w-0">
                          <p className="text-[10px] tracking-wider uppercase text-gray-400 mb-1">
                            {item.product.brand}
                          </p>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="text-sm font-semibold tracking-wider uppercase hover:text-gray-500 transition-colors block mb-2 leading-tight"
                          >
                            {item.product.name}
                          </Link>
                          <div className="flex flex-col gap-1 text-[10px] text-gray-500 tracking-wider uppercase">
                            <span>Size: {item.size}</span>
                            <span>Color: {item.color}</span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-[10px] text-gray-300 hover:text-brand-red transition-colors mt-3 tracking-wider"
                          >
                            <Trash2 className="h-3 w-3" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-5 sm:col-span-2 flex justify-start sm:justify-center">
                        <div className="flex items-center border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-span-3 sm:col-span-2 text-sm text-center text-gray-500">
                        {formatPrice(item.product.price)}
                      </div>

                      {/* Total */}
                      <div className="col-span-4 sm:col-span-2 text-sm font-bold text-right">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Coupon */}
              <div className="mt-8">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  Coupon Code
                </h3>
                <div className="flex gap-2 max-w-sm">
                  <Input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 border border-gray-200 px-4 h-11 text-sm"
                  />
                  <Button
                    variant="outline"
                    className="border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white h-11 px-6 text-xs tracking-widest"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#f9f9f9] p-8">
                <h2 className="text-sm font-semibold tracking-[0.15em] uppercase mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base pt-1">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <p className="text-[11px] text-gray-400 text-center mb-4">
                    Add{" "}
                    <span className="font-semibold text-black">
                      {formatPrice(150 - subtotal)}
                    </span>{" "}
                    more for free shipping
                  </p>
                )}

                <Button
                  asChild
                  className="w-full bg-brand-dark text-white hover:bg-brand-dark/90 h-12 text-xs tracking-[0.2em] group"
                >
                  <Link href="/checkout" className="flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full mt-2 h-10 text-xs tracking-wider text-gray-400 hover:text-black"
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-4 flex items-center justify-center gap-6 text-[10px] text-gray-400 tracking-wider">
                <span>🔒 Secure Checkout</span>
                <span>↩ Free Returns</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

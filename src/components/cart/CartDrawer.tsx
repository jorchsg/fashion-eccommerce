"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-sm font-semibold tracking-[0.15em] uppercase">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="text-xs text-gray-500">
                    ({items.length} {items.length === 1 ? "item" : "items"})
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center px-6 py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-200 mb-4" />
                  <h3 className="text-sm font-medium tracking-wider uppercase mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-gray-400 text-center mb-6">
                    Looks like you haven&apos;t added anything yet.
                  </p>
                  <Button
                    asChild
                    onClick={closeCart}
                    className="bg-brand-dark text-white text-xs tracking-widest"
                  >
                    <Link href="/products">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="divide-y">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 py-5 flex gap-4"
                      >
                        {/* Image */}
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCart}
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

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <Link
                              href={`/products/${item.product.slug}`}
                              onClick={closeCart}
                              className="text-xs font-semibold tracking-wider uppercase leading-tight hover:text-gray-500 transition-colors line-clamp-2"
                            >
                              {item.product.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-300 hover:text-brand-red transition-colors shrink-0"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-3">
                            {item.product.brand}
                          </p>

                          <div className="flex gap-3 text-[10px] text-gray-500 tracking-wider uppercase mb-4">
                            <span>Size: {item.size}</span>
                            <span>Color: {item.color}</span>
                          </div>

                          {/* Quantity & Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-200">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-bold">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t px-6 py-6">
                {/* Free shipping notice */}
                {shipping > 0 && (
                  <div className="bg-gray-50 px-4 py-3 mb-4 text-xs text-gray-600 text-center">
                    Add{" "}
                    <span className="font-semibold">
                      {formatPrice(150 - subtotal)}
                    </span>{" "}
                    more for free shipping
                  </div>
                )}
                {shipping === 0 && (
                  <div className="bg-green-50 px-4 py-3 mb-4 text-xs text-green-700 text-center font-medium">
                    ✓ You qualify for free shipping!
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className="w-full bg-brand-dark text-white hover:bg-brand-dark/90 h-12 text-xs tracking-[0.2em] group"
                  onClick={closeCart}
                >
                  <Link href="/checkout" className="flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-xs text-gray-400 hover:text-gray-700 transition-colors mt-3 tracking-wider underline underline-offset-2"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

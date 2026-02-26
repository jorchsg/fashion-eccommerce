"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "@/lib/validations";

type Step = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("shipping");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const { items, getSubtotal, getShipping, getTax, getTotal, clearCart } =
    useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      saveAddress: false,
      shipping: { country: "United States" },
    },
  });

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  const handleShippingNext = async () => {
    const valid = await trigger([
      "shipping.firstName",
      "shipping.lastName",
      "shipping.email",
      "shipping.phone",
      "shipping.street",
      "shipping.city",
      "shipping.state",
      "shipping.zipCode",
      "shipping.country",
    ]);
    if (valid) setStep("payment");
  };

  const handlePaymentNext = async () => {
    const valid = await trigger([
      "payment.cardNumber",
      "payment.cardHolder",
      "payment.expiryDate",
      "payment.cvv",
    ]);
    if (valid) setStep("review");
  };

  const onSubmit = async (_data: CheckoutFormData) => {
    setIsSubmitting(true);
    // Simulate order processing
    await new Promise((res) => setTimeout(res, 2000));
    clearCart();
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const steps: { id: Step; label: string; number: number }[] = [
    { id: "shipping", label: "Shipping", number: 1 },
    { id: "payment", label: "Payment", number: 2 },
    { id: "review", label: "Review", number: 3 },
  ];

  const stepOrder: Step[] = ["shipping", "payment", "review"];
  const currentStepIndex = stepOrder.indexOf(step);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight uppercase mb-3">
            Order Confirmed!
          </h2>
          <p className="text-gray-500 text-sm mb-2">
            Thank you for your purchase. We&apos;ll send you a confirmation email
            shortly.
          </p>
          <p className="text-xs text-gray-400 mb-8 tracking-wider">
            ORDER #MODO-{Math.random().toString(36).substring(2, 9).toUpperCase()}
          </p>
          <Button
            asChild
            className="bg-brand-dark text-white h-12 px-10 text-xs tracking-[0.2em]"
          >
            <Link href="/">Continue Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b py-5">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-[0.15em]">
            MODO
          </Link>
          <nav className="flex items-center gap-1 text-xs text-gray-400 tracking-wide">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/cart" className="hover:text-black transition-colors">Cart</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-black">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <button
                onClick={() =>
                  currentStepIndex > i &&
                  setStep(s.id)
                }
                className="flex items-center gap-2 group"
                disabled={currentStepIndex <= i}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    currentStepIndex > i
                      ? "bg-green-600 text-white"
                      : currentStepIndex === i
                      ? "bg-brand-dark text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {currentStepIndex > i ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    s.number
                  )}
                </div>
                <span
                  className={`text-xs tracking-[0.12em] uppercase font-medium ${
                    currentStepIndex === i
                      ? "text-black"
                      : currentStepIndex > i
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={`w-16 lg:w-24 h-px mx-4 ${
                    currentStepIndex > i ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Shipping */}
              {step === "shipping" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8"
                >
                  <h2 className="text-sm font-semibold tracking-[0.2em] uppercase mb-8">
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-xs mb-2 block">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        {...register("shipping.firstName")}
                        placeholder="John"
                      />
                      {errors.shipping?.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.shipping.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-xs mb-2 block">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        {...register("shipping.lastName")}
                        placeholder="Doe"
                      />
                      {errors.shipping?.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.shipping.lastName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs mb-2 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("shipping.email")}
                        placeholder="john@example.com"
                      />
                      {errors.shipping?.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.shipping.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-xs mb-2 block">
                        Phone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("shipping.phone")}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.shipping?.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.shipping.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="street" className="text-xs mb-2 block">
                        Street Address *
                      </Label>
                      <Input
                        id="street"
                        {...register("shipping.street")}
                        placeholder="123 Main Street"
                      />
                      {errors.shipping?.street && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.shipping.street.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-xs mb-2 block">
                        City *
                      </Label>
                      <Input
                        id="city"
                        {...register("shipping.city")}
                        placeholder="New York"
                      />
                      {errors.shipping?.city && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.shipping.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-xs mb-2 block">
                        State *
                      </Label>
                      <Input
                        id="state"
                        {...register("shipping.state")}
                        placeholder="NY"
                      />
                      {errors.shipping?.state && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.shipping.state.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-xs mb-2 block">
                        ZIP Code *
                      </Label>
                      <Input
                        id="zipCode"
                        {...register("shipping.zipCode")}
                        placeholder="10001"
                      />
                      {errors.shipping?.zipCode && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.shipping.zipCode.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-xs mb-2 block">
                        Country *
                      </Label>
                      <Input
                        id="country"
                        {...register("shipping.country")}
                        defaultValue="United States"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Button
                      type="button"
                      onClick={handleShippingNext}
                      className="bg-brand-dark text-white h-12 px-10 text-xs tracking-[0.2em] group"
                    >
                      Continue to Payment
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === "payment" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8"
                >
                  <h2 className="text-sm font-semibold tracking-[0.2em] uppercase mb-8">
                    Payment Details
                  </h2>

                  {/* Payment method selector */}
                  <div className="flex gap-3 mb-8">
                    {["Credit Card", "PayPal", "Apple Pay"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        className={`flex-1 py-3 text-xs tracking-wider border transition-colors ${
                          method === "Credit Card"
                            ? "border-brand-dark bg-brand-dark text-white"
                            : "border-gray-200 text-gray-500 hover:border-gray-400"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <Label htmlFor="cardNumber" className="text-xs mb-2 block">
                        Card Number *
                      </Label>
                      <Input
                        id="cardNumber"
                        {...register("payment.cardNumber")}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.payment?.cardNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.payment.cardNumber.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cardHolder" className="text-xs mb-2 block">
                        Card Holder Name *
                      </Label>
                      <Input
                        id="cardHolder"
                        {...register("payment.cardHolder")}
                        placeholder="John Doe"
                      />
                      {errors.payment?.cardHolder && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.payment.cardHolder.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="expiryDate" className="text-xs mb-2 block">
                          Expiry Date *
                        </Label>
                        <Input
                          id="expiryDate"
                          {...register("payment.expiryDate")}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.payment?.expiryDate && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.payment.expiryDate.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-xs mb-2 block">
                          CVV *
                        </Label>
                        <Input
                          id="cvv"
                          {...register("payment.cvv")}
                          placeholder="123"
                          maxLength={4}
                          type="password"
                        />
                        {errors.payment?.cvv && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.payment.cvv.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      onClick={() => setStep("shipping")}
                      variant="ghost"
                      className="text-gray-400 h-12 px-6 text-xs tracking-wider"
                    >
                      ← Back
                    </Button>
                    <Button
                      type="button"
                      onClick={handlePaymentNext}
                      className="bg-brand-dark text-white h-12 px-10 text-xs tracking-[0.2em]"
                    >
                      Review Order
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === "review" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8"
                >
                  <h2 className="text-sm font-semibold tracking-[0.2em] uppercase mb-8">
                    Review Order
                  </h2>

                  {/* Items list */}
                  <div className="divide-y mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-4">
                        <div className="relative w-16 h-20 bg-gray-100 shrink-0 overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold tracking-wider uppercase">
                            {item.product.name}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            Size: {item.size} · Color: {item.color} · Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      onClick={() => setStep("payment")}
                      variant="ghost"
                      className="text-gray-400 h-12 px-6 text-xs tracking-wider"
                    >
                      ← Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-brand-dark text-white h-12 px-10 text-xs tracking-[0.2em]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        `Place Order — ${formatPrice(total)}`
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sticky top-28">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                Order Summary
              </h3>
              <div className="divide-y mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="relative">
                        <span className="text-xs text-gray-600 truncate max-w-[160px] block">
                          {item.product.name}
                        </span>
                        <span className="text-[10px] text-gray-400">× {item.quantity}</span>
                      </span>
                    </div>
                    <span className="text-sm font-medium shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm">
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
                <div className="flex justify-between font-bold text-base pt-1">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Check, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";

const passwordRules = [
  { label: "At least 8 characters", regex: /.{8,}/ },
  { label: "One uppercase letter", regex: /[A-Z]/ },
  { label: "One lowercase letter", regex: /[a-z]/ },
  { label: "One number", regex: /[0-9]/ },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreeToTerms: false },
  });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterFormData) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          full_name: `${data.firstName} ${data.lastName}`,
        },
      },
    });

    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setRegisteredEmail(data.email);
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md text-center"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-6">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-tight uppercase mb-3">
            Check Your Email
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            We sent a confirmation link to:
          </p>
          <p className="text-sm font-medium text-brand-dark mb-6">
            {registeredEmail}
          </p>
          <p className="text-xs text-gray-400 mb-8">
            Click the link in the email to activate your account. Check your spam folder if you don&apos;t see it within a few minutes.
          </p>
          <Link
            href="/account/login"
            className="text-sm font-medium underline underline-offset-2 hover:text-brand-red"
          >
            Back to Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex">
      {/* Left panel - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col justify-between p-12">
          <Link href="/" className="font-serif text-white text-3xl font-bold tracking-[0.15em]">
            MODO
          </Link>
          <div>
            <h2 className="font-serif text-white text-4xl font-bold leading-tight mb-4 uppercase">
              Join
              <br />
              The Club
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Create your MODO account and get exclusive access to new arrivals,
              member-only discounts, and early sale access.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-10"
        >
          {/* Mobile logo */}
          <Link
            href="/"
            className="lg:hidden font-serif text-3xl font-bold tracking-[0.15em] block mb-10 text-center"
          >
            MODO
          </Link>

          <h1 className="text-2xl font-serif font-bold tracking-tight uppercase mb-2">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Already have an account?{" "}
            <Link
              href="/account/login"
              className="text-black font-medium underline underline-offset-2 hover:text-brand-red"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-xs mb-2 block">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  placeholder="John"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs mb-2 block">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  placeholder="Doe"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-xs mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="john@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-xs mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {/* Password strength indicators */}
              {password && (
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {passwordRules.map((rule) => {
                    const passed = rule.regex.test(password);
                    return (
                      <div
                        key={rule.label}
                        className={`flex items-center gap-1 text-[10px] transition-colors ${
                          passed ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        <Check className={`h-3 w-3 ${passed ? "" : "opacity-30"}`} />
                        {rule.label}
                      </div>
                    );
                  })}
                </div>
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-xs mb-2 block">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="agreeToTerms"
                type="checkbox"
                {...register("agreeToTerms")}
                className="h-4 w-4 mt-0.5 border-gray-300 text-brand-dark focus:ring-brand-dark"
              />
              <Label
                htmlFor="agreeToTerms"
                className="text-xs font-normal normal-case tracking-normal leading-relaxed"
              >
                I agree to the{" "}
                <Link
                  href="/legal"
                  className="underline underline-offset-2 hover:text-brand-red"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/legal"
                  className="underline underline-offset-2 hover:text-brand-red"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs -mt-3">
                {errors.agreeToTerms.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-dark text-white hover:bg-brand-dark/90 h-12 text-xs tracking-[0.2em]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

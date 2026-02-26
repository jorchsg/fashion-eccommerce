"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema, type NewsletterFormData } from "@/lib/validations";
import { toast } from "@/components/ui/use-toast";

const footerLinks = {
  product: [
    { label: "T-Shirt", href: "/products?sub=shirts" },
    { label: "Hoodie", href: "/products?sub=hoodies" },
    { label: "Jacket", href: "/products?sub=jackets" },
    { label: "Jeans", href: "/products?sub=jeans" },
    { label: "Hand Bags", href: "/products?sub=bags" },
    { label: "Sneakers", href: "/products?sub=sneakers" },
  ],
  categories: [
    { label: "Men", href: "/products?category=men" },
    { label: "Women", href: "/products?category=women" },
    { label: "Kids", href: "/products?category=kids" },
    { label: "Gift", href: "/products?category=gifts" },
    { label: "Collection", href: "/products" },
    { label: "New Arrivals", href: "/products?filter=new" },
  ],
  help: [
    { label: "Customer Service", href: "/help" },
    { label: "Find a Store", href: "/stores" },
    { label: "Legal & Privacy", href: "/legal" },
    { label: "Contact", href: "/contact" },
    { label: "Cookie Notice", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter/X" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    await new Promise((res) => setTimeout(res, 800));
    toast({
      title: "You're subscribed!",
      description: `We'll send updates to ${data.email}`,
      variant: "success",
    });
    reset();
  };

  return (
    <footer className="bg-brand-dark text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-3xl font-bold tracking-[0.15em] block mb-4">
              MODO
            </Link>
            <p className="text-sm text-white/60 mb-6 leading-relaxed max-w-xs">
              Get newsletter updates for upcoming fashion products, and get discount for all items.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-0">
              <Input
                type="email"
                placeholder="Your email"
                {...register("email")}
                className="flex-1 bg-transparent border-b border-white/30 text-white placeholder:text-white/40 focus-visible:border-white rounded-none h-10 text-sm"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black hover:bg-white/90 h-10 px-5 text-xs rounded-none ml-2"
              >
                {isSubmitting ? "..." : "SUBMIT"}
              </Button>
            </form>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-white/80">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/50 hover:text-white transition-colors tracking-wider uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-white/80">
              Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/50 hover:text-white transition-colors tracking-wider uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-white/80">
              Help
            </h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/50 hover:text-white transition-colors tracking-wider uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 tracking-wider">
            © {new Date().getFullYear()} MODO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/40 hover:text-white transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

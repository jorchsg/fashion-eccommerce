"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { NAV_ITEMS } from "@/data/categories";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const router = useRouter();
  const getTotalItems = useCartStore((s) => s.getTotalItems);
  const openCart = useCartStore((s) => s.openCart);
  const { isSearchOpen, toggleSearch, closeSearch, isMobileMenuOpen, toggleMobileMenu } =
    useUIStore();

  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white shadow-sm border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        )}
      >
        {/* Main Header */}
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Desktop Navigation - Left */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setActiveNav(item.label)}
                  onMouseLeave={() => setActiveNav(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-200 pb-1",
                      "hover:text-brand-dark text-gray-600",
                      activeNav === item.label && "text-brand-dark"
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180 duration-200" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <div className="absolute top-full left-0 w-48 bg-white shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2 text-xs tracking-wider uppercase text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Logo - Center */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl lg:text-3xl font-bold tracking-[0.15em] text-brand-dark"
            >
              MODO
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Search */}
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className="hidden lg:flex p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-brand-dark text-white text-[10px] font-bold flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>

              {/* Account */}
              <Link
                href="/account/login"
                className="hidden lg:flex p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-100 bg-white animate-in slide-in-from-top-4 duration-200">
            <div className="container mx-auto px-6 py-4">
              <form onSubmit={handleSearch} className="flex items-center gap-4 max-w-2xl mx-auto">
                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                <Input
                  type="search"
                  placeholder="Search products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-none focus-visible:ring-0 text-base px-0"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleMobileMenu}
          />
          <div className="absolute top-0 left-0 bottom-0 w-80 bg-white overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between p-6 border-b">
              <span className="font-serif text-2xl font-bold tracking-wider">MODO</span>
              <button onClick={toggleMobileMenu}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-6">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="mb-6">
                  <Link
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className="block text-sm font-medium tracking-[0.15em] uppercase mb-3 text-brand-dark"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={toggleMobileMenu}
                          className="block text-xs tracking-wider uppercase text-gray-500 hover:text-black py-1"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="border-t p-6 flex gap-4">
              <Link
                href="/account/login"
                onClick={toggleMobileMenu}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <User className="h-4 w-4" />
                Account
              </Link>
              <Link
                href="/account/wishlist"
                onClick={toggleMobileMenu}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

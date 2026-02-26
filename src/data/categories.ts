import type { Category, NavItem } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "men",
    name: "Men",
    slug: "men",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
    description: "Explore men's clothing, footwear and accessories.",
    productCount: 4,
  },
  {
    id: "women",
    name: "Women",
    slug: "women",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    description: "Discover women's fashion, bags and more.",
    productCount: 3,
  },
  {
    id: "kids",
    name: "Kids",
    slug: "kids",
    image:
      "https://images.unsplash.com/photo-1503944583220-791c11b05b26?w=800&q=80",
    description: "Stylish and comfortable clothing for kids.",
    productCount: 0,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    description: "Complete your look with our range of accessories.",
    productCount: 4,
  },
  {
    id: "gifts",
    name: "Gifts",
    slug: "gifts",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    description: "Perfect gifts for every occasion.",
    productCount: 0,
  },
];

export const FEATURED_CATEGORIES = [
  {
    name: "Jeans",
    slug: "jeans",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    size: "large" as const,
  },
  {
    name: "Hoodie",
    slug: "hoodies",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    size: "medium" as const,
    badge: "Open with BUY and apply code HOOD25",
  },
  {
    name: "Bags",
    slug: "bags",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    size: "small" as const,
  },
  {
    name: "Shirts",
    slug: "shirts",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    size: "small" as const,
  },
  {
    name: "Sneakers",
    slug: "sneakers",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    size: "medium" as const,
  },
  {
    name: "Jacket",
    slug: "jackets",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    size: "large" as const,
  },
];

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Men",
    href: "/products?category=men",
    children: [
      { label: "Hoodies", href: "/products?category=men&sub=hoodies" },
      { label: "Jackets", href: "/products?category=men&sub=jackets" },
      { label: "Jeans", href: "/products?category=men&sub=jeans" },
      { label: "Shirts", href: "/products?category=men&sub=shirts" },
      { label: "Trainers", href: "/products?category=men&sub=trainers" },
    ],
  },
  {
    label: "Women",
    href: "/products?category=women",
    children: [
      { label: "Jackets", href: "/products?category=women&sub=jackets" },
      { label: "Bags", href: "/products?category=women&sub=bags" },
      { label: "Sneakers", href: "/products?category=women&sub=sneakers" },
      { label: "Dresses", href: "/products?category=women&sub=dresses" },
    ],
  },
  {
    label: "Kids",
    href: "/products?category=kids",
  },
  {
    label: "Accessories",
    href: "/products?category=accessories",
    children: [
      { label: "Hats", href: "/products?category=accessories&sub=hats" },
      {
        label: "Scarves",
        href: "/products?category=accessories&sub=scarves",
      },
      {
        label: "Gloves",
        href: "/products?category=accessories&sub=gloves",
      },
      { label: "Bags", href: "/products?category=accessories&sub=bags" },
    ],
  },
  {
    label: "Gifts",
    href: "/products?category=gifts",
  },
];

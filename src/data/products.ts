import type { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "loose-fit-hoodie-white",
    name: "Loose Fit Hoodie",
    brand: "MODO ORIGINALS",
    price: 120.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    ],
    category: "men",
    subcategory: "hoodies",
    description:
      "A relaxed, oversized hoodie crafted from premium organic cotton. Features a kangaroo pocket, ribbed cuffs, and an adjustable drawstring hood.",
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
      { label: "XXL", available: false },
    ],
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
        ],
      },
      {
        name: "Black",
        hex: "#0A0A0A",
        images: [
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
        ],
      },
    ],
    tags: ["hoodie", "casual", "winter", "oversized"],
    isNew: false,
    isSale: false,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 128,
    reviews: [],
    inStock: true,
    stockCount: 42,
  },
  {
    id: "2",
    slug: "patterned-wool-scarf",
    name: "Patterned Wool Scarf",
    brand: "MODO ORIGINALS",
    price: 88.02,
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
    ],
    category: "accessories",
    subcategory: "scarves",
    description:
      "Classic patterned wool scarf with fringed ends. Soft, warm and versatile for all winter outfits.",
    sizes: [{ label: "One Size", available: true }],
    colors: [
      {
        name: "Plaid",
        hex: "#8B7355",
        images: [
          "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
        ],
      },
    ],
    tags: ["scarf", "accessories", "winter", "wool"],
    isNew: false,
    isSale: false,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 87,
    reviews: [],
    inStock: true,
    stockCount: 30,
  },
  {
    id: "3",
    slug: "infused-fit-puffer-jacket",
    name: "Infused Fit Puffer Jacket",
    brand: "MODO ORIGINALS",
    price: 152.09,
    originalPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1547624643-3bf761b09502?w=600&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    ],
    category: "men",
    subcategory: "jackets",
    description:
      "Lightweight yet warm puffer jacket with a modern silhouette. Down-filled for exceptional warmth in cold weather.",
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      {
        name: "Black",
        hex: "#0A0A0A",
        images: [
          "https://images.unsplash.com/photo-1547624643-3bf761b09502?w=600&q=80",
        ],
      },
    ],
    tags: ["jacket", "puffer", "winter", "warm"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 214,
    reviews: [],
    inStock: true,
    stockCount: 18,
  },
  {
    id: "4",
    slug: "rib-knit-beanie-hat",
    name: "Rib-Knit Beanie Hat",
    brand: "MODO ORIGINALS",
    price: 75.09,
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
    ],
    category: "accessories",
    subcategory: "hats",
    description:
      "Cozy rib-knit beanie made from a soft acrylic-wool blend. Fold-over cuff for adjustable fit.",
    sizes: [{ label: "One Size", available: true }],
    colors: [
      {
        name: "Cream",
        hex: "#F5F0E8",
        images: [
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
        ],
      },
    ],
    tags: ["hat", "beanie", "accessories", "winter"],
    isNew: true,
    isSale: false,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 65,
    reviews: [],
    inStock: true,
    stockCount: 55,
  },
  {
    id: "5",
    slug: "lightweight-puffer-jacket",
    name: "Lightweight Puffer Jacket",
    brand: "MODO ORIGINALS",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    ],
    category: "women",
    subcategory: "jackets",
    description:
      "Ultra-light puffer jacket perfect for layering. Packable design for easy travel and storage.",
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: false },
      { label: "L", available: true },
    ],
    colors: [
      {
        name: "Black",
        hex: "#0A0A0A",
        images: [
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
        ],
      },
    ],
    tags: ["jacket", "lightweight", "packable", "winter"],
    isNew: true,
    isSale: false,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 302,
    reviews: [],
    inStock: true,
    stockCount: 12,
  },
  {
    id: "6",
    slug: "cotton-bucket-hat-white",
    name: "Cotton Bucket Hat",
    brand: "MODO ORIGINALS",
    price: 88.02,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    ],
    category: "accessories",
    subcategory: "hats",
    description:
      "Classic cotton bucket hat with a wide brim. Lightweight and breathable for year-round wear.",
    sizes: [
      { label: "S/M", available: true },
      { label: "L/XL", available: true },
    ],
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
        ],
      },
      {
        name: "Pink",
        hex: "#F9A8D4",
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
        ],
      },
    ],
    tags: ["hat", "bucket", "accessories", "casual"],
    isNew: false,
    isSale: false,
    isFeatured: true,
    rating: 4.3,
    reviewCount: 44,
    reviews: [],
    inStock: true,
    stockCount: 70,
  },
  {
    id: "7",
    slug: "leather-touchscreen-gloves",
    name: "Leather Touchscreen Gloves",
    brand: "MODO ORIGINALS",
    price: 75.09,
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80",
    ],
    category: "accessories",
    subcategory: "gloves",
    description:
      "Premium leather gloves with touchscreen-compatible fingertips. Cashmere lining for extra warmth.",
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    colors: [
      {
        name: "Black",
        hex: "#0A0A0A",
        images: [
          "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80",
        ],
      },
    ],
    tags: ["gloves", "leather", "accessories", "winter"],
    isNew: false,
    isSale: false,
    isFeatured: true,
    rating: 4.4,
    reviewCount: 38,
    reviews: [],
    inStock: true,
    stockCount: 25,
  },
  {
    id: "8",
    slug: "chunky-sole-trainers-white",
    name: "Chunky Sole Trainers",
    brand: "MODO ORIGINALS",
    price: 165.0,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
    ],
    category: "men",
    subcategory: "trainers",
    description:
      "Bold chunky sole trainers with a retro-inspired silhouette. Leather upper with rubber outsole.",
    sizes: [
      { label: "40", available: true },
      { label: "41", available: true },
      { label: "42", available: true },
      { label: "43", available: false },
      { label: "44", available: true },
      { label: "45", available: true },
    ],
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
        ],
      },
    ],
    tags: ["sneakers", "trainers", "chunky", "casual"],
    isNew: true,
    isSale: false,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 156,
    reviews: [],
    inStock: true,
    stockCount: 34,
  },
  {
    id: "9",
    slug: "slim-fit-denim-jeans",
    name: "Slim Fit Denim Jeans",
    brand: "MODO ORIGINALS",
    price: 95.0,
    originalPrice: 125.0,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    ],
    category: "men",
    subcategory: "jeans",
    description:
      "Classic slim fit jeans crafted from premium stretch denim. Five-pocket design with a modern tapered leg.",
    sizes: [
      { label: "28", available: true },
      { label: "30", available: true },
      { label: "32", available: true },
      { label: "34", available: false },
      { label: "36", available: true },
    ],
    colors: [
      {
        name: "Indigo",
        hex: "#3730A3",
        images: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
        ],
      },
    ],
    tags: ["jeans", "denim", "casual", "slim"],
    isNew: false,
    isSale: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 195,
    reviews: [],
    inStock: true,
    stockCount: 48,
  },
  {
    id: "10",
    slug: "structured-shoulder-bag",
    name: "Structured Shoulder Bag",
    brand: "MODO ORIGINALS",
    price: 185.0,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    ],
    category: "women",
    subcategory: "bags",
    description:
      "Elegant structured shoulder bag in premium vegan leather. Features a zip-top closure, interior pockets, and an adjustable strap.",
    sizes: [{ label: "One Size", available: true }],
    colors: [
      {
        name: "Taupe",
        hex: "#A08060",
        images: [
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
        ],
      },
      {
        name: "Black",
        hex: "#0A0A0A",
        images: [
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
        ],
      },
    ],
    tags: ["bag", "shoulder bag", "accessories", "vegan leather"],
    isNew: true,
    isSale: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 92,
    reviews: [],
    inStock: true,
    stockCount: 21,
  },
  {
    id: "11",
    slug: "oversized-graphic-tee",
    name: "Oversized Graphic Tee",
    brand: "MODO ORIGINALS",
    price: 55.0,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    ],
    category: "men",
    subcategory: "shirts",
    description:
      "Statement graphic tee with a boxy oversized fit. 100% organic cotton with a comfortable drop shoulder.",
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      {
        name: "Off White",
        hex: "#F5F5F0",
        images: [
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
        ],
      },
      {
        name: "Black",
        hex: "#0A0A0A",
        images: [
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
        ],
      },
    ],
    tags: ["t-shirt", "graphic", "casual", "oversized"],
    isNew: true,
    isSale: false,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 73,
    reviews: [],
    inStock: true,
    stockCount: 85,
  },
  {
    id: "12",
    slug: "minimalist-running-sneakers",
    name: "Minimalist Running Sneakers",
    brand: "MODO ORIGINALS",
    price: 135.0,
    originalPrice: 160.0,
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
    ],
    category: "women",
    subcategory: "sneakers",
    description:
      "Lightweight running sneakers with a breathable knit upper. Cushioned midsole for all-day comfort.",
    sizes: [
      { label: "36", available: true },
      { label: "37", available: true },
      { label: "38", available: true },
      { label: "39", available: false },
      { label: "40", available: true },
      { label: "41", available: true },
    ],
    colors: [
      {
        name: "White/Grey",
        hex: "#E5E5E5",
        images: [
          "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
        ],
      },
    ],
    tags: ["sneakers", "running", "sport", "minimalist"],
    isNew: false,
    isSale: true,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 118,
    reviews: [],
    inStock: true,
    stockCount: 29,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(
  category: string,
  limit?: number
): Product[] {
  const filtered = PRODUCTS.filter((p) => p.category === category);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = PRODUCTS.filter((p) => p.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getNewArrivals(limit?: number): Product[] {
  const newItems = PRODUCTS.filter((p) => p.isNew);
  return limit ? newItems.slice(0, limit) : newItems;
}

export function getSaleProducts(limit?: number): Product[] {
  const saleItems = PRODUCTS.filter((p) => p.isSale);
  return limit ? saleItems.slice(0, limit) : saleItems;
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q)
  );
}

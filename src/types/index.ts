export type ProductCategory = "men" | "women" | "kids" | "accessories" | "gifts";

export type ProductSubcategory =
  | "hoodies"
  | "jackets"
  | "jeans"
  | "shirts"
  | "sneakers"
  | "bags"
  | "hats"
  | "scarves"
  | "gloves"
  | "dresses"
  | "suits"
  | "trainers";

export interface ProductSize {
  label: string;
  available: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  subcategory: ProductSubcategory;
  description: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  tags: string[];
  isNew: boolean;
  isSale: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  inStock: boolean;
  stockCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  orders: Order[];
  wishlist: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface FilterOptions {
  category?: ProductCategory;
  subcategory?: ProductSubcategory;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  sortBy?: "price-asc" | "price-desc" | "newest" | "popular" | "rating";
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

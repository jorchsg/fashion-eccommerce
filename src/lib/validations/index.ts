import { z } from "zod";

// ─── Auth Schemas ───────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long")
      .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long")
      .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the terms and conditions"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// ─── Checkout Schemas ────────────────────────────────────────────────────────

export const shippingAddressSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
  street: z.string().min(5, "Please enter a valid street address").max(100),
  city: z.string().min(2, "City is required").max(50),
  state: z.string().min(2, "State is required").max(50),
  zipCode: z
    .string()
    .min(3, "ZIP code is required")
    .max(10)
    .regex(/^[\d\s-]+$/, "Please enter a valid ZIP code"),
  country: z.string().min(2, "Country is required"),
});

export type ShippingAddressData = z.infer<typeof shippingAddressSchema>;

export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^[\d\s]{16,19}$/, "Please enter a valid card number"),
  cardHolder: z
    .string()
    .min(2, "Card holder name is required")
    .max(100),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Please enter a valid expiry date (MM/YY)"),
  cvv: z
    .string()
    .min(3, "CVV must be 3-4 digits")
    .max(4, "CVV must be 3-4 digits")
    .regex(/^\d+$/, "CVV must contain only numbers"),
});

export type PaymentData = z.infer<typeof paymentSchema>;

export const checkoutSchema = z.object({
  shipping: shippingAddressSchema,
  payment: paymentSchema,
  saveAddress: z.boolean().optional().default(false),
  couponCode: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// ─── Newsletter Schema ────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// ─── Search Schema ────────────────────────────────────────────────────────────

export const searchSchema = z.object({
  query: z.string().min(1, "Search query is required").max(100),
});

export type SearchFormData = z.infer<typeof searchSchema>;

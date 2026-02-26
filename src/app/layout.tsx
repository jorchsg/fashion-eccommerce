import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MODO — Fashion & Accessories",
    template: "%s | MODO",
  },
  description:
    "Discover premium fashion, clothing and accessories at MODO. Shop the latest collections for men, women and kids.",
  keywords: [
    "fashion",
    "clothing",
    "accessories",
    "e-commerce",
    "men",
    "women",
    "kids",
    "hoodie",
    "jacket",
    "jeans",
  ],
  openGraph: {
    title: "MODO — Fashion & Accessories",
    description:
      "Discover premium fashion, clothing and accessories at MODO.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}

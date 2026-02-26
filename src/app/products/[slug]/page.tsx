import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getFeaturedProducts } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";
import { CollectionsSection } from "@/components/home/CollectionsSection";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | MODO`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getFeaturedProducts(4).filter(
    (p) => p.id !== product.id
  );

  return (
    <div>
      <ProductDetailClient product={product} />

      {relatedProducts.length > 0 && (
        <div className="border-t">
          <CollectionsSection
            products={relatedProducts}
            title="You May Also Like"
            subtitle="Carefully curated items that complement your selection."
          />
        </div>
      )}
    </div>
  );
}

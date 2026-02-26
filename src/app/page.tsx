import { HeroSection } from "@/components/home/HeroSection";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { PromoSection } from "@/components/home/PromoSection";
import { SeasonBanner } from "@/components/home/SeasonBanner";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { GenderCategories } from "@/components/home/GenderCategories";
import { getFeaturedProducts } from "@/data/products";

// Server component — data fetched on the server
export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <CollectionsSection
        products={featuredProducts}
        title="Winter Collections"
        subtitle="Let us love winter for it is the spring of genius."
      />
      <PromoSection />
      <SeasonBanner />
      <FeaturedCategories />
      <GenderCategories />
    </>
  );
}

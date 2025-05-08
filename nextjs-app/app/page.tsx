import BrandShowcase from "@/components/homepage/BrandShowcase";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import FeaturesListing from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import ShopByCategory from "@/components/homepage/ShopByCategory";
import TrendingSection from "@/components/homepage/TrendingSection";
import type { Features, Features as FeatureType, Homepage } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { homepageQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const { data: heroContent } = await sanityFetch({
    query: homepageQuery,
    stega: false,
  });

  return (
    <>
      <Hero content={heroContent?.hero as Homepage} />
      <FeaturesListing content={heroContent?.features as Homepage["features"]} />
      <FeaturedProducts />
      <TrendingSection />
      <ShopByCategory />
      <BrandShowcase />
    </>
  );
}

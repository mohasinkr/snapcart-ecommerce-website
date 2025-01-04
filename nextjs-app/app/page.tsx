import Features from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import ShopByCategory from "@/components/homepage/ShopByCategory";
import TrendingSection from "@/components/homepage/TrendingSection";
import BrandShowcase from "@/components/homepage/BrandShowcase";
import { sanityFetch } from "@/sanity/lib/live";
import { homepageQuery } from "@/sanity/lib/queries";

export default async function Page() {

  const { data: heroContent } = await sanityFetch({
    query: homepageQuery,
    stega: false,
  });

  return (
    <>
      <Hero content={heroContent?.hero} />
      <Features />
      <FeaturedProducts />
      <TrendingSection />
      <ShopByCategory />
      <BrandShowcase />
    </>
  );
}

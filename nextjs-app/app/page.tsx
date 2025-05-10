import BrandShowcase from "@/components/homepage/BrandShowcase";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import FeaturesListing from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import ShopByCategory from "@/components/homepage/ShopByCategory";
import TrendingSection from "@/components/homepage/TrendingSection";
import BestSellersSection from "@/components/homepage/BestSellersSection";
import type { Homepage } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { homepageQuery, allProductsQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const [{ data: heroContent }, { data: products }] = await Promise.all([
    sanityFetch({
      query: homepageQuery,
      stega: false,
    }),
    sanityFetch({
      query: allProductsQuery,
      stega: false,
    }),
  ]);

  // Simulate best sellers by using the available products
  const bestSellerProducts = products || [];

  return (
    <>
      <Hero content={heroContent?.hero as Homepage} />
      <FeaturesListing
        content={heroContent?.features as Homepage["features"]}
      />
      <FeaturedProducts />
      <BestSellersSection products={bestSellerProducts} />
      <TrendingSection />
      <ShopByCategory />
      <BrandShowcase />
    </>
  );
}

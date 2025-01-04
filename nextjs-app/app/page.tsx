import Features from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import ShopByCategory from "@/components/homepage/ShopByCategory";
import TrendingSection from "@/components/homepage/TrendingSection";
import BrandShowcase from "@/components/homepage/BrandShowcase";

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      <TrendingSection />
      <ShopByCategory />
      <BrandShowcase />
    </>
  );
}

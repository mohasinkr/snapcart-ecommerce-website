import { Metadata } from "next";
import Link from "next/link";
import { Star, TrendingUp } from "lucide-react";

import { sanityFetch } from "@/sanity/lib/live";
import { allProductsQuery } from "@/sanity/lib/queries";
import { AllProductsQueryResult } from "@/sanity.types";
import { Button } from "@/components/ui/button";
import BestSellersGrid from "@/components/bestsellers/BestSellersGrid";

export const metadata: Metadata = {
  title: "Best Sellers | SnapCart",
  description:
    "Discover our most popular products loved by customers worldwide",
};

// This would ideally be a custom query for best sellers based on sales data
// For now, we'll use the existing products query and simulate best sellers
export default async function BestSellersPage() {
  const { data: products } = await sanityFetch<AllProductsQueryResult>({
    query: allProductsQuery,
    stega: false,
  });

  // Simulate best sellers by taking the first 8 products
  // In a real app, you would have a specific query for best sellers
  const bestSellers = products?.slice(0, 8) || [];

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-amber-100 rounded-full mb-4">
          <Star className="h-6 w-6 text-amber-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Our Best Sellers
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Discover our most popular products loved by customers worldwide. These
          items consistently receive top ratings for quality and style.
        </p>
      </div>

      {bestSellers.length === 0 ? (
        <div className="text-center py-20">
          <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No best sellers yet
          </h2>
          <p className="text-gray-600 mb-6">
            Check back soon as we update our best sellers based on customer
            purchases.
          </p>
          <Button asChild>
            <Link href="/shop">Browse All Products</Link>
          </Button>
        </div>
      ) : (
        <>
          <BestSellersGrid products={bestSellers} />

          <div className="mt-16 text-center">
            <Button asChild variant="outline" className="mr-4">
              <Link href="/shop">View All Products</Link>
            </Button>
            <Button asChild>
              <Link href="/new-arrivals">Explore New Arrivals</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

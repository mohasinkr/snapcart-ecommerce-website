import React from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AllProductsQueryResult } from "@/sanity.types";
import BestSellersGrid from "@/components/bestsellers/BestSellersGrid";

type BestSellersSectionProps = {
  products: AllProductsQueryResult;
  limit?: number;
};

export default function BestSellersSection({
  products,
  limit = 4,
}: BestSellersSectionProps) {
  // Take only the specified number of products
  const limitedProducts = products?.slice(0, limit) || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-amber-500 fill-current" />
              <span className="text-amber-500 font-medium">Top Rated</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Best Selling Products
            </h2>
          </div>
          <Button asChild variant="ghost" className="flex items-center gap-1">
            <Link href="/bestsellers">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <BestSellersGrid products={limitedProducts} showFilters={false} />
      </div>
    </section>
  );
}

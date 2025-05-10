"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Filter, ChevronDown } from "lucide-react";
import { AllProductsQueryResult } from "@/sanity.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CoverImage from "@/components/common/CoverImage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";

type BestSellersGridProps = {
  products: AllProductsQueryResult;
  showFilters?: boolean;
};

export default function BestSellersGrid({
  products,
  showFilters = true,
}: BestSellersGridProps) {
  const [sortOption, setSortOption] = useState("popularity");

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    if (!a || !b) return 0;

    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div>
      {showFilters && (
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">
            Showing {products.length} products
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  Sort by: {getSortLabel(sortOption)}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOption("popularity")}>
                  Popularity
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-low")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-high")}>
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("name")}>
                  Name
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {sortedProducts.map(
          (product) =>
            product && <ProductCard key={product._id} product={product} />
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: AllProductsQueryResult[0] }) {
  if (!product) return null;

  return (
    <Card className="group overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.image && (
          <Link href={`/shop/${product.slug}`}>
            <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
              <CoverImage image={product.image} priority={false} />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-10" />
          </Link>
        )}
        {/* Wishlist button */}
        <div className="absolute top-4 right-4">
          <AddToCartButton
            productId={product._id}
            variant="secondary"
            iconOnly
            rounded
            className="h-10 w-10 bg-white shadow-md hover:bg-gray-100"
          />
        </div>

        {/* Floating add to cart button that appears on hover */}
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-[80%] opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <AddToCartButton
            productId={product._id}
            className="w-full shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white"
          />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < 4 ? "fill-current" : "fill-none"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">4.0 (24 reviews)</span>
        </div>
        <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-lg font-semibold text-indigo-600">
          ${product.price.toFixed(2)}
        </div>
        <div className="text-sm text-gray-500">Free shipping</div>
      </CardFooter>
    </Card>
  );
}

function getSortLabel(option: string): string {
  switch (option) {
    case "price-low":
      return "Price: Low to High";
    case "price-high":
      return "Price: High to Low";
    case "name":
      return "Name";
    default:
      return "Popularity";
  }
}

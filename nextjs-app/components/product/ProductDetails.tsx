"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { ProductQueryResult } from "@/sanity.types";

type ProductDetailsProps = {
  product: ProductQueryResult;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const { _id, name, price } = product;

  // In a real app, these would come from the product data
  const inStock = true;
  const rating = 4.5;
  const reviewCount = 42;
  const discount = 0; // percentage discount
  const originalPrice = price;
  const discountedPrice = price * (1 - discount / 100);
  const isSale = discount > 0;

  return (
    <div className="space-y-6">
      {/* Product name and badges */}
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {inStock ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              Out of Stock
            </Badge>
          )}
          {isSale && (
            <Badge className="bg-red-600">Sale {discount}% Off</Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-2">
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(rating) ? "fill-current" : "fill-none"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {rating} ({reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">
          ${discountedPrice.toFixed(2)}
        </span>
        {isSale && (
          <span className="text-xl text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Quantity selector and add to cart */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <QuantitySelector
              initialQuantity={quantity}
              onChange={setQuantity}
              size="lg"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              &nbsp;
            </label>
            <AddToCartButton
              productId={_id}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
            />
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-12 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
          asChild
        >
          <Link href="/cart" className="flex items-center justify-center">
            View Cart
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Shipping and returns */}
      <div className="border-t border-gray-200 pt-6 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Truck className="h-5 w-5 mr-2 text-gray-400" />
          <span>Free shipping on orders over $100</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <ShieldCheck className="h-5 w-5 mr-2 text-gray-400" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AllProductsQueryResult } from "@/sanity.types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CoverImage from "@/components/common/CoverImage";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";

type RelatedProductsProps = {
  products: AllProductsQueryResult;
  currentProductId: string;
  title?: string;
};

export default function RelatedProducts({
  products,
  currentProductId,
  title = "You may also like",
}: RelatedProductsProps) {
  // Filter out the current product and limit to 4 products
  const filteredProducts = products
    .filter((product) => product?._id !== currentProductId)
    .slice(0, 4);

  if (filteredProducts.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Button asChild variant="ghost" className="flex items-center gap-1">
          <Link href="/shop">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(
          (product) =>
            product && (
              <Card
                key={product._id}
                className="group overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {product.image && (
                    <Link href={`/shop/${product.slug}`}>
                      <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
                        <CoverImage image={product.image} priority={false} />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-10" />
                    </Link>
                  )}
                  <div className="absolute top-4 right-4">
                    <AddToCartButton
                      productId={product._id}
                      variant="secondary"
                      iconOnly
                      rounded
                      className="h-10 w-10 bg-white shadow-md hover:bg-gray-100"
                    />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                    <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                  </h3>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="text-lg font-semibold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </div>
                </CardFooter>
              </Card>
            )
        )}
      </div>
    </section>
  );
}

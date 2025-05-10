import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/live";
import { productPagesSlugs, productQuery, allProductsQuery } from "@/sanity/lib/queries";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductDetails from "@/components/product/ProductDetails";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: productPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
// export async function generateMetadata(
//   props: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const params = await props.params;
//   const { data: post } = await sanityFetch({
//     query: postQuery,
//     params,
//     // Metadata should never contain stega
//     stega: false,
//   });
//   const previousImages = (await parent).openGraph?.images || [];
//   const ogImage = resolveOpenGraphImage(post?.coverImage);

//   return {
//     authors:
//       post?.author?.firstName && post?.author?.lastName
//         ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
//         : [],
//     title: post?.title,
//     description: post?.excerpt,
//     openGraph: {
//       images: ogImage ? [ogImage, ...previousImages] : previousImages,
//     },
//   } satisfies Metadata;
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: product } = await sanityFetch({
    query: productQuery,
    params: await params,
    stega: false,
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | SnapCart`,
    description: `Shop ${product.name} and more at SnapCart.`,
  };
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const [{ data: product }, { data: allProducts }] = await Promise.all([
    sanityFetch({ query: productQuery, params }),
    sanityFetch({ query: allProductsQuery }),
  ]);

  if (!product?._id) {
    return notFound();
  }

  return (
    <>
      <div className="container mx-auto py-12">
        {/* Breadcrumb navigation */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/shop" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>

        {/* Product main section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product images */}
          <div>
            <ProductImageGallery
              mainImage={product.image}
              productName={product.name}
            />
          </div>

          {/* Product details */}
          <div>
            <ProductDetails product={product} />
          </div>
        </div>

        {/* Product tabs (description, specs, reviews) */}
        <div className="mb-16">
          <ProductTabs product={product} />
        </div>

        {/* Related products */}
        <div className="border-t border-gray-200 pt-16">
          <RelatedProducts
            products={allProducts || []}
            currentProductId={product._id}
          />
        </div>
      </div>
    </>
  );
}

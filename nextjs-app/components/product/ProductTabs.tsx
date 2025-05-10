"use client";

import { Star, ThumbsUp, ThumbsDown, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProductQueryResult } from "@/sanity.types";

type ProductTabsProps = {
  product: ProductQueryResult;
};

export default function ProductTabs({ product }: ProductTabsProps) {
  if (!product) return null;

  // Sample product description (in a real app, this would come from the product data)
  const description = `
    <p>Experience unparalleled comfort and style with our premium product. Crafted with the finest materials and attention to detail, this item is designed to exceed your expectations.</p>
    <p>Key features include:</p>
    <ul>
      <li>Premium quality materials</li>
      <li>Durable construction</li>
      <li>Versatile design</li>
      <li>Easy maintenance</li>
    </ul>
    <p>Perfect for everyday use, this product combines functionality with elegant aesthetics.</p>
  `;

  // Sample specifications (in a real app, these would come from the product data)
  const specifications = [
    { name: "Material", value: "Premium cotton blend" },
    { name: "Dimensions", value: "12 x 8 x 4 inches" },
    { name: "Weight", value: "1.2 lbs" },
    { name: "Color", value: "Multiple options available" },
    { name: "Care Instructions", value: "Machine washable, tumble dry low" },
    { name: "Warranty", value: "1-year limited warranty" },
  ];

  // Sample reviews (in a real app, these would come from the product data)
  const reviews = [
    {
      id: "1",
      author: "Jane Smith",
      date: "August 15, 2023",
      rating: 5,
      title: "Absolutely love it!",
      content:
        "This product exceeded my expectations. The quality is outstanding and it looks even better in person. Highly recommend!",
      helpful: 24,
      unhelpful: 2,
    },
    {
      id: "2",
      author: "John Doe",
      date: "July 28, 2023",
      rating: 4,
      title: "Great product with minor issues",
      content:
        "Overall, I'm very satisfied with this purchase. The product is well-made and looks great. The only reason I'm giving it 4 stars instead of 5 is because the delivery took longer than expected.",
      helpful: 18,
      unhelpful: 3,
    },
    {
      id: "3",
      author: "Alex Johnson",
      date: "June 12, 2023",
      rating: 5,
      title: "Perfect addition to my collection",
      content:
        "I've been looking for something like this for a while, and I'm so glad I found it. The quality is excellent and it fits perfectly with my existing items.",
      helpful: 32,
      unhelpful: 1,
    },
  ];

  // Calculate average rating
  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length;

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">
          Reviews ({reviews.length})
        </TabsTrigger>
      </TabsList>

      {/* Description Tab */}
      <TabsContent value="description" className="py-6">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </TabsContent>

      {/* Specifications Tab */}
      <TabsContent value="specifications" className="py-6">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              {specifications.map((spec, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {spec.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="py-6">
        <div className="space-y-8">
          {/* Reviews summary */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex text-amber-400 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? "fill-current"
                        : i < averageRating
                        ? "fill-current opacity-50"
                        : "fill-none"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Based on {reviews.length} reviews
              </div>
            </div>
            <div className="flex-1">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Write a Review
              </Button>
            </div>
          </div>

          {/* Individual reviews */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-full p-2 mr-3">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {review.author}
                      </div>
                      <div className="text-sm text-gray-500">
                        {review.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-current" : "fill-none"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {review.title}
                </h4>
                <p className="text-gray-600 mb-4">{review.content}</p>
                <div className="flex items-center text-sm">
                  <span className="mr-4">Was this review helpful?</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center mr-2"
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Yes ({review.helpful})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <ThumbsDown className="h-3 w-3 mr-1" />
                    No ({review.unhelpful})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { allCategoriesQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

const images = [
  {
    id: 1,
    name: "Men's Wear",
    image:
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    name: "Women's Wear",
    image:
      "https://images.unsplash.com/photo-1525845859779-54d477ff291f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    name: "Kids & Toys",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
];

export async function ShopByCategory() {
  // getting the categories from the sanity api
  const { data: categories } = await sanityFetch({
    query: allCategoriesQuery,
    perspective: "published",
    stega: false,
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index: number) => (
            <Link
              key={category._id}
              href={`/category/${category.id}`}
              className="block"
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-4">
                  <div className="aspect-square relative">
                    <Image
                      // generate random image if no image is provided
                      src={category?.image || images[index]?.image}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <h3 className="text-lg font-medium text-white text-center">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

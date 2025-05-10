import { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItemsList from "@/components/cart/CartItemsList";
import CartSummary from "@/components/cart/CartSummary";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "View and manage items in your shopping cart",
};

// This would be replaced with actual cart data from a state management solution
// like React Context, Redux, or a server-side solution
const sampleCartItems = [
  {
    id: "product1",
    name: "Classic White Sneakers",
    price: 89.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "product2",
    name: "Denim Jacket",
    price: 129.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

export default function CartPage() {
  const cartItems = sampleCartItems;
  const isEmpty = cartItems.length === 0;

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          {isEmpty ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Browse
                our products and find something you'll love.
              </p>
              <Button asChild>
                <Link href="/bestsellers">Shop Best Sellers</Link>
              </Button>
            </div>
          ) : (
            <CartItemsList items={cartItems} />
          )}
        </div>

        {/* Order summary */}
        {!isEmpty && (
          <div className="w-full md:w-80 lg:w-96">
            <CartSummary items={cartItems} />
          </div>
        )}
      </div>
    </div>
  );
}

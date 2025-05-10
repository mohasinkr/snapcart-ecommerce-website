import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout | SnapCart",
  description: "Complete your purchase",
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/cart" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
          
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-6">
              This is a demo checkout page. In a real application, this would include:
            </p>
            <ul className="space-y-2 text-left max-w-md mx-auto mb-8">
              <li className="flex items-center">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">1</span>
                <span>Shipping address form</span>
              </li>
              <li className="flex items-center">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">2</span>
                <span>Payment method selection</span>
              </li>
              <li className="flex items-center">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">3</span>
                <span>Order review</span>
              </li>
              <li className="flex items-center">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">4</span>
                <span>Payment processing</span>
              </li>
              <li className="flex items-center">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">5</span>
                <span>Order confirmation</span>
              </li>
            </ul>
            
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/">Return to Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

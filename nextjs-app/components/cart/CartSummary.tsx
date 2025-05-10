"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartSummaryProps = {
  items: CartItem[];
};

export default function CartSummary({ items }: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Calculate totals
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax - promoDiscount;

  const handleApplyPromo = () => {
    if (!promoCode.trim() || promoApplied) return;

    setIsApplyingPromo(true);
    
    // Simulate API call to validate promo code
    setTimeout(() => {
      // For demo purposes, any promo code will give 10% off
      const discount = subtotal * 0.1;
      setPromoDiscount(discount);
      setPromoApplied(true);
      setIsApplyingPromo(false);
    }, 800);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Promo code input */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Promo Code</div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied || isApplyingPromo}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleApplyPromo}
              disabled={!promoCode.trim() || promoApplied || isApplyingPromo}
            >
              {isApplyingPromo ? "Applying..." : promoApplied ? "Applied" : "Apply"}
            </Button>
          </div>
          {promoApplied && (
            <div className="text-sm text-green-600">
              Promo code applied! You saved ${promoDiscount.toFixed(2)}
            </div>
          )}
        </div>

        {/* Order details */}
        <div className="space-y-1 pt-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {promoDiscount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-${promoDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between pt-4 text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Truck className="h-4 w-4 mr-2 text-gray-400" />
            {shipping === 0 ? (
              <span>Free shipping on orders over $100</span>
            ) : (
              <span>Fast shipping (2-4 business days)</span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
            <span>Secure payment processing</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ShieldCheck className="h-4 w-4 mr-2 text-gray-400" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
          <Link href="/checkout" className="flex items-center justify-center">
            Proceed to Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

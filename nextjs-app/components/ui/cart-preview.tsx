"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CartPreviewProps = {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
};

export function CartPreview({ isOpen, onClose, product }: CartPreviewProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match the transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  // Use portal to render the cart preview at the document root
  // This ensures it's not affected by parent element positioning
  return typeof document !== "undefined"
    ? createPortal(
        <div
          className={cn(
            "fixed top-20 right-4 z-[100] w-80 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 transform",
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          )}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center text-green-600">
                <ShoppingBag className="h-5 w-5 mr-2" />
                <span className="font-medium">Added to Cart</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {product && (
              <div className="flex items-center gap-3 mb-3">
                <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-sm text-indigo-600 font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                asChild
              >
                <Link href="/cart" className="flex items-center justify-center">
                  View Cart
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}

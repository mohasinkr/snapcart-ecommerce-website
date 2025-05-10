"use client";

import { useState } from "react";
import { ShoppingBag, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CartPreview } from "@/components/ui/cart-preview";

type AddToCartButtonProps = {
  productId: string;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  iconOnly?: boolean;
  rounded?: boolean;
};

// Sample product data - in a real app, you would fetch this from your API
const sampleProducts: Record<
  string,
  { name: string; price: number; image: string }
> = {
  product1: {
    name: "Classic White Sneakers",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  product2: {
    name: "Denim Jacket",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  product3: {
    name: "Summer Dress",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  product4: {
    name: "Leather Backpack",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1548546738-8509cb246ed3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
};

export function AddToCartButton({
  productId,
  variant = "default",
  size = "default",
  className,
  iconOnly = false,
  rounded = false,
}: AddToCartButtonProps) {
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);

  // Get product details (in a real app, you would fetch this from your API)
  const productDetails = sampleProducts[productId] || {
    name: "Product",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  };

  const handleAddToCart = () => {
    if (addedToCart) return;

    setAddingToCart(true);

    // Simulate adding to cart with a delay
    // In a real app, this would be an API call to add the item to the cart
    setTimeout(() => {
      setAddingToCart(false);
      setAddedToCart(true);
      setShowCartPreview(true);

      // Reset the success state after 2 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }, 800);
  };

  // For icon-only buttons
  if (iconOnly) {
    return (
      <>
        <Button
          size="icon"
          disabled={addingToCart}
          onClick={handleAddToCart}
          variant={addedToCart ? "default" : variant}
          className={cn(
            "transition-all duration-300",
            rounded && "rounded-full",
            addedToCart
              ? "bg-green-500 text-white hover:bg-green-600"
              : "hover:scale-105",
            className
          )}
        >
          {addingToCart ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : addedToCart ? (
            <Check className="h-5 w-5" />
          ) : (
            <ShoppingBag className="h-5 w-5" />
          )}
          <span className="sr-only">Add to cart</span>
        </Button>

        <CartPreview
          isOpen={showCartPreview}
          onClose={() => setShowCartPreview(false)}
          product={{
            id: productId,
            name: productDetails.name,
            price: productDetails.price,
            image: productDetails.image,
          }}
        />
      </>
    );
  }

  // For text buttons
  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleAddToCart}
        disabled={addingToCart}
        className={cn(
          "transition-all duration-300",
          rounded && "rounded-full",
          addedToCart &&
            variant !== "ghost" &&
            "bg-green-500 hover:bg-green-600",
          addedToCart && variant === "ghost" && "text-green-600",
          className
        )}
      >
        {addingToCart ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : addedToCart ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Added!
          </>
        ) : (
          <>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to cart
          </>
        )}
      </Button>

      <CartPreview
        isOpen={showCartPreview}
        onClose={() => setShowCartPreview(false)}
        product={{
          id: productId,
          name: productDetails.name,
          price: productDetails.price,
          image: productDetails.image,
        }}
      />
    </>
  );
}

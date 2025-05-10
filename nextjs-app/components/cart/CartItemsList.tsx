"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartItemsListProps = {
  items: CartItem[];
};

export default function CartItemsList({ items }: CartItemsListProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
}

type CartItemCardProps = {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};

function CartItemCard({ item, updateQuantity, removeItem }: CartItemCardProps) {
  const { id, name, price, quantity, image } = item;
  const subtotal = price * quantity;

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        {/* Product image */}
        <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        {/* Product details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <Link
              href={`/shop/${id}`}
              className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1"
            >
              {name}
            </Link>
            <div className="text-lg font-semibold text-indigo-600 ml-4">
              ${subtotal.toFixed(2)}
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            ${price.toFixed(2)} each
          </div>

          <div className="flex justify-between items-center mt-4">
            {/* Quantity selector */}
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-md rounded-r-none"
                onClick={() => updateQuantity(id, quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="h-8 px-3 flex items-center justify-center border-y border-input bg-transparent text-sm">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-md rounded-l-none"
                onClick={() => updateQuantity(id, quantity + 1)}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>

            {/* Remove button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-500"
              onClick={() => removeItem(id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

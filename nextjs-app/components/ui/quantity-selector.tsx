"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuantitySelectorProps = {
  initialQuantity?: number;
  min?: number;
  max?: number;
  onChange?: (quantity: number) => void;
  className?: string;
  size?: "sm" | "default" | "lg";
};

export function QuantitySelector({
  initialQuantity = 1,
  min = 1,
  max = 99,
  onChange,
  className,
  size = "default",
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      setQuantity(value);
      onChange?.(value);
    }
  };

  const sizeClasses = {
    sm: {
      container: "h-8",
      button: "h-8 w-8",
      input: "h-8 w-10 text-sm",
    },
    default: {
      container: "h-10",
      button: "h-10 w-10",
      input: "h-10 w-12 text-base",
    },
    lg: {
      container: "h-12",
      button: "h-12 w-12",
      input: "h-12 w-16 text-lg",
    },
  };

  const sizeClass = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex items-center border border-input rounded-md overflow-hidden",
        sizeClass.container,
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-none border-r border-input",
          sizeClass.button
        )}
        onClick={handleDecrease}
        disabled={quantity <= min}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={quantity}
        onChange={handleChange}
        className={cn(
          "w-12 border-0 text-center focus:ring-0 focus:outline-none",
          sizeClass.input
        )}
        aria-label="Quantity"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-none border-l border-input",
          sizeClass.button
        )}
        onClick={handleIncrease}
        disabled={quantity >= max}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}

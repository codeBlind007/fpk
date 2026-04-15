"use client";

import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemComponentProps {
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  imageUrl?: string;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

export default function CartItemComponent({
  name,
  price,
  quantity,
  maxQuantity,
  imageUrl,
  onRemove,
  onQuantityChange,
}: CartItemComponentProps) {
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity >= maxQuantity) {
      alert(`Only ${maxQuantity} item(s) available in stock`);
      return;
    }

    onQuantityChange(quantity + 1);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">
      {/* Product Image */}
      <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-xs">No image</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="grow flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
            {name}
          </h3>
          <p className="text-lg font-bold text-gray-900 mt-1">₹{price}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleDecrement}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium w-8 text-center">
            {quantity}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            disabled={quantity >= maxQuantity}
            onClick={handleIncrement}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Remove Button */}
      <div className="flex items-start">
        <Button
          variant="ghost"
          size="icon"
          className="text-red-600 hover:bg-red-50"
          onClick={onRemove}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

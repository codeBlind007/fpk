"use client";

import { Button } from "@/components/ui/button";

interface ProductInfoBoxProps {
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  stock: number;
  category?: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
  loading?: boolean;
}

export default function ProductInfoBox({
  name,
  price,
  originalPrice,
  rating = 4,
  reviews = 0,
  stock,
  category,
  onAddToCart,
  onBuyNow,
  loading = false,
}: ProductInfoBoxProps) {
  const derivedOriginalPrice = originalPrice ?? Math.round(price * 1.25);
  const effectiveOriginalPrice =
    derivedOriginalPrice > price ? derivedOriginalPrice : undefined;
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const computedDiscount = effectiveOriginalPrice
    ? Math.round(
        ((effectiveOriginalPrice - price) / effectiveOriginalPrice) * 100,
      )
    : discount;

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 sm:p-5 space-y-4">
      <p className="text-xs sm:text-sm text-gray-500">Sponsored</p>
      <h1 className="text-lg sm:text-2xl font-medium text-gray-900 leading-snug">
        {name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <span className="bg-green-700 text-white px-2 py-1 rounded text-sm font-semibold">
          ★ {rating}
        </span>
        <span className="text-sm text-gray-600">
          {(reviews || 27323).toLocaleString()} Ratings
        </span>
      </div>

      {/* Price */}
      <div className="space-y-1 border-b border-gray-100 pb-3">
        <div className="flex items-baseline gap-3">
          {computedDiscount > 0 && (
            <span className="text-green-600 text-xl font-semibold">
              {computedDiscount}% off
            </span>
          )}
          <span className="text-3xl font-semibold text-gray-900">₹{price}</span>
          {effectiveOriginalPrice && (
            <>
              <span className="text-base text-gray-500 line-through">
                ₹{effectiveOriginalPrice}
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-600">+ ₹9 Protect Promise Fee</p>
      </div>

      <div className="grid grid-cols-[110px_1fr] gap-2 text-sm">
        <span className="text-gray-500">Availability</span>
        <span
          className={
            stock > 0
              ? "text-green-700 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {stock > 0 ? `In stock (${stock})` : "Out of stock"}
        </span>
        <span className="text-gray-500">Category</span>
        <span className="text-gray-800 font-medium">
          {category || "Electronics"}
        </span>
        <span className="text-gray-500">Delivery</span>
        <span className="text-gray-800">Free delivery by tomorrow</span>
      </div>

      <div className="rounded-md border border-blue-100 bg-blue-50/70 p-3">
        <p className="text-sm font-medium text-blue-900">Available offers</p>
        <ul className="mt-1 space-y-1 text-sm text-blue-900/90">
          <li>Bank Offer: 5% cashback on Flipkart Axis Bank card</li>
          <li>Special Price: Get extra discount on selected payment modes</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        <Button
          type="button"
          onClick={onAddToCart}
          disabled={loading || stock <= 0}
          className="w-full bg-[#ff9f00] hover:bg-[#f29a00] text-white"
          size="lg"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
        <Button
          type="button"
          onClick={onBuyNow}
          disabled={loading || stock <= 0}
          className="w-full bg-[#fb641b] hover:bg-[#ef5b14] text-white"
          size="lg"
        >
          {loading ? "Loading..." : "Buy Now"}
        </Button>
      </div>
    </div>
  );
}

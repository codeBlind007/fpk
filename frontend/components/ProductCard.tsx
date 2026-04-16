"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cartAPI, wishlistAPI } from "@/lib/api";
import { useCart, useWishlist } from "@/lib/store";

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  imageUrl,
  rating = 4,
  reviews = 0,
  badge,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  const addItemToCart = useCart((state) => state.addItem);
  const wishlistItems = useWishlist((state) => state.items);
  const addWishlistItem = useWishlist((state) => state.addItem);
  const removeWishlistItem = useWishlist((state) => state.removeItem);

  const productId = String(id);
  const isInWishlist = wishlistItems.some(
    (item) => item.product_id === productId,
  );

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) {
      return;
    }

    try {
      setIsAdding(true);
      const response = await cartAPI.addItem(id);
      const cartItem = response.cartItem;

      addItemToCart({
        id: cartItem.id,
        cartId: cartItem.id,
        productId: cartItem.product_id,
        product: {
          id: String(id),
          name,
          price,
          image_url: imageUrl,
        },
        quantity: cartItem.quantity,
      });

      alert(cartItem.message || "Product added to cart");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to add product to cart";
      alert(message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleWishlist = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isTogglingWishlist) {
      return;
    }

    try {
      setIsTogglingWishlist(true);

      if (isInWishlist) {
        await wishlistAPI.removeItem(productId);
        removeWishlistItem(productId);
        return;
      }

      const response = await wishlistAPI.addItem(productId);

      addWishlistItem({
        product_id: response.item?.product_id ?? productId,
        name,
        price,
        image_url: imageUrl,
        created_at: response.item?.created_at ?? new Date().toISOString(),
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update wishlist";
      alert(message);
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative bg-gray-100 aspect-square overflow-hidden group">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span>No image</span>
            </div>
          )}

          {/* Badge */}
          {badge && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {badge}
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
            disabled={isTogglingWishlist}
            onClick={handleToggleWishlist}
            className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col grow">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
            {name}
          </h3>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs bg-green-700 text-white px-1.5 py-0.5 rounded">
                ★ {rating}
              </span>
              {reviews > 0 && (
                <span className="text-xs text-gray-600">({reviews})</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900">₹{price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="w-full text-blue-600 border border-blue-600 hover:bg-blue-50 mt-auto"
            disabled={isAdding}
            onClick={handleAddToCart}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Link>
  );
}

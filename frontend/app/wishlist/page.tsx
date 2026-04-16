"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { cartAPI, wishlistAPI } from "@/lib/api";
import { useCart, useWishlist } from "@/lib/store";

export default function WishlistPage() {
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const addItemToCart = useCart((state) => state.addItem);
  const wishlistItems = useWishlist((state) => state.items);
  const wishlistLoaded = useWishlist((state) => state.loaded);
  const setWishlistItems = useWishlist((state) => state.setItems);
  const removeWishlistItem = useWishlist((state) => state.removeItem);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        if (!wishlistLoaded) {
          const response = await wishlistAPI.getItems();
          setWishlistItems(response.items || []);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [wishlistLoaded, setWishlistItems]);

  const handleRemove = async (productId: string) => {
    if (processingId) {
      return;
    }

    try {
      setProcessingId(productId);
      await wishlistAPI.removeItem(productId);
      removeWishlistItem(productId);
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      alert("Failed to remove item from wishlist");
    } finally {
      setProcessingId(null);
    }
  };

  const handleMoveToCart = async (item: {
    product_id: string;
    name: string;
    price: number;
    image_url?: string;
  }) => {
    if (processingId) {
      return;
    }

    try {
      setProcessingId(item.product_id);

      const response = await cartAPI.addItem(item.product_id);
      const cartItem = response.cartItem;

      addItemToCart({
        id: cartItem.id,
        cartId: cartItem.id,
        productId: cartItem.product_id,
        product: {
          id: item.product_id,
          name: item.name,
          price: item.price,
          image_url: item.image_url,
        },
        quantity: cartItem.quantity,
      });

      await wishlistAPI.removeItem(item.product_id);
      removeWishlistItem(item.product_id);
      alert("Moved to cart");
    } catch (error) {
      console.error("Error moving wishlist item to cart:", error);
      alert("Failed to move item to cart");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <>
      <Header />
      <main className="grow bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="h-6 w-6 text-pink-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              My Wishlist
            </h1>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse h-28"
                />
              ))}
            </div>
          ) : wishlistItems.length === 0 ? (
            <EmptyState
              title="Your wishlist is empty"
              description="Tap the heart icon on any product to save it here"
              actionText="Browse Products"
              actionHref="/"
              icon={<Heart className="h-12 w-12 text-pink-400" />}
            />
          ) : (
            <div className="space-y-3">
              {wishlistItems.map((item) => {
                const isBusy = processingId === item.product_id;

                return (
                  <article
                    key={item.product_id}
                    className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Link
                        href={`/product/${item.product_id}`}
                        className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-md overflow-hidden bg-gray-100 shrink-0"
                      >
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                      </Link>

                      <div className="min-w-0 grow">
                        <Link
                          href={`/product/${item.product_id}`}
                          className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 hover:text-blue-600"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-2 text-lg font-semibold text-gray-900">
                          ₹{item.price}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Added{" "}
                          {new Date(
                            item.created_at ?? Date.now(),
                          ).toLocaleDateString()}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <Button
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => handleMoveToCart(item)}
                            disabled={isBusy}
                          >
                            {isBusy ? "Updating..." : "Move to Cart"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemove(item.product_id)}
                            disabled={isBusy}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

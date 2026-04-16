"use client";

import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { wishlistAPI } from "@/lib/api";
import { useCart, useWishlist } from "@/lib/store";

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useCart((state) => state.items);
  const wishlistItems = useWishlist((state) => state.items);
  const wishlistLoaded = useWishlist((state) => state.loaded);
  const setWishlistItems = useWishlist((state) => state.setItems);

  useEffect(() => {
    const loadWishlist = async () => {
      if (wishlistLoaded) {
        return;
      }

      try {
        const response = await wishlistAPI.getItems();
        setWishlistItems(response.items || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    loadWishlist();
  }, [wishlistLoaded, setWishlistItems]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="rounded-md bg-[#ffe500] px-4 py-2 text-lg font-bold leading-none text-[#2874f0] shadow-sm sm:px-5 sm:text-xl">
              Flipkart
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/orders" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="text-sm">
                Orders
              </Button>
            </Link>

            <Link href="/wishlist" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart Icon */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {mobileMenuOpen && (
          <div className="py-3 md:hidden space-y-3">
            <form onSubmit={handleSearch}>
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            <Link href="/orders" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full" size="sm">
                View Orders
              </Button>
            </Link>

            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full" size="sm">
                Wishlist ({wishlistItems.length})
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

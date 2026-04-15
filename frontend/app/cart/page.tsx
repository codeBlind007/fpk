"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItemComponent from "@/components/CartItemComponent";
import PriceSummary from "@/components/PriceSummary";
import EmptyState from "@/components/EmptyState";
import { CartItemSkeleton } from "@/components/Skeletons";
import { Button } from "@/components/ui/button";
import { cartAPI } from "@/lib/api";
import { useCart } from "@/lib/store";

interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    stock_quantity: number;
    image_url?: string;
  };
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    subtotal: 0,
    tax: 0,
    shipping_charge: 0,
  });

  const setCartTotals = useCart((state) => state.setTotals);

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const itemsResponse = await cartAPI.getItems();
        const cartData = itemsResponse.cartItems || [];
        setCartItems(cartData);

        // Fetch cart summary
        if (cartData.length > 0) {
          const summaryResponse = await cartAPI.getSummary();
          setSummary(summaryResponse.summary || {});
          setCartTotals(
            summaryResponse.summary?.subtotal || 0,
            summaryResponse.summary?.tax || 0,
            summaryResponse.summary?.shipping_charge || 0,
          );
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [setCartTotals]);

  const handleRemoveItem = async (cartId: string) => {
    try {
      await cartAPI.removeItem(cartId);
      setCartItems((items) => items.filter((item) => item.id !== cartId));
      alert("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item");
    }
  };

  const handleQuantityChange = async (cartId: string, quantity: number) => {
    try {
      await cartAPI.updateItem(cartId, quantity);
      setCartItems((items) =>
        items.map((item) =>
          item.id === cartId ? { ...item, quantity } : item,
        ),
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }
    router.push("/checkout");
  };

  return (
    <>
      <Header />
      <main className="grow bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Shopping Cart
          </h1>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <CartItemSkeleton key={i} />
                ))}
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-6 bg-gray-200 rounded mt-4" />
                </div>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              description="Start shopping to add items to your cart"
              actionText="Continue Shopping"
              actionHref="/"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    name={item.product.name}
                    price={item.product.price}
                    quantity={item.quantity}
                    maxQuantity={item.product.stock_quantity}
                    imageUrl={item.product.image_url}
                    onRemove={() => handleRemoveItem(item.id)}
                    onQuantityChange={(qty) =>
                      handleQuantityChange(item.id, qty)
                    }
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200 sticky top-24">
                  <h2 className="font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h2>
                  <PriceSummary
                    subtotal={summary.subtotal}
                    tax={summary.tax}
                    shippingCharge={summary.shipping_charge}
                  />
                  <Button
                    onClick={handleCheckout}
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                  <Link href="/">
                    <Button variant="ghost" className="w-full mt-2" size="lg">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

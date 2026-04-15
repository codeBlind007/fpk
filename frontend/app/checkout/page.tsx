"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddressForm from "@/components/AddressForm";
import PriceSummary from "@/components/PriceSummary";
import CartItemComponent from "@/components/CartItemComponent";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { CheckoutSkeleton } from "@/components/Skeletons";
import { cartAPI, ordersAPI } from "@/lib/api";
import { useCart } from "@/lib/store";

interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
  };
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [summary, setSummary] = useState({
    subtotal: 0,
    tax: 0,
    shipping_charge: 0,
  });

  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const itemsResponse = await cartAPI.getItems();
        const cartData = itemsResponse.cartItems || [];

        if (cartData.length === 0) {
          router.push("/cart");
          return;
        }

        setCartItems(cartData);

        // Fetch cart summary
        const summaryResponse = await cartAPI.getSummary();
        setSummary(summaryResponse.summary || {});
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const handleAddressChange = (field: string, value: string) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (
      !address.fullName ||
      !address.phoneNumber ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.postalCode
    ) {
      alert("Please fill in all address fields");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const orderItems = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const response = await ordersAPI.placeOrder(orderItems, {
        full_name: address.fullName,
        phone_number: address.phoneNumber,
        address: address.address,
        city: address.city,
        state: address.state,
        postal_code: address.postalCode,
      });

      router.push(`/order-confirmation/${response.orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="grow bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CheckoutSkeleton />
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <CheckoutSkeleton />
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <EmptyState
              title="Cart is empty"
              description="Please add items to your cart before checking out"
              actionText="Continue Shopping"
              actionHref="/"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Address */}
                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Shipping Address
                  </h2>
                  <AddressForm data={address} onChange={handleAddressChange} />
                </div>

                {/* Order Items Review */}
                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Items
                  </h2>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-b-0"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 sticky top-24">
                  <h2 className="font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h2>
                  <PriceSummary
                    subtotal={summary.subtotal}
                    tax={summary.tax}
                    shippingCharge={summary.shipping_charge}
                  />
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                    size="lg"
                  >
                    {submitting ? "Placing Order..." : "Place Order"}
                  </Button>
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

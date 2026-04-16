"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { ordersAPI } from "@/lib/api";
import { CheckoutSkeleton } from "@/components/Skeletons";

interface OrderData {
  id: string;
  status: string;
  items: Array<{
    product_id: string;
    quantity: number;
    product_name: string;
    price: number;
  }>;
  shipping_address: {
    full_name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
  };
  total_amount: number;
  created_at: string;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await ordersAPI.getOrderById(orderId);
        setOrder(response.order);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  return (
    <>
      <Header />
      <main className="grow bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {loading ? (
            <div className="max-w-2xl mx-auto">
              <CheckoutSkeleton />
            </div>
          ) : error || !order ? (
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-red-600 text-center">
                {error || "Order not found"}
              </p>
              <Link href="/" className="flex justify-center mt-4">
                <Button>Back to Home</Button>
              </Link>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Success Message */}
              <div className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Order Confirmed!
                </h1>
                <p className="text-gray-600 mb-2">
                  Thank you for your purchase
                </p>
                <p className="text-sm text-gray-500">
                  Order ID: <span className="font-semibold">{order.id}</span>
                </p>
              </div>

              {/* Order Details */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Details
                </h2>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Shipping Address
                  </h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>{order.shipping_address.full_name}</p>
                    <p>{order.shipping_address.address}</p>
                    <p>
                      {order.shipping_address.city},{" "}
                      {order.shipping_address.state}{" "}
                      {order.shipping_address.postal_code}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Order Items
                  </h3>
                  <div className="space-y-2 text-sm">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-gray-700 pb-2 border-b border-gray-200 last:border-b-0"
                      >
                        <span>
                          {item.product_name} x {item.quantity}
                        </span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{order.total_amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Link href="/orders">
                  <Button variant="outline" className="w-full" size="lg">
                    View Order History
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full" size="lg">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

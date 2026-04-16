"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmptyState from "@/components/EmptyState";
import { CheckoutSkeleton } from "@/components/Skeletons";
import { Button } from "@/components/ui/button";
import { ordersAPI, type OrderHistory } from "@/lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        const response = await ordersAPI.getOrderHistory();
        setOrders(response.orders || []);
      } catch (err) {
        console.error("Error fetching order history:", err);
        setError("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const totalOrders = orders.length;
  const lifetimeSpend = useMemo(
    () => orders.reduce((sum, order) => sum + order.total_amount, 0),
    [orders],
  );

  return (
    <>
      <Header />
      <main className="grow bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
          <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Order History
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Track all your purchases in one place.
              </p>
            </div>
            {!loading && !error && totalOrders > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700">
                <p>Orders: {totalOrders}</p>
                <p>Lifetime Spend: ₹{lifetimeSpend.toFixed(2)}</p>
              </div>
            )}
          </section>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg border border-gray-200 p-4"
                >
                  <CheckoutSkeleton />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-red-600">{error}</p>
              <Link href="/" className="inline-block mt-4">
                <Button>Back to Home</Button>
              </Link>
            </div>
          ) : orders.length === 0 ? (
            <EmptyState
              title="No orders yet"
              description="Place your first order to see history here"
              actionText="Start Shopping"
              actionHref="/"
            />
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="px-4 sm:px-5 py-4 border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                        {order.status}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ₹{order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-4">
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={`${order.id}-${item.product_id}-${index}`}
                          className="flex items-center gap-3 sm:gap-4"
                        >
                          <div className="relative w-16 h-16 rounded border border-gray-200 bg-gray-100 overflow-hidden shrink-0">
                            {item.image_url ? (
                              <Image
                                src={item.image_url}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                                No image
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 grow">
                            <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity} x ₹{item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="text-sm sm:text-base font-semibold text-gray-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <p className="text-sm text-gray-600">
                        Ship to: {order.shipping_address.full_name},{" "}
                        {order.shipping_address.city},{" "}
                        {order.shipping_address.state}{" "}
                        {order.shipping_address.postal_code}
                      </p>
                      <Link href={`/order-confirmation/${order.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCarousel from "@/components/ImageCarousel";
import ProductInfoBox from "@/components/ProductInfoBox";
import ProductDetails from "@/components/ProductDetails";
import EmptyState from "@/components/EmptyState";
import { CheckoutSkeleton } from "@/components/Skeletons";
import { productsAPI, cartAPI } from "@/lib/api";
import { useCart } from "@/lib/store";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url?: string;
  images?: string[];
  description?: string;
  specifications?: Record<string, string>;
  stock: number;
  category?: string;
  rating?: number;
  reviews?: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const addItemToCart = useCart((state) => state.addItem);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getDetails(productId);
        setProduct(response.product || null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product || actionLoading) return;

    try {
      setActionLoading(true);
      const response = await cartAPI.addItem(product.id);
      const cartItem = response.cartItem;

      addItemToCart({
        id: cartItem.id,
        cartId: cartItem.id,
        productId: cartItem.product_id,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
        },
        quantity: cartItem.quantity,
      });

      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      const message =
        err instanceof Error ? err.message : "Failed to add product to cart";
      alert(message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product || actionLoading) return;

    try {
      setActionLoading(true);
      const response = await cartAPI.addItem(product.id);
      const cartItem = response.cartItem;

      addItemToCart({
        id: cartItem.id,
        cartId: cartItem.id,
        productId: cartItem.product_id,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
        },
        quantity: cartItem.quantity,
      });

      router.push("/cart");
    } catch (err) {
      console.error("Error during buy now:", err);
      const message = err instanceof Error ? err.message : "Failed to process";
      alert(message);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="grow bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-gray-200 aspect-square rounded-lg" />
              <div className="space-y-4">
                <CheckoutSkeleton />
              </div>
            </div>
          ) : error || !product ? (
            <EmptyState
              title="Product not found"
              description={
                error || "The product you're looking for is not available"
              }
              actionText="Back to Shopping"
              actionHref="/"
            />
          ) : (
            <div className="space-y-4">
              <nav className="text-xs sm:text-sm text-gray-500">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <span> / </span>
                <span>{product.category || "Products"}</span>
                <span> / </span>
                <span className="text-gray-700">{product.name}</span>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-4 sm:gap-6">
                {/* Left: Images */}
                <section className="bg-white rounded-md border border-gray-200 p-3 sm:p-4 lg:sticky lg:top-20 h-fit">
                  <ImageCarousel
                    images={
                      product.images && product.images.length > 0
                        ? product.images
                        : product.image_url
                          ? [product.image_url]
                          : []
                    }
                    alt={product.name}
                  />
                </section>

                {/* Right: Product Info */}
                <section className="space-y-4">
                  <ProductInfoBox
                    name={product.name}
                    price={product.price}
                    originalPrice={product.original_price}
                    rating={product.rating}
                    reviews={product.reviews}
                    stock={product.stock}
                    category={product.category}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    loading={actionLoading}
                  />

                  <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-5">
                    <ProductDetails
                      description={product.description}
                      specifications={product.specifications}
                      stock={product.stock}
                      category={product.category}
                    />
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

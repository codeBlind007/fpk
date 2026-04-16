"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Armchair,
  Bath,
  BookOpen,
  Brush,
  Camera,
  Car,
  CircleEllipsis,
  Computer,
  Headphones,
  Home,
  MonitorSmartphone,
  Shirt,
  Smartphone,
  Sparkles,
  ToyBrick,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import { ProductCardSkeleton } from "@/components/Skeletons";
import { productsAPI } from "@/lib/api";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [maxPriceLimit, setMaxPriceLimit] = useState(100000);

  const searchQuery = searchParams.get("search") || "";
  const isSearchMode = Boolean(searchQuery.trim());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response: { products?: Product[] } = { products: [] };

        if (searchQuery && searchQuery.trim()) {
          response = (await productsAPI.search(searchQuery)) as {
            products?: Product[];
          };
        } else {
          response = await productsAPI.getAll();
        }

        const data = response.products || [];
        setProducts(data);

        // Calculate max price from products
        if (data.length > 0) {
          const maxProductPrice = Math.max(
            ...data.map((p: Product) => p.price),
          );
          setMaxPriceLimit(Math.ceil(maxProductPrice / 1000) * 1000);
          setMaxPrice(Math.ceil(maxProductPrice / 1000) * 1000);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory
        ? p.category === selectedCategory
        : true;
      const matchPrice = p.price >= minPrice && p.price <= maxPrice;
      return matchCategory && matchPrice;
    });
  }, [products, selectedCategory, minPrice, maxPrice]);

  const quickBrowseProducts = useMemo(
    () => filteredProducts.slice(0, 12),
    [filteredProducts],
  );

  const promoProducts = useMemo(() => {
    const source = filteredProducts.length > 0 ? filteredProducts : products;
    return source.slice(0, 3);
  }, [filteredProducts, products]);

  const categoryIcon = (category: string) => {
    const label = category.toLowerCase();

    if (label.includes("mobile") || label.includes("phone")) {
      return <Smartphone className="h-7 w-7" />;
    }
    if (label.includes("laptop") || label.includes("computer")) {
      return <Computer className="h-7 w-7" />;
    }
    if (label.includes("camera")) {
      return <Camera className="h-7 w-7" />;
    }
    if (label.includes("fashion") || label.includes("cloth")) {
      return <Shirt className="h-7 w-7" />;
    }
    if (label.includes("beauty")) {
      return <Brush className="h-7 w-7" />;
    }
    if (label.includes("book")) {
      return <BookOpen className="h-7 w-7" />;
    }
    if (label.includes("electronic")) {
      return <MonitorSmartphone className="h-7 w-7" />;
    }
    if (label.includes("appliance") || label.includes("ac")) {
      return <MonitorSmartphone className="h-7 w-7" />;
    }
    if (label.includes("toy")) {
      return <ToyBrick className="h-7 w-7" />;
    }
    if (label.includes("furniture")) {
      return <Armchair className="h-7 w-7" />;
    }
    if (label.includes("home") || label.includes("kitchen")) {
      return <Home className="h-7 w-7" />;
    }
    if (label.includes("car") || label.includes("auto")) {
      return <Car className="h-7 w-7" />;
    }
    if (label.includes("head") || label.includes("audio")) {
      return <Headphones className="h-7 w-7" />;
    }
    if (label.includes("bath")) {
      return <Bath className="h-7 w-7" />;
    }

    return <CircleEllipsis className="h-7 w-7" />;
  };

  return (
    <main className="grow bg-[#f1f3f6]">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5 space-y-4">
        {isSearchMode ? (
          <section className="flex flex-row items-start gap-3 sm:gap-4">
            <aside className="w-28 shrink-0 rounded-xl border border-gray-200 bg-white p-2.5 sm:w-44 sm:p-4 lg:w-72 lg:sticky lg:top-24 lg:self-start">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                  Filters
                </h2>
              </div>

              <div className="pt-3 sm:pt-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-wide text-gray-700 sm:text-sm">
                  Price
                </h3>
                <div className="mt-2 space-y-2 sm:mt-3 sm:space-y-3">
                  <div className="flex flex-col gap-1 text-xs text-gray-700 sm:flex-row sm:items-center sm:gap-2 sm:text-sm">
                    <span>₹</span>
                    <input
                      type="number"
                      min={0}
                      max={maxPrice}
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3"
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-gray-700 sm:flex-row sm:items-center sm:gap-2 sm:text-sm">
                    <span>to</span>
                    <span>₹</span>
                    <input
                      type="number"
                      min={minPrice}
                      max={maxPriceLimit}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full rounded-md border border-gray-300 px-2 py-2 sm:px-3"
                    />
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-w-0 flex-1 space-y-3 sm:space-y-4">
              <div className="rounded-lg border border-blue-100 bg-white p-3 sm:p-4">
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Search results for &quot;{searchQuery}&quot;
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  {filteredProducts.length} products found
                </p>
              </div>

              <section className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
                {loading ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <EmptyState
                    title="No products found"
                    description={
                      searchQuery
                        ? `No products match "${searchQuery}"`
                        : "Try adjusting your filters"
                    }
                    actionText="Browse all products"
                    actionHref="/"
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.original_price}
                        imageUrl={product.image_url}
                        rating={product.rating}
                        reviews={product.reviews}
                        badge={product.badge}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </section>
        ) : (
          <>
            <section className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className={`min-w-21 sm:min-w-24 rounded-lg px-2 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    selectedCategory === null
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  For You
                </button>

                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`min-w-21 sm:min-w-24 rounded-lg px-2 py-2 text-xs sm:text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                      {categoryIcon(category)}
                    </div>
                    <span className="line-clamp-1">{category}</span>
                  </button>
                ))}
              </div>
            </section>

            {promoProducts.length > 0 && (
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {promoProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="relative h-44 sm:h-52 overflow-hidden rounded-xl border border-gray-200 bg-white"
                  >
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
                    <div className="absolute left-4 top-4 max-w-[70%] text-white">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
                        Top Pick
                      </p>
                      <h3 className="mt-1 line-clamp-2 text-lg font-bold leading-tight">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm font-semibold">
                        From ₹{product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </section>
            )}

            <section className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Still looking for these?
              </h2>

              {loading ? (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-44 min-w-37.5 rounded-lg bg-gray-100 animate-pulse"
                    />
                  ))}
                </div>
              ) : quickBrowseProducts.length === 0 ? (
                <EmptyState
                  title="No products found"
                  description="Try changing filters or search terms"
                  actionText="Browse all products"
                  actionHref="/"
                />
              ) : (
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {quickBrowseProducts.map((product) => (
                    <Link
                      key={`rail-${product.id}`}
                      href={`/product/${product.id}`}
                      className="min-w-37.5 sm:min-w-45 rounded-lg border border-gray-200 bg-white p-2"
                    >
                      <div className="relative h-28 sm:h-32 overflow-hidden rounded-md bg-gray-100">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
                        {product.name}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        ₹{product.price}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Top deals for you
              </h2>
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <EmptyState
                  title="No products found"
                  description={"Try adjusting your filters"}
                  actionText="Browse all products"
                  actionHref="/"
                />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.original_price}
                      imageUrl={product.image_url}
                      rating={product.rating}
                      reviews={product.reviews}
                      badge={product.badge}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

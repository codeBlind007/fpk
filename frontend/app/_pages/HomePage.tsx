"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import PriceFilter from "@/components/PriceFilter";
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

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response: { products?: Product[] };

        if (searchQuery && searchQuery.trim()) {
          response = (await productsAPI.search(searchQuery)) as {
            products?: Product[];
          };
        } else if (selectedCategory) {
          response = (await productsAPI.filterByCategory(selectedCategory)) as {
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
  }, [searchQuery, selectedCategory]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [products]);

  // Filter products by price
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
  }, [products, minPrice, maxPrice]);

  return (
    <main className="grow bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Search results for &quot;{searchQuery}&quot;
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredProducts.length} products found
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar Filters (Hidden on small screens) */}
          <aside className="hidden lg:flex lg:flex-col gap-4 sm:gap-6">
            {categories.length > 0 && (
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            )}
            <PriceFilter
              minPrice={0}
              maxPrice={maxPriceLimit}
              selectedMin={minPrice}
              selectedMax={maxPrice}
              onMinChange={setMinPrice}
              onMaxChange={setMaxPrice}
            />
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
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
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
          </div>
        </div>
      </div>
    </main>
  );
}

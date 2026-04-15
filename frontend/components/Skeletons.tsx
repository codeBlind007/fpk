"use client";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
      <div className="bg-gray-200 aspect-square" />
      <div className="p-3 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 animate-pulse">
      <div className="w-20 h-20 bg-gray-200 rounded shrink-0" />
      <div className="grow space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-2 mt-2">
          <div className="h-8 w-8 bg-gray-200 rounded" />
          <div className="h-8 w-8 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function CheckoutSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-12 bg-gray-200 rounded mt-6" />
    </div>
  );
}

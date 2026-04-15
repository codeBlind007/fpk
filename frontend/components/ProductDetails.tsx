"use client";

interface ProductDetailsProps {
  description?: string;
  specifications?: Record<string, string>;
  stock: number;
  category?: string;
}

export default function ProductDetails({
  description,
  specifications,
  stock,
  category,
}: ProductDetailsProps) {
  const specificationEntries = Object.entries(specifications || {});

  return (
    <div className="space-y-6">
      {description && (
        <section>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            Product Description
          </h2>
          <p className="text-sm text-gray-700 leading-6">{description}</p>
        </section>
      )}

      <section>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          Highlights
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            {stock > 0
              ? `Ready to ship (${stock} in stock)`
              : "Currently unavailable"}
          </li>
          <li>Category: {category || "Electronics"}</li>
          <li>Cash on Delivery and easy returns available</li>
        </ul>
      </section>

      {specificationEntries.length > 0 && (
        <section>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Specifications
          </h2>
          <div className="rounded-md border border-gray-200 overflow-hidden">
            {specificationEntries.map(([key, value], index) => (
              <div
                key={key}
                className={`grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 p-3 text-sm ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <span className="font-medium text-gray-600">{key}</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

"use client";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3 text-sm">Category</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
            selectedCategory === null
              ? "bg-blue-100 text-blue-600 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
              selectedCategory === category
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  selectedMin: number;
  selectedMax: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

export default function PriceFilter({
  minPrice,
  maxPrice,
  selectedMin,
  selectedMax,
  onMinChange,
  onMaxChange,
}: PriceFilterProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3 text-sm">Price Range</h3>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Min Price</label>
          <input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={selectedMin}
            onChange={(e) => onMinChange(Number(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Max Price</label>
          <input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={selectedMax}
            onChange={(e) => onMaxChange(Number(e.target.value))}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div className="text-xs text-gray-600">
          ₹{selectedMin} - ₹{selectedMax}
        </div>
      </div>
    </div>
  );
}

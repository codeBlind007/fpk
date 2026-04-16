"use client";

interface PriceSummaryProps {
  itemCount?: number;
  subtotal: number;
  tax: number;
  shippingCharge: number;
}

export default function PriceSummary({
  itemCount,
  subtotal,
  tax,
  shippingCharge,
}: PriceSummaryProps) {
  const total = subtotal + tax + shippingCharge;
  const displayItemCount = itemCount ?? 1;

  return (
    <div className="space-y-3 text-sm">
      <h2 className="border-b border-gray-200 pb-3 text-xs font-semibold tracking-wide text-gray-500">
        PRICE DETAILS
      </h2>

      <div className="flex justify-between text-gray-700">
        <span>
          Price ({displayItemCount} item{displayItemCount > 1 ? "s" : ""})
        </span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-700">
        <span>Fees</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-700">
        <span>Delivery Charges</span>
        <span className="text-green-600 font-medium">
          {shippingCharge === 0 ? "FREE" : `₹${shippingCharge.toFixed(2)}`}
        </span>
      </div>

      <div className="border-t border-dashed border-gray-300 pt-3 mt-2 flex justify-between font-semibold text-gray-900">
        <span>Total Amount</span>
        <span className="text-lg">₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
}

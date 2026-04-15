"use client";

interface PriceSummaryProps {
  subtotal: number;
  tax: number;
  shippingCharge: number;
}

export default function PriceSummary({
  subtotal,
  tax,
  shippingCharge,
}: PriceSummaryProps) {
  const total = subtotal + tax + shippingCharge;

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
      <div className="flex justify-between text-gray-700">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span>Tax</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span>Shipping</span>
        <span className="text-green-600 font-medium">
          {shippingCharge === 0 ? "FREE" : `₹${shippingCharge.toFixed(2)}`}
        </span>
      </div>
      <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold text-gray-900">
        <span>Total</span>
        <span className="text-lg text-blue-600">₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
}

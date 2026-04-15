"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddressFormProps {
  data: {
    fullName: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function AddressForm({ data, onChange }: AddressFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="text-sm">
          Full Name
        </Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          placeholder="Enter your full name"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="phoneNumber" className="text-sm">
          Phone Number
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={data.phoneNumber}
          onChange={(e) => onChange("phoneNumber", e.target.value)}
          placeholder="Enter your phone number"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="address" className="text-sm">
          Address
        </Label>
        <Input
          id="address"
          value={data.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Enter your address"
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="text-sm">
            City
          </Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Enter city"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="state" className="text-sm">
            State
          </Label>
          <Input
            id="state"
            value={data.state}
            onChange={(e) => onChange("state", e.target.value)}
            placeholder="Enter state"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="postalCode" className="text-sm">
          Postal Code
        </Label>
        <Input
          id="postalCode"
          value={data.postalCode}
          onChange={(e) => onChange("postalCode", e.target.value)}
          placeholder="Enter postal code"
          className="mt-1"
        />
      </div>
    </div>
  );
}

export type ShippingMethodId = "standard" | "expedited";

export type ShippingMethod = {
  id: ShippingMethodId;
  label: string;
  priceCents: number;
  minDays: number;
  maxDays: number;
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: "standard", label: "Standard", priceCents: 799, minDays: 5, maxDays: 9 },
  { id: "expedited", label: "Expedited", priceCents: 1999, minDays: 2, maxDays: 4 },
];

export type ShippingAddress = {
  fullName: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export function emptyShippingAddress(): ShippingAddress {
  return {
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "US",
  };
}

export function validateShippingAddress(a: ShippingAddress): Record<string, string> {
  const e: Record<string, string> = {};
  if (!a.fullName.trim()) e.fullName = "Required";
  if (!a.line1.trim()) e.line1 = "Required";
  if (!a.city.trim()) e.city = "Required";
  if (!a.region.trim()) e.region = "Required";
  if (!a.postalCode.trim()) e.postalCode = "Required";
  if (!a.country.trim()) e.country = "Required";
  const zip = a.postalCode.trim();
  if (a.country === "US" && zip && !/^\d{5}(-\d{4})?$/.test(zip)) {
    e.postalCode = "Use 5 or 9 digit ZIP";
  }
  return e;
}

export function shippingWindowLabel(method: ShippingMethod): string {
  return `${method.minDays}–${method.maxDays} business days`;
}

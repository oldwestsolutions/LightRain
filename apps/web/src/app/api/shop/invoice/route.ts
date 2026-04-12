import { NextResponse } from "next/server";
import { SHOP_PRODUCTS } from "@/data/shopProducts";
import { SHIPPING_METHODS, type ShippingAddress, type ShippingMethodId } from "@/lib/shopShipping";

type LineIn = {
  productId: string;
  colorId: string;
  size: string;
  quantity: number;
};

type Body = {
  lines: LineIn[];
  shippingMethod: ShippingMethodId;
  shippingAddress: ShippingAddress;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
};

function validateBody(body: unknown): body is Body {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (!Array.isArray(b.lines)) return false;
  return typeof b.subtotalCents === "number" && typeof b.totalCents === "number";
}

/**
 * Creates a BTCPay invoice when BTCPAY_URL, BTCPAY_API_KEY, and BTCPAY_STORE_ID are set.
 * Otherwise returns a mock payload so the checkout UI can be exercised without a server.
 */
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!validateBody(json)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { lines, shippingMethod, shippingAddress, subtotalCents, shippingCents, totalCents } = json;

  if (lines.length === 0) {
    return NextResponse.json({ error: "Cart empty" }, { status: 400 });
  }

  const method = SHIPPING_METHODS.find((m) => m.id === shippingMethod);
  if (!method || method.priceCents !== shippingCents) {
    return NextResponse.json({ error: "Invalid shipping" }, { status: 400 });
  }

  let computed = 0;
  const resolved: { name: string; qty: number; cents: number }[] = [];
  for (const line of lines) {
    const p = SHOP_PRODUCTS.find((x) => x.id === line.productId);
    if (!p) return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    if (!p.colors.some((c) => c.id === line.colorId)) {
      return NextResponse.json({ error: "Invalid color" }, { status: 400 });
    }
    if (!p.sizes.includes(line.size)) {
      return NextResponse.json({ error: "Invalid size" }, { status: 400 });
    }
    if (p.availability === "sold_out") {
      return NextResponse.json({ error: `Sold out: ${p.name}` }, { status: 400 });
    }
    const qty = Math.max(1, Math.min(99, Math.round(line.quantity)));
    computed += p.priceCents * qty;
    resolved.push({ name: p.name, qty, cents: p.priceCents * qty });
  }

  if (computed !== subtotalCents || computed + shippingCents !== totalCents) {
    return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
  }

  const orderId = `LR-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const metadata = {
    orderId,
    shippingMethod,
    shippingCents,
    subtotalCents,
    totalCents,
    lines: resolved.map((r) => `${r.name} ×${r.qty}`).join("; "),
    shipTo: [
      shippingAddress.fullName,
      shippingAddress.line1,
      shippingAddress.line2,
      `${shippingAddress.city}, ${shippingAddress.region} ${shippingAddress.postalCode}`,
      shippingAddress.country,
    ]
      .filter(Boolean)
      .join(" | "),
  };

  const base = process.env.BTCPAY_URL?.replace(/\/$/, "");
  const apiKey = process.env.BTCPAY_API_KEY;
  const storeId = process.env.BTCPAY_STORE_ID;

  if (base && apiKey && storeId) {
    const amount = (totalCents / 100).toFixed(2);
    try {
      const origin = new URL(req.url).origin;
      const redirect = `${origin}/shop/order/confirm?orderId=${encodeURIComponent(orderId)}`;

      const res = await fetch(`${base}/api/v1/stores/${storeId}/invoices`, {
        method: "POST",
        headers: {
          Authorization: `token ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "USD",
          metadata,
          checkout: { redirectURL: redirect },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        return NextResponse.json(
          { error: "BTCPay error", detail: errText.slice(0, 500) },
          { status: 502 }
        );
      }

      const data = (await res.json()) as { id?: string; checkoutLink?: string };
      const checkoutUrl = data.checkoutLink ?? `${base}/invoice?id=${data.id}`;
      return NextResponse.json({ orderId, checkoutUrl, mock: false });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "BTCPay request failed";
      return NextResponse.json({ error: msg }, { status: 502 });
    }
  }

  return NextResponse.json({
    orderId,
    mock: true,
    checkoutUrl: null as string | null,
    message:
      "BTCPay is not configured. Set BTCPAY_URL, BTCPAY_API_KEY, and BTCPAY_STORE_ID for live invoices.",
    metadata,
  });
}

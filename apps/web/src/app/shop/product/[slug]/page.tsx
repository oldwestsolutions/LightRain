import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, SHOP_PRODUCTS } from "@/data/shopProducts";
import { getSiteOrigin, SITE_TAB_TITLE } from "@/lib/site";
import { ShopProductPage } from "@/views/ShopProductPage";

export function generateStaticParams() {
  return SHOP_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  const base = getSiteOrigin().replace(/\/$/, "");
  const url = `${base}/shop/product/${slug}`;
  return {
    description: p.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: SITE_TAB_TITLE,
      description: p.tagline,
      siteName: "LightRain",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TAB_TITLE,
      description: p.tagline,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ShopProductPage product={product} />;
}

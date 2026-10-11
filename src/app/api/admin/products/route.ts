import { NextResponse } from "next/server";
import { isSessionValid } from "@/lib/auth";
import { getAllProducts, saveProduct } from "@/lib/db";

export async function GET() {
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await getAllProducts();
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    if (!data.name || !data.category) {
      return NextResponse.json({ error: "Name and Category are required." }, { status: 400 });
    }

    // Auto-generate slug and sku if not provided
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const sku = data.sku || `BMJ-${Date.now().toString().slice(-6)}`;

    const saved = await saveProduct({
      id: data.id,
      name: String(data.name).trim(),
      slug,
      sku: String(sku).trim(),
      description: String(data.description || "").trim(),
      category: String(data.category),
      material: String(data.material || "Gold"),
      purity: data.purity ? String(data.purity) : null,
      approximateWeight: data.approximateWeight ? String(data.approximateWeight) : null,
      stoneType: data.stoneType ? String(data.stoneType) : null,
      dimensions: data.dimensions ? String(data.dimensions) : null,
      craftsmanship: data.craftsmanship ? String(data.craftsmanship) : null,
      collection: String(data.collection || "Traditional"),
      price: data.price !== null && data.price !== undefined && data.price !== "" ? Number(data.price) : null,
      currency: "NPR",
      showPrice: Boolean(data.showPrice),
      stockStatus: data.stockStatus || "Available",
      featured: Boolean(data.featured),
      isNewArrival: Boolean(data.isNewArrival),
      published: data.published !== undefined ? Boolean(data.published) : true,
      isDemo: Boolean(data.isDemo),
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : ["/images/hero_bridal.jpg"],
    });

    return NextResponse.json({ success: true, product: saved });
  } catch (error) {
    console.error("Save product error:", error);
    return NextResponse.json({ error: "Failed to save product." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isSessionValid } from "@/lib/auth";
import { deleteProduct, getProductById } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function DELETE(req: Request, { params }: RouteParams) {
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const product = await getProductById(id);
  const success = await deleteProduct(id);
  if (!success) {
    return NextResponse.json({ error: "Product not found or delete failed" }, { status: 404 });
  }

  try {
    revalidatePath("/");
    revalidatePath("/collections");
    if (product?.slug) {
      revalidatePath(`/products/${product.slug}`);
    }
  } catch (revalErr) {
    console.warn("Revalidation notice:", revalErr);
  }

  return NextResponse.json({ success: true, message: "Product deleted successfully." });
}

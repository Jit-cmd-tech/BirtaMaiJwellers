import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { getProductBySlug, getPublishedProducts } from "@/lib/db";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Birta Mai Jewellers",
    };
  }

  return {
    title: `${product.name} | Birta Mai Jewellers, Birgunj`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Birta Mai Jewellers`,
      description: product.description,
      images: [
        {
          url: product.images?.[0] || "/images/hero_bridal.jpg",
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allPublished = getPublishedProducts();
  const relatedProducts = allPublished
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}

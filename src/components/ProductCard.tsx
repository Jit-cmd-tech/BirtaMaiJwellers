import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/lib/db";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = getProductWhatsAppUrl({
    productName: product.name,
    sku: product.sku,
    price: product.price,
    currency: product.currency,
    approximateWeight: product.approximateWeight,
  });

  const mainImage = product.images?.[0] || "/images/hero_bridal.jpg";

  return (
    <div className="group bg-[#FFFFFF] border border-[#E4DBD0] rounded-sm overflow-hidden flex flex-col hover:shadow-xl hover:border-[#C6A66B]/60 transition-all duration-300">
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full bg-[#F8F5EE] overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.featured && (
            <span className="inline-flex items-center gap-1 bg-[#123B32] text-[#C6A66B] px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-xs shadow-sm">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#DCE5DC] text-[#123B32] border border-[#123B32]/20 px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Stock Status Pill */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`text-[10px] px-2 py-0.5 font-medium uppercase tracking-wider rounded-xs ${
              product.stockStatus === "Available"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : product.stockStatus === "Made to Order"
                ? "bg-amber-50 text-amber-900 border border-amber-200"
                : "bg-stone-100 text-stone-600 border border-stone-200"
            }`}
          >
            {product.stockStatus}
          </span>
        </div>

        {/* Demo Indicator if applicable */}
        {product.isDemo && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="bg-[#123B32]/85 text-[#F8F5EE] text-[9px] px-1.5 py-0.5 rounded-xs tracking-wider">
              Demonstration Piece
            </span>
          </div>
        )}
      </div>

      {/* Product Details Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-2">
          {/* Category & Purity */}
          <div className="flex items-center justify-between text-[11px] text-[#6A7066]">
            <span className="uppercase tracking-widest font-semibold text-[#123B32]">
              {product.category}
            </span>
            {product.purity && (
              <span className="bg-[#F8F5EE] px-1.5 py-0.5 text-[10px] text-[#252823] font-semibold border border-[#E4DBD0]">
                {product.purity}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg text-[#252823] group-hover:text-[#123B32] transition-colors leading-snug line-clamp-2">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* SKU & Spec */}
          <div className="flex items-center justify-between text-xs text-[#6A7066]">
            <span className="font-mono text-[11px]">SKU: {product.sku}</span>
            {product.approximateWeight && (
              <span className="text-[11px]">{product.approximateWeight}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 mt-3 border-t border-[#E4DBD0]/80 space-y-3">

          {/* Working CTAs */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center gap-1 bg-[#F8F5EE] hover:bg-[#F2ECE1] text-[#252823] border border-[#E4DBD0] py-2 text-xs font-semibold tracking-wider uppercase transition-colors rounded-xs"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6A66B]" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-[#C6A66B] hover:bg-[#B59458] text-[#123B32] py-2 text-xs font-bold tracking-wider uppercase transition-all rounded-xs shadow-xs"
              aria-label={`Enquire on WhatsApp about ${product.name}`}
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

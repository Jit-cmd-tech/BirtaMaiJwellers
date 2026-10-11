"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Share2,
  Check,
  MapPin,
} from "lucide-react";
import { Product } from "@/lib/db";
import { getProductWhatsAppUrl, DISPLAY_PHONE_NUMBER } from "@/lib/whatsapp";
import ProductCard from "@/components/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const images = product.images && product.images.length > 0
    ? product.images
    : ["/images/hero_bridal.jpg"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: "none", transformOrigin: "0% 0%" });

  const activeImage = images[activeImageIndex] || images[0];

  const whatsappUrl = getProductWhatsAppUrl({
    productName: product.name,
    sku: product.sku,
    price: product.price,
    currency: product.currency,
    approximateWeight: product.approximateWeight,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: "block",
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none", transformOrigin: "0% 0%" });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} | Birta Mai Jewellers`,
          text: `Check out ${product.name} at Birta Mai Jewellers, Birgunj`,
          url: window.location.href,
        });
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#F8F5EE] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6A7066] mb-8">
          <Link href="/" className="hover:text-[#123B32] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#E4DBD0]" />
          <Link href="/collections" className="hover:text-[#123B32] transition-colors">
            Collections
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#E4DBD0]" />
          <Link
            href={`/collections?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#123B32] transition-colors text-[#123B32] font-medium"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#E4DBD0]" />
          <span className="text-[#252823] font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-[#FFFFFF] p-6 sm:p-10 rounded-sm border border-[#E4DBD0] shadow-sm">
          {/* Left Column: Gallery & Interactive Zoom */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-y-auto max-h-[500px]">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xs overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-[#C6A66B] shadow-sm"
                        : "border-[#E4DBD0] hover:border-[#C6A66B]/50"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Interactive Zoom Image */}
            <div
              className="relative flex-1 aspect-square bg-[#F8F5EE] rounded-xs overflow-hidden border border-[#E4DBD0] cursor-crosshair group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />

              {/* Magnifier Lens Effect (Desktop) */}
              <div
                className="hidden lg:block absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  ...zoomStyle,
                  backgroundImage: `url(${activeImage})`,
                  backgroundSize: "220%",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* Mobile Zoom Notice */}
              <div className="lg:hidden absolute bottom-2 right-2 bg-[#123B32]/85 text-[#F8F5EE] text-[10px] px-2 py-1 rounded-xs">
                Pinch to zoom
              </div>

              {product.isDemo && (
                <div className="absolute top-3 left-3 bg-[#123B32]/85 text-[#F8F5EE] text-[10px] px-2.5 py-1 rounded-xs uppercase tracking-wider font-medium">
                  Demonstration Showcase Piece
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details, Specifications & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category, SKU & Stock Status */}
              <div className="flex items-center justify-between text-xs text-[#6A7066]">
                <span className="uppercase tracking-widest font-semibold text-[#123B32]">
                  {product.category} • {product.collection}
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-xs ${
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

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-4xl text-[#252823] font-normal leading-tight">
                {product.name}
              </h1>

              {/* SKU & Share */}
              <div className="flex items-center justify-between text-xs text-[#6A7066] pt-1">
                <span className="font-mono">SKU: {product.sku}</span>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs text-[#6A7066] hover:text-[#123B32] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Piece</span>
                    </>
                  )}
                </button>
              </div>



              {/* Description */}
              <div className="text-sm text-[#6A7066] leading-relaxed pt-2">
                {product.description}
              </div>

              {/* Verified Product Specifications Table */}
              <div className="pt-4 border-t border-[#E4DBD0]">
                <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#123B32] mb-3">
                  Craftsmanship Specifications
                </h3>
                <dl className="grid grid-cols-1 gap-y-2.5 text-xs">
                  {product.material && (
                    <div className="grid grid-cols-2 py-1 border-b border-[#E4DBD0]/60">
                      <dt className="text-[#6A7066]">Material</dt>
                      <dd className="font-medium text-[#252823]">{product.material}</dd>
                    </div>
                  )}
                  {product.purity && (
                    <div className="grid grid-cols-2 py-1 border-b border-[#E4DBD0]/60">
                      <dt className="text-[#6A7066]">Verified Purity</dt>
                      <dd className="font-medium text-[#252823]">{product.purity}</dd>
                    </div>
                  )}
                  {product.approximateWeight && (
                    <div className="grid grid-cols-2 py-1 border-b border-[#E4DBD0]/60">
                      <dt className="text-[#6A7066]">Approximate Weight</dt>
                      <dd className="font-medium text-[#252823]">{product.approximateWeight}</dd>
                    </div>
                  )}
                  {product.stoneType && (
                    <div className="grid grid-cols-2 py-1 border-b border-[#E4DBD0]/60">
                      <dt className="text-[#6A7066]">Stone Specification</dt>
                      <dd className="font-medium text-[#252823]">{product.stoneType}</dd>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="grid grid-cols-2 py-1 border-b border-[#E4DBD0]/60">
                      <dt className="text-[#6A7066]">Dimensions / Length</dt>
                      <dd className="font-medium text-[#252823]">{product.dimensions}</dd>
                    </div>
                  )}
                  {product.craftsmanship && (
                    <div className="grid grid-cols-2 py-1 border-b border-[#E4DBD0]/60">
                      <dt className="text-[#6A7066]">Artisanal Detailing</dt>
                      <dd className="font-medium text-[#252823]">{product.craftsmanship}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* Inquiries & CTAs */}
            <div className="pt-6 border-t border-[#E4DBD0] space-y-3">
              {/* WhatsApp Inquiry Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-[#C6A66B] hover:bg-[#B59458] text-[#123B32] py-4 px-6 rounded-sm text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label={`Enquire on WhatsApp about ${product.name}`}
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>

              {/* Direct Store Call Button */}
              <a
                href={`tel:${DISPLAY_PHONE_NUMBER.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#F8F5EE] hover:bg-[#F2ECE1] text-[#252823] border border-[#E4DBD0] py-3 px-6 rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C6A66B]" />
                <span>Call Store ({DISPLAY_PHONE_NUMBER})</span>
              </a>

              {/* Atelier Visit Location Notice */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-[#6A7066]">
                <MapPin className="w-3.5 h-3.5 text-[#C6A66B]" />
                <span>Available for inspection at Birta Mai Mandir, Birgunj</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assurance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
          <div className="bg-[#FFFFFF] p-5 border border-[#E4DBD0] rounded-sm flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-[#C6A66B] shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#252823]">
                Purity Guaranteed
              </h4>
              <p className="text-[11px] text-[#6A7066] mt-0.5">
                Every piece is accompanied by verified karatage hallmark inspection.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 border border-[#E4DBD0] rounded-sm flex items-center gap-4">
            <Sparkles className="w-8 h-8 text-[#C6A66B] shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#252823]">
                Custom Sizing & Orders
              </h4>
              <p className="text-[11px] text-[#6A7066] mt-0.5">
                Bespoke sizing, chain adjustments, and custom bridal set commissions.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-5 border border-[#E4DBD0] rounded-sm flex items-center gap-4">
            <MessageCircle className="w-8 h-8 text-[#25D366] shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#252823]">
                Instant WhatsApp Concierge
              </h4>
              <p className="text-[11px] text-[#6A7066] mt-0.5">
                Real-time video viewing and personalized price quotes on WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#E4DBD0]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[#C6A66B] text-xs uppercase tracking-[0.2em] font-semibold">
                  Complete the Look
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#252823] font-normal mt-1">
                  Complementary Creations
                </h2>
              </div>
              <Link
                href="/collections"
                className="text-xs uppercase tracking-wider text-[#123B32] hover:text-[#C6A66B] font-semibold"
              >
                View Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

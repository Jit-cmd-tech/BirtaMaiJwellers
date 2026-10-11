import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function HeroSection() {
  const whatsappUrl = getGeneralWhatsAppUrl(
    "Hello Birta Mai Jewellers, I would like to enquire about your jewelry collection and visit your store at Bidhya Mandir, Birgunj."
  );

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center bg-[#123B32] overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bridal.jpg"
          alt="Birta Mai Jewellers Fine Gold and Bridal Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-102 transition-transform duration-1000 ease-out"
        />
        {/* Deep Emerald Luxury Editorial Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#123B32]/95 via-[#123B32]/80 to-[#123B32]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2A24] via-transparent to-[#123B32]/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Subtle Heritage Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0D2A24]/90 border border-[#C6A66B]/60 rounded-xs backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#C6A66B] font-medium">
              Bidhya Mandir • Birgunj, Nepal
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F8F5EE] font-normal leading-[1.08] tracking-tight">
            Timeless Elegance. <br />
            <span className="italic text-[#C6A66B]">A Legacy of Beauty.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-[#F8F5EE]/90 leading-relaxed font-light max-w-xl">
            Discover jewelry crafted to celebrate your most meaningful moments. Fine 24K and 22K gold, certified diamonds, and heritage silver in the heart of Birgunj.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2.5 bg-[#C6A66B] hover:bg-[#B59458] text-[#123B32] px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-sm shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-[#C6A66B]/50 hover:border-[#C6A66B] bg-[#0D2A24]/70 hover:bg-[#0D2A24] text-[#F8F5EE] px-7 py-4 text-xs font-medium tracking-widest uppercase transition-all duration-300 rounded-sm backdrop-blur-sm"
              aria-label="Enquire on WhatsApp with Birta Mai Jewellers"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>

          {/* Quick Assurance Badges */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#F8F5EE]/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C6A66B]" />
              <span>Verified Gold Purity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]" />
              <span>Direct WhatsApp Concierge</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]" />
              <span>Bespoke Bridal Crafting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

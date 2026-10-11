import Link from "next/link";
import { Gem, ArrowLeft, MessageCircle } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function NotFound() {
  const whatsappUrl = getGeneralWhatsAppUrl(
    "Hello Birta Mai Jewellers, I was searching for an item on your website and could not locate it. Could you assist me?"
  );

  return (
    <div className="min-h-[70vh] bg-[#FAF7F0] flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-[#FFFFFF] p-8 sm:p-12 border border-[#E7DFD0] rounded-sm text-center shadow-sm space-y-6">
        <div className="w-14 h-14 rounded-full border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37] bg-[#111111]">
          <Gem className="w-7 h-7" />
        </div>

        <span className="text-[#AA820A] text-xs uppercase tracking-[0.25em] font-semibold block">
          404 — Page Not Found
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal">
          A Treasured Path Not Found
        </h1>

        <p className="text-xs text-[#77736B] leading-relaxed">
          The piece or page you are seeking may have been moved, updated, or temporarily archived.
        </p>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c49f2b] text-[#111111] py-3 px-6 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Explore Our Collections</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[#E7DFD0] hover:border-[#D4AF37] text-[#171717] py-3 px-6 text-xs font-medium uppercase tracking-wider rounded-xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-current" />
            <span>Ask Concierge on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

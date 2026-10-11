"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const defaultMessage =
    "Hello Birta Mai Jewellers, I would like to enquire about your jewelry collection and pricing at Birta Mai Mandir, Birgunj.";
  const href = getGeneralWhatsAppUrl(defaultMessage);

  return (
    <aside aria-label="Customer support widget" className="fixed bottom-6 right-6 z-50 group">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Birta Mai Jewellers on WhatsApp"
        className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      >
        <MessageCircle className="w-6 h-6 fill-current shrink-0" />
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wider uppercase text-white font-sans pr-1">
          WhatsApp Us
        </span>
      </a>
      {/* Tooltip on hover */}
      <div className="hidden group-hover:block absolute right-0 bottom-full mb-2 pointer-events-none w-56 p-2 bg-[#171717] text-[#FAF7F0] text-[11px] rounded shadow-lg border border-[#2a2825] text-center">
        Direct chat with Birta Mai Jewellers, Birgunj
      </div>
    </aside>
  );
}

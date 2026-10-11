import Link from "next/link";
import { Gem, MapPin, Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { getGeneralWhatsAppUrl, DISPLAY_PHONE_NUMBER } from "@/lib/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D2A24] text-[#F8F5EE] border-t border-[#123B32] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Consultation CTA Banner */}
        <div className="bg-[#123B32] border border-[#1A4E42] p-8 sm:p-12 mb-16 rounded-sm text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A66B]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-[#C6A66B] text-xs uppercase tracking-[0.25em] font-medium">
              Bespoke Bridal & Heirloom Jewellery
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F8F5EE] font-normal leading-tight">
              Begin Your Bespoke Journey in Birgunj
            </h2>
            <p className="text-sm text-[#F8F5EE]/80 leading-relaxed">
              Whether you are selecting a wedding bridal set or customizing a family heirloom, our
              consultants are honored to welcome you at our atelier.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getGeneralWhatsAppUrl(
                  "Hello Birta Mai Jewellers, I would like to book a private consultation at Birta Mai Mandir, Birgunj."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Schedule Consultation
              </a>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 border border-[#C6A66B]/50 hover:border-[#C6A66B] text-[#F8F5EE] px-6 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-sm"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#123B32]">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#C6A66B] flex items-center justify-center">
                <Gem className="w-4 h-4 text-[#C6A66B]" />
              </div>
              <span className="font-serif text-xl tracking-[0.15em] uppercase text-[#F8F5EE]">
                Birta Mai Jewellers
              </span>
            </div>
            <p className="text-xs text-[#F8F5EE]/75 leading-relaxed">
              Curators of fine gold, certified diamonds, and sterling silver artifacts in Birta Mai Mandir, Birgunj. Handcrafted to celebrate life&apos;s most meaningful moments.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C6A66B]">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Purity & Transparent Sourcing</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-[#C6A66B]">
              Collections
            </h3>
            <ul className="space-y-2.5 text-xs text-[#F8F5EE]/75">
              <li>
                <Link href="/collections?filter=bridal" className="hover:text-[#C6A66B] transition-colors">
                  Bridal Jewelry Sets
                </Link>
              </li>
              <li>
                <Link href="/collections?filter=new-arrivals" className="hover:text-[#C6A66B] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections?category=Gold+Necklaces" className="hover:text-[#C6A66B] transition-colors">
                  24K & 22K Gold Necklaces
                </Link>
              </li>
              <li>
                <Link href="/collections?category=Bangles+%26+Bracelets" className="hover:text-[#C6A66B] transition-colors">
                  Bangles & Kadas
                </Link>
              </li>
              <li>
                <Link href="/collections?category=Rings" className="hover:text-[#C6A66B] transition-colors">
                  Solitaire & Gold Rings
                </Link>
              </li>
              <li>
                <Link href="/collections?category=Silver+Jewelry+%26+Artifacts" className="hover:text-[#C6A66B] transition-colors">
                  Silver Puja & Heirloom Artifacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-[#C6A66B]">
              Client Services
            </h3>
            <ul className="space-y-2.5 text-xs text-[#F8F5EE]/75">
              <li>
                <Link href="/about" className="hover:text-[#C6A66B] transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C6A66B] transition-colors">
                  Atelier Appointments
                </Link>
              </li>
              <li>
                <a
                  href={getGeneralWhatsAppUrl("Hello Birta Mai Jewellers, I would like to inquire about custom jewelry designing.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C6A66B] transition-colors"
                >
                  Custom Jewelry Commission
                </a>
              </li>
              <li>
                <Link href="/contact#map" className="hover:text-[#C6A66B] transition-colors">
                  Store Directions
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#C6A66B] transition-colors">
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm uppercase tracking-[0.15em] text-[#C6A66B]">
              Atelier Location
            </h3>
            <div className="space-y-3 text-xs text-[#F8F5EE]/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                <span>Birta Mai Mandir, Birgunj, Nepal</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A66B] shrink-0" />
                <a href={`tel:${DISPLAY_PHONE_NUMBER.replace(/\s+/g, '')}`} className="hover:text-[#C6A66B]">
                  {DISPLAY_PHONE_NUMBER}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C6A66B] text-[#F8F5EE] font-medium"
                >
                  WhatsApp: +977 9845033095
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#F8F5EE]/60">
                Sun – Fri: 10:00 AM – 7:30 PM (Saturday by appointment)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EE]/60">
          <div>
            © {currentYear} Birta Mai Jewellers. All rights reserved. Birta Mai Mandir, Birgunj, Nepal.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#C6A66B] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#C6A66B] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

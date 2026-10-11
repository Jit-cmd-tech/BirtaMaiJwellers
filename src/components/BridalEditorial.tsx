import Link from "next/link";
import Image from "next/image";
import { Sparkles, MessageCircle } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function BridalEditorial() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0D2A24] text-[#F8F5EE] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image
          src="/images/hero_bridal.jpg"
          alt="Bridal Gold Heirloom Background"
          fill
          className="object-cover object-center filter blur-xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Text */}
        <div className="lg:col-span-6 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 text-[#C6A66B] text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Vivaha Bridal Edit</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F8F5EE] font-normal leading-[1.15]">
            Handcrafted for the Moment You Say Forever.
          </h2>

          <p className="text-sm sm:text-base text-[#F8F5EE]/85 leading-relaxed font-light">
            Every bride is a queen on her wedding day. Our bridal creations unite traditional 22K gold chokers, uncut Polki stones, cascading jhumkas, and royal Rani Haars designed to harmoniously complement your wedding lehenga and bridal traditions in Birgunj.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/collections?filter=bridal"
              className="w-full sm:w-auto text-center bg-[#C6A66B] hover:bg-[#B59458] text-[#123B32] px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-sm shadow-xl"
            >
              Discover the Bridal Collection
            </Link>

            <a
              href={getGeneralWhatsAppUrl(
                "Hello Birta Mai Jewellers, I would like to enquire about your Bridal Vivaha Collection and booking a private trial."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#C6A66B]/50 hover:border-[#C6A66B] text-[#F8F5EE] px-6 py-4 text-xs font-medium tracking-widest uppercase transition-all duration-300 rounded-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Book Bridal Trial via WhatsApp
            </a>
          </div>
        </div>

        {/* Right Photographic Layout */}
        <div className="lg:col-span-6 relative">
          <div className="relative h-[450px] sm:h-[550px] w-full rounded-sm overflow-hidden border border-[#C6A66B]/40 shadow-2xl">
            <Image
              src="/images/bridal_editorial.jpg"
              alt="Bridal jewelry editorial showcase"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2A24]/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-center sm:text-left">
              <span className="text-[#C6A66B] text-[10px] tracking-[0.2em] uppercase font-semibold">
                Heritage Bridal Masterpiece
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F8F5EE] font-normal">
                Royal Vivaha Choker & Jhumka Suite
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

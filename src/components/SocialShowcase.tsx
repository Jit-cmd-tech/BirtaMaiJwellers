import Image from "next/image";
import { MessageCircle, ExternalLink } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

interface SocialShowcaseProps {
  instagramUrl?: string;
  facebookUrl?: string;
}

export default function SocialShowcase({
  instagramUrl = "",
  facebookUrl = "",
}: SocialShowcaseProps) {
  const gallery = [
    { src: "/images/hero_bridal.jpg", title: "Royal Bridal Suite" },
    { src: "/images/cat_bridal.jpg", title: "Kundan Choker Detail" },
    { src: "/images/cat_bangles.jpg", title: "22K Peacock Kadas" },
    { src: "/images/cat_rings.jpg", title: "Solitaire Diamonds" },
    { src: "/images/cat_earrings.jpg", title: "Pearl Jhumkas" },
    { src: "/images/cat_silver.jpg", title: "Sacred Silver Urn" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D2A24] text-[#F8F5EE] border-t border-[#123B32]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[#C6A66B] text-xs uppercase tracking-[0.25em] font-semibold">
              The Birta Mai Gallery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F5EE] font-normal mt-2">
              Moments of Precious Elegance
            </h2>
            <p className="text-xs text-[#F8F5EE]/70 mt-2">
              A glimpse into our ateliers, bridal suites, and master craftsmanship.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#C6A66B]/40 hover:border-[#C6A66B] text-[#F8F5EE] px-4 py-2 text-xs uppercase tracking-wider rounded-sm transition-colors"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C6A66B]" />
              </a>
            ) : null}
            {facebookUrl ? (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#C6A66B]/40 hover:border-[#C6A66B] text-[#F8F5EE] px-4 py-2 text-xs uppercase tracking-wider rounded-sm transition-colors"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C6A66B]" />
              </a>
            ) : null}
            <a
              href={getGeneralWhatsAppUrl("Hello Birta Mai Jewellers, I would like to see your latest new arrivals catalog.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Get Catalog on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Visual Showcase Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {gallery.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-sm overflow-hidden border border-[#1A4E42]"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0D2A24]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                <span className="text-[10px] uppercase font-semibold text-[#F8F5EE] tracking-wider">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

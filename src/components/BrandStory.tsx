import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface BrandStoryProps {
  customStory?: string;
}

export default function BrandStory({ customStory }: BrandStoryProps) {
  const defaultStory =
    "At Birta Mai Jewellers, located at Birta Mai Mandir in Birgunj, Nepal, we believe jewelry is far more than adornment—it is a sacred vessel of blessings, love, and memories passed down through generations. Whether you are welcoming a bride into your home, celebrating a festive milestone, or selecting an everyday talisman, our artisans craft each gold, diamond, and silver creation with unmatched reverence, transparent bullion purity, and attentive personal service.";

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F5EE] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase */}
          <div className="relative">
            <div className="relative h-[420px] sm:h-[520px] rounded-sm overflow-hidden border border-[#E4DBD0] shadow-xl">
              <Image
                src="/images/craftsmanship.jpg"
                alt="Jewelry artisan craftsmanship at Birta Mai Jewellers"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2A24]/70 via-transparent to-transparent" />
            </div>

            {/* Overlaid Decorative Badge */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-[#123B32] text-[#F8F5EE] p-6 border border-[#C6A66B]/50 shadow-2xl rounded-sm max-w-xs">
              <span className="text-[#C6A66B] text-xs font-semibold uppercase tracking-[0.2em] block mb-1">
                Atelier Excellence
              </span>
              <p className="font-serif text-sm italic text-[#F8F5EE]/95">
                “Every contour shaped by hand, every stone selected with devotion.”
              </p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-[#C6A66B] text-xs uppercase tracking-[0.25em] font-semibold">
                Our Philosophy
              </span>
              <div className="w-12 h-0.5 bg-[#C6A66B] mt-1" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#252823] font-normal leading-tight">
              Jewelry That Becomes Part of Your Story.
            </h2>

            <p className="text-sm sm:text-base text-[#6A7066] leading-relaxed">
              {customStory || defaultStory}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E4DBD0]">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#123B32] block">
                  Birta Mai Mandir
                </span>
                <span className="text-xs text-[#6A7066] uppercase tracking-wider">
                  Birgunj Flagship Location
                </span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#123B32] block">
                  Bespoke
                </span>
                <span className="text-xs text-[#6A7066] uppercase tracking-wider">
                  Custom Bridal Artisanship
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#123B32] hover:bg-[#0D2A24] text-[#F8F5EE] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all rounded-sm shadow-md"
              >
                <span>Read Full Brand Story</span>
                <ArrowRight className="w-4 h-4 text-[#C6A66B]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

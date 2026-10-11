import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedCategories() {
  const categories = [
    {
      title: "Bridal Jewelry",
      subtitle: "Royal choker sets, maang tikkas & heirlooms",
      image: "/images/cat_bridal.jpg",
      href: "/collections?filter=bridal",
    },
    {
      title: "Gold Necklaces",
      subtitle: "24K & 22K Rani Haars, collar necklaces & chains",
      image: "/images/cat_necklace.jpg",
      href: "/collections?category=Gold+Necklaces",
    },
    {
      title: "Bangles & Bracelets",
      subtitle: "Handcrafted peacock kadas, churis & wristwear",
      image: "/images/cat_bangles.jpg",
      href: "/collections?category=Bangles+%26+Bracelets",
    },
    {
      title: "Rings",
      subtitle: "Solitaire engagement rings & 22K gold bands",
      image: "/images/cat_rings.jpg",
      href: "/collections?category=Rings",
    },
    {
      title: "Earrings",
      subtitle: "Cascading bridal jhumkas, chandbalis & studs",
      image: "/images/cat_earrings.jpg",
      href: "/collections?category=Earrings",
    },
    {
      title: "Silver Jewelry & Artifacts",
      subtitle: "Sacred kalash urns, puja thalis & sterling silver",
      image: "/images/cat_silver.jpg",
      href: "/collections?category=Silver+Jewelry+%26+Artifacts",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#C6A66B] text-xs uppercase tracking-[0.25em] font-semibold">
            Signature Curation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#252823] font-normal mt-2">
            Explore by Category
          </h2>
          <div className="w-16 h-0.5 bg-[#C6A66B] mx-auto mt-4" />
          <p className="text-sm text-[#6A7066] mt-4">
            From imperial wedding sets to delicate daily essentials, discover handcrafted beauty tailored to every Nepalese celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative h-[380px] sm:h-[420px] rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 border border-[#E4DBD0]"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim in Deep Emerald */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2A24]/95 via-[#123B32]/35 to-transparent group-hover:from-[#0D2A24] transition-all duration-300" />

              {/* Text & Action */}
              <div className="relative z-10 space-y-1 transform group-hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#F8F5EE] font-normal group-hover:text-[#C6A66B] transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-[#C6A66B]/60 flex items-center justify-center text-[#C6A66B] group-hover:bg-[#C6A66B] group-hover:text-[#123B32] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-[#F8F5EE]/80 font-light">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

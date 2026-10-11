import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import PreciousMetalRates from "@/components/PreciousMetalRates";
import FeaturedCategories from "@/components/FeaturedCategories";
import ProductCard from "@/components/ProductCard";
import BrandStory from "@/components/BrandStory";
import TrustAndService from "@/components/TrustAndService";
import BridalEditorial from "@/components/BridalEditorial";
import TestimonialsSection from "@/components/TestimonialsSection";
import SocialShowcase from "@/components/SocialShowcase";
import { getPublishedProducts, getRates, getSettings } from "@/lib/db";

export default async function HomePage() {
  const products = await getPublishedProducts();
  const rates = await getRates();
  const settings = await getSettings();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="bg-[#F8F5EE]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Precious Metal Rates */}
      <PreciousMetalRates initialRates={rates} />

      {/* 3. Featured Categories */}
      <FeaturedCategories />

      {/* 4. Curated Featured Products */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F5EE] border-t border-[#E4DBD0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 text-[#C6A66B] text-xs uppercase tracking-[0.25em] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handpicked Treasures</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#252823] font-normal mt-2">
                Featured Creations
              </h2>
              <p className="text-sm text-[#6A7066] mt-2 max-w-xl">
                Mastercrafted 24K and 22K gold, solitaire diamonds, and authentic silver masterpieces available at our Birgunj showroom.
              </p>
            </div>

            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#123B32] hover:text-[#C6A66B] transition-colors group"
            >
              <span>View All Collections</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C6A66B]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-[#123B32] hover:bg-[#0D2A24] text-[#F8F5EE] px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all rounded-sm shadow-md"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4 text-[#C6A66B]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Brand Story */}
      <BrandStory customStory={settings.brandStory} />

      {/* 6. Trust & Service Pillars */}
      <TrustAndService />

      {/* 7. Bridal Editorial */}
      <BridalEditorial />

      {/* 8. Editorial Testimonials */}
      <TestimonialsSection />

      {/* 9. Social Gallery Showcase */}
      <SocialShowcase
        instagramUrl={settings.instagramUrl}
        facebookUrl={settings.facebookUrl}
      />
    </div>
  );
}

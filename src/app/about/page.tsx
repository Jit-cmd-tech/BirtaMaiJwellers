import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  MessageCircle,
  Phone,
  Scale,
} from "lucide-react";
import { getSettings } from "@/lib/db";
import { getGeneralWhatsAppUrl, DISPLAY_PHONE_NUMBER } from "@/lib/whatsapp";

export const metadata = {
  title: "About Us | Birta Mai Jewellers, Birgunj, Nepal",
  description:
    "Learn about Birta Mai Jewellers, located at Bidhya Mandir, Birgunj. Discover our devotion to transparent bullion pricing, bespoke bridal artistry, and personalized heirloom service.",
};

export default function AboutPage() {
  const settings = getSettings();
  const whatsappUrl = getGeneralWhatsAppUrl(
    "Hello Birta Mai Jewellers, I would like to know more about your bespoke jewelry crafting services."
  );

  return (
    <div className="bg-[#F8F5EE] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C6A66B] text-xs uppercase tracking-[0.25em] font-semibold">
            The Atelier Story
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#252823] font-normal mt-2 leading-tight">
            Craftsmanship, Trust & Devotion
          </h1>
          <div className="w-16 h-0.5 bg-[#C6A66B] mx-auto mt-4" />
          <p className="text-base text-[#6A7066] mt-4 leading-relaxed">
            Welcome to Birta Mai Jewellers, an authentic jewelry sanctuary nestled in Bidhya Mandir, Birgunj, Nepal.
          </p>
        </div>

        {/* Hero Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-[#FFFFFF] p-8 sm:p-14 rounded-sm border border-[#E4DBD0] shadow-sm">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#C6A66B] text-xs uppercase tracking-[0.2em] font-semibold block">
              Flagship at Bidhya Mandir
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#252823] font-normal leading-snug">
              Jewelry Handcrafted for Your Sacred Milestones
            </h2>
            <div className="space-y-4 text-sm text-[#6A7066] leading-relaxed">
              <p>
                {settings.brandStory}
              </p>
              <p>
                Our philosophy is centered on honest relationships. Whether a family visits us for a grand daughter&apos;s wedding bridal ensemble, or a solitary keepsake to commemorate an accomplishment, we greet every patron with warmth, patience, and uncompromising craftsmanship.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#252823]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C6A66B]" />
                <span className="font-medium">Bidhya Mandir, Birgunj</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C6A66B]" />
                <span className="font-medium">Transparent Sourcing</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] sm:h-[480px] rounded-sm overflow-hidden border border-[#E4DBD0] shadow-lg">
              <Image
                src="/images/craftsmanship.jpg"
                alt="Jewelry artisan at Birta Mai Jewellers workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2A24]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <span className="text-[#C6A66B] text-[10px] uppercase tracking-widest font-semibold block">
                  Artisan Atelier
                </span>
                <span className="font-serif text-lg font-normal">
                  Metals shaped by dedication and heritage techniques
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[#C6A66B] text-xs uppercase tracking-[0.2em] font-semibold">
              Our Core Principles
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#252823] font-normal mt-1">
              The Standard of Integrity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFFFF] p-8 border border-[#E4DBD0] rounded-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F8F5EE] border border-[#C6A66B] flex items-center justify-center">
                <Scale className="w-5 h-5 text-[#C6A66B]" />
              </div>
              <h3 className="font-serif text-xl text-[#252823]">
                Purity & Honest Pricing
              </h3>
              <p className="text-xs text-[#6A7066] leading-relaxed">
                We believe in total clarity. When you purchase 24K or 22K gold, our exact weight testing and live market bullion benchmark ensures you know the precise value of your investment.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-8 border border-[#E4DBD0] rounded-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F8F5EE] border border-[#C6A66B] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#C6A66B]" />
              </div>
              <h3 className="font-serif text-xl text-[#252823]">
                Master Goldsmith Artistry
              </h3>
              <p className="text-xs text-[#6A7066] leading-relaxed">
                From traditional Nepalese peacock repoussé to delicate Italian chains and custom diamond solitaire settings, our artisans balance traditional patience with contemporary finesse.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-8 border border-[#E4DBD0] rounded-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F8F5EE] border border-[#C6A66B] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-[#C6A66B]" />
              </div>
              <h3 className="font-serif text-xl text-[#252823]">
                Attentive Guidance
              </h3>
              <p className="text-xs text-[#6A7066] leading-relaxed">
                Selecting bridal jewelry is an intimate journey. We provide dedicated private viewing sessions, bridal styling consultations, and custom CAD modeling for bespoke pieces.
              </p>
            </div>
          </div>
        </div>

        {/* Visit & Contact Callout */}
        <div className="bg-[#123B32] text-[#F8F5EE] p-10 sm:p-14 rounded-sm border border-[#0D2A24] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-[#C6A66B] text-xs uppercase tracking-[0.2em] font-semibold">
              Visit Us in Birgunj
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal">
              Experience the Craftsmanship in Person
            </h2>
            <p className="text-xs text-[#F8F5EE]/85 leading-relaxed">
              Our showroom is conveniently situated at Bidhya Mandir, Birgunj. We welcome walk-in visitors and scheduled appointments Sunday through Friday.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 text-xs font-semibold tracking-wider uppercase rounded-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Concierge</span>
            </a>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#C6A66B]/50 hover:border-[#C6A66B] text-[#F8F5EE] px-6 py-3.5 text-xs font-medium tracking-wider uppercase rounded-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C6A66B]" />
              <span>Contact & Directions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

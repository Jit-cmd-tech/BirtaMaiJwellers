"use client";

import { useState } from "react";
import { Coins, RefreshCw, MessageCircle, AlertCircle } from "lucide-react";
import { MetalRates } from "@/lib/db";
import { getRatesWhatsAppUrl } from "@/lib/whatsapp";

interface PreciousMetalRatesProps {
  initialRates: MetalRates;
}

export default function PreciousMetalRates({ initialRates }: PreciousMetalRatesProps) {
  const [rates] = useState<MetalRates>(initialRates);

  const formattedDate = rates?.lastUpdated
    ? new Date(rates.lastUpdated).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <section className="bg-[#0D2A24] border-y border-[#123B32] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#C6A66B] text-xs font-semibold tracking-[0.2em] uppercase mb-1">
              <Coins className="w-4 h-4" />
              <span>Precious Metal Rates</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F8F5EE] font-normal">
              Today&apos;s Bullion Benchmark
            </h2>
            <p className="text-xs text-[#F8F5EE]/70 mt-1">
              Indicative bullion market rates in Birgunj (Nepalese Rupees • NPR). Subject to daily market opening.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#F8F5EE]/80">
            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#C6A66B]" />
                Updated: {formattedDate}
              </span>
            )}
            <span className="hidden sm:inline text-[#C6A66B]/40">|</span>
            <a
              href={getRatesWhatsAppUrl("Bullion & Making Charges")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#C6A66B] hover:underline font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              Confirm via WhatsApp
            </a>
          </div>
        </div>

        {/* Rate Cards Grid */}
        {!rates?.isAvailable ? (
          <div className="p-6 bg-[#123B32] border border-[#1A4E42] rounded-sm text-center">
            <AlertCircle className="w-6 h-6 text-[#C6A66B] mx-auto mb-2" />
            <p className="text-sm text-[#F8F5EE] font-medium">Rates currently unavailable</p>
            <p className="text-xs text-[#F8F5EE]/70 mt-1">
              Contact our Birgunj store for today&apos;s official bullion opening rate.
            </p>
            <a
              href={getRatesWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#C6A66B] font-semibold underline"
            >
              Contact us for today&apos;s rates →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Fine Gold Per Tola */}
            <div className="bg-[#123B32] p-4 sm:p-5 rounded-sm border border-[#1A4E42] hover:border-[#C6A66B]/50 transition-colors">
              <span className="text-[11px] tracking-wider uppercase text-[#C6A66B] font-medium block">
                Fine Gold (24K)
              </span>
              <span className="text-xs text-[#F8F5EE]/70 block">Per Tola (11.664 g)</span>
              <div className="mt-2 font-serif text-lg sm:text-2xl text-[#F8F5EE] font-bold">
                NPR {rates.goldFinePerTola.toLocaleString("en-NP")}
              </div>
            </div>

            {/* Fine Gold Per 10 Grams */}
            <div className="bg-[#123B32] p-4 sm:p-5 rounded-sm border border-[#1A4E42] hover:border-[#C6A66B]/50 transition-colors">
              <span className="text-[11px] tracking-wider uppercase text-[#C6A66B] font-medium block">
                Fine Gold (24K)
              </span>
              <span className="text-xs text-[#F8F5EE]/70 block">Per 10 Grams</span>
              <div className="mt-2 font-serif text-lg sm:text-2xl text-[#F8F5EE] font-bold">
                NPR {rates.goldFinePer10g.toLocaleString("en-NP")}
              </div>
            </div>

            {/* Silver Per Tola */}
            <div className="bg-[#123B32] p-4 sm:p-5 rounded-sm border border-[#1A4E42] hover:border-[#C6A66B]/50 transition-colors">
              <span className="text-[11px] tracking-wider uppercase text-[#F8F5EE]/90 font-medium block">
                Pure Silver (Tejabi)
              </span>
              <span className="text-xs text-[#F8F5EE]/70 block">Per Tola (11.664 g)</span>
              <div className="mt-2 font-serif text-lg sm:text-2xl text-[#F8F5EE] font-bold">
                NPR {rates.silverPerTola.toLocaleString("en-NP")}
              </div>
            </div>

            {/* Silver Per 10 Grams */}
            <div className="bg-[#123B32] p-4 sm:p-5 rounded-sm border border-[#1A4E42] hover:border-[#C6A66B]/50 transition-colors">
              <span className="text-[11px] tracking-wider uppercase text-[#F8F5EE]/90 font-medium block">
                Pure Silver
              </span>
              <span className="text-xs text-[#F8F5EE]/70 block">Per 10 Grams</span>
              <div className="mt-2 font-serif text-lg sm:text-2xl text-[#F8F5EE] font-bold">
                NPR {rates.silverPer10g.toLocaleString("en-NP")}
              </div>
            </div>
          </div>
        )}

        {/* Source Attribution Notice */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[#F8F5EE]/60 gap-2">
          <span>Source: {rates?.sourceAttribution || "Federation of Nepal Gold & Silver Dealers / Admin"}</span>
          <span>* Actual final jewelry price includes craftsmanship/making charges and wastage as per design.</span>
        </div>
      </div>
    </section>
  );
}

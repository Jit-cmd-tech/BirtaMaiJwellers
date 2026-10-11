export const metadata = {
  title: "Terms & Conditions | Birta Mai Jewellers",
  description: "Terms and conditions of service for Birta Mai Jewellers, Birgunj, Nepal.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-[#FFFFFF] p-8 sm:p-14 border border-[#E7DFD0] rounded-sm space-y-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal">
          Terms & Conditions
        </h1>
        <div className="w-12 h-0.5 bg-[#D4AF37]" />
        <p className="text-xs text-[#77736B]">Effective Date: October 2026</p>

        <div className="space-y-4 text-sm text-[#77736B] leading-relaxed">
          <p>
            Welcome to the digital catalog of <strong>Birta Mai Jewellers</strong>, situated at Bidhya Mandir, Birgunj, Nepal. By accessing this website, you accept the following terms.
          </p>

          <h2 className="font-serif text-xl text-[#171717] pt-4">1. Precious Metal Rates & Pricing</h2>
          <p>
            Gold and silver bullion market rates in Nepal fluctuate daily in accordance with the Federation of Nepal Gold & Silver Dealers&apos; Association (FENEGOSIDA). Indicative prices displayed on the website are benchmarks; actual final jewelry prices are calculated at the time of purchase based on net weight, current rate, wastage, and craftsmanship/making charges.
          </p>

          <h2 className="font-serif text-xl text-[#171717] pt-4">2. Product Specifications & Demonstration Content</h2>
          <p>
            All listed product weights, lengths, and stone specifications are approximate measurements unless explicitly accompanied by a hallmarked certificate issued at the time of sale. Demonstration catalog pieces serve as aesthetic representations for bespoke orders.
          </p>

          <h2 className="font-serif text-xl text-[#171717] pt-4">3. WhatsApp Orders & Inquiries</h2>
          <p>
            Sending an inquiry through WhatsApp initiates a consultation with our staff. An order is confirmed only upon direct agreement, receipt of an advance deposit (where applicable for custom crafting), and generation of an official store receipt.
          </p>

          <h2 className="font-serif text-xl text-[#171717] pt-4">4. In-Store Inspection</h2>
          <p>
            We encourage all prospective buyers to visit our showroom at Bidhya Mandir, Birgunj to physically inspect jewelry items, verify purity hallmarks, and ensure perfect sizing.
          </p>
        </div>
      </div>
    </div>
  );
}

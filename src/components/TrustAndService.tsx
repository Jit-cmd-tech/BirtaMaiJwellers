import { Shield, Sparkles, HeartHandshake, Eye } from "lucide-react";

export default function TrustAndService() {
  const pillars = [
    {
      icon: Eye,
      title: "Product Transparency",
      description:
        "Accurate net gold weight, purity testing, and upfront bullion pricing without concealed fees.",
    },
    {
      icon: Sparkles,
      title: "Artisanal Craftsmanship",
      description:
        "Generations of mastery in traditional Nakashi, hand repoussé, intricate filigree, and Kundan stone setting.",
    },
    {
      icon: HeartHandshake,
      title: "Personalized Consultation",
      description:
        "One-on-one bridal styling, custom bespoke jewelry designing, and respectful heirloom guidance.",
    },
    {
      icon: Shield,
      title: "In-Store Assurance",
      description:
        "Visit our atelier at Birta Mai Mandir, Birgunj to inspect every piece in person with certified testing equipment.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#123B32] border-y border-[#0D2A24] text-[#F8F5EE]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C6A66B] text-xs uppercase tracking-[0.25em] font-semibold">
            The Birta Mai Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F5EE] font-normal mt-2">
            Pillars of Craftsmanship & Trust
          </h2>
          <div className="w-16 h-0.5 bg-[#C6A66B] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#0D2A24] p-8 border border-[#1A4E42] hover:border-[#C6A66B]/50 transition-all duration-300 rounded-sm flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full border border-[#C6A66B]/50 flex items-center justify-center mb-6 bg-[#123B32] group-hover:bg-[#C6A66B] transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#C6A66B] group-hover:text-[#123B32] transition-colors" />
                </div>
                <h3 className="font-serif text-lg text-[#F8F5EE] font-medium mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#F8F5EE]/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

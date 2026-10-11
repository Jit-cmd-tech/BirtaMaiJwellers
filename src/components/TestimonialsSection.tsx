import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F5EE] border-t border-[#E4DBD0]">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <Quote className="w-10 h-10 text-[#C6A66B] mx-auto opacity-80" />
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#252823] font-normal italic leading-relaxed">
          “Jewelry is not merely an ornament of gold and stone; it is a timeless blessing of love and heritage in every family.”
        </h2>
        <div className="pt-2">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#123B32] block">
            Birta Mai Jewellers Atelier
          </span>
          <span className="text-xs text-[#6A7066] block mt-1">
            Bidhya Mandir, Birgunj, Nepal
          </span>
        </div>
      </div>
    </section>
  );
}

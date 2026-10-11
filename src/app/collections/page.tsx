import { Suspense } from "react";
import CollectionsClient from "./CollectionsClient";
import { getPublishedProducts } from "@/lib/db";

export const metadata = {
  title: "Jewelry Collections | Birta Mai Jewellers, Birgunj",
  description:
    "Explore 24K and 22K gold necklaces, royal bridal chokers, diamond rings, handcrafted bangles, and authentic silver artifacts at Birta Mai Jewellers in Birgunj, Nepal.",
};

export default function CollectionsPage() {
  const products = getPublishedProducts();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs tracking-widest uppercase text-[#77736B]">
              Loading Precious Collections...
            </p>
          </div>
        </div>
      }
    >
      <CollectionsClient initialProducts={products} />
    </Suspense>
  );
}

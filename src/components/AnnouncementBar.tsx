import Link from "next/link";
import { Sparkles, PhoneCall } from "lucide-react";

interface AnnouncementBarProps {
  announcementText?: string;
  active?: boolean;
}

export default function AnnouncementBar({
  announcementText = "Festive & Bridal Showcase • Visit our Atelier at Bidhya Mandir, Birgunj or Enquire via WhatsApp",
  active = true,
}: AnnouncementBarProps) {
  if (!active) return null;

  return (
    <aside aria-label="Store announcement" className="bg-[#0D2A24] text-[#F8F5EE] text-xs border-b border-[#123B32] py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 tracking-wide font-light text-[11px] sm:text-xs text-[#F8F5EE]/90">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A66B] shrink-0 animate-pulse" />
          <span>{announcementText}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#F8F5EE]/80">
          <span className="hidden md:inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Store Open in Birgunj
          </span>
          <span className="text-[#C6A66B]/50 hidden sm:inline">•</span>
          <Link
            href="/contact"
            className="hover:text-[#C6A66B] transition-colors flex items-center gap-1 font-medium"
          >
            <PhoneCall className="w-3 h-3 text-[#C6A66B]" />
            Bidhya Mandir, Birgunj
          </Link>
        </div>
      </div>
    </aside>
  );
}

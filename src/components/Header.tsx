"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Menu,
  X,
  Search,
  MessageCircle,
  Gem,
} from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

function HeaderInner() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "New Arrivals", href: "/collections?filter=new-arrivals" },
    { name: "Bridal", href: "/collections?filter=bridal" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/collections") {
      return pathname === "/collections" && !searchParams.get("filter") && !searchParams.get("category");
    }
    if (href === "/collections?filter=new-arrivals") {
      const f = searchParams.get("filter");
      return pathname === "/collections" && (f === "new-arrivals" || f === "new");
    }
    if (href === "/collections?filter=bridal") {
      const f = searchParams.get("filter");
      const c = searchParams.get("category");
      return pathname === "/collections" && (f === "bridal" || c === "Bridal Jewelry");
    }
    return pathname === href;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#123B32]/98 backdrop-blur-md shadow-lg border-b border-[#C6A66B]/20"
            : "bg-[#123B32] border-b border-[#0D2A24]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#F8F5EE] hover:text-[#C6A66B] focus:outline-none focus:ring-1 focus:ring-[#C6A66B] transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo & Wordmark */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Link href="/" className="group flex items-center gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C6A66B]/60 flex items-center justify-center bg-[#0D2A24] shadow-inner group-hover:border-[#C6A66B] transition-all duration-300">
                  <Gem className="w-5 h-5 text-[#C6A66B] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <span className="block font-serif text-lg sm:text-2xl font-bold tracking-[0.18em] text-[#F8F5EE] uppercase group-hover:text-[#C6A66B] transition-colors">
                    Birta Mai
                  </span>
                  <span className="block text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#C6A66B] font-medium -mt-0.5">
                    Jewellers • Birgunj
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm tracking-[0.08em] uppercase font-medium transition-all duration-200 relative py-1 ${
                      active
                        ? "text-[#C6A66B] font-semibold"
                        : "text-[#F8F5EE]/85 hover:text-[#C6A66B]"
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6A66B]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#F8F5EE]/80 hover:text-[#C6A66B] transition-colors rounded-full hover:bg-white/5"
                aria-label="Search Catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Standard Recognizable WhatsApp Button */}
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-sm text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Enquire on WhatsApp with Birta Mai Jewellers"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">WhatsApp Enquire</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="border-t border-[#0D2A24] bg-[#0D2A24] px-4 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#C6A66B] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/collections?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                placeholder="Search bridal chokers, 24K gold necklaces, kadas, diamonds, SKU..."
                className="w-full bg-transparent text-sm sm:text-base text-[#F8F5EE] placeholder-[#6A7066] focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    window.location.href = `/collections?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="px-4 py-1.5 bg-[#C6A66B] text-[#123B32] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#B59458]"
              >
                Search
              </button>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#6A7066] hover:text-[#F8F5EE] p-1"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#0D2A24] bg-[#0D2A24] px-5 py-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base tracking-wider uppercase font-medium py-2 border-b border-white/5 flex items-center justify-between ${
                      active ? "text-[#C6A66B]" : "text-[#F8F5EE] hover:text-[#C6A66B]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-[#C6A66B] text-xs">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 space-y-3">
              <a
                href={getGeneralWhatsAppUrl("Hello Birta Mai Jewellers, I would like to schedule a bridal consultation at your Birta Mandir store.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 text-xs tracking-widest uppercase font-semibold rounded-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Direct WhatsApp Concierge
              </a>
              <div className="text-center text-[11px] text-[#C6A66B]/80">
                Birta Mandir, Birgunj, Nepal • Tel: +977 9845033095
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<header className="bg-[#161616] h-20 w-full" />}>
      <HeaderInner />
    </Suspense>
  );
}

"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/db";

interface CollectionsClientProps {
  initialProducts: Product[];
}

export default function CollectionsClient({ initialProducts }: CollectionsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL Query Sync
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";
  const initialFilterParam = searchParams.get("filter") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [selectedPurity, setSelectedPurity] = useState("All");
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>(initialFilterParam);

  // Sync state when URL search parameters change
  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam === "new-arrivals" || filterParam === "new") {
      setActiveFilter("new-arrivals");
    } else if (filterParam === "bridal") {
      setActiveFilter("bridal");
    } else {
      setActiveFilter("");
    }

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("All");
    }

    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [searchParams]);

  const categories = [
    "All",
    "Bridal Jewelry",
    "Gold Necklaces",
    "Bangles & Bracelets",
    "Rings",
    "Earrings",
    "Silver Jewelry & Artifacts",
  ];

  const materials = ["All", "Gold", "Diamond", "Silver", "Platinum"];
  const purities = ["All", "24K (999 Pure)", "22K (916)", "18K", "92.5% Sterling Silver"];
  const collectionsList = ["All", "Bridal", "Traditional", "Contemporary", "Daily Wear"];
  const availabilities = ["All", "Available", "Made to Order", "Out of Stock"];

  // Multi-Filter Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 1. Strict New Arrivals Filter
      if (activeFilter === "new-arrivals" && !product.isNewArrival) {
        return false;
      }

      // 2. Strict Bridal Filter
      if (activeFilter === "bridal") {
        const isBridal =
          product.category === "Bridal Jewelry" ||
          product.collection === "Bridal" ||
          product.name.toLowerCase().includes("bridal") ||
          product.description.toLowerCase().includes("bridal");
        if (!isBridal) return false;
      }

      // 3. Search query
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesMaterial = product.material.toLowerCase().includes(query);
        if (!matchesName && !matchesSku && !matchesDesc && !matchesCategory && !matchesMaterial) {
          return false;
        }
      }

      // 4. Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // 5. Material filter
      if (selectedMaterial !== "All" && product.material !== selectedMaterial) {
        return false;
      }

      // 6. Purity filter
      if (selectedPurity !== "All" && product.purity && !product.purity.includes(selectedPurity.split(" ")[0])) {
        return false;
      }

      // 7. Collection filter
      if (selectedCollection !== "All" && product.collection !== selectedCollection) {
        return false;
      }

      // 8. Availability filter
      if (selectedAvailability !== "All" && product.stockStatus !== selectedAvailability) {
        return false;
      }

      return true;
    });
  }, [
    initialProducts,
    activeFilter,
    search,
    selectedCategory,
    selectedMaterial,
    selectedPurity,
    selectedCollection,
    selectedAvailability,
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "featured":
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      case "newest":
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "price-low":
        return list.sort((a, b) => (a.price || 99999999) - (b.price || 99999999));
      case "price-high":
        return list.sort((a, b) => (b.price || 0) - (a.price || 0));
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  const activeFilterCount =
    (activeFilter ? 1 : 0) +
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedMaterial !== "All" ? 1 : 0) +
    (selectedPurity !== "All" ? 1 : 0) +
    (selectedCollection !== "All" ? 1 : 0) +
    (selectedAvailability !== "All" ? 1 : 0) +
    (search.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedMaterial("All");
    setSelectedPurity("All");
    setSelectedCollection("All");
    setSelectedAvailability("All");
    setSortBy("featured");
    setActiveFilter("");
    router.push("/collections");
  };

  const removeSpecialFilter = () => {
    setActiveFilter("");
    router.push("/collections");
  };

  // Editorial Title & Header based on active filter
  const pageHeader = useMemo(() => {
    if (activeFilter === "new-arrivals") {
      return {
        tag: "Curated Showcase",
        title: "New Arrivals",
        description:
          "Discover our latest handcrafted 24K and 22K gold heirlooms, fine diamond rings, and precious silver artifacts newly arrived at our Birgunj atelier.",
      };
    }
    if (activeFilter === "bridal") {
      return {
        tag: "The Vivaha Edit",
        title: "The Bridal Collection",
        description:
          "Opulent royal choker sets, Kundan necklaces, cascading jhumkas, and peacock kadas meticulously crafted to celebrate your wedding traditions.",
      };
    }
    return {
      tag: "Bidhya Mandir, Birgunj",
      title: "The Precious Collections",
      description:
        "Browse our curated 24K and 22K gold, certified diamonds, and sterling silver artifacts. Enquire directly on WhatsApp for real-time bullion pricing and bespoke tailoring.",
    };
  }, [activeFilter]);

  return (
    <div className="bg-[#F8F5EE] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#C6A66B] text-xs uppercase tracking-[0.25em] font-semibold">
            {pageHeader.tag}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#252823] font-normal mt-2">
            {pageHeader.title}
          </h1>
          <div className="w-16 h-0.5 bg-[#C6A66B] mx-auto mt-4" />
          <p className="text-sm text-[#6A7066] mt-4 leading-relaxed">
            {pageHeader.description}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#FFFFFF] p-4 sm:p-6 rounded-sm border border-[#E4DBD0] shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#6A7066] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, SKU (e.g. BMJ-BR-0101), material or design..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#F8F5EE] border border-[#E4DBD0] rounded-xs text-[#252823] placeholder-[#6A7066] focus:outline-none focus:border-[#C6A66B]"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A7066] hover:text-[#252823]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Mobile Filter Toggle */}
            <div className="flex items-center justify-between lg:justify-end gap-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 bg-[#F8F5EE] border border-[#E4DBD0] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs text-[#252823]"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#C6A66B]" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6A7066] uppercase tracking-wider hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8F5EE] border border-[#E4DBD0] text-xs font-medium text-[#252823] px-3 py-2.5 rounded-xs focus:outline-none focus:border-[#C6A66B]"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="newest">Newest First</option>
                  <option value="name-asc">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="mt-4 pt-4 border-t border-[#E4DBD0] flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#6A7066]">Active Constraints:</span>

              {activeFilter === "new-arrivals" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#123B32] text-[#F8F5EE] text-xs rounded-xs font-medium">
                  Section: New Arrivals
                  <button onClick={removeSpecialFilter} aria-label="Remove New Arrivals filter">
                    <X className="w-3.5 h-3.5 text-[#C6A66B] hover:text-white" />
                  </button>
                </span>
              )}

              {activeFilter === "bridal" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#123B32] text-[#F8F5EE] text-xs rounded-xs font-medium">
                  Section: Bridal Collection
                  <button onClick={removeSpecialFilter} aria-label="Remove Bridal filter">
                    <X className="w-3.5 h-3.5 text-[#C6A66B] hover:text-white" />
                  </button>
                </span>
              )}

              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F8F5EE] border border-[#E4DBD0] text-xs text-[#252823] rounded-xs">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>
                    <X className="w-3 h-3 text-[#6A7066] hover:text-[#252823]" />
                  </button>
                </span>
              )}

              {selectedMaterial !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F8F5EE] border border-[#E4DBD0] text-xs text-[#252823] rounded-xs">
                  Material: {selectedMaterial}
                  <button onClick={() => setSelectedMaterial("All")}>
                    <X className="w-3 h-3 text-[#6A7066] hover:text-[#252823]" />
                  </button>
                </span>
              )}

              {selectedCollection !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F8F5EE] border border-[#E4DBD0] text-xs text-[#252823] rounded-xs">
                  Collection: {selectedCollection}
                  <button onClick={() => setSelectedCollection("All")}>
                    <X className="w-3 h-3 text-[#6A7066] hover:text-[#252823]" />
                  </button>
                </span>
              )}

              {selectedAvailability !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F8F5EE] border border-[#E4DBD0] text-xs text-[#252823] rounded-xs">
                  Status: {selectedAvailability}
                  <button onClick={() => setSelectedAvailability("All")}>
                    <X className="w-3 h-3 text-[#6A7066] hover:text-[#252823]" />
                  </button>
                </span>
              )}

              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-xs text-[#123B32] hover:underline ml-2 font-medium"
              >
                <RotateCcw className="w-3 h-3 text-[#C6A66B]" />
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Main Catalog Layout (Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-[#FFFFFF] p-6 rounded-sm border border-[#E4DBD0] shadow-xs space-y-6 sticky top-28">
              <div className="flex items-center justify-between border-b border-[#E4DBD0] pb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#123B32] uppercase tracking-wider">
                  <Filter className="w-4 h-4 text-[#C6A66B]" />
                  <span>Refine Catalog</span>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] text-[#123B32] hover:underline font-medium"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-semibold text-[#252823] uppercase tracking-wider mb-3">
                  Category
                </h4>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-xs transition-colors flex items-center justify-between ${
                        selectedCategory === cat
                          ? "bg-[#123B32] text-[#F8F5EE] font-medium"
                          : "text-[#6A7066] hover:bg-[#F8F5EE] hover:text-[#252823]"
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="border-t border-[#E4DBD0] pt-4">
                <h4 className="text-xs font-semibold text-[#252823] uppercase tracking-wider mb-3">
                  Material
                </h4>
                <div className="space-y-1.5">
                  {materials.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-xs transition-colors ${
                        selectedMaterial === mat
                          ? "bg-[#123B32] text-[#F8F5EE] font-medium"
                          : "text-[#6A7066] hover:bg-[#F8F5EE] hover:text-[#252823]"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collections */}
              <div className="border-t border-[#E4DBD0] pt-4">
                <h4 className="text-xs font-semibold text-[#252823] uppercase tracking-wider mb-3">
                  Collection
                </h4>
                <div className="space-y-1.5">
                  {collectionsList.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedCollection(col)}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-xs transition-colors ${
                        selectedCollection === col
                          ? "bg-[#123B32] text-[#F8F5EE] font-medium"
                          : "text-[#6A7066] hover:bg-[#F8F5EE] hover:text-[#252823]"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="border-t border-[#E4DBD0] pt-4">
                <h4 className="text-xs font-semibold text-[#252823] uppercase tracking-wider mb-3">
                  Availability
                </h4>
                <div className="space-y-1.5">
                  {availabilities.map((avail) => (
                    <button
                      key={avail}
                      onClick={() => setSelectedAvailability(avail)}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-xs transition-colors ${
                        selectedAvailability === avail
                          ? "bg-[#123B32] text-[#F8F5EE] font-medium"
                          : "text-[#6A7066] hover:bg-[#F8F5EE] hover:text-[#252823]"
                      }`}
                    >
                      {avail}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {/* Results Count Bar */}
            <div className="flex items-center justify-between mb-6 text-xs text-[#6A7066]">
              <span>
                Displaying <strong className="text-[#252823]">{sortedProducts.length}</strong> jewelry pieces
              </span>
              <span className="text-[11px] text-[#123B32] font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C6A66B]" /> Official Birgunj Atelier
              </span>
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 ? (
              <div className="bg-[#FFFFFF] border border-[#E4DBD0] p-12 text-center rounded-sm space-y-4">
                <Filter className="w-10 h-10 text-[#C6A66B] mx-auto opacity-70" />
                <h3 className="font-serif text-2xl text-[#252823]">
                  {activeFilter === "new-arrivals"
                    ? "No New Arrivals currently listed"
                    : activeFilter === "bridal"
                    ? "No Bridal Jewelry pieces match your filter"
                    : "No matching jewelry pieces found"}
                </h3>
                <p className="text-xs text-[#6A7066] max-w-md mx-auto leading-relaxed">
                  {activeFilter === "new-arrivals"
                    ? "Our master goldsmiths in Birgunj are constantly handcrafting new heirlooms. You can clear filters or contact our atelier directly on WhatsApp to preview upcoming creations."
                    : activeFilter === "bridal"
                    ? "We specialize in custom bridal orders. Please reset your filters or chat with our bridal consultant on WhatsApp to commission a bespoke vivaha set."
                    : "We could not find items matching your search and filter criteria. You can clear your filters or ask our jeweler on WhatsApp for custom crafting."}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={resetAllFilters}
                    className="bg-[#123B32] hover:bg-[#0D2A24] text-[#F8F5EE] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
                  >
                    View All Collections
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs">
            <div className="relative ml-auto w-full max-w-xs h-full bg-[#FFFFFF] p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4DBD0] pb-4">
                <h3 className="font-serif text-lg text-[#252823]">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-[#252823]" />
                </button>
              </div>

              {/* Mobile Filter Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-[#252823]">Category</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-2 py-1.5 text-xs rounded-xs ${
                        selectedCategory === cat ? "bg-[#123B32] text-[#F8F5EE]" : "text-[#6A7066]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Material */}
              <div className="border-t border-[#E4DBD0] pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-[#252823]">Material</h4>
                <div className="space-y-1">
                  {materials.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`block w-full text-left px-2 py-1.5 text-xs rounded-xs ${
                        selectedMaterial === mat ? "bg-[#123B32] text-[#F8F5EE]" : "text-[#6A7066]"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Close / Apply */}
              <div className="pt-6 border-t border-[#E4DBD0] flex gap-3">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 py-2.5 text-xs border border-[#E4DBD0] text-[#252823] rounded-xs font-semibold"
                >
                  Clear
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2.5 text-xs bg-[#C6A66B] text-[#123B32] rounded-xs font-bold uppercase tracking-wider"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

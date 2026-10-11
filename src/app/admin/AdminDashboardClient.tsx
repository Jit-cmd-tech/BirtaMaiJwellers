"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  TrendingUp,
  Settings,
  MessageSquare,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Save,
  Check,
  AlertCircle,
  Gem,
  Upload,
  Search,
  MessageCircle,
} from "lucide-react";
import { Product, BusinessSettings, MetalRates, CustomerInquiry } from "@/lib/db";

interface AdminDashboardClientProps {
  initialProducts: Product[];
  initialSettings: BusinessSettings;
  initialRates: MetalRates;
  initialInquiries: CustomerInquiry[];
}

export default function AdminDashboardClient({
  initialProducts,
  initialSettings,
  initialRates,
  initialInquiries,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "rates" | "settings" | "inquiries">("overview");

  // State
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [settings, setSettings] = useState<BusinessSettings>(initialSettings);
  const [rates, setRates] = useState<MetalRates>(initialRates);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(initialInquiries);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Product Editing / Creation Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [productSearch, setProductSearch] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingRates, setSavingRates] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4000);
  };

  // Sign out handler
  const handleSignOut = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Save product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.category) {
      showError("Product Name and Category are required.");
      return;
    }

    setSavingProduct(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");

      if (editingProduct.id) {
        setProducts(products.map((p) => (p.id === editingProduct.id ? data.product : p)));
        showToast(`Updated "${data.product.name}" successfully.`);
      } else {
        setProducts([data.product, ...products]);
        showToast(`Created "${data.product.name}" successfully.`);
      }

      setIsProductModalOpen(false);
      setEditingProduct(null);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Error saving product");
    } finally {
      setSavingProduct(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      setProducts(products.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      showToast("Product deleted successfully.");
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Settings update failed");

      setSettings(data.settings);
      showToast("Business settings updated and saved.");
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Error updating settings");
    } finally {
      setSavingSettings(false);
    }
  };

  // Save Rates
  const handleSaveRates = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingRates(true);
    try {
      const res = await fetch("/api/admin/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rates),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Rates update failed");

      setRates(data.rates);
      showToast("Bullion rates updated and timestamped.");
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Error updating rates");
    } finally {
      setSavingRates(false);
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id: string, status: CustomerInquiry["status"]) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) throw new Error("Update failed");

      setInquiries(
        inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
      showToast(`Inquiry marked as ${status}`);
    } catch {
      showError("Failed to update inquiry status");
    }
  };

  // Image File Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError("Please select a valid image file (JPEG, PNG, WebP, GIF, SVG).");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showError("Image file size must be under 10MB.");
      e.target.value = "";
      return;
    }

    setUploadingImage(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      const currentImages = editingProduct?.images || [];
      setEditingProduct({
        ...editingProduct,
        images: [...currentImages, data.url],
      });
      showToast("Image uploaded successfully.");
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  // Filtered Products for Table
  const filteredProducts = products.filter((p) => {
    if (!productSearch) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#0D2A24] text-[#F8F5EE] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#C6A66B] text-[#123B32] px-5 py-3 rounded-xs text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-xs text-xs font-semibold uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="bg-[#123B32] border-b border-[#1A4E42] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#C6A66B] flex items-center justify-center bg-[#0D2A24]">
              <Gem className="w-5 h-5 text-[#C6A66B]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#F8F5EE] tracking-wider uppercase block">
                Birta Mai Jewellers
              </span>
              <span className="text-[10px] text-[#C6A66B] tracking-[0.2em] uppercase font-semibold">
                Store Administration • Birgunj
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#F8F5EE]/80 hover:text-[#C6A66B] transition-colors"
            >
              <span>Live Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 bg-[#0D2A24] hover:bg-red-950 text-xs text-[#F8F5EE] px-3.5 py-2 rounded-xs border border-[#1A4E42] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tab Selector Bar */}
      <div className="bg-[#0D2A24] border-b border-[#1A4E42] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex space-x-2 sm:space-x-8 overflow-x-auto py-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0 ${
              activeTab === "overview"
                ? "bg-[#C6A66B] text-[#123B32]"
                : "text-[#F8F5EE]/70 hover:text-[#F8F5EE]"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === "products"
                ? "bg-[#C6A66B] text-[#123B32]"
                : "text-[#F8F5EE]/70 hover:text-[#F8F5EE]"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("rates")}
            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === "rates"
                ? "bg-[#C6A66B] text-[#123B32]"
                : "text-[#F8F5EE]/70 hover:text-[#F8F5EE]"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Bullion Rates</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === "settings"
                ? "bg-[#C6A66B] text-[#123B32]"
                : "text-[#F8F5EE]/70 hover:text-[#F8F5EE]"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Store Settings</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === "inquiries"
                ? "bg-[#C6A66B] text-[#123B32]"
                : "text-[#F8F5EE]/70 hover:text-[#F8F5EE]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inquiries ({inquiries.length})</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {/* ================= 1. OVERVIEW TAB ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#123B32] p-5 border border-[#1A4E42] rounded-sm">
                <span className="text-[11px] text-[#F8F5EE]/70 uppercase tracking-wider block">
                  Total Products
                </span>
                <span className="font-serif text-3xl font-bold text-[#F8F5EE] mt-1 block">
                  {products.length}
                </span>
                <span className="text-[10px] text-[#C6A66B] mt-1 block">
                  {products.filter((p) => p.published).length} Published
                </span>
              </div>

              <div className="bg-[#123B32] p-5 border border-[#1A4E42] rounded-sm">
                <span className="text-[11px] text-[#F8F5EE]/70 uppercase tracking-wider block">
                  In Stock & Ready
                </span>
                <span className="font-serif text-3xl font-bold text-emerald-300 mt-1 block">
                  {products.filter((p) => p.stockStatus === "Available").length}
                </span>
                <span className="text-[10px] text-[#F8F5EE]/60 mt-1 block">Available pieces</span>
              </div>

              <div className="bg-[#123B32] p-5 border border-[#1A4E42] rounded-sm">
                <span className="text-[11px] text-[#F8F5EE]/70 uppercase tracking-wider block">
                  New Arrivals Marked
                </span>
                <span className="font-serif text-3xl font-bold text-[#C6A66B] mt-1 block">
                  {products.filter((p) => p.isNewArrival).length}
                </span>
                <span className="text-[10px] text-[#F8F5EE]/60 mt-1 block">In New Arrivals tab</span>
              </div>

              <div className="bg-[#123B32] p-5 border border-[#1A4E42] rounded-sm">
                <span className="text-[11px] text-[#F8F5EE]/70 uppercase tracking-wider block">
                  Customer Inquiries
                </span>
                <span className="font-serif text-3xl font-bold text-[#F8F5EE] mt-1 block">
                  {inquiries.length}
                </span>
                <span className="text-[10px] text-emerald-400 mt-1 block">
                  {inquiries.filter((i) => i.status === "New").length} New Requests
                </span>
              </div>
            </div>

            {/* Quick Actions & Live Bullion Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#123B32] p-6 border border-[#1A4E42] rounded-sm space-y-4">
                <h3 className="font-serif text-lg text-[#F8F5EE]">Quick Operations</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setEditingProduct({
                        name: "",
                        category: "Bridal Jewelry",
                        material: "Gold",
                        purity: "22K (916)",
                        collection: "Bridal",
                        stockStatus: "Available",
                        currency: "NPR",
                        showPrice: true,
                        featured: false,
                        isNewArrival: true,
                        published: true,
                        isDemo: false,
                        images: ["/images/hero_bridal.jpg"],
                      });
                      setIsProductModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-[#C6A66B] hover:bg-[#B59458] text-[#123B32] p-3 text-xs font-bold uppercase tracking-wider rounded-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Jewelry</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("rates")}
                    className="flex items-center justify-center gap-2 bg-[#0D2A24] hover:bg-[#123B32] text-[#F8F5EE] p-3 text-xs font-semibold uppercase tracking-wider rounded-xs border border-[#1A4E42]"
                  >
                    <TrendingUp className="w-4 h-4 text-[#C6A66B]" />
                    <span>Update Bullion Rates</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#123B32] p-6 border border-[#1A4E42] rounded-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg text-[#F8F5EE]">Active Bullion Benchmark</h3>
                  <button
                    onClick={() => setActiveTab("rates")}
                    className="text-xs text-[#C6A66B] hover:underline"
                  >
                    Edit Rates →
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#0D2A24] p-3 rounded-xs border border-[#1A4E42]">
                    <span className="text-[#F8F5EE]/70">24K Gold / Tola</span>
                    <span className="font-bold text-[#F8F5EE] block mt-1 text-sm">
                      NPR {rates.goldFinePerTola.toLocaleString("en-NP")}
                    </span>
                  </div>
                  <div className="bg-[#0D2A24] p-3 rounded-xs border border-[#1A4E42]">
                    <span className="text-[#F8F5EE]/70">Silver / Tola</span>
                    <span className="font-bold text-[#F8F5EE] block mt-1 text-sm">
                      NPR {rates.silverPerTola.toLocaleString("en-NP")}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-[#F8F5EE]/60">
                  Last Updated: {new Date(rates.lastUpdated).toLocaleString("en-NP")}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. PRODUCTS TAB ================= */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#6A7066] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search catalog by name, SKU..."
                  className="w-full pl-9 pr-4 py-2 bg-[#123B32] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE] placeholder-[#6A7066] focus:outline-none focus:border-[#C6A66B]"
                />
              </div>

              <button
                onClick={() => {
                  setEditingProduct({
                    name: "",
                    category: "Bridal Jewelry",
                    material: "Gold",
                    purity: "22K (916)",
                    collection: "Bridal",
                    stockStatus: "Available",
                    currency: "NPR",
                    showPrice: true,
                    featured: false,
                    isNewArrival: true,
                    published: true,
                    isDemo: false,
                    images: ["/images/hero_bridal.jpg"],
                  });
                  setIsProductModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#C6A66B] hover:bg-[#B59458] text-[#123B32] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-[#123B32] border border-[#1A4E42] rounded-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0D2A24] text-[#F8F5EE]/70 uppercase tracking-wider border-b border-[#1A4E42]">
                  <tr>
                    <th className="p-4">Piece</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">Price (NPR)</th>
                    <th className="p-4">New Arrival</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Published</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A4E42]">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#1A4E42]/40 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xs overflow-hidden shrink-0 border border-[#1A4E42]">
                          <Image
                            src={p.images[0] || "/images/hero_bridal.jpg"}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-[#F8F5EE]">{p.name}</div>
                          <div className="text-[11px] text-[#C6A66B]">{p.purity || "No purity tag"}</div>
                        </div>
                      </td>
                      <td className="p-4 text-[#F8F5EE]/80">{p.category}</td>
                      <td className="p-4 font-mono text-[#F8F5EE]/60">{p.sku}</td>
                      <td className="p-4">
                        {p.showPrice && p.price ? (
                          <span className="font-semibold text-[#F8F5EE]">
                            NPR {p.price.toLocaleString("en-NP")}
                          </span>
                        ) : (
                          <span className="text-[#F8F5EE]/60 italic">Contact for Price</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-xs text-[10px] font-semibold uppercase ${
                            p.isNewArrival
                              ? "bg-[#DCE5DC] text-[#123B32]"
                              : "bg-[#0D2A24] text-[#F8F5EE]/40"
                          }`}
                        >
                          {p.isNewArrival ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-xs text-[10px] font-semibold uppercase ${
                            p.stockStatus === "Available"
                              ? "bg-emerald-950 text-emerald-300"
                              : p.stockStatus === "Made to Order"
                              ? "bg-amber-950 text-amber-300"
                              : "bg-stone-800 text-stone-400"
                          }`}
                        >
                          {p.stockStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-xs font-semibold ${
                            p.published ? "bg-emerald-900/60 text-emerald-200" : "bg-red-900/60 text-red-200"
                          }`}
                        >
                          {p.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsProductModalOpen(true);
                          }}
                          className="p-1.5 bg-[#0D2A24] hover:bg-[#C6A66B] hover:text-[#123B32] text-[#F8F5EE] rounded-xs transition-colors"
                          title="Edit Piece"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 bg-[#0D2A24] hover:bg-red-700 text-[#F8F5EE] rounded-xs transition-colors"
                          title="Delete Piece"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirmId && (
              <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                <div className="bg-[#123B32] border border-[#1A4E42] p-6 max-w-sm w-full rounded-sm space-y-4">
                  <h4 className="font-serif text-lg text-[#F8F5EE]">Confirm Product Deletion</h4>
                  <p className="text-xs text-[#F8F5EE]/75">
                    Are you sure you want to delete this piece from the catalog? This change will persist in the database.
                  </p>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-4 py-2 text-xs border border-[#1A4E42] text-[#F8F5EE] rounded-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(deleteConfirmId)}
                      className="px-4 py-2 text-xs bg-red-700 hover:bg-red-800 text-white font-bold rounded-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 3. BULLION RATES TAB ================= */}
        {activeTab === "rates" && (
          <div className="max-w-2xl bg-[#123B32] border border-[#1A4E42] p-6 sm:p-8 rounded-sm space-y-6 animate-in fade-in">
            <div>
              <h3 className="font-serif text-xl text-[#F8F5EE]">Manage Precious Metal Rates</h3>
              <p className="text-xs text-[#F8F5EE]/70 mt-1">
                Update the official bullion benchmarks for Birgunj. These rates appear dynamically on the customer homepage.
              </p>
            </div>

            <form onSubmit={handleSaveRates} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#C6A66B] uppercase tracking-wider mb-1">
                    Fine Gold (24K) per Tola (NPR)
                  </label>
                  <input
                    type="number"
                    required
                    value={rates.goldFinePerTola}
                    onChange={(e) => setRates({ ...rates, goldFinePerTola: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C6A66B] uppercase tracking-wider mb-1">
                    Fine Gold (24K) per 10g (NPR)
                  </label>
                  <input
                    type="number"
                    required
                    value={rates.goldFinePer10g}
                    onChange={(e) => setRates({ ...rates, goldFinePer10g: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EE] uppercase tracking-wider mb-1">
                    Silver per Tola (NPR)
                  </label>
                  <input
                    type="number"
                    required
                    value={rates.silverPerTola}
                    onChange={(e) => setRates({ ...rates, silverPerTola: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F8F5EE] uppercase tracking-wider mb-1">
                    Silver per 10g (NPR)
                  </label>
                  <input
                    type="number"
                    required
                    value={rates.silverPer10g}
                    onChange={(e) => setRates({ ...rates, silverPer10g: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F8F5EE]/70 uppercase tracking-wider mb-1">
                  Source Attribution Text
                </label>
                <input
                  type="text"
                  value={rates.sourceAttribution}
                  onChange={(e) => setRates({ ...rates, sourceAttribution: e.target.value })}
                  className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="ratesAvailable"
                  checked={rates.isAvailable}
                  onChange={(e) => setRates({ ...rates, isAvailable: e.target.checked })}
                  className="w-4 h-4 accent-[#C6A66B]"
                />
                <label htmlFor="ratesAvailable" className="text-xs text-[#F8F5EE]">
                  Display rates as available on public storefront
                </label>
              </div>

              <div className="pt-4 border-t border-[#1A4E42]">
                <button
                  type="submit"
                  disabled={savingRates}
                  className="inline-flex items-center gap-2 bg-[#C6A66B] hover:bg-[#B59458] text-[#123B32] px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingRates ? "Saving Rates..." : "Save Rates to Database"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= 4. STORE SETTINGS TAB ================= */}
        {activeTab === "settings" && (
          <div className="max-w-3xl bg-[#123B32] border border-[#1A4E42] p-6 sm:p-8 rounded-sm space-y-6 animate-in fade-in">
            <div>
              <h3 className="font-serif text-xl text-[#F8F5EE]">Business & Store Settings</h3>
              <p className="text-xs text-[#F8F5EE]/70 mt-1">
                Configure your official Birta Mai Jewellers contact details, WhatsApp number, opening hours, and announcements.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F8F5EE]/70 uppercase mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.storeName}
                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#F8F5EE]/70 uppercase mb-1">
                    Store Address
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#C6A66B] uppercase mb-1">
                    WhatsApp Number (International Digits: e.g. 9779845033095)
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#F8F5EE]/70 uppercase mb-1">
                    Phone Display Number
                  </label>
                  <input
                    type="text"
                    value={settings.phoneDisplay}
                    onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F8F5EE]/70 uppercase mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                  className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F8F5EE]/70 uppercase mb-1">
                  Homepage Announcement Bar
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="announcementActive"
                      checked={settings.announcementActive}
                      onChange={(e) => setSettings({ ...settings, announcementActive: e.target.checked })}
                      className="accent-[#C6A66B]"
                    />
                    <label htmlFor="announcementActive" className="text-xs text-[#F8F5EE]">
                      Show announcement bar on top of website
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F8F5EE]/70 uppercase mb-1">
                  Brand Story Text
                </label>
                <textarea
                  rows={4}
                  value={settings.brandStory}
                  onChange={(e) => setSettings({ ...settings, brandStory: e.target.value })}
                  className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F8F5EE]/70 uppercase mb-1">
                    Google Maps URL
                  </label>
                  <input
                    type="url"
                    value={settings.googleMapsUrl}
                    onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#F8F5EE]/70 uppercase mb-1">
                    Instagram URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/..."
                    value={settings.instagramUrl}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A4E42]">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="inline-flex items-center gap-2 bg-[#C6A66B] hover:bg-[#B59458] text-[#123B32] px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingSettings ? "Saving Settings..." : "Save Settings to Database"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= 5. INQUIRIES TAB ================= */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="font-serif text-xl text-[#F8F5EE]">Customer Inquiries & Consultations</h3>
              <p className="text-xs text-[#F8F5EE]/70 mt-1">
                Real-time appointment and bespoke inquiries received from the website contact forms.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-[#123B32] border border-[#1A4E42] p-12 text-center rounded-sm">
                <MessageSquare className="w-8 h-8 text-[#F8F5EE]/40 mx-auto opacity-50" />
                <p className="text-xs text-[#F8F5EE]/70 mt-2">No customer inquiries logged yet.</p>
              </div>
            ) : (
              <div className="bg-[#123B32] border border-[#1A4E42] rounded-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0D2A24] text-[#F8F5EE]/70 uppercase tracking-wider border-b border-[#1A4E42]">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Phone / WhatsApp</th>
                      <th className="p-4">Inquiry Type</th>
                      <th className="p-4">Preferred Date</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Direct Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A4E42]">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-[#1A4E42]/40 transition-colors">
                        <td className="p-4 font-medium text-[#F8F5EE]">{inq.fullName}</td>
                        <td className="p-4 font-mono text-[#F8F5EE]/90">{inq.phoneOrWhatsapp}</td>
                        <td className="p-4 text-[#C6A66B]">{inq.inquiryType}</td>
                        <td className="p-4 text-[#F8F5EE]/70">{inq.preferredDate || "Anytime"}</td>
                        <td className="p-4 text-[#F8F5EE]/80 max-w-xs truncate" title={inq.message}>
                          {inq.message}
                        </td>
                        <td className="p-4">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleUpdateInquiryStatus(inq.id, e.target.value as CustomerInquiry["status"])
                            }
                            className={`p-1 text-[11px] rounded-xs font-semibold bg-[#0D2A24] border border-[#1A4E42] ${
                              inq.status === "New"
                                ? "text-emerald-300"
                                : inq.status === "Contacted"
                                ? "text-amber-300"
                                : "text-stone-400"
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <a
                            href={`https://wa.me/${inq.phoneOrWhatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Hello ${inq.fullName}, this is Birta Mai Jewellers reaching out regarding your inquiry.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-3 py-1.5 rounded-xs text-[11px] font-semibold uppercase"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>Reply WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ================= PRODUCT EDIT / CREATE MODAL ================= */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#123B32] border border-[#1A4E42] max-w-2xl w-full rounded-sm p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1A4E42] pb-4">
              <h3 className="font-serif text-xl text-[#F8F5EE]">
                {editingProduct.id ? `Edit "${editingProduct.name}"` : "Add New Jewelry Piece"}
              </h3>
              <button
                onClick={() => {
                  setIsProductModalOpen(false);
                  setEditingProduct(null);
                }}
                className="text-[#F8F5EE]/70 hover:text-[#F8F5EE]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    Piece Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={editingProduct.sku || ""}
                    placeholder="e.g. BMJ-BR-0105 (Auto-generated if empty)"
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingProduct.category || "Bridal Jewelry"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  >
                    <option value="Bridal Jewelry">Bridal Jewelry</option>
                    <option value="Gold Necklaces">Gold Necklaces</option>
                    <option value="Bangles & Bracelets">Bangles & Bracelets</option>
                    <option value="Rings">Rings</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Silver Jewelry & Artifacts">Silver Jewelry & Artifacts</option>
                    <option value="Pendants">Pendants</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    Material
                  </label>
                  <select
                    value={editingProduct.material || "Gold"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  >
                    <option value="Gold">Gold</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Silver">Silver</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    Purity Specification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24K (999) / 22K (916)"
                    value={editingProduct.purity || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, purity: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    Approximate Weight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 45.20 g (approx.)"
                    value={editingProduct.approximateWeight || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, approximateWeight: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    Stone Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Polki & Pearls"
                    value={editingProduct.stoneType || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stoneType: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    Dimensions / Length
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 18-inch collar"
                    value={editingProduct.dimensions || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    Price in NPR (Optional)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price ?? ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value === "" ? null : Number(e.target.value),
                      })
                    }
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    Stock Status
                  </label>
                  <select
                    value={editingProduct.stockStatus || "Available"}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stockStatus: e.target.value as Product["stockStatus"],
                      })
                    }
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  >
                    <option value="Available">Available</option>
                    <option value="Made to Order">Made to Order</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70 mb-1">
                    Collection
                  </label>
                  <select
                    value={editingProduct.collection || "Bridal"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, collection: e.target.value })}
                    className="w-full p-2.5 bg-[#0D2A24] border border-[#1A4E42] rounded-xs text-xs text-[#F8F5EE]"
                  >
                    <option value="Bridal">Bridal</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Contemporary">Contemporary</option>
                    <option value="Festive">Festive</option>
                    <option value="Daily Wear">Daily Wear</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-[#F8F5EE]">
                  <input
                    type="checkbox"
                    checked={editingProduct.showPrice ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, showPrice: e.target.checked })}
                    className="accent-[#C6A66B]"
                  />
                  <span>Show Exact Price</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#F8F5EE]">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="accent-[#C6A66B]"
                  />
                  <span>Featured Piece</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#F8F5EE]">
                  <input
                    type="checkbox"
                    checked={editingProduct.isNewArrival ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })}
                    className="accent-[#C6A66B]"
                  />
                  <span className="font-semibold text-[#C6A66B]">New Arrival</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#F8F5EE]">
                  <input
                    type="checkbox"
                    checked={editingProduct.published ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, published: e.target.checked })}
                    className="accent-[#C6A66B]"
                  />
                  <span>Published</span>
                </label>
              </div>

              {/* Image Manager & Upload */}
              <div className="border-t border-[#1A4E42] pt-4 space-y-3">
                <label className="block text-xs font-semibold uppercase text-[#F8F5EE]/70">
                  Product Images
                </label>

                <div className="flex flex-wrap gap-3">
                  {(editingProduct.images || []).map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-xs overflow-hidden border border-[#1A4E42]">
                      <Image src={img} alt="Product view" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProduct({
                            ...editingProduct,
                            images: (editingProduct.images || []).filter((_, i) => i !== idx),
                          })
                        }
                        className="absolute top-0 right-0 bg-red-800 text-white p-0.5 text-[9px]"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <label className={`w-16 h-16 border border-dashed border-[#1A4E42] hover:border-[#C6A66B] flex flex-col items-center justify-center cursor-pointer rounded-xs text-[#F8F5EE]/70 hover:text-[#F8F5EE] transition-colors ${uploadingImage ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <Upload className={`w-4 h-4 mb-1 text-[#C6A66B] ${uploadingImage ? "animate-pulse" : ""}`} />
                    <span className="text-[9px] uppercase font-semibold">
                      {uploadingImage ? "..." : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#1A4E42] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsProductModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 text-xs border border-[#1A4E42] text-[#F8F5EE] rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProduct}
                  className="px-6 py-2 text-xs bg-[#C6A66B] hover:bg-[#B59458] text-[#123B32] font-bold uppercase tracking-wider rounded-xs"
                >
                  {savingProduct ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

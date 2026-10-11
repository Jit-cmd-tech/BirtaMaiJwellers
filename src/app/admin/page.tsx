import { Suspense } from "react";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import { isSessionValid } from "@/lib/auth";
import { getAllProducts, getSettings, getRates, getInquiries } from "@/lib/db";

export const metadata = {
  title: "Admin Dashboard | Birta Mai Jewellers",
  description: "Administrative catalog and business management portal for Birta Mai Jewellers.",
};

export default async function AdminPage() {
  const valid = await isSessionValid();
  if (!valid) {
    redirect("/admin/login");
  }

  const products = await getAllProducts();
  const settings = await getSettings();
  const rates = await getRates();
  const inquiries = await getInquiries();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#111111] flex items-center justify-center p-8">
          <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminDashboardClient
        initialProducts={products}
        initialSettings={settings}
        initialRates={rates}
        initialInquiries={inquiries}
      />
    </Suspense>
  );
}

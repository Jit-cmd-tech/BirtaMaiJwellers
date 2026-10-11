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

  const products = getAllProducts();
  const settings = getSettings();
  const rates = getRates();
  const inquiries = getInquiries();

  return (
    <AdminDashboardClient
      initialProducts={products}
      initialSettings={settings}
      initialRates={rates}
      initialInquiries={inquiries}
    />
  );
}

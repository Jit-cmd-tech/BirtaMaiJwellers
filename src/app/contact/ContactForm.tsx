"use client";

import { useState } from "react";
import { MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { getAppointmentWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneOrWhatsapp: "",
    inquiryType: "Bridal Consultation",
    preferredDate: "",
    productInterest: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side validation
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.phoneOrWhatsapp.trim() || formData.phoneOrWhatsapp.length < 8) {
      setErrorMessage("Please enter a valid phone or WhatsApp number.");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage("Please share a brief message or describe your jewelry requirement.");
      return;
    }

    setLoading(true);

    try {
      // Save inquiry to server-side DB
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Unable to save inquiry at this moment.");
      }

      // Generate the canonical WhatsApp link with the customer's exact details
      const waUrl = getAppointmentWhatsAppUrl({
        fullName: formData.fullName,
        inquiryType: formData.inquiryType,
        preferredDate: formData.preferredDate || undefined,
        message: `${formData.message}${
          formData.productInterest ? `\nInterest: ${formData.productInterest}` : ""
        }\nContact Phone: ${formData.phoneOrWhatsapp}`,
      });

      setSubmittedWhatsAppUrl(waUrl);
      setStatus("success");
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        "Could not store your request. You can directly message us on WhatsApp below."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF] p-6 sm:p-10 border border-[#E4DBD0] rounded-sm shadow-sm">
      <div className="mb-6">
        <span className="text-[#C6A66B] text-xs uppercase tracking-[0.2em] font-semibold block">
          Appointment & Bespoke Inquiry
        </span>
        <h3 className="font-serif text-2xl text-[#252823] font-normal mt-1">
          Schedule an Atelier Consultation
        </h3>
        <p className="text-xs text-[#6A7066] mt-1">
          Your inquiry is logged with our Birgunj showroom, and you can instantly transfer this to WhatsApp for immediate concierge scheduling.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-6 bg-[#F8F5EE] border border-[#C6A66B]/50 rounded-sm space-y-4 text-center animate-in fade-in">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h4 className="font-serif text-xl text-[#252823]">
            Inquiry Registered with Birta Mai Jewellers
          </h4>
          <p className="text-xs text-[#6A7066] max-w-md mx-auto leading-relaxed">
            Thank you, {formData.fullName}. Your request has been recorded. For the fastest response, send your prepared details directly to our WhatsApp concierge.
          </p>

          {submittedWhatsAppUrl && (
            <div className="pt-2">
              <a
                href={submittedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider rounded-sm shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open in WhatsApp Now</span>
              </a>
            </div>
          )}

          <button
            onClick={() => {
              setStatus("idle");
              setFormData({
                fullName: "",
                phoneOrWhatsapp: "",
                inquiryType: "Bridal Consultation",
                preferredDate: "",
                productInterest: "",
                message: "",
              });
            }}
            className="text-xs text-[#123B32] underline block mx-auto pt-2 font-medium"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#252823] uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Aarav Shrestha"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#E4DBD0] rounded-xs text-[#252823] focus:outline-none focus:border-[#C6A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#252823] uppercase tracking-wider mb-1.5">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phoneOrWhatsapp}
                onChange={(e) => setFormData({ ...formData, phoneOrWhatsapp: e.target.value })}
                placeholder="e.g. +977 98XXXXXXXX"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#E4DBD0] rounded-xs text-[#252823] focus:outline-none focus:border-[#C6A66B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#252823] uppercase tracking-wider mb-1.5">
                Inquiry Type
              </label>
              <select
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#E4DBD0] rounded-xs text-[#252823] focus:outline-none focus:border-[#C6A66B]"
              >
                <option value="Bridal Consultation">Bridal Consultation</option>
                <option value="Custom Jewelry Order">Custom Bespoke Design</option>
                <option value="Product Price & Availability">Product Price & Availability</option>
                <option value="Bullion & Metal Exchange">Gold/Silver Bullion Exchange</option>
                <option value="Store Visit Appointment">In-Store Atelier Appointment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#252823] uppercase tracking-wider mb-1.5">
                Preferred Date (Optional)
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#E4DBD0] rounded-xs text-[#252823] focus:outline-none focus:border-[#C6A66B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#252823] uppercase tracking-wider mb-1.5">
              Specific Product or Collection of Interest (Optional)
            </label>
            <input
              type="text"
              value={formData.productInterest}
              onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
              placeholder="e.g. Royal Heritage Bridal Choker / 24K Rani Haar"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#E4DBD0] rounded-xs text-[#252823] focus:outline-none focus:border-[#C6A66B]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#252823] uppercase tracking-wider mb-1.5">
              Message or Requirements *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe what you are looking for, your budget range, or any specific design ideas..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8F5EE] border border-[#E4DBD0] rounded-xs text-[#252823] focus:outline-none focus:border-[#C6A66B]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#123B32] hover:bg-[#0D2A24] disabled:opacity-50 text-[#F8F5EE] px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md"
            >
              {loading ? (
                <span>Registering Inquiry...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>Submit Inquiry & Prepare WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

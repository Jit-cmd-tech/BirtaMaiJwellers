import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  ExternalLink,
} from "lucide-react";
import ContactForm from "./ContactForm";
import { getSettings } from "@/lib/db";
import { getGeneralWhatsAppUrl, DISPLAY_PHONE_NUMBER } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact & Visit Us | Birta Mai Jewellers, Birgunj",
  description:
    "Visit Birta Mai Jewellers at Bidhya Mandir, Birgunj, Nepal. Book bridal consultations, custom jewelry appointments, or reach out on WhatsApp at +977 9845033095.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <div className="bg-[#F8F5EE] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C6A66B] text-xs uppercase tracking-[0.25em] font-semibold">
            Bidhya Mandir • Birgunj
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#252823] font-normal mt-2 leading-tight">
            Visit Our Showroom & Atelier
          </h1>
          <div className="w-16 h-0.5 bg-[#C6A66B] mx-auto mt-4" />
          <p className="text-sm sm:text-base text-[#6A7066] mt-4 leading-relaxed">
            We look forward to welcoming you. Connect directly via WhatsApp, call our showroom, or schedule an in-store bridal consultation.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Address */}
          <div className="bg-[#FFFFFF] p-8 border border-[#E4DBD0] rounded-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F8F5EE] border border-[#C6A66B] flex items-center justify-center text-[#C6A66B]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#252823] font-medium">
              Atelier Location
            </h3>
            <p className="text-xs text-[#6A7066] leading-relaxed">
              {settings.address}
            </p>
            <div className="pt-2">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#123B32] hover:underline font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C6A66B]" />
              </a>
            </div>
          </div>

          {/* WhatsApp & Phone */}
          <div className="bg-[#FFFFFF] p-8 border border-[#E4DBD0] rounded-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F8F5EE] border border-[#25D366] flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <h3 className="font-serif text-lg text-[#252823] font-medium">
              WhatsApp & Voice Call
            </h3>
            <p className="text-xs text-[#6A7066] leading-relaxed">
              Direct line to our jewelry concierge for instant inquiries, live rates, and custom quotes.
            </p>
            <div className="pt-2 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                WhatsApp: +977 9845033095
              </a>
              <div>
                <a
                  href={`tel:${DISPLAY_PHONE_NUMBER.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#252823] hover:text-[#123B32] font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>Call {DISPLAY_PHONE_NUMBER}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-[#FFFFFF] p-8 border border-[#E4DBD0] rounded-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F8F5EE] border border-[#C6A66B] flex items-center justify-center text-[#C6A66B]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#252823] font-medium">
              Opening Hours
            </h3>
            <p className="text-xs text-[#6A7066] leading-relaxed">
              {settings.openingHours}
            </p>
            <div className="pt-2 text-[11px] text-[#6A7066]">
              * Special evening hours available by prior appointment during marriage seasons.
            </div>
          </div>
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Map & Travel Guide */}
          <div className="lg:col-span-5 space-y-6" id="map">
            <div className="bg-[#FFFFFF] p-6 border border-[#E4DBD0] rounded-sm shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#252823]">
                  <Navigation className="w-4 h-4 text-[#C6A66B]" />
                  <span>Store Directions</span>
                </div>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#123B32] hover:underline font-semibold"
                >
                  View Full Map →
                </a>
              </div>

              {/* Responsive Google Maps Embed centered on Birta Mandir Birgunj */}
              <div className="relative aspect-4/3 w-full bg-[#E4DBD0] rounded-xs overflow-hidden border border-[#E4DBD0]">
                <iframe
                  title="Birta Mai Jewellers Location Map"
                  src="https://maps.google.com/maps?q=27.0058105,84.8728762&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[15%] contrast-105"
                />
              </div>

              <div className="text-xs text-[#6A7066] leading-relaxed pt-2 space-y-2">
                <p>
                  <strong>How to reach:</strong> Situated at Birta Mandir in Birgunj, close to the town center. Easily accessible via local transport and private vehicles.
                </p>
                <p>
                  If you need guidance upon arrival in Birgunj, message us on WhatsApp at <strong>+977 9845033095</strong> and our staff will guide you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

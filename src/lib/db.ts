import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { supabase, getSupabaseAdminClient } from "./supabase";

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  category: string;
  material: string;
  purity: string | null;
  approximateWeight: string | null;
  stoneType: string | null;
  dimensions: string | null;
  craftsmanship: string | null;
  collection: string;
  price: number | null;
  currency: string;
  showPrice: boolean;
  stockStatus: "Available" | "Made to Order" | "Out of Stock";
  featured: boolean;
  isNewArrival: boolean;
  published: boolean;
  isDemo: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BusinessSettings {
  storeName: string;
  tagline: string;
  address: string;
  locationArea: string;
  city: string;
  country: string;
  whatsappNumber: string;
  phoneDisplay: string;
  openingHours: string;
  announcementText: string;
  announcementActive: boolean;
  brandStory: string;
  googleMapsUrl: string;
  facebookUrl: string;
  instagramUrl: string;
}

export interface MetalRates {
  goldFinePerTola: number;
  goldFinePer10g: number;
  silverPerTola: number;
  silverPer10g: number;
  lastUpdated: string;
  sourceAttribution: string;
  isAvailable: boolean;
}

export interface CustomerInquiry {
  id: string;
  fullName: string;
  phoneOrWhatsapp: string;
  inquiryType: string;
  preferredDate?: string;
  productInterest?: string;
  message: string;
  status: "New" | "Contacted" | "Completed";
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
}

export interface DatabaseSchema {
  products: Product[];
  settings: BusinessSettings;
  rates: MetalRates;
  inquiries: CustomerInquiry[];
  admin: AdminUser;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "store.json");

// Helpers to map between DB (snake_case) and App (camelCase)
function mapProductFromDb(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku,
    description: row.description || "",
    category: row.category,
    material: row.material || "Gold",
    purity: row.purity || null,
    approximateWeight: row.approximate_weight || null,
    stoneType: row.stone_type || null,
    dimensions: row.dimensions || null,
    craftsmanship: row.craftsmanship || null,
    collection: row.collection || "Traditional",
    price: row.price !== null && row.price !== undefined ? Number(row.price) : null,
    currency: row.currency || "NPR",
    showPrice: Boolean(row.show_price),
    stockStatus: (row.stock_status || "Available") as Product["stockStatus"],
    featured: Boolean(row.featured),
    isNewArrival: Boolean(row.is_new_arrival),
    published: Boolean(row.published),
    isDemo: Boolean(row.is_demo),
    images: Array.isArray(row.images) ? row.images : [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapProductToDb(p: Partial<Product> & { id: string }) {
  const row: Record<string, any> = {
    id: p.id,
  };
  if (p.name !== undefined) row.name = p.name;
  if (p.slug !== undefined) row.slug = p.slug;
  if (p.sku !== undefined) row.sku = p.sku;
  if (p.description !== undefined) row.description = p.description;
  if (p.category !== undefined) row.category = p.category;
  if (p.material !== undefined) row.material = p.material;
  if (p.purity !== undefined) row.purity = p.purity;
  if (p.approximateWeight !== undefined) row.approximate_weight = p.approximateWeight;
  if (p.stoneType !== undefined) row.stone_type = p.stoneType;
  if (p.dimensions !== undefined) row.dimensions = p.dimensions;
  if (p.craftsmanship !== undefined) row.craftsmanship = p.craftsmanship;
  if (p.collection !== undefined) row.collection = p.collection;
  if (p.price !== undefined) row.price = p.price;
  if (p.currency !== undefined) row.currency = p.currency;
  if (p.showPrice !== undefined) row.show_price = p.showPrice;
  if (p.stockStatus !== undefined) row.stock_status = p.stockStatus;
  if (p.featured !== undefined) row.featured = p.featured;
  if (p.isNewArrival !== undefined) row.is_new_arrival = p.isNewArrival;
  if (p.published !== undefined) row.published = p.published;
  if (p.isDemo !== undefined) row.is_demo = p.isDemo;
  if (p.images !== undefined) row.images = p.images;
  if (p.createdAt !== undefined) row.created_at = p.createdAt;
  if (p.updatedAt !== undefined) row.updated_at = p.updatedAt;
  return row;
}

function mapSettingsFromDb(row: any): BusinessSettings {
  return {
    storeName: row.store_name,
    tagline: row.tagline,
    address: row.address,
    locationArea: row.location_area,
    city: row.city,
    country: row.country,
    whatsappNumber: row.whatsapp_number,
    phoneDisplay: row.phone_display,
    openingHours: row.opening_hours,
    announcementText: row.announcement_text,
    announcementActive: Boolean(row.announcement_active),
    brandStory: row.brand_story,
    googleMapsUrl: row.google_maps_url,
    facebookUrl: row.facebook_url || "",
    instagramUrl: row.instagram_url || "",
  };
}

function mapRatesFromDb(row: any): MetalRates {
  return {
    goldFinePerTola: Number(row.gold_fine_per_tola),
    goldFinePer10g: Number(row.gold_fine_per_10g),
    silverPerTola: Number(row.silver_per_tola),
    silverPer10g: Number(row.silver_per_10g),
    lastUpdated: row.last_updated,
    sourceAttribution: row.source_attribution,
    isAvailable: Boolean(row.is_available),
  };
}

function mapInquiryFromDb(row: any): CustomerInquiry {
  return {
    id: row.id,
    fullName: row.full_name,
    phoneOrWhatsapp: row.phone_or_whatsapp,
    inquiryType: row.inquiry_type,
    preferredDate: row.preferred_date || undefined,
    productInterest: row.product_interest || undefined,
    message: row.message,
    status: row.status as CustomerInquiry["status"],
    createdAt: row.created_at,
  };
}

// Local cache / fallback reader
function getLocalFallback(): DatabaseSchema | null {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    }
  } catch (err) {
    console.error("Local fallback read error:", err);
  }
  return null;
}

function updateLocalMirror(modifier: (data: DatabaseSchema) => void): void {
  try {
    const data = getLocalFallback();
    if (data) {
      modifier(data);
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Local mirror sync error:", err);
  }
}

// ==========================================
// 1. PRODUCTS OPERATIONS
// ==========================================

export async function getAllProducts(): Promise<Product[]> {
  try {
    const adminClient = getSupabaseAdminClient();
    const { data, error } = await adminClient
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data.map(mapProductFromDb);
    }
  } catch (err) {
    console.warn("Supabase getAllProducts failed, falling back to local cache:", err);
  }

  const fallback = getLocalFallback();
  return fallback?.products || [];
}

export async function getPublishedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data.map(mapProductFromDb);
    }
  } catch (err) {
    console.warn("Supabase getPublishedProducts failed, falling back to local cache:", err);
  }

  const fallback = getLocalFallback();
  return (fallback?.products || []).filter((p) => p.published);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      return mapProductFromDb(data);
    }
  } catch (err) {
    console.warn("Supabase getProductBySlug failed, falling back to local cache:", err);
  }

  const fallback = getLocalFallback();
  return fallback?.products.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const adminClient = getSupabaseAdminClient();
    const { data, error } = await adminClient
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return mapProductFromDb(data);
    }
  } catch (err) {
    console.warn("Supabase getProductById failed, falling back to local cache:", err);
  }

  const fallback = getLocalFallback();
  return fallback?.products.find((p) => p.id === id);
}

export async function saveProduct(
  productData: Omit<Product, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<Product> {
  const now = new Date().toISOString();
  const id = productData.id || `prod-${Date.now()}`;
  const slug =
    productData.slug ||
    productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") ||
    `product-${Date.now()}`;
  const sku = productData.sku || `BMJ-${Date.now().toString().slice(-6)}`;

  const fullProduct: Product = {
    ...productData,
    id,
    slug,
    sku,
    createdAt: now,
    updatedAt: now,
  };

  const adminClient = getSupabaseAdminClient();
  const dbPayload = mapProductToDb(fullProduct);

  const { data, error } = await adminClient
    .from("products")
    .upsert(dbPayload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Supabase saveProduct error:", error);
    throw new Error(`Failed to save product in Supabase: ${error.message}`);
  }

  const saved = mapProductFromDb(data);

  // Sync local file mirror
  updateLocalMirror((db) => {
    const index = db.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      db.products[index] = saved;
    } else {
      db.products.unshift(saved);
    }
  });

  return saved;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const adminClient = getSupabaseAdminClient();
  const { error } = await adminClient.from("products").delete().eq("id", id);

  if (error) {
    console.error("Supabase deleteProduct error:", error);
    return false;
  }

  // Sync local file mirror
  updateLocalMirror((db) => {
    db.products = db.products.filter((p) => p.id !== id);
  });

  return true;
}

// ==========================================
// 2. BUSINESS SETTINGS OPERATIONS
// ==========================================

export async function getSettings(): Promise<BusinessSettings> {
  try {
    const { data, error } = await supabase
      .from("business_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (!error && data) {
      return mapSettingsFromDb(data);
    }
  } catch (err) {
    console.warn("Supabase getSettings failed, falling back to local cache:", err);
  }

  const fallback = getLocalFallback();
  return fallback?.settings || {
    storeName: "Birta Mai Jewellers",
    tagline: "Timeless Elegance • A Legacy of Beauty",
    address: "Birta Mandir, Birgunj, Nepal",
    locationArea: "Birta Mandir",
    city: "Birgunj",
    country: "Nepal",
    whatsappNumber: "9779845033095",
    phoneDisplay: "+977 9845033095",
    openingHours: "Sunday – Friday: 10:00 AM – 7:30 PM (Saturday on appointment)",
    announcementText: "Festive & Bridal Showcase • Visit our Atelier at Birta Mandir, Birgunj or Enquire via WhatsApp",
    announcementActive: true,
    brandStory: "",
    googleMapsUrl: "https://www.google.com/maps?q=27.0058105,84.8728762",
    facebookUrl: "",
    instagramUrl: "",
  };
}

export async function updateSettings(settingsData: Partial<BusinessSettings>): Promise<BusinessSettings> {
  const adminClient = getSupabaseAdminClient();
  const current = await getSettings();
  const updated: BusinessSettings = {
    ...current,
    ...settingsData,
  };

  const payload: Record<string, any> = { id: 1, updated_at: new Date().toISOString() };
  if (updated.storeName !== undefined) payload.store_name = updated.storeName;
  if (updated.tagline !== undefined) payload.tagline = updated.tagline;
  if (updated.address !== undefined) payload.address = updated.address;
  if (updated.locationArea !== undefined) payload.location_area = updated.locationArea;
  if (updated.city !== undefined) payload.city = updated.city;
  if (updated.country !== undefined) payload.country = updated.country;
  if (updated.whatsappNumber !== undefined) payload.whatsapp_number = updated.whatsappNumber;
  if (updated.phoneDisplay !== undefined) payload.phone_display = updated.phoneDisplay;
  if (updated.openingHours !== undefined) payload.opening_hours = updated.openingHours;
  if (updated.announcementText !== undefined) payload.announcement_text = updated.announcementText;
  if (updated.announcementActive !== undefined) payload.announcement_active = updated.announcementActive;
  if (updated.brandStory !== undefined) payload.brand_story = updated.brandStory;
  if (updated.googleMapsUrl !== undefined) payload.google_maps_url = updated.googleMapsUrl;
  if (updated.facebookUrl !== undefined) payload.facebook_url = updated.facebookUrl;
  if (updated.instagramUrl !== undefined) payload.instagram_url = updated.instagramUrl;

  const { data, error } = await adminClient
    .from("business_settings")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Supabase updateSettings error:", error);
    throw new Error(`Failed to update settings in Supabase: ${error.message}`);
  }

  const result = mapSettingsFromDb(data);
  updateLocalMirror((db) => {
    db.settings = result;
  });

  return result;
}

// ==========================================
// 3. PRECIOUS METAL RATES OPERATIONS
// ==========================================

export async function getRates(): Promise<MetalRates> {
  try {
    const { data, error } = await supabase
      .from("metal_rates")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (!error && data) {
      return mapRatesFromDb(data);
    }
  } catch (err) {
    console.warn("Supabase getRates failed, falling back to local cache:", err);
  }

  const fallback = getLocalFallback();
  return fallback?.rates || {
    goldFinePerTola: 161200,
    goldFinePer10g: 138200,
    silverPerTola: 1980,
    silverPer10g: 1697,
    lastUpdated: new Date().toISOString(),
    sourceAttribution: "Federation of Nepal Gold & Silver Dealers' Association (FENEGOSIDA) / Admin Managed",
    isAvailable: true,
  };
}

export async function updateRates(ratesData: Partial<MetalRates>): Promise<MetalRates> {
  const adminClient = getSupabaseAdminClient();
  const current = await getRates();
  const updated: MetalRates = {
    ...current,
    ...ratesData,
    lastUpdated: new Date().toISOString(),
  };

  const payload: Record<string, any> = {
    id: 1,
    gold_fine_per_tola: updated.goldFinePerTola,
    gold_fine_per_10g: updated.goldFinePer10g,
    silver_per_tola: updated.silverPerTola,
    silver_per_10g: updated.silverPer10g,
    source_attribution: updated.sourceAttribution,
    is_available: updated.isAvailable,
    last_updated: updated.lastUpdated,
  };

  const { data, error } = await adminClient
    .from("metal_rates")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("Supabase updateRates error:", error);
    throw new Error(`Failed to update rates in Supabase: ${error.message}`);
  }

  const result = mapRatesFromDb(data);
  updateLocalMirror((db) => {
    db.rates = result;
  });

  return result;
}

// ==========================================
// 4. CUSTOMER INQUIRIES OPERATIONS
// ==========================================

export async function getInquiries(): Promise<CustomerInquiry[]> {
  try {
    const adminClient = getSupabaseAdminClient();
    const { data, error } = await adminClient
      .from("customer_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data.map(mapInquiryFromDb);
    }
  } catch (err) {
    console.warn("Supabase getInquiries failed, falling back to local cache:", err);
  }

  const fallback = getLocalFallback();
  return fallback?.inquiries || [];
}

export async function saveInquiry(
  inquiryData: Omit<CustomerInquiry, "id" | "createdAt" | "status">
): Promise<CustomerInquiry> {
  const newInquiry: CustomerInquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };

  const payload = {
    id: newInquiry.id,
    full_name: newInquiry.fullName,
    phone_or_whatsapp: newInquiry.phoneOrWhatsapp,
    inquiry_type: newInquiry.inquiryType,
    preferred_date: newInquiry.preferredDate || null,
    product_interest: newInquiry.productInterest || null,
    message: newInquiry.message,
    status: newInquiry.status,
    created_at: newInquiry.createdAt,
    updated_at: newInquiry.createdAt,
  };

  // Uses admin client on the server to record inquiry and retrieve created record
  const adminClient = getSupabaseAdminClient();
  const { data, error } = await adminClient
    .from("customer_inquiries")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("Supabase saveInquiry error:", error);
    throw new Error(`Failed to save inquiry in Supabase: ${error.message}`);
  }

  const saved = mapInquiryFromDb(data);
  updateLocalMirror((db) => {
    if (!db.inquiries) db.inquiries = [];
    db.inquiries.unshift(saved);
  });

  return saved;
}

export async function updateInquiryStatus(id: string, status: CustomerInquiry["status"]): Promise<boolean> {
  const adminClient = getSupabaseAdminClient();
  const { error } = await adminClient
    .from("customer_inquiries")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Supabase updateInquiryStatus error:", error);
    return false;
  }

  updateLocalMirror((db) => {
    const inq = (db.inquiries || []).find((i) => i.id === id);
    if (inq) inq.status = status;
  });

  return true;
}

// ==========================================
// 5. ADMIN USER OPERATIONS
// ==========================================

export async function getAdminUser(): Promise<AdminUser> {
  try {
    const adminClient = getSupabaseAdminClient();
    const { data, error } = await adminClient
      .from("admin_users")
      .select("*")
      .eq("username", "admin")
      .maybeSingle();

    if (!error && data) {
      return {
        id: data.id,
        username: data.username,
        passwordHash: data.password_hash,
      };
    }
  } catch (err) {
    console.warn("Supabase getAdminUser failed, falling back to local cache:", err);
  }

  const fallback = getLocalFallback();
  if (fallback?.admin) return fallback.admin;

  const salt = bcrypt.genSaltSync(10);
  return {
    id: "admin-1",
    username: "admin",
    passwordHash: bcrypt.hashSync("BirtaMaiAdmin@2026", salt),
  };
}

export async function updateAdminPassword(newPasswordHash: string): Promise<void> {
  const adminClient = getSupabaseAdminClient();
  const { error } = await adminClient
    .from("admin_users")
    .update({ password_hash: newPasswordHash, updated_at: new Date().toISOString() })
    .eq("username", "admin");

  if (error) {
    console.error("Supabase updateAdminPassword error:", error);
    throw new Error(`Failed to update admin password: ${error.message}`);
  }

  updateLocalMirror((db) => {
    if (db.admin) db.admin.passwordHash = newPasswordHash;
  });
}

import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

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

const INITIAL_SETTINGS: BusinessSettings = {
  storeName: "Birta Mai Jewellers",
  tagline: "Timeless Elegance • A Legacy of Beauty",
  address: "Bidhya Mandir, Birgunj, Nepal",
  locationArea: "Bidhya Mandir",
  city: "Birgunj",
  country: "Nepal",
  whatsappNumber: "9779845033095",
  phoneDisplay: "+977 9845033095",
  openingHours: "Sunday – Friday: 10:00 AM – 7:30 PM (Saturday on appointment)",
  announcementText: "Festive & Bridal Showcase • Visit our Atelier at Bidhya Mandir, Birgunj or Enquire via WhatsApp",
  announcementActive: true,
  brandStory:
    "Birta Mai Jewellers brings the pinnacle of precious metal artistry and timeless craftsmanship to Birgunj, Nepal. Rooted at Bidhya Mandir, we curate and handcraft certified 24K and 22K gold heirlooms, diamond solitaires, and antique silver artifacts to mark life's most cherished milestones.",
  googleMapsUrl: "https://www.google.com/maps?q=27.0058105,84.8728762",
  facebookUrl: "",
  instagramUrl: "",
};

const INITIAL_RATES: MetalRates = {
  goldFinePerTola: 161200,
  goldFinePer10g: 138200,
  silverPerTola: 1980,
  silverPer10g: 1697,
  lastUpdated: new Date().toISOString(),
  sourceAttribution: "Federation of Nepal Gold & Silver Dealers' Association (FENEGOSIDA) / Admin Managed",
  isAvailable: true,
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Royal Heritage Bridal Choker Set",
    slug: "royal-heritage-bridal-choker-set",
    sku: "BMJ-BR-0101",
    description:
      "A magnificent handcrafted 22K gold bridal choker adorned with lustrous Basra seed pearls, emerald motifs, and intricate Nakashi filigree. Comes with matching royal jhumkas and maang tikka.",
    category: "Bridal Jewelry",
    material: "Gold",
    purity: "22K (916 Hallmarked)",
    approximateWeight: "78.50 g (approx.)",
    stoneType: "Uncut Polki & Natural Green Emeralds",
    dimensions: "Adjustable dori choker length",
    craftsmanship: "Authentic Handcrafted Filigree & Kundan Setting",
    collection: "Bridal",
    price: 980000,
    currency: "NPR",
    showPrice: true,
    stockStatus: "Available",
    featured: true,
    isNewArrival: true,
    published: true,
    isDemo: true,
    images: ["/images/hero_bridal.jpg", "/images/cat_bridal.jpg"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-2",
    name: "Imperial Kundan & Pearl Gold Choker",
    slug: "imperial-kundan-pearl-gold-choker",
    sku: "BMJ-BR-0102",
    description:
      "Sculpted with regal precision, this 22K yellow gold choker displays brilliant uncut stones nestled against delicate pearl fringe. Designed for the modern discerning bride.",
    category: "Bridal Jewelry",
    material: "Gold",
    purity: "22K (916)",
    approximateWeight: "62.20 g (approx.)",
    stoneType: "Fine Uncut Stones & Basra Pearls",
    dimensions: "16-inch adjustable collar",
    craftsmanship: "Artisan Meenakari back with handcrafted bezel",
    collection: "Bridal",
    price: 765000,
    currency: "NPR",
    showPrice: true,
    stockStatus: "Available",
    featured: true,
    isNewArrival: false,
    published: true,
    isDemo: true,
    images: ["/images/cat_bridal.jpg"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-3",
    name: "Handcrafted Peacock Royal Gold Kadas",
    slug: "handcrafted-peacock-royal-gold-kadas",
    sku: "BMJ-BG-0201",
    description:
      "A peerless pair of 22K gold hinged bangles (kadas) engraved with auspicious peacock feather filigree, mirror polish, and high-relief repoussé detailing.",
    category: "Bangles & Bracelets",
    material: "Gold",
    purity: "22K (916)",
    approximateWeight: "46.80 g (pair approx.)",
    stoneType: "Micro-pavé synthetic accents",
    dimensions: "Size 2.6 (Custom sizes on request)",
    craftsmanship: "Traditional Birgunj Goldsmith Hand Repoussé",
    collection: "Traditional",
    price: 580000,
    currency: "NPR",
    showPrice: true,
    stockStatus: "Available",
    featured: true,
    isNewArrival: true,
    published: true,
    isDemo: true,
    images: ["/images/cat_bangles.jpg"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-4",
    name: "Eternal Solitaire & Vintage Engraved Gold Band",
    slug: "eternal-solitaire-vintage-engraved-gold-band",
    sku: "BMJ-RG-0301",
    description:
      "A breathtaking combination of an ornate 24K yellow gold vintage engraved band paired with a brilliant-cut solitaire diamond setting. Exemplifies eternal commitment.",
    category: "Rings",
    material: "Diamond",
    purity: "18K Gold / VVS1 Diamond",
    approximateWeight: "8.40 g (approx.)",
    stoneType: "1.20 ct Round Brilliant Cut Diamond (G Color, VVS1)",
    dimensions: "US Size 7 (Resizing available)",
    craftsmanship: "Micro-engraved milgrain scrollwork",
    collection: "Contemporary",
    price: null,
    currency: "NPR",
    showPrice: false,
    stockStatus: "Made to Order",
    featured: true,
    isNewArrival: false,
    published: true,
    isDemo: true,
    images: ["/images/cat_rings.jpg", "/images/ring_detail.jpg"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-5",
    name: "Grand Heirloom Gold Jhumkas with Pearl Droplets",
    slug: "grand-heirloom-gold-jhumkas-pearl-droplets",
    sku: "BMJ-ER-0401",
    description:
      "Two-tier cascading 22K gold bridal jhumka earrings featuring floral studs, ruby cabochon centers, fine filigree bells, and graduated Basra pearl tassels.",
    category: "Earrings",
    material: "Gold",
    purity: "22K (916)",
    approximateWeight: "32.10 g (approx.)",
    stoneType: "Natural Rubies & Basra Seed Pearls",
    dimensions: "7.5 cm drop length",
    craftsmanship: "Master filigree wirework and threaded post closure",
    collection: "Bridal",
    price: 395000,
    currency: "NPR",
    showPrice: true,
    stockStatus: "Available",
    featured: true,
    isNewArrival: true,
    published: true,
    isDemo: true,
    images: ["/images/cat_earrings.jpg"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-6",
    name: "Antique Embossed Nepalese Silver Kalash & Ritual Set",
    slug: "antique-embossed-nepalese-silver-kalash",
    sku: "BMJ-SV-0501",
    description:
      "Hand-chiseled 925 sterling silver auspicious Kalash urn and ceremonial puja accessories featuring sacred Om and floral repoussé patterns. Ideal for weddings and home sanctums.",
    category: "Silver Jewelry & Artifacts",
    material: "Silver",
    purity: "92.5% Sterling Silver",
    approximateWeight: "480.00 g (approx.)",
    stoneType: "None",
    dimensions: "Height: 22 cm, Diameter: 14 cm",
    craftsmanship: "Traditional Nepalese Hand Chiseling & Oxidation Polish",
    collection: "Traditional",
    price: 95000,
    currency: "NPR",
    showPrice: true,
    stockStatus: "Available",
    featured: true,
    isNewArrival: false,
    published: true,
    isDemo: true,
    images: ["/images/cat_silver.jpg"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-7",
    name: "Classic 24K Pure Gold Floral Pendant Chain",
    slug: "classic-24k-pure-gold-floral-pendant-chain",
    sku: "BMJ-NK-0601",
    description:
      "Radiant 24K pure gold necklace featuring fine link geometry and a delicate blooming floral pendant, crafted to grace daily occasions and festive celebrations.",
    category: "Gold Necklaces",
    material: "Gold",
    purity: "24K (999 Pure)",
    approximateWeight: "22.50 g (approx.)",
    stoneType: "Pure Gold Only",
    dimensions: "18-inch chain with 2-inch extension",
    craftsmanship: "High-precision Italian link weaving with Nepalese pendant casting",
    collection: "Daily Wear",
    price: 310000,
    currency: "NPR",
    showPrice: true,
    stockStatus: "Available",
    featured: false,
    isNewArrival: true,
    published: true,
    isDemo: true,
    images: ["/images/cat_necklace.jpg"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod-8",
    name: "Bespoke Royal Vivaha Bridal Rani Haar",
    slug: "bespoke-royal-vivaha-bridal-rani-haar",
    sku: "BMJ-BR-0103",
    description:
      "An opulent multi-layer royal gold Rani Haar with intricate peacock medallions and emerald drops. Crafted upon custom order for grand bridal weddings.",
    category: "Bridal Jewelry",
    material: "Gold",
    purity: "22K (916)",
    approximateWeight: "115.00 g (approx.)",
    stoneType: "Natural Emeralds & Kundan",
    dimensions: "26-inch majestic drop",
    craftsmanship: "Bespoke Royal Master Goldsmith Craftsmanship",
    collection: "Bridal",
    price: null,
    currency: "NPR",
    showPrice: false,
    stockStatus: "Made to Order",
    featured: true,
    isNewArrival: false,
    published: true,
    isDemo: true,
    images: ["/images/bridal_editorial.jpg", "/images/hero_bridal.jpg"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function initDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    // Default admin: username: "admin", password: "BirtaMaiAdmin@2026"
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync("BirtaMaiAdmin@2026", salt);

    const initialDb: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      settings: INITIAL_SETTINGS,
      rates: INITIAL_RATES,
      inquiries: [],
      admin: {
        id: "admin-1",
        username: "admin",
        passwordHash,
      },
    };

    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), "utf8");
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const data = JSON.parse(raw);
    return data;
  } catch (error) {
    console.error("Error reading database file, reinitializing...", error);
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync("BirtaMaiAdmin@2026", salt);
    const fallbackDb: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      settings: INITIAL_SETTINGS,
      rates: INITIAL_RATES,
      inquiries: [],
      admin: {
        id: "admin-1",
        username: "admin",
        passwordHash,
      },
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(fallbackDb, null, 2), "utf8");
    return fallbackDb;
  }
}

function writeDatabase(data: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tempFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tempFile, DB_FILE);
}

// Data access operations
export function getDatabase(): DatabaseSchema {
  return initDatabase();
}

export function getAllProducts(): Product[] {
  const db = getDatabase();
  return db.products;
}

export function getPublishedProducts(): Product[] {
  const db = getDatabase();
  return db.products.filter((p) => p.published);
}

export function getProductBySlug(slug: string): Product | undefined {
  const db = getDatabase();
  return db.products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  const db = getDatabase();
  return db.products.find((p) => p.id === id);
}

export function saveProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt"> & { id?: string }): Product {
  const db = getDatabase();
  const now = new Date().toISOString();

  if (productData.id) {
    const index = db.products.findIndex((p) => p.id === productData.id);
    if (index !== -1) {
      const updated: Product = {
        ...db.products[index],
        ...productData,
        id: productData.id,
        updatedAt: now,
      };
      db.products[index] = updated;
      writeDatabase(db);
      return updated;
    }
  }

  const newId = `prod-${Date.now()}`;
  const newProduct: Product = {
    ...productData,
    id: newId,
    createdAt: now,
    updatedAt: now,
  };
  db.products.unshift(newProduct);
  writeDatabase(db);
  return newProduct;
}

export function deleteProduct(id: string): boolean {
  const db = getDatabase();
  const beforeCount = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length !== beforeCount) {
    writeDatabase(db);
    return true;
  }
  return false;
}

export function getSettings(): BusinessSettings {
  const db = getDatabase();
  return db.settings;
}

export function updateSettings(settingsData: Partial<BusinessSettings>): BusinessSettings {
  const db = getDatabase();
  db.settings = {
    ...db.settings,
    ...settingsData,
  };
  writeDatabase(db);
  return db.settings;
}

export function getRates(): MetalRates {
  const db = getDatabase();
  return db.rates;
}

export function updateRates(ratesData: Partial<MetalRates>): MetalRates {
  const db = getDatabase();
  db.rates = {
    ...db.rates,
    ...ratesData,
    lastUpdated: new Date().toISOString(),
  };
  writeDatabase(db);
  return db.rates;
}

export function getInquiries(): CustomerInquiry[] {
  const db = getDatabase();
  return db.inquiries || [];
}

export function saveInquiry(inquiryData: Omit<CustomerInquiry, "id" | "createdAt" | "status">): CustomerInquiry {
  const db = getDatabase();
  const newInquiry: CustomerInquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  if (!db.inquiries) db.inquiries = [];
  db.inquiries.unshift(newInquiry);
  writeDatabase(db);
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: CustomerInquiry["status"]): boolean {
  const db = getDatabase();
  const inq = (db.inquiries || []).find((i) => i.id === id);
  if (inq) {
    inq.status = status;
    writeDatabase(db);
    return true;
  }
  return false;
}

export function getAdminUser(): AdminUser {
  const db = getDatabase();
  return db.admin;
}

export function updateAdminPassword(newPasswordHash: string): void {
  const db = getDatabase();
  db.admin.passwordHash = newPasswordHash;
  writeDatabase(db);
}

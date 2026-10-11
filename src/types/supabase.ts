export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          password_hash: string
          role: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          password_hash: string
          role?: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          password_hash?: string
          role?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      business_settings: {
        Row: {
          address: string
          announcement_active: boolean
          announcement_text: string
          brand_story: string
          city: string
          country: string
          created_at: string
          facebook_url: string | null
          google_maps_url: string
          id: number
          instagram_url: string | null
          location_area: string
          opening_hours: string
          phone_display: string
          store_name: string
          tagline: string
          updated_at: string
          whatsapp_number: string
        }
        Insert: {
          address?: string
          announcement_active?: boolean
          announcement_text?: string
          brand_story?: string
          city?: string
          country?: string
          created_at?: string
          facebook_url?: string | null
          google_maps_url?: string
          id?: number
          instagram_url?: string | null
          location_area?: string
          opening_hours?: string
          phone_display?: string
          store_name?: string
          tagline?: string
          updated_at?: string
          whatsapp_number?: string
        }
        Update: {
          address?: string
          announcement_active?: boolean
          announcement_text?: string
          brand_story?: string
          city?: string
          country?: string
          created_at?: string
          facebook_url?: string | null
          google_maps_url?: string
          id?: number
          instagram_url?: string | null
          location_area?: string
          opening_hours?: string
          phone_display?: string
          store_name?: string
          tagline?: string
          updated_at?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
      customer_inquiries: {
        Row: {
          created_at: string
          full_name: string
          id: string
          inquiry_type: string
          message: string
          phone_or_whatsapp: string
          preferred_date: string | null
          product_interest: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id: string
          inquiry_type?: string
          message: string
          phone_or_whatsapp: string
          preferred_date?: string | null
          product_interest?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          inquiry_type?: string
          message?: string
          phone_or_whatsapp?: string
          preferred_date?: string | null
          product_interest?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      metal_rates: {
        Row: {
          gold_fine_per_10g: number
          gold_fine_per_tola: number
          id: number
          is_available: boolean
          last_updated: string
          silver_per_10g: number
          silver_per_tola: number
          source_attribution: string
        }
        Insert: {
          gold_fine_per_10g?: number
          gold_fine_per_tola?: number
          id?: number
          is_available?: boolean
          last_updated?: string
          silver_per_10g?: number
          silver_per_tola?: number
          source_attribution?: string
        }
        Update: {
          gold_fine_per_10g?: number
          gold_fine_per_tola?: number
          id?: number
          is_available?: boolean
          last_updated?: string
          silver_per_10g?: number
          silver_per_tola?: number
          source_attribution?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          approximate_weight: string | null
          category: string
          collection: string
          craftsmanship: string | null
          created_at: string
          currency: string
          description: string
          dimensions: string | null
          featured: boolean
          id: string
          images: string[]
          is_demo: boolean
          is_new_arrival: boolean
          material: string
          name: string
          price: number | null
          published: boolean
          purity: string | null
          show_price: boolean
          sku: string
          slug: string
          stock_status: string
          stone_type: string | null
          updated_at: string
        }
        Insert: {
          approximate_weight?: string | null
          category: string
          collection?: string
          craftsmanship?: string | null
          created_at?: string
          currency?: string
          description?: string
          dimensions?: string | null
          featured?: boolean
          id: string
          images?: string[]
          is_demo?: boolean
          is_new_arrival?: boolean
          material?: string
          name: string
          price?: number | null
          published?: boolean
          purity?: string | null
          show_price?: boolean
          sku: string
          slug: string
          stock_status?: string
          stone_type?: string | null
          updated_at?: string
        }
        Update: {
          approximate_weight?: string | null
          category?: string
          collection?: string
          craftsmanship?: string | null
          created_at?: string
          currency?: string
          description?: string
          dimensions?: string | null
          featured?: boolean
          id?: string
          images?: string[]
          is_demo?: boolean
          is_new_arrival?: boolean
          material?: string
          name?: string
          price?: number | null
          published?: boolean
          purity?: string | null
          show_price?: boolean
          sku?: string
          slug?: string
          stock_status?: string
          stone_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin_request: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

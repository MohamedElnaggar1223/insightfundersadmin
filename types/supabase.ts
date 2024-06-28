export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      faqs: {
        Row: {
          answer: string | null
          id: number
          question: string
          tab: Database["public"]["Enums"]["faqs_tabs"] | null
        }
        Insert: {
          answer?: string | null
          id?: number
          question: string
          tab?: Database["public"]["Enums"]["faqs_tabs"] | null
        }
        Update: {
          answer?: string | null
          id?: number
          question?: string
          tab?: Database["public"]["Enums"]["faqs_tabs"] | null
        }
        Relationships: []
      }
      investors: {
        Row: {
          accepted: boolean
          company_email: string | null
          company_name: string | null
          company_website: string | null
          geographies_served:
            | Database["public"]["Enums"]["geographies_served"][]
            | null
          id: number
          max_facility_size:
            | Database["public"]["Enums"]["max_facility_size"]
            | null
          minimum_revenue_requirement:
            | Database["public"]["Enums"]["minimum_revenue_requirement"]
            | null
          products_offered:
            | Database["public"]["Enums"]["products_offered"][]
            | null
          submitted: boolean | null
          user_id: string
        }
        Insert: {
          accepted?: boolean
          company_email?: string | null
          company_name?: string | null
          company_website?: string | null
          geographies_served?:
            | Database["public"]["Enums"]["geographies_served"][]
            | null
          id?: number
          max_facility_size?:
            | Database["public"]["Enums"]["max_facility_size"]
            | null
          minimum_revenue_requirement?:
            | Database["public"]["Enums"]["minimum_revenue_requirement"]
            | null
          products_offered?:
            | Database["public"]["Enums"]["products_offered"][]
            | null
          submitted?: boolean | null
          user_id?: string
        }
        Update: {
          accepted?: boolean
          company_email?: string | null
          company_name?: string | null
          company_website?: string | null
          geographies_served?:
            | Database["public"]["Enums"]["geographies_served"][]
            | null
          id?: number
          max_facility_size?:
            | Database["public"]["Enums"]["max_facility_size"]
            | null
          minimum_revenue_requirement?:
            | Database["public"]["Enums"]["minimum_revenue_requirement"]
            | null
          products_offered?:
            | Database["public"]["Enums"]["products_offered"][]
            | null
          submitted?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "investors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      startups: {
        Row: {
          accepted: boolean
          address: string | null
          business_structure:
            | Database["public"]["Enums"]["business_structure"]
            | null
          company_name: string | null
          EIN: string | null
          email: string | null
          id: number
          industry_sector:
            | Database["public"]["Enums"]["industry_and_sector"]
            | null
          other_industry_and_sector: string | null
          phone_number: string | null
          submitted: boolean
          user_id: string
        }
        Insert: {
          accepted?: boolean
          address?: string | null
          business_structure?:
            | Database["public"]["Enums"]["business_structure"]
            | null
          company_name?: string | null
          EIN?: string | null
          email?: string | null
          id?: number
          industry_sector?:
            | Database["public"]["Enums"]["industry_and_sector"]
            | null
          other_industry_and_sector?: string | null
          phone_number?: string | null
          submitted?: boolean
          user_id?: string
        }
        Update: {
          accepted?: boolean
          address?: string | null
          business_structure?:
            | Database["public"]["Enums"]["business_structure"]
            | null
          company_name?: string | null
          EIN?: string | null
          email?: string | null
          id?: number
          industry_sector?:
            | Database["public"]["Enums"]["industry_and_sector"]
            | null
          other_industry_and_sector?: string | null
          phone_number?: string | null
          submitted?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "startups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      startups_owners: {
        Row: {
          id: number
          name: string | null
          share: number | null
          startup_id: number
        }
        Insert: {
          id?: number
          name?: string | null
          share?: number | null
          startup_id: number
        }
        Update: {
          id?: number
          name?: string | null
          share?: number | null
          startup_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "startups_owners_startup_id_fkey"
            columns: ["startup_id"]
            isOneToOne: false
            referencedRelation: "startups"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          first_name: string
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          first_name: string
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          first_name?: string
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      business_structure:
        | "Sole Proprietorship"
        | "Partnership"
        | "Corporation"
        | "S Corporation"
        | "Limited Liability Company"
      faqs_tabs: "General Questions" | "For Startups" | "For Investors"
      geographies_served:
        | "United States"
        | "Canada"
        | "Mexico"
        | "United Kingdom"
        | "Other"
      industry_and_sector:
        | "Technology"
        | "Healthcare"
        | "Financial Services"
        | "Consumer Goods"
        | "Industrial Goods"
        | "Energy"
        | "Real Estate"
        | "Retail"
        | "Media and Entertainment"
        | "Transportation"
        | "Telecommunications"
        | "Agriculture"
        | "Education"
        | "Hospitality and Leisure"
        | "Utilities"
        | "Other"
      max_facility_size:
        | "N/A"
        | "<$1M"
        | "$1-10M"
        | "$10-50M"
        | "$50-250M"
        | "$250M+"
      minimum_revenue_requirement:
        | "N/A"
        | "<$1M"
        | "$1-10M"
        | "$10-50M"
        | "$50-100M"
        | "$100M+"
      products_offered:
        | "Venture Debt"
        | "Asset-Based Lending"
        | "Warehouse Lending"
        | "Invoice and Contract Factoring"
        | "Revenue-Based Financing"
        | "Equipment Leasing"
        | "M&A"
        | "Recapitalizations and Refinancing"
        | "Buyouts"
        | "Bridge Loans"
        | "Other"
      user_role: "startup" | "investor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

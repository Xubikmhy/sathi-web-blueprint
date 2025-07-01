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
      appointments: {
        Row: {
          appointment_date: string
          client_id: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          location: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          appointment_date: string
          client_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          location?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          appointment_date?: string
          client_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          location?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          city: string | null
          client_type: Database["public"]["Enums"]["client_type"]
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          pan_number: string | null
          phone: string | null
          registration_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          client_type?: Database["public"]["Enums"]["client_type"]
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          pan_number?: string | null
          phone?: string | null
          registration_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          city?: string | null
          client_type?: Database["public"]["Enums"]["client_type"]
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          pan_number?: string | null
          phone?: string | null
          registration_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          responded_at: string | null
          status: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          responded_at?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          responded_at?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          client_id: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          name: string
          service_id: string | null
          uploaded_at: string
          user_id: string
        }
        Insert: {
          client_id?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          name: string
          service_id?: string | null
          uploaded_at?: string
          user_id: string
        }
        Update: {
          client_id?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          name?: string
          service_id?: string | null
          uploaded_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          amount: number | null
          client_id: string
          completion_date: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          notes: string | null
          service_name: string
          start_date: string | null
          status: Database["public"]["Enums"]["service_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          client_id: string
          completion_date?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          service_name: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["service_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number | null
          client_id?: string
          completion_date?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          service_name?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["service_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
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
      client_type: "individual" | "business" | "organization"
      document_type:
        | "tax_return"
        | "financial_statement"
        | "receipt"
        | "contract"
        | "other"
      service_status: "pending" | "in_progress" | "completed" | "on_hold"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      client_type: ["individual", "business", "organization"],
      document_type: [
        "tax_return",
        "financial_statement",
        "receipt",
        "contract",
        "other",
      ],
      service_status: ["pending", "in_progress", "completed", "on_hold"],
    },
  },
} as const

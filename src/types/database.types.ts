export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  links: {
    Tables: {
      process_step: {
        Row: {
          created_at: string
          id: number
          link_id: number | null
          step: number | null
          summary: string | null
          transcript: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          link_id?: number | null
          step?: number | null
          summary?: string | null
          transcript?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          link_id?: number | null
          step?: number | null
          summary?: string | null
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "process_step_link_id_fkey"
            columns: ["link_id"]
            referencedRelation: "queries"
            referencedColumns: ["id"]
          }
        ]
      }
      queries: {
        Row: {
          created_at: string
          id: number
          link: string
          uuid: string
        }
        Insert: {
          created_at?: string
          id?: number
          link: string
          uuid?: string
        }
        Update: {
          created_at?: string
          id?: number
          link?: string
          uuid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

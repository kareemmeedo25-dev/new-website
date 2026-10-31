import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const isValidUrl = (url: unknown): url is string => {
  if (typeof url !== 'string' || !url.trim()) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export type Database = {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export const isSupabaseConfigured = Boolean(
  isValidUrl(supabaseUrl) && typeof supabaseAnonKey === 'string' && supabaseAnonKey.trim().length > 0,
);

let client: SupabaseClient<Database>;

if (isSupabaseConfigured && supabaseUrl && supabaseAnonKey) {
  client = createClient<Database>(supabaseUrl, supabaseAnonKey);
} else {
  // When no backend credentials are provided in .env, do not fake a database insertion success
  client = {
    from: () => ({
      insert: async () => {
        return {
          data: null,
          error: {
            message:
              'Backend database is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment, or send directly via Email or WhatsApp.',
            details: 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment variables.',
            hint: 'See the backend setup guide in the Contact section.',
            code: 'BACKEND_NOT_CONFIGURED',
          },
        };
      },
      select: () => ({
        data: [],
        error: {
          message: 'Backend database is not configured.',
          details: 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.',
          hint: '',
          code: 'BACKEND_NOT_CONFIGURED',
        },
      }),
    }),
  } as unknown as SupabaseClient<Database>;
}

export const supabase = client;

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};


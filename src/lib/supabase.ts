import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  display_name: string;
  description: string;
  created_at: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category_id: string;
  image_url: string;
  preview_video_url?: string;
  download_url: string;
  file_size: string;
  downloads: number;
  rating: number;
  tags: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

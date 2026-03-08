/*
  # Create Customization Items Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text) - Category name (widgets, animated-wallpapers, live-wallpapers)
      - `display_name` (text) - Display name for UI
      - `description` (text) - Category description
      - `created_at` (timestamptz)
    
    - `items`
      - `id` (uuid, primary key)
      - `title` (text) - Item title
      - `description` (text) - Item description
      - `category_id` (uuid, foreign key to categories)
      - `image_url` (text) - Preview image URL
      - `preview_video_url` (text, optional) - Preview video URL for animated items
      - `download_url` (text) - Download link
      - `file_size` (text) - File size display
      - `downloads` (integer) - Download count
      - `rating` (numeric) - Average rating
      - `tags` (text array) - Tags for filtering
      - `featured` (boolean) - Whether item is featured
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Allow public read access for browsing
    - Restrict write access (for future admin functionality)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  preview_video_url text,
  download_url text NOT NULL,
  file_size text NOT NULL DEFAULT '0 MB',
  downloads integer DEFAULT 0,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  tags text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

-- Public read access for items
CREATE POLICY "Anyone can view items"
  ON items FOR SELECT
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_items_category_id ON items(category_id);
CREATE INDEX IF NOT EXISTS idx_items_featured ON items(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at DESC);

-- Insert default categories
INSERT INTO categories (name, display_name, description) VALUES
  ('widgets', 'Widgets', 'Interactive desktop widgets for productivity, weather, system monitoring, and more'),
  ('animated-wallpapers', 'Animated Wallpapers', 'Beautiful animated backgrounds that bring your desktop to life'),
  ('live-wallpapers', 'Live Wallpapers', 'Dynamic wallpapers that respond to music, system activity, and time of day')
ON CONFLICT (name) DO NOTHING;
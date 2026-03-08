import { useEffect, useState } from 'react';
import { supabase, Item } from '../lib/supabase';
import { Download, Star, TrendingUp } from 'lucide-react';

interface FeaturedItemsProps {
  onItemClick: (item: Item) => void;
}

export function FeaturedItems({ onItemClick }: FeaturedItemsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedItems();
  }, []);

  async function loadFeaturedItems() {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading featured items:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-slate-400">Loading featured items...</div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h2 className="text-4xl font-bold text-slate-900">
                Featured This Week
              </h2>
            </div>
            <p className="text-xl text-slate-600">
              Hand-picked by our team
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              className="group bg-slate-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative aspect-video bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{item.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{item.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="text-sm font-semibold text-slate-500">
                    {item.file_size}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

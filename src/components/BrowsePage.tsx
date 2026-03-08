import { useEffect, useState } from 'react';
import { supabase, Item, Category } from '../lib/supabase';
import { Download, Star, Filter, Search } from 'lucide-react';

interface BrowsePageProps {
  onItemClick: (item: Item) => void;
  initialCategory?: string;
}

export function BrowsePage({ onItemClick, initialCategory }: BrowsePageProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCategories();
    loadItems();
  }, []);

  useEffect(() => {
    loadItems();
  }, [selectedCategory]);

  async function loadCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  async function loadItems() {
    try {
      setLoading(true);
      let query = supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        const category = categories.find(c => c.name === selectedCategory);
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Browse Collection</h1>
          <p className="text-xl text-slate-300">
            Discover the perfect customization for your Windows desktop
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-slate-600" />
                <h3 className="font-bold text-lg text-slate-900">Categories</h3>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  All Items
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {category.display_name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-2">Get the Desktop App</h3>
              <p className="text-sm mb-4 opacity-90">
                One-click installation and automatic updates
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-slate-100 transition-colors">
                Download Now
              </button>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search widgets, wallpapers, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none text-slate-900 bg-white shadow-sm"
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="animate-pulse text-slate-400 text-lg">Loading items...</div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No items found matching your search.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 text-slate-600">
                  Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onItemClick(item)}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-video bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {item.featured && (
                          <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-500 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3 text-slate-500">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{item.rating.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              <span>{item.downloads.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="text-slate-500 font-medium">
                            {item.file_size}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

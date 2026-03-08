import { Item } from '../lib/supabase';
import { Download, Star, ArrowLeft, Tag, HardDrive } from 'lucide-react';

interface ItemDetailProps {
  item: Item;
  onBack: () => void;
}

export function ItemDetail({ item, onBack }: ItemDetailProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Browse
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl mb-6">
              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {item.preview_video_url && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-video bg-slate-900">
                  <video
                    src={item.preview_video_url}
                    controls
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
              {item.featured && (
                <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Featured
                </div>
              )}

              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {item.title}
              </h1>

              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold text-slate-900">
                    {item.rating.toFixed(1)}
                  </span>
                  <span className="text-slate-500">rating</span>
                </div>

                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-slate-500" />
                  <span className="text-2xl font-bold text-slate-900">
                    {item.downloads.toLocaleString()}
                  </span>
                  <span className="text-slate-500">downloads</span>
                </div>
              </div>

              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                {item.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <HardDrive className="w-5 h-5" />
                  <span>File Size:</span>
                  <span className="font-semibold text-slate-900">{item.file_size}</span>
                </div>

                {item.tags.length > 0 && (
                  <div className="flex items-start gap-3 text-slate-600">
                    <Tag className="w-5 h-5 mt-1" />
                    <div>
                      <span className="block mb-2">Tags:</span>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3">
                <Download className="w-6 h-6" />
                Download Now
              </button>

              <p className="text-center text-sm text-slate-500 mt-4">
                Free to download and use on Windows 10/11
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-2">Need Help Installing?</h3>
              <p className="mb-4 opacity-90">
                Download our desktop app for automatic installation and updates
              </p>
              <button className="bg-white text-emerald-600 font-semibold px-6 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                Get Desktop App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

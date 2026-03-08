import { Sparkles, Download } from 'lucide-react';

interface HeroProps {
  onBrowse: () => void;
}

export function Hero({ onBrowse }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzFhMjAzZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500/20 p-4 rounded-2xl backdrop-blur-sm">
              <Sparkles className="w-16 h-16 text-blue-400" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Windows Desktop
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover stunning widgets, animated wallpapers, and live backgrounds that make your PC uniquely yours
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onBrowse}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-xl shadow-blue-500/30"
            >
              Browse Collection
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Get Desktop App
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-slate-400">Customizations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">100K+</div>
              <div className="text-slate-400">Downloads</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">4.8</div>
              <div className="text-slate-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Layers, Sparkles, PlayCircle, ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  onCategoryClick: (category: string) => void;
}

export function CategorySection({ onCategoryClick }: CategorySectionProps) {
  const categories = [
    {
      id: 'widgets',
      name: 'Widgets',
      description: 'Interactive desktop tools for productivity, weather, system monitoring, and more',
      icon: Layers,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
    },
    {
      id: 'animated-wallpapers',
      name: 'Animated Wallpapers',
      description: 'Beautiful animated backgrounds that bring your desktop to life',
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
    },
    {
      id: 'live-wallpapers',
      name: 'Live Wallpapers',
      description: 'Dynamic wallpapers that respond to music, system activity, and time of day',
      icon: PlayCircle,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Choose Your Style
          </h2>
          <p className="text-xl text-slate-600">
            Explore our curated collection of desktop customizations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${category.bgGradient} rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 bg-gradient-to-br ${category.gradient} bg-clip-text text-transparent`} strokeWidth={2.5} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {category.name}
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex items-center text-blue-500 font-semibold group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

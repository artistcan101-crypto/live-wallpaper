import { Monitor, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'browse') => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Monitor className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">DesktopGlow</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-blue-400 transition-colors ${currentPage === 'home' ? 'text-blue-400' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('browse')}
              className={`hover:text-blue-400 transition-colors ${currentPage === 'browse' ? 'text-blue-400' : ''}`}
            >
              Browse All
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
              Download App
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left hover:text-blue-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('browse');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left hover:text-blue-400 transition-colors"
            >
              Browse All
            </button>
            <button className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
              Download App
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

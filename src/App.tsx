import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FeaturedItems } from './components/FeaturedItems';
import { BrowsePage } from './components/BrowsePage';
import { ItemDetail } from './components/ItemDetail';
import { Item } from './lib/supabase';

type Page = 'home' | 'browse' | 'item-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [browseCategory, setBrowseCategory] = useState<string>('all');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page === 'home') {
      setSelectedItem(null);
    }
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setCurrentPage('item-detail');
  };

  const handleCategoryClick = (category: string) => {
    setBrowseCategory(category);
    setCurrentPage('browse');
  };

  const handleBrowse = () => {
    setBrowseCategory('all');
    setCurrentPage('browse');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      {currentPage === 'home' && (
        <>
          <Hero onBrowse={handleBrowse} />
          <CategorySection onCategoryClick={handleCategoryClick} />
          <FeaturedItems onItemClick={handleItemClick} />
        </>
      )}

      {currentPage === 'browse' && (
        <BrowsePage
          onItemClick={handleItemClick}
          initialCategory={browseCategory}
        />
      )}

      {currentPage === 'item-detail' && selectedItem && (
        <ItemDetail
          item={selectedItem}
          onBack={() => setCurrentPage('browse')}
        />
      )}
    </div>
  );
}

export default App;

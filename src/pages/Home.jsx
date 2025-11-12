import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { FiFilter, FiX } from 'react-icons/fi';

// Price ranges for filters
const priceRanges = [
  { id: 'all', name: 'All Prices' },
  { id: 'under-10k', name: 'Under PKR 10,000', min: 0, max: 10000 },
  { id: '10k-50k', name: 'PKR 10,000 - 50,000', min: 10000, max: 50000 },
  { id: '50k-100k', name: 'PKR 50,000 - 100,000', min: 50000, max: 100000 },
  { id: 'over-100k', name: 'Over PKR 100,000', min: 100000, max: Infinity },
];

// Sample product data
const products = [
  {
    id: 1,
    title: 'Viking Battle Axe',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1584735245002-9b7dccdd1f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: 'Medieval Longsword',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1577947492906-1c91e1b8a5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    title: 'Leather Armor Set',
    price: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1579783483450-6500c6e8a5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  // Add more sample products as needed
];

const Home = ({ 
  category: propCategory, 
  isSidebarOpen, 
  toggleSidebar, 
  isMobile,
  filters = {
    priceRange: 'all',
    inStock: false,
    onSale: false
  },
  onFilterChange = () => {}
}) => {
  const { category: urlCategory } = useParams();
  const category = propCategory || (urlCategory ? urlCategory.replace(/-/g, ' ') : 'Featured Products');
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Update the title when the category changes
  useEffect(() => {
    document.title = `${category} | Sword Shop`;
  }, [category]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
    // In a real app, you would fetch filtered products here
    console.log('Filters changed:', newFilters);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            {category}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {category === 'Special Offers' 
              ? 'Exclusive deals on our premium collection' 
              : `Discover our premium collection of ${category.toLowerCase()}`}
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop (always visible) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <Filters 
                onFilterChange={handleFilterChange}
                isMobileFilterOpen={isMobileFilterOpen}
                onMobileFilterToggle={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              />
            </div>

            {/* Product Grid */}
            <div className="flex-1 bg-white p-6">
              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.priceRange !== 'all' && (
                  <div className="bg-blue-500/20 text-blue-400 text-sm px-3 py-1 rounded-full flex items-center">
                    {priceRanges.find(r => r.id === filters.priceRange)?.name}
                    <button 
                      onClick={() => handleFilterChange({ priceRange: 'all' })}
                      className="ml-2 hover:text-white"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
                
                {filters.inStock && (
                  <div className="bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full flex items-center">
                    In Stock Only
                    <button 
                      onClick={() => handleFilterChange({ inStock: false })}
                      className="ml-2 hover:text-white"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
                
                {filters.onSale && (
                  <div className="bg-yellow-500/20 text-yellow-400 text-sm px-3 py-1 rounded-full flex items-center">
                    On Sale
                    <button 
                      onClick={() => handleFilterChange({ onSale: false })}
                      className="ml-2 hover:text-white"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Products Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
              >
                {products.map((product) => {
                  const isOnSale = Math.random() > 0.7;
                  const originalPrice = isOnSale ? product.price * 1.3 : product.price;
                  
                  return (
                    <ProductCard 
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      imageUrl={product.imageUrl}
                      category="Swords"
                      isNew={Math.random() > 0.5}
                      isOnSale={isOnSale}
                      originalPrice={isOnSale ? originalPrice : undefined}
                      stock={Math.floor(Math.random() * 50)}
                    />
                  );
                })}
              </motion.div>
              
              {/* Empty State */}
              {products.length === 0 && (
                <div className="text-center py-16 bg-white">
                  <h3 className="text-xl font-medium text-gray-700">No products found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
              
              {/* Pagination */}
              <div className="mt-12 w-full">
                <nav className="flex items-center justify-center gap-1">
                  <button 
                    className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Previous
                  </button>
                  <button className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

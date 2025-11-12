import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Filters from './components/Filters';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    inStock: false,
    onSale: false
  });

  // Handle window resize for mobile detection
  useEffect(() => {
    const checkIfMobile = () => window.innerWidth < 1024;
    
    const handleResize = () => {
      const nowMobile = checkIfMobile();
      if (isMobile !== nowMobile) {
        setIsMobile(nowMobile);
        // Close sidebar when switching to mobile view
        if (nowMobile) {
          setIsSidebarOpen(false);
        } else {
          // Open sidebar when switching to desktop view
          setIsSidebarOpen(true);
        }
      }
    };

    // Set initial state
    const initialMobile = checkIfMobile();
    setIsMobile(initialMobile);
    setIsSidebarOpen(!initialMobile); // Open on desktop, closed on mobile by default

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);
  
  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  // Define all routes for the application
  const routes = [
    // Redirect root to home
    { path: '/', element: <Navigate to="/home" replace /> },
    
    // Dashboard route
    { 
      path: '/home', 
      element: (
        <Home 
          category="Featured Products" 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )
    },
    
    // Category routes
    { 
      path: '/category/:category', 
      element: (
        <Home 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )
    },
    
    // Products route
    { 
      path: '/products', 
      element: (
        <Home 
          category="All Products"
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )
    },
    
    // Categories management route
    { 
      path: '/categories', 
      element: (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Categories Management</h1>
          <p>Categories management content will go here.</p>
        </div>
      ) 
    },
    
    // Orders route
    { 
      path: '/orders', 
      element: (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Orders</h1>
          <p>Orders content will go here.</p>
        </div>
      ) 
    },
    
    // Customers route
    { 
      path: '/customers', 
      element: (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Customers</h1>
          <p>Customers content will go here.</p>
        </div>
      ) 
    },
    
    // Special Offers route
    { 
      path: '/special-offers', 
      element: (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Special Offers</h1>
          <p>Special offers content will go here.</p>
        </div>
      ) 
    },
    
    // Settings route
    { 
      path: '/settings', 
      element: (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          <p>Settings content will go here.</p>
        </div>
      ) 
    },
    
    // Product detail route
    { 
      path: '/product/:id', 
      element: <ProductDetail 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      /> 
    },
    
    // Cart and checkout routes
    { 
      path: '/cart', 
      element: <Cart 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      /> 
    },
    { 
      path: '/checkout', 
      element: <Checkout 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      /> 
    },
    
    // 404 route - redirect to home
    { path: '*', element: <Navigate to="/home" replace /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toast Notifications */}
      <Toaster position="top-center" />
      
      <div className="flex min-h-screen bg-white text-black">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile} 
        />
        
        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg lg:hidden z-50"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        )}
        
        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen && !isMobile ? 'lg:ml-64' : 'lg:ml-0'
        }`}>
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} />
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <Routes>
                {routes.map((route, index) => (
                  <Route 
                    key={index} 
                    path={route.path} 
                    element={
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        {route.element}
                      </motion.div>
                    } 
                  />
                ))}
              </Routes>
            </AnimatePresence>
          </main>

          {/* Mobile menu button */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg lg:hidden z-50"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isSidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;

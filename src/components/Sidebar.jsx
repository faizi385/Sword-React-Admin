import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, FiHome, FiGrid, FiLayers, FiShoppingBag, 
  FiUsers, FiStar, FiSettings, FiMenu 
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');

  // Update active item based on current route
  useEffect(() => {
    const path = location.pathname.substring(1) || 'new';
    setActiveItem(path);
  }, [location]);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FiHome size={20} /> },
    { id: 'products', name: 'Products', icon: <FiGrid size={20} /> },
    { id: 'categories', name: 'Categories', icon: <FiLayers size={20} /> },
    { id: 'orders', name: 'Orders', icon: <FiShoppingBag size={20} /> },
    { id: 'customers', name: 'Customers', icon: <FiUsers size={20} /> },
    { 
      id: 'special-offers', 
      name: 'Special Offers', 
      icon: <FiStar size={20} />,
      isHighlighted: true 
    },
    { id: 'settings', name: 'Settings', icon: <FiSettings size={20} /> },
  ];

  const handleItemClick = (itemId, currentPath) => {
    // Don't do anything if this is the active item
    if (activeItem === itemId) return;
    
    console.log('Sidebar item clicked:', itemId);
    
    // Map the item ID to the correct route path
    const routeMap = {
      'dashboard': '/home',
      'products': '/products',
      'categories': '/categories',
      'orders': '/orders',
      'customers': '/customers',
      'special-offers': '/special-offers',
      'settings': '/settings'
    };
    
    const route = routeMap[itemId] || `/${itemId}`;
    console.log('Navigating to:', route);
    
    // Update active item after navigation
    setActiveItem(itemId);
    
    // Navigate to the new route
    navigate(route);
    
    if (isMobile) {
      toggleSidebar();
    }
  };

  // Set initial state on mount
  useEffect(() => {
    // If this is a mobile device and the sidebar is open by default, close it
    if (isMobile && isOpen) {
      toggleSidebar();
    }
    // We only want this to run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
          opacity: isOpen ? 1 : 0
        }}
        transition={{ type: 'tween', duration: 0.3 }}
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-40`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">⚔️</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              SWORD SHOP
            </h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <motion.li 
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item.id, activeItem)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeItem === item.id
                      ? 'bg-gray-700 text-white cursor-default'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer'
                  } ${item.isHighlighted ? 'bg-red-900/30 hover:bg-red-900/40' : ''}`}
                >
                  <span className={`transition-transform duration-300 ${
                    activeItem === item.id ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {item.isHighlighted && (
                    <span className="ml-auto px-2 py-0.5 text-xs bg-red-900/50 text-red-300 rounded-full">
                      Hot
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-black/30">
          <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Sword Shop
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;

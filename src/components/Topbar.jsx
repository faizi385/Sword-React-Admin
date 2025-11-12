import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Topbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [title, setTitle] = useState('Dashboard');
  const location = useLocation();

  useEffect(() => {
    // Update page title based on current route
    const path = location.pathname;
    const pageTitle = path === '/' 
      ? 'Dashboard' 
      : path.charAt(1).toUpperCase() + path.slice(2);
    setTitle(pageTitle);
  }, [location]);

  return (
    <motion.header 
      className="fixed top-0 right-0 left-0 h-16 bg-[#0b0b0b] border-b border-gray-800 z-40 flex items-center px-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-gray-400 hover:text-white mr-4 p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            ☰
          </button>
          <motion.h1 
            key={title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold font-heading text-white"
          >
            {title}
          </motion.h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors">
            <span className="text-xl">🔔</span>
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
            U
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;

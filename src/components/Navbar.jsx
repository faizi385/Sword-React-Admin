import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiShoppingCart, 
  FiUser, 
  FiChevronDown, 
  FiX,
  FiMenu
} from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fadeIn, slideInRight, hoverScale, tapScale } from '../animations/index.jsx';
import { useCart } from '../context/CartContext';

const Navbar = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('PKR');
  const { cartCount } = useCart();
  const currencyRef = useRef(null);
  
  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Sale', path: '/sale' },
    { name: 'Contact', path: '/contact' },
  ];
  
  // Currencies
  const currencies = ['PKR', 'USD', 'EUR', 'GBP'];
  
  // Close currency dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Toggle mobile menu - using the toggleSidebar prop
  const handleMenuClick = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg' 
          : 'bg-black/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={handleMenuClick}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6 xl:space-x-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Button */}
            <button 
              className="lg:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
              onClick={() => document.getElementById('mobile-search').focus()}
            >
              <FiSearch className="h-5 w-5" />
            </button>

            {/* Desktop Search */}
            <div className="hidden lg:block">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-48 xl:w-64 pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm transition-all duration-200"
                  placeholder="Search swords..."
                  type="search"
                />
              </motion.div>
            </div>

            {/* Currency Selector */}
            <div className="relative" ref={currencyRef}>
              <motion.button
                type="button"
                className="flex items-center text-sm font-medium text-gray-300 hover:text-white focus:outline-none p-2 rounded-full hover:bg-gray-800"
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                whileHover={hoverScale}
                whileTap={tapScale}
              >
                <span className="hidden sm:inline">{selectedCurrency}</span>
                <span className="sm:hidden">$</span>
                <FiChevronDown className="ml-0.5 h-4 w-4" />
              </motion.button>

              {/* Currency Dropdown */}
              <AnimatePresence>
                {isCurrencyOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                    className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-700 ring-opacity-100 focus:outline-none z-50 overflow-hidden"
                  >
                    <div className="py-1">
                      {currencies.map((currency) => (
                        <motion.button
                          key={currency}
                          onClick={() => {
                            setSelectedCurrency(currency);
                            setIsCurrencyOpen(false);
                          }}
                          className={`${
                            selectedCurrency === currency
                              ? 'bg-red-600 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          } block w-full text-left px-4 py-2 text-sm transition-colors duration-150`}
                          whileHover={{ x: 2 }}
                        >
                          {currency}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <motion.div 
              className="relative"
              whileHover={hoverScale}
              whileTap={tapScale}
            >
              <Link
                to="/cart"
                className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none flex items-center"
              >
                <FiShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* User Account */}
            <motion.div
              whileHover={hoverScale}
              whileTap={tapScale}
              className="hidden sm:block"
            >
              <Link
                to="/account"
                className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none block"
              >
                <FiUser className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-2 mb-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="mobile-search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition duration-150"
              placeholder="Search swords..."
              type="search"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;

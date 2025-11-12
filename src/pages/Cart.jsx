import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiTrash2, FiArrowLeft, FiPlus, FiMinus, FiX } from 'react-icons/fi';

// Sample cart data (in a real app, this would come from a context or state management)
const sampleCartItems = [
  {
    id: 1,
    title: 'Hand-Forged Damascus Steel Katana',
    price: 125000,
    imageUrl: 'https://images.unsplash.com/photo-1574873141554-7a1fcd436b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    quantity: 1,
    inStock: 5,
    category: 'Katanas'
  },
  {
    id: 2,
    title: 'Viking Battle Axe',
    price: 89999,
    imageUrl: 'https://images.unsplash.com/photo-1579783483450-6500c6e8a5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    quantity: 2,
    inStock: 3,
    category: 'Axes'
  },
  {
    id: 3,
    title: 'Medieval Longsword',
    price: 109999,
    imageUrl: 'https://images.unsplash.com/photo-1577947492906-1c91e1b8a5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    quantity: 1,
    inStock: 7,
    category: 'Longswords'
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100000 ? 0 : 2000; // Free shipping over 100,000
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;

  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(price).replace('PKR', 'PKR ');
  };

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.min(newQuantity, item.inStock) }
        : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setIsRemoving(true);
    // Add animation delay before removing
    setTimeout(() => {
      setCartItems(cartItems.filter(item => item.id !== id));
      setIsRemoving(false);
    }, 300);
  };

  // Handle checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-800 mb-6">
            <FiShoppingCart className="w-12 h-12 text-gray-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <span className="ml-3 px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="flex flex-col sm:flex-row bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-40 h-40 bg-gray-700 flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                        disabled={isRemoving}
                      >
                        <FiX size={20} />
                      </button>
                    </div>

                    <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden w-32 mb-3 sm:mb-0">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus size={16} />
                        </button>
                        <span className="flex-1 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 transition-colors"
                          disabled={item.quantity >= item.inStock}
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-gray-400">
                            {formatPrice(item.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <FiArrowLeft className="mr-2" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax (5%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                
                <div className="border-t border-gray-700 my-4"></div>
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-xl text-red-400">{formatPrice(total)}</span>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/20"
                  >
                    Proceed to Checkout
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-400 mt-4">
                  or{' '}
                  <Link to="/checkout" className="text-red-400 hover:underline">
                    Checkout with PKR {formatPrice(subtotal * 0.5)} (50% Advance)
                  </Link>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="font-medium mb-3">Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 rounded-r-lg transition-colors">
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Secure Checkout */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex justify-center mt-2 space-x-4">
                  {['visa', 'mastercard', 'jazzcash', 'easypaisa'].map((method) => (
                    <div key={method} className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-xs font-medium">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Note */}
            <div className="mt-4 bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
              <h3 className="font-medium text-sm mb-2">Order Note</h3>
              <textarea
                placeholder="Add a note to your order..."
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

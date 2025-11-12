import { FiShoppingCart, FiEye, FiHeart, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { 
  MotionDiv, 
  MotionButton, 
  MotionSpan,
  fadeInUp,
  hoverScale,
  tapScale,
  cardHover,
  staggerContainer,
  staggerItem
} from '../animations/index.jsx';

const ProductCard = ({ 
  id,
  title, 
  price, 
  imageUrl, 
  category = 'Swords',
  isNew = false,
  isOnSale = false,
  originalPrice,
  stock = 10 // Default stock if not provided
}) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  // Handle add to cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (stock <= 0) {
      toast.error('This item is out of stock');
      return;
    }

    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart({
      id,
      title,
      price,
      imageUrl,
      category,
      stock
    });
    
    setIsAdding(false);
    setIsInCart(true);
    toast.success('Added to cart!');
    
    // Reset the in-cart state after 2 seconds
    setTimeout(() => {
      setIsInCart(false);
    }, 2000);
  };
  // Format price with commas for thousands
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(price).replace('PKR', 'PKR ');
  };

  // Calculate discount percentage if on sale
  const discount = isOnSale && originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <MotionDiv
      variants={fadeInUp}
      whileHover={cardHover}
      className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-red-500/30"
    >
      {/* Sale/New Badge */}
      <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2">
        {isNew && (
          <MotionSpan 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.1 }}
            className="px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full"
          >
            NEW
          </MotionSpan>
        )}
        {isOnSale && (
          <MotionSpan 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.2 }}
            className="px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full"
          >
            -{discount}%
          </MotionSpan>
        )}
      </div>

      {/* Product Image */}
      <div className="relative pt-[100%] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        <MotionDiv 
          className="absolute inset-0 w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </MotionDiv>
        
        {/* Quick Actions Overlay */}
        <MotionDiv 
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-4"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
        >
          <MotionDiv 
            className="w-full space-y-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <MotionButton 
              onClick={handleAddToCart}
              disabled={isAdding || stock <= 0}
              variants={staggerItem}
              whileHover={hoverScale}
              whileTap={tapScale}
              className={`w-full flex items-center justify-center space-x-2 ${
                isInCart 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : stock > 0 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-gray-600 cursor-not-allowed'
              } text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors`}
            >
              {isInCart ? (
                <>
                  <FiCheck className="text-base" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <FiShoppingCart className="text-base" />
                  <span>{stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </>
              )}
            </MotionButton>
            <MotionDiv 
              className="flex space-x-2"
              variants={staggerContainer}
            >
              <MotionSpan variants={staggerItem} className="flex-1">
                <Link 
                  to={`/product/${id}`}
                  className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  <FiEye className="h-4 w-4" />
                </Link>
              </MotionSpan>
              <MotionSpan variants={staggerItem} className="flex-1">
                <button 
                  className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  <FiHeart className="h-4 w-4" />
                </button>
              </MotionSpan>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <MotionSpan 
          className="text-xs text-red-400 font-medium block"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {category}
        </MotionSpan>
        <MotionSpan 
          className="block"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-white font-semibold mt-1 line-clamp-2 h-10">
            {title}
          </h3>
        </MotionSpan>
        <MotionDiv 
          className="mt-2 flex items-center space-x-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-lg font-bold text-white">
            {formatPrice(price)}
          </span>
          {isOnSale && originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </MotionDiv>
        
        {/* Rating */}
        <div className="mt-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-700'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-1">(24)</span>
        </div>
      </div>
    </MotionDiv>
  );
};

export default ProductCard;

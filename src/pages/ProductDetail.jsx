import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiChevronLeft, FiChevronRight, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';

// Sample product data (in a real app, this would come from an API)
const sampleProduct = {
  id: 1,
  title: 'Hand-Forged Damascus Steel Katana',
  price: 125000,
  originalPrice: 150000,
  description: 'A beautifully crafted Damascus steel katana with a hand-forged blade, genuine ray skin handle wrap, and traditional Japanese tsuba. The blade features a stunning wave pattern and comes with a wooden saya (scabbard) and silk storage bag.',
  category: 'Katanas',
  isNew: true,
  isOnSale: true,
  rating: 4.8,
  reviewCount: 124,
  inStock: 5,
  specifications: {
    bladeLength: '28 inches',
    totalLength: '40 inches',
    weight: '2.8 lbs',
    material: '1095 High Carbon Steel',
    hardness: '58-60 HRC'
  },
  images: [
    'https://images.unsplash.com/photo-1574873141554-7a1fcd436b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1589985270828-5d3b33223756?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1584735245002-9b7dccdd1f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
  ]
};

// Sample related products
const relatedProducts = [
  {
    id: 2,
    title: 'Viking Battle Axe',
    price: 89999,
    originalPrice: 99999,
    imageUrl: 'https://images.unsplash.com/photo-1579783483450-6500c6e8a5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    category: 'Axes',
    isOnSale: true
  },
  {
    id: 3,
    title: 'Medieval Longsword',
    price: 109999,
    imageUrl: 'https://images.unsplash.com/photo-1577947492906-1c91e1b8a5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    category: 'Longswords',
    isNew: true
  },
  {
    id: 4,
    title: 'Fantasy Dagger',
    price: 45999,
    imageUrl: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    category: 'Daggers'
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // In a real app, you would fetch the product data here
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProduct(sampleProduct);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > product.inStock) return;
    setQuantity(newQuantity);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(price).replace('PKR', 'PKR ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const discount = product.isOnSale && product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-6"
        >
          <FiChevronLeft className="mr-1" /> Back to Products
        </button>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-800 rounded-xl overflow-hidden aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex space-x-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                    NEW
                  </span>
                )}
                {product.isOnSale && (
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                    SALE {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                      selectedImage === index ? 'ring-2 ring-red-500' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:pl-8">
            <div className="sticky top-24">
              {/* Category & Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <span className="text-red-400 font-medium">{product.category}</span>
                <div className="flex items-center mt-2 sm:mt-0">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-400">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.isOnSale && product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="ml-2 px-2 py-1 bg-red-600/20 text-red-400 text-sm font-medium rounded-full">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  )}
                </div>
                {product.isOnSale && (
                  <div className="mt-1 text-sm text-red-400">
                    Limited time offer! {discount}% off
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-800/50 p-3 rounded-lg">
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        {key.split(/(?=[A-Z])/).join(' ')}
                      </div>
                      <div className="font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                      disabled={quantity >= product.inStock}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm text-gray-400">
                    {product.inStock > 0 
                      ? `${product.inStock} in stock` 
                      : 'Out of stock'}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                    <FiHeart className="w-5 h-5" />
                    <span>Add to Wishlist</span>
                  </button>
                </div>

                <button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/20">
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-red-600/10 rounded-full">
                    <FiTruck className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-gray-400">On orders over PKR 10,000</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-red-600/10 rounded-full">
                    <FiShield className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Secure Payment</h4>
                    <p className="text-sm text-gray-400">100% secure payment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-red-600/10 rounded-full">
                    <FiRefreshCw className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Easy Returns</h4>
                    <p className="text-sm text-gray-400">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <Link 
              to="/products" 
              className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center"
            >
              View All <FiChevronRight className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;

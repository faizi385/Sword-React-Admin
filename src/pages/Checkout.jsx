import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheckCircle, FiCreditCard, FiTruck, FiMapPin, FiLock } from 'react-icons/fi';

// Sample cart data (in a real app, this would come from a context or state management)
const sampleCartItems = [
  {
    id: 1,
    title: 'Hand-Forged Damascus Steel Katana',
    price: 125000,
    imageUrl: 'https://images.unsplash.com/photo-1574873141554-7a1fcd436b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    quantity: 1,
    category: 'Katanas'
  },
  {
    id: 2,
    title: 'Viking Battle Axe',
    price: 89999,
    imageUrl: 'https://images.unsplash.com/photo-1579783483450-6500c6e8a5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    quantity: 1,
    category: 'Axes'
  }
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false,
    shippingMethod: 'standard',
    orderNotes: ''
  });
  const navigate = useNavigate();

  // Calculate order summary
  const subtotal = sampleCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 2000; // Flat rate shipping
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      // Process payment and place order
      setIsProcessing(true);
      // Simulate API call
      setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    } else {
      navigate('/cart');
    }
  };

  // Steps configuration
  const steps = [
    { id: 1, name: 'Shipping', description: 'Enter your shipping details' },
    { id: 2, name: 'Payment', description: 'Choose payment method' },
    { id: 3, name: 'Review', description: 'Review your order' }
  ];

  // Success state
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/10 mb-6">
            <FiCheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-400 mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
            We've sent you an email with the order details.
          </p>
          <div className="bg-gray-800/50 rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
            <h3 className="font-medium mb-4">Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Number:</span>
                <span>#SWORD-{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total:</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method:</span>
                <span className="capitalize">{paymentMethod}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              View Order
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps */}
        <nav className="mb-12">
          <ol className="flex flex-col md:flex-row items-center">
            {steps.map((step, index) => (
              <li key={step.id} className={`flex-1 w-full md:w-auto ${index > 0 ? 'md:flex-1' : ''}`}>
                <div className="flex items-center">
                  {index > 0 && (
                    <div className={`hidden md:block flex-1 h-px mx-4 ${activeStep > index ? 'bg-red-500' : 'bg-gray-700'}`}></div>
                  )}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeStep >= step.id 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}>
                      {activeStep > step.id ? (
                        <FiCheckCircle className="w-5 h-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <span className={`mt-2 text-sm font-medium ${
                      activeStep >= step.id ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">
                {activeStep === 1 && 'Shipping Information'}
                {activeStep === 2 && 'Payment Method'}
                {activeStep === 3 && 'Review Your Order'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                {/* Step 1: Shipping Information */}
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="House number and street name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          State/Province <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          ZIP/Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      >
                        <option value="Pakistan">Pakistan</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="UAE">United Arab Emirates</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
                      <div className="space-y-3">
                        {[
                          { id: 'standard', title: 'Standard Shipping', price: 2000, time: '3-5 business days' },
                          { id: 'express', title: 'Express Shipping', price: 5000, time: '1-2 business days' },
                          { id: 'overnight', title: 'Overnight Shipping', price: 10000, time: 'Next business day' }
                        ].map((method) => (
                          <label key={method.id} className="flex items-center p-4 border border-gray-700 rounded-lg hover:border-red-500/50 cursor-pointer">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value={method.id}
                              checked={formData.shippingMethod === method.id}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex justify-between">
                                <span className="block text-sm font-medium">{method.title}</span>
                                <span className="text-sm">{formatPrice(method.price)}</span>
                              </div>
                              <p className="text-xs text-gray-400">Estimated delivery: {method.time}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="saveInfo"
                          checked={formData.saveInfo}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          Save this information for next time
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method */}
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Payment Method</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: 'card', name: 'Credit/Debit Card', icon: <FiCreditCard className="w-5 h-5" /> },
                          { id: 'jazzcash', name: 'JazzCash', icon: 'JC' },
                          { id: 'easypaisa', name: 'EasyPaisa', icon: 'EP' },
                          { id: 'cod', name: 'Cash on Delivery', icon: <FiTruck className="w-5 h-5" /> }
                        ].map((method) => (
                          <label
                            key={method.id}
                            className={`relative flex items-center p-4 border rounded-lg cursor-pointer ${
                              paymentMethod === method.id
                                ? 'border-red-500 bg-red-500/10'
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={paymentMethod === method.id}
                              onChange={() => setPaymentMethod(method.id)}
                              className="sr-only"
                            />
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-gray-300 mr-3">
                                {method.icon}
                              </div>
                              <span className="block text-sm font-medium">{method.name}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-6 pt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Card Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456"
                              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              required
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <FiCreditCard className="w-5 h-5" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Name on Card <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              Expiry Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                              CVV <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                required
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <FiLock className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                      <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                        <h4 className="font-medium mb-2">
                          Pay with {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'}
                        </h4>
                        <p className="text-sm text-gray-400 mb-4">
                          You will be redirected to {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} to complete your payment securely.
                        </p>
                        <div className="bg-black/30 p-3 rounded text-sm font-mono text-center">
                          {paymentMethod === 'jazzcash' ? '03001234567' : '03451234567'}
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                        <h4 className="font-medium mb-2">Cash on Delivery</h4>
                        <p className="text-sm text-gray-400">
                          Pay with cash upon delivery. An additional {formatPrice(500)} will be charged for cash on delivery orders.
                        </p>
                      </div>
                    )}

                    <div className="pt-2">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded mt-1"
                          required
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          I agree to the <a href="/terms" className="text-red-400 hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-red-400 hover:underline">Privacy Policy</a>
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 3: Review Order */}
                {activeStep === 3 && (
                  <div className="space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-gray-800/30 p-5 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium flex items-center">
                          <FiMapPin className="mr-2 text-red-500" />
                          Shipping Address
                        </h3>
                        <button
                          type="button"
                          onClick={() => setActiveStep(1)}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="text-sm text-gray-300 space-y-1">
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.address}</p>
                        <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                        <p>{formData.country}</p>
                        <p className="mt-2">{formData.phone}</p>
                        <p>{formData.email}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-gray-800/30 p-5 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium flex items-center">
                          <FiCreditCard className="mr-2 text-red-500" />
                          Payment Method
                        </h3>
                        <button
                          type="button"
                          onClick={() => setActiveStep(2)}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="text-sm text-gray-300">
                        {paymentMethod === 'card' && (
                          <div>
                            <p>Credit/Debit Card ending in {formData.cardNumber?.slice(-4) || '****'}</p>
                            <p>Expires {formData.expiryDate || 'MM/YY'}</p>
                          </div>
                        )}
                        {paymentMethod === 'jazzcash' && <p>JazzCash (03001234567)</p>}
                        {paymentMethod === 'easypaisa' && <p>EasyPaisa (03451234567)</p>}
                        {paymentMethod === 'cod' && <p>Cash on Delivery</p>}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-800/30 p-5 rounded-lg border border-gray-700">
                      <h3 className="font-medium mb-4">Order Summary</h3>
                      <div className="space-y-4">
                        {sampleCartItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-start">
                            <div className="flex">
                              <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium">{item.title}</h4>
                                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-gray-400">{formatPrice(item.price)} each</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Subtotal</span>
                          <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Shipping</span>
                          <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tax</span>
                          <span>{formatPrice(tax)}</span>
                        </div>
                        {paymentMethod === 'cod' && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Cash on Delivery Fee</span>
                            <span>{formatPrice(500)}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-700 my-2"></div>
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span className="text-lg text-red-400">
                            {formatPrice(paymentMethod === 'cod' ? total + 500 : total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        name="orderNotes"
                        value={formData.orderNotes}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Notes about your order, e.g. special delivery instructions"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded mt-1"
                          required
                        />
                        <span className="ml-2 text-sm text-gray-300">
                          I have read and agree to the website <a href="/terms" className="text-red-400 hover:underline">terms and conditions</a> *
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center justify-center px-6 py-3 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg font-medium transition-colors"
                  >
                    <FiArrowLeft className="mr-2" />
                    {activeStep === 1 ? 'Back to Cart' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/20 disabled:opacity-70 disabled:transform-none disabled:shadow-none"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : activeStep === 3 ? (
                      'Place Order'
                    ) : (
                      'Continue to ' + (activeStep === 1 ? 'Payment' : 'Review')
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {sampleCartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-700 my-4"></div>
              
              <div className="space-y-3 text-sm">
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
                {paymentMethod === 'cod' && activeStep >= 2 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cash on Delivery Fee</span>
                    <span>{formatPrice(500)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-700 my-2"></div>
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg text-red-400">
                    {formatPrice(paymentMethod === 'cod' && activeStep >= 2 ? total + 500 : total)}
                  </span>
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
              </div>
            </div>
            
            {/* Need Help? */}
            <div className="mt-4 bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm text-gray-400 mb-4">
                Our customer service team is available to assist you with any questions.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+92 300 1234567</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@swordshop.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

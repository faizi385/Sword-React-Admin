import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('swordshop_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
      updateCartCount(JSON.parse(savedCart));
    }
  }, []);

  // Update cart count
  const updateCartCount = (cartItems) => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
    // Update cart count in localStorage
    localStorage.setItem('swordshop_cart', JSON.stringify(cartItems));
  };

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let newCart;
      
      if (existingItem) {
        // If item exists, update quantity
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }
      
      updateCartCount(newCart);
      return newCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      updateCartCount(newCart);
      return newCart;
    });
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      updateCartCount(newCart);
      return newCart;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    updateCartCount([]);
  };

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

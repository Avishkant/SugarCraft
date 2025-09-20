
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sweets = [
  { _id: '1', name: 'Chocolate Truffle', category: 'Chocolate', price: 120, quantity: 10, tagline: 'Rich, creamy, irresistible.' },
  { _id: '2', name: 'Strawberry Tart', category: 'Fruit', price: 90, quantity: 5, tagline: 'Fresh and tangy delight.' },
  { _id: '3', name: 'Lemon Meringue', category: 'Citrus', price: 100, quantity: 0, tagline: 'Zesty, sweet, and fluffy.' },
];

export default function CustomerDashboard() {
  const [customerName, setCustomerName] = useState('');
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [sweetList, setSweetList] = useState(sweets);

  useEffect(() => {
    // Get name from JWT token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCustomerName(payload.email?.split('@')[0] || 'Customer');
      } catch {
        setCustomerName('Customer');
      }
    }
  }, []);

  // Add to cart handler
  const handleAddToCart = sweet => {
    if (sweet.quantity === 0) return;
    setCart(prev => {
      const found = prev.find(item => item._id === sweet._id);
      if (found) {
        // Increase quantity, but not more than available
        return prev.map(item => item._id === sweet._id ? { ...item, cartQty: Math.min(item.cartQty + 1, sweet.quantity) } : item);
      } else {
        return [...prev, { ...sweet, cartQty: 1 }];
      }
    });
  };

  // Update cart quantity
  const updateCartQty = (id, qty) => {
    setCart(prev => prev.map(item => item._id === id ? { ...item, cartQty: qty } : item));
  };

  // Remove from cart
  const removeFromCart = id => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  // Purchase handler
  const handlePurchase = () => {
    setSweetList(prev => prev.map(sweet => {
      const cartItem = cart.find(item => item._id === sweet._id);
      if (cartItem) {
        return { ...sweet, quantity: Math.max(sweet.quantity - cartItem.cartQty, 0) };
      }
      return sweet;
    }));
    setCart([]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.cartQty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="container mx-auto flex-1 py-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-12 mb-8 rounded-2xl shadow-xl bg-white bg-opacity-90 animate-fadeIn">
          <h1 className="text-5xl font-extrabold text-[var(--color-primary-600)] mb-2 text-center drop-shadow-lg">Welcome back, {customerName} 🍬</h1>
          <p className="text-xl text-[var(--color-primary-600)] mb-6 text-center">Craving something sweet today? Explore our fresh collection.</p>
          <div className="flex gap-6 mb-4">
            <button className="bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[var(--color-btn-primary-hover)] hover:text-[var(--color-btn-text-alt)] transition" onClick={() => window.location.href='/sweets'}>🍭 Browse Sweets</button>
          </div>
        </section>
        {/* Sweets Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-primary-600)] mb-6 text-center">Available Sweets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sweetList.map(sweet => (
              <motion.div key={sweet._id} className="bg-white/80 backdrop-blur-xl border-2 border-[var(--color-btn-primary)] rounded-2xl shadow-2xl p-8 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                <span className="text-4xl mb-4 text-[var(--color-btn-primary)]">🍬</span>
                <h3 className="text-2xl font-bold text-[var(--color-primary-600)] mb-2">{sweet.name}</h3>
                <p className="text-[var(--color-btn-secondary)] mb-2">{sweet.category}</p>
                <p className="text-[var(--color-primary-600)] mb-2">₹{sweet.price}</p>
                <p className="text-[var(--color-btn-primary-hover)] mb-2">{sweet.tagline}</p>
                <p className="text-[var(--color-btn-secondary)] mb-2">In stock: {sweet.quantity}</p>
                {sweet.quantity === 0 ? (
                  <button className="px-4 py-2 rounded-lg bg-gray-300 text-gray-500 font-semibold shadow cursor-not-allowed" disabled>Sold Out</button>
                ) : (
                  <button className="px-4 py-2 rounded-lg bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] font-semibold shadow hover:bg-[var(--color-btn-primary-hover)] hover:text-[var(--color-btn-text-alt)] transition" onClick={() => handleAddToCart(sweet)}>Add to Cart</button>
                )}
              </motion.div>
            ))}
          </div>
        </section>
        {/* Cart Section */}
        {cart.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-btn-secondary)] mb-6 text-center">Your Cart</h2>
            <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              {cart.map(item => (
                <div key={item._id} className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-bold text-[var(--color-primary-600)]">{item.name}</span>
                    <span className="ml-2 text-[var(--color-btn-secondary)]">₹{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 rounded bg-[var(--color-btn-secondary)] text-[var(--color-btn-text-alt)]" onClick={() => updateCartQty(item._id, Math.max(1, item.cartQty - 1))} disabled={item.cartQty <= 1}>-</button>
                    <span className="px-3">{item.cartQty}</span>
                    <button className="px-2 py-1 rounded bg-[var(--color-btn-secondary)] text-[var(--color-btn-text-alt)]" onClick={() => updateCartQty(item._id, Math.min(item.cartQty + 1, sweetList.find(s => s._id === item._id)?.quantity || 1))} disabled={item.cartQty >= (sweetList.find(s => s._id === item._id)?.quantity || 1)}>+</button>
                    <button className="ml-2 px-2 py-1 rounded bg-red-200 text-red-700" onClick={() => removeFromCart(item._id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-6">
                <span className="font-bold text-xl text-[var(--color-primary-600)]">Total: ₹{totalPrice}</span>
                <button className="px-6 py-2 rounded-lg bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] font-semibold shadow hover:bg-[var(--color-btn-primary-hover)] hover:text-[var(--color-btn-text-alt)] transition" onClick={handlePurchase}>Purchase</button>
              </div>
            </div>
          </section>
        )}
        {/* About Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="py-8 px-4 bg-white bg-opacity-95 rounded-xl shadow-md mx-auto max-w-2xl mb-10 animate-fadeIn">
          <h2 className="text-2xl font-bold text-[var(--color-primary-600)] mb-3">At SugarCraft, every sweet has a story.</h2>
          <p className="text-lg text-[var(--color-primary-600)]">From traditional mithai to modern delights, we craft happiness for every moment.</p>
        </motion.section>
      </motion.div>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 animate-fadeIn">
          <span className="font-bold text-lg">🎉 Order placed!</span>
          <span className="text-sm">Your sweets are on the way.</span>
        </div>
      )}
      <Footer />
    </div>
  );
}

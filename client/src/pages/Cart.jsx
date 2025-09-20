import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { purchaseCart } from '../utils/api';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const syncCart = () => {
      try {
        setCart(JSON.parse(localStorage.getItem('cart')) || []);
      } catch {
        setCart([]);
      }
    };
    syncCart(); // Read cart on mount
    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

  const updateCartQty = (id, qty) => {
    setCart(prev => {
      const updated = prev.map(item => item._id === id ? { ...item, cartQty: qty } : item);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = id => {
    setCart(prev => {
      const updated = prev.filter(item => item._id !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.cartQty, 0);

  const handlePurchase = async () => {
    if (cart.length === 0) return;
    setPurchasing(true);
    const token = localStorage.getItem('token');
    try {
      const results = await purchaseCart(cart, token);
      // Check for errors in results
      const failed = results.filter(r => r.error);
      if (failed.length > 0) {
        setShowToast(`Error: ${failed.map(f => f.error).join(', ')}`);
      } else {
        setShowToast('🎉 Order placed! Your sweets are on the way.');
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
        window.dispatchEvent(new Event('storage'));
      }
    } catch (err) {
      setShowToast('Error placing order.');
    }
    setTimeout(() => {
      setShowToast(false);
      setPurchasing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />
      <div className="container mx-auto flex-1 py-10">
        <h1 className="text-4xl font-extrabold text-[var(--color-primary-600)] mb-8 text-center">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-2xl font-bold text-[var(--color-btn-secondary)] mb-4">Your cart is empty.</div>
            <button
              className="bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[var(--color-btn-primary-hover)] hover:text-[var(--color-btn-text-alt)] transition"
              onClick={() => window.location.href='/sweets'}
            >Go to Sweets</button>
          </div>
        ) : (
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
                  <button className="px-2 py-1 rounded bg-[var(--color-btn-secondary)] text-[var(--color-btn-text-alt)]" onClick={() => updateCartQty(item._id, item.cartQty + 1)}>+</button>
                  <button className="ml-2 px-2 py-1 rounded bg-red-200 text-red-700" onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <span className="font-bold text-xl text-[var(--color-primary-600)]">Total: ₹{totalPrice}</span>
              <button
                className="px-6 py-2 rounded-lg bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] font-semibold shadow hover:bg-[var(--color-btn-primary-hover)] hover:text-[var(--color-btn-text-alt)] transition"
                onClick={handlePurchase}
                disabled={purchasing}
              >{purchasing ? 'Processing...' : 'Purchase'}</button>
            </div>
          </div>
        )}
      </div>
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

import { useState, useEffect, useRef } from 'react';
import { fetchSweets } from '../utils/api';
import { motion } from 'framer-motion';
import SweetCard from '../components/SweetCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchSweets(token, page, 12)
      .then((data) => {
        setSweets((prev) => [...prev, ...data.sweets]);
        setHasMore(data.hasMore);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [hasMore]);

  const filtered = sweets.filter((sweet) => {
    const matchesSearch = sweet.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? sweet.category === category : true;
    const matchesMin = minPrice ? sweet.price >= Number(minPrice) : true;
    const matchesMax = maxPrice ? sweet.price <= Number(maxPrice) : true;
    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  // Add to cart handler
  const handleAddToCart = (sweet) => {
    if (sweet.quantity === 0) return;
    setCart((prev) => {
      const found = prev.find((item) => item._id === sweet._id);
      let updated;
      if (found) {
        updated = prev.map((item) =>
          item._id === sweet._id
            ? { ...item, cartQty: Math.min(item.cartQty + 1, sweet.quantity) }
            : item
        );
      } else {
        updated = [...prev, { ...sweet, cartQty: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      return updated;
    });
    setShowToast(`"${sweet.name}" added to cart!`);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Update cart quantity
  const updateCartQty = (id, qty) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item._id === id ? { ...item, cartQty: qty } : item
      );
      localStorage.setItem('cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      return updated;
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item._id !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      return updated;
    });
  };

  // Purchase handler
  const handlePurchase = () => {
    setSweets((prev) =>
      prev.map((sweet) => {
        const cartItem = cart.find((item) => item._id === sweet._id);
        if (cartItem) {
          return {
            ...sweet,
            quantity: Math.max(sweet.quantity - cartItem.cartQty, 0),
          };
        }
        return sweet;
      })
    );
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    window.dispatchEvent(new Event('storage'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.cartQty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />
      <div className="w-full flex-1 py-6 px-2 sm:px-4 mx-auto min-w-0">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-[var(--color-primary-600)] mb-8 text-center"
        >
          Shop Sweets
        </motion.h1>
        {/* Filter / Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8"
        >
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--color-btn-primary)] focus:ring-2 focus:ring-[var(--color-btn-secondary)] bg-white text-[var(--color-primary-600)]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--color-btn-secondary)] focus:ring-2 focus:ring-[var(--color-btn-primary)] bg-white text-[var(--color-primary-600)]"
          >
            <option value="">All Categories</option>
            <option value="Mithai">Mithai</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Fruit">Fruit</option>
            <option value="Citrus">Citrus</option>
            <option value="Candy">Candy</option>
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--color-btn-primary)] w-28 bg-white text-[var(--color-primary-600)]"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--color-btn-secondary)] w-28 bg-white text-[var(--color-primary-600)]"
          />
        </motion.div>

        {!localStorage.getItem('token') ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <h2 className="text-3xl font-bold text-[#f43f5e] mb-4">
              Login to view sweets
            </h2>
            <button
              onClick={() => (window.location.href = '/login')}
              className="bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[var(--color-btn-primary-hover)] hover:text-[var(--color-btn-text-alt)] hover:scale-105 transition"
            >
              Login
            </button>
          </motion.div>
        ) : (
          <>
            {/* Sweets Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full"
            >
              {filtered.length === 0 ? (
                <div className="col-span-full text-center text-[var(--color-btn-secondary)]">
                  No sweets found.
                </div>
              ) : (
                filtered.map((sweet) => (
                  <motion.div
                    key={sweet._id}
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #C8879B55' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col w-full"
                  >
                    <SweetCard sweet={sweet} onAddToCart={handleAddToCart} />
                  </motion.div>
                ))
              )}
              <div ref={loader} className="col-span-full text-center py-4">
                {loading && hasMore && (
                  <span className="text-[#6366f1]">Loading more sweets...</span>
                )}
              </div>
            </motion.div>
          </>
        )}
      </div>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 animate-fadeIn">
          <span className="font-bold text-lg">🛒 {showToast}</span>
        </div>
      )}
      <Footer />
    </div>
  );
}

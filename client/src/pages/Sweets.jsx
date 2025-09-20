import { useState, useEffect } from 'react';
import { fetchSweets } from '../utils/api';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Sweets() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetchSweets(token)
      .then(data => {
        setSweets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = sweets.filter(sweet => {
    const matchesSearch = sweet.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? sweet.category === category : true;
    const matchesMin = minPrice ? sweet.price >= Number(minPrice) : true;
    const matchesMax = maxPrice ? sweet.price <= Number(maxPrice) : true;
    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa]">
      <Navbar />
      <div className="container mx-auto flex-1 py-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#06b6d4] to-[#f43f5e] mb-8 text-center">Shop Sweets</motion.h1>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap gap-4 justify-center mb-8">
          <input type="text" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2 rounded-lg border border-[#6366f1] focus:ring-2 focus:ring-[#06b6d4]" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-2 rounded-lg border border-[#06b6d4] focus:ring-2 focus:ring-[#6366f1]">
            <option value="">All Categories</option>
            <option value="Mithai">Mithai</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Fruit">Fruit</option>
            <option value="Citrus">Citrus</option>
            <option value="Candy">Candy</option>
          </select>
          <input type="number" placeholder="Min Price" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="px-4 py-2 rounded-lg border border-[#6366f1] w-24" />
          <input type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="px-4 py-2 rounded-lg border border-[#06b6d4] w-24" />
        </motion.div>
        {loading ? (
          <div className="text-center text-[#6366f1]">Loading sweets...</div>
        ) : !localStorage.getItem('token') ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center py-20">
            <h2 className="text-3xl font-bold text-[#f43f5e] mb-4">Login to view sweets</h2>
            <button onClick={() => window.location.href='/login'} className="bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[var(--color-btn-primary-hover)] hover:text-[var(--color-btn-text-alt)] hover:scale-105 transition">Login</button>
          </motion.div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center text-[#f43f5e]">No sweets found.</div>
            ) : (
              filtered.map(sweet => (
                <motion.div key={sweet._id} whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #6366f155' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                  {sweet.image && <img src={sweet.image} alt={sweet.name} className="mb-3 rounded-lg shadow-md max-h-32 object-contain" />}
                  <h2 className="text-2xl font-bold text-[#6366f1] mb-1">{sweet.name}</h2>
                  <p className="text-[#06b6d4] mb-1">{sweet.category}</p>
                  <p className="text-[#334155] mb-2">₹{sweet.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 rounded-lg bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] font-semibold shadow hover:bg-[var(--color-btn-primary-hover)] hover:text-[var(--color-btn-text-alt)] hover:scale-105 transition">Add to Cart</button>
                    <button className="px-3 py-1 rounded-lg bg-[var(--color-btn-secondary)] text-[var(--color-btn-text-alt)] font-semibold shadow hover:bg-[var(--color-btn-secondary-hover)] hover:text-[var(--color-btn-text)] hover:scale-105 transition">Add to Wishlist</button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}

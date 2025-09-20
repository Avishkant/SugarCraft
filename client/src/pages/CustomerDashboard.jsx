
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

  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa]">
      <Navbar />
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="container mx-auto flex-1 py-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-12 mb-8 rounded-2xl shadow-xl bg-white bg-opacity-90 animate-fadeIn">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#06b6d4] to-[#f43f5e] mb-2 text-center drop-shadow-lg">Welcome back, {customerName} 🍬</h1>
          <p className="text-xl text-[#334155] mb-6 text-center">Craving something sweet today? Explore our fresh collection.</p>
          <div className="flex gap-6 mb-4">
            <button className="bg-gradient-to-r from-[#6366f1] to-[#06b6d4] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition" onClick={() => window.location.href='/sweets'}>🍭 Browse Sweets</button>
            <button className="bg-gradient-to-r from-[#f43f5e] to-[#f59e42] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition" onClick={() => window.location.href='/wishlist'}>❤️ View Your Wishlist</button>
          </div>
        </section>
        {/* Highlights / Quick Actions */}
          <motion.section
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18 } }
            }}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-xl border-2 border-[#C8879B] rounded-2xl shadow-2xl p-8 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-4xl mb-4 text-[#C8879B] animate-bounce">🎁</span>
              <h3 className="text-2xl font-bold text-[#3B3B3B] mb-2">Today's Offers</h3>
              <p className="text-[#6B6B6B] mb-2">Special discounts on best sellers!</p>
              <button className="mt-2 bg-[#C8879B] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#B8A287] hover:text-[#2A2A2A] transition">View Offers</button>
            </motion.div>
            <motion.div
              className="bg-white/80 backdrop-blur-xl border-2 border-[#B8A287] rounded-2xl shadow-2xl p-8 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <span className="text-4xl mb-4 text-[#B8A287] animate-bounce">🛒</span>
              <h3 className="text-2xl font-bold text-[#3B3B3B] mb-2">Your Last Purchase</h3>
              <p className="text-[#6B6B6B] mb-2">Quickly reorder your favorites.</p>
              <button className="mt-2 bg-[#B8A287] text-[#2A2A2A] px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#C8879B] hover:text-white transition">Reorder</button>
            </motion.div>
            <motion.div
              className="bg-white/80 backdrop-blur-xl border-2 border-[#C8879B] rounded-2xl shadow-2xl p-8 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <span className="text-4xl mb-4 text-[#C8879B] animate-bounce">🌟</span>
              <h3 className="text-2xl font-bold text-[#3B3B3B] mb-2">Recommended for You</h3>
              <p className="text-[#6B6B6B] mb-2">Handpicked sweets based on your taste!</p>
              <button className="mt-2 bg-[#C8879B] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#B8A287] hover:text-[#2A2A2A] transition">See Recommendations</button>
            </motion.div>
          </motion.section>
        {/* About Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="py-8 px-4 bg-white bg-opacity-95 rounded-xl shadow-md mx-auto max-w-2xl mb-10 animate-fadeIn">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#06b6d4] to-[#f43f5e] mb-3">At SugarCraft, every sweet has a story.</h2>
          <p className="text-lg text-[#334155]">From traditional mithai to modern delights, we craft happiness for every moment.</p>
        </motion.section>
      </motion.div>
      <Footer />
    </div>
  );
}

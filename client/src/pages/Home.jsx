import { motion } from 'framer-motion';
// ...existing code...
import { FiArrowDownCircle } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SweetCarousel from '../components/SweetCarousel';
import { useState, useEffect } from 'react';
import { fetchSweets } from '../utils/api';
import reactLogo from '../assets/react.svg';


// Updated color palette
const COLORS = {
  primaryDark: '#2A2A2A',
  primaryLight: '#F8F8F8',
  secondary: '#D3C9BE',
  accentRose: '#C8879B',
  accentGold: '#B8A287',
};

// Remove static sweets, will fetch from backend


export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    document.body.style.scrollSnapType = 'y mandatory';
    const token = localStorage.getItem('token');
    fetchSweets(token, 1, 8)
      .then((data) => setBestSellers(data.sweets))
      .catch(() => setBestSellers([]));
    return () => { document.body.style.scrollSnapType = ''; };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F8F8F8] via-[#D3C9BE] to-[#F8F8F8]">
      <Navbar />
      {/* Hero Section - Typography, Geometric, CTA */}
      <motion.section
        className="relative flex flex-col items-center justify-center w-full py-32 md:py-48 bg-gradient-to-r from-[#F8F8F8] via-[#FCE4EC] to-[#D3C9BE] rounded-b-3xl shadow-2xl mb-8 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
        style={{ scrollSnapAlign: 'start' }}
      >
        {/* Geometric Shapes */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-56 h-56 rounded-full bg-[#FFD700] opacity-30" />
          <div className="absolute bottom-4 right-4 w-40 h-40 rounded-full bg-[#C8879B] opacity-30" />
          <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-[#8A2BE2] rounded-full opacity-20" />
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-[#FCE4EC] rounded-full opacity-40" />
        </div>
        {/* Headline & CTA */}
        <motion.h1
          className="relative z-10 text-6xl md:text-7xl font-extrabold mb-8 text-[#2A2A2A] drop-shadow-xl text-center tracking-tight font-poppins"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Handmade Delights, Delivered to You
        </motion.h1>
        <motion.p
          className="relative z-10 text-2xl md:text-3xl text-[#C8879B] mb-12 text-center max-w-2xl font-medium"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Your Sweetest Craving, Just a Tap Away.
        </motion.p>
        <motion.button
          className="relative z-10 bg-[#C8879B] text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 hover:bg-[#FFD700] transition-all duration-250 text-lg"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Shop Now"
        >
          Shop Now
        </motion.button>
      </motion.section>

      {/* Best Sellers Carousel Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="flex flex-col items-center mb-8">
          <span className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B8A287] via-[#C8879B] to-[#FFD700] drop-shadow-lg text-center tracking-tight font-poppins flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-10 w-10 md:h-12 md:w-12 text-[#B8A287] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M7 17h10" /></svg>
            Our Best Sellers
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-10 w-10 md:h-12 md:w-12 text-[#FFD700] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="#FFD700" strokeWidth="2" fill="#FFD700" /></svg>
          </span>
          <span className="block w-32 h-2 rounded-full bg-gradient-to-r from-[#FFD700] via-[#C8879B] to-[#B8A287] opacity-70 mt-4"></span>
        </div>
        <SweetCarousel sweets={bestSellers} autoAdvance={true} />
      </section>

      {/* Why Us Section */}
      <section className="max-w-5xl mx-auto py-12 px-4">
  <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] mb-8 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-4 text-[var(--color-yellow)]">⭐</span>
            <h3 className="text-lg font-bold text-[#2A2A2A] mb-2">Quality Ingredients</h3>
            <p className="text-[#2A2A2A] text-center">Freshness in Every Bite</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-4 text-[var(--color-accent-rose)]">⚡</span>
            <h3 className="text-lg font-bold text-[#2A2A2A] mb-2">Fast Delivery</h3>
            <p className="text-[#2A2A2A] text-center">Sweetness, Quickly Delivered</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-4 text-[var(--color-accent-gold)]">🎁</span>
            <h3 className="text-lg font-bold text-[#2A2A2A] mb-2">Beautiful Packaging</h3>
            <p className="text-[#2A2A2A] text-center">Gift-Ready Presentation</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-5xl mx-auto py-12 px-4">
  <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] mb-8 text-center">Loved by Sweet Lovers Everywhere</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" className="w-16 h-16 rounded-full mb-2" />
            <span className="text-[var(--color-accent-rose)] font-bold mb-1">Priya S.</span>
            <span className="text-[var(--color-yellow)] text-lg mb-2">⭐⭐⭐⭐⭐</span>
            <p className="text-[#2A2A2A] text-center">"Absolutely delicious! The cupcakes are my favorite treat."</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" className="w-16 h-16 rounded-full mb-2" />
            <span className="text-[var(--color-accent-rose)] font-bold mb-1">Rahul M.</span>
            <span className="text-[var(--color-yellow)] text-lg mb-2">⭐⭐⭐⭐⭐</span>
            <p className="text-[#2A2A2A] text-center">"Fast delivery and beautiful packaging. Highly recommend!"</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Customer" className="w-16 h-16 rounded-full mb-2" />
            <span className="text-[var(--color-accent-rose)] font-bold mb-1">Aarti P.</span>
            <span className="text-[var(--color-yellow)] text-lg mb-2">⭐⭐⭐⭐⭐</span>
            <p className="text-[#2A2A2A] text-center">"The macarons are so fresh and tasty. Will order again!"</p>
          </div>
        </div>
      </section>


      {/* Footer Section */}
      <Footer />

    </div>
  );
}
                                                                                      
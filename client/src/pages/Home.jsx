import { motion } from 'framer-motion';
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

export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    document.body.style.scrollSnapType = 'y mandatory';
    const token = localStorage.getItem('token');
    fetchSweets(token || undefined, 1, 8)
      .then((data) => setBestSellers(data.sweets))
      .catch(() => setBestSellers([]));
    return () => { document.body.style.scrollSnapType = ''; };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F8F8F8] via-[#D3C9BE] to-[#F8F8F8]">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative flex flex-col items-center justify-center w-full py-32 md:py-48 bg-gradient-to-r from-[#F8F8F8] via-[#FCE4EC] to-[#D3C9BE] rounded-b-3xl shadow-2xl mb-8 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
        style={{ scrollSnapAlign: 'start' }}
      >
        {/* Geometric Shapes */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-56 h-56 rounded-full bg-[#FFD700] opacity-30 animate-pulse" />
          <div className="absolute bottom-4 right-4 w-40 h-40 rounded-full bg-[#C8879B] opacity-30 animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-[#8A2BE2] rounded-full opacity-20 animate-ping" />
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-[#FCE4EC] rounded-full opacity-40 animate-ping" />
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

      {/* Best Sellers Section */}
      <motion.section
        className="max-w-6xl mx-auto py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B8A287] via-[#C8879B] to-[#FFD700] drop-shadow-lg text-center tracking-tight font-poppins">
            Our Best Sellers
          </h2>
          <span className="block w-32 h-2 rounded-full bg-gradient-to-r from-[#FFD700] via-[#C8879B] to-[#B8A287] opacity-70 mt-4 animate-pulse"></span>
        </div>
        <SweetCarousel sweets={bestSellers} autoAdvance={true} />
      </motion.section>

      {/* Why Us Section */}
      <motion.section
        className="max-w-5xl mx-auto py-16 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-12 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: '⭐', title: 'Quality Ingredients', desc: 'Freshness in Every Bite', color: 'text-yellow-500' },
            { icon: '⚡', title: 'Fast Delivery', desc: 'Sweetness, Quickly Delivered', color: 'text-pink-400' },
            { icon: '🎁', title: 'Beautiful Packaging', desc: 'Gift-Ready Presentation', color: 'text-yellow-400' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <span className={`text-5xl mb-4 ${item.color}`}>{item.icon}</span>
              <h3 className="text-xl font-semibold mb-2 text-[#2A2A2A]">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="max-w-6xl mx-auto py-16 px-4 bg-gradient-to-r from-[#FCE4EC] via-[#F8F8F8] to-[#D3C9BE] rounded-3xl shadow-inner mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#2A2A2A] mb-12 text-center">Loved by Sweet Lovers Everywhere</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Priya S.', rating: '⭐⭐⭐⭐⭐', review: 'Absolutely delicious! The cupcakes are my favorite treat.' },
            { img: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'Rahul M.', rating: '⭐⭐⭐⭐⭐', review: 'Fast delivery and beautiful packaging. Highly recommend!' },
            { img: 'https://randomuser.me/api/portraits/women/65.jpg', name: 'Aarti P.', rating: '⭐⭐⭐⭐⭐', review: 'The macarons are so fresh and tasty. Will order again!' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <img src={item.img} alt={item.name} className="w-16 h-16 rounded-full mb-4" />
              <span className="text-pink-400 font-bold mb-1">{item.name}</span>
              <span className="text-yellow-400 text-lg mb-2">{item.rating}</span>
              <p className="text-gray-800">{item.review}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

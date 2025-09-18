import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SweetCarousel from '../components/SweetCarousel';
import reactLogo from '../assets/react.svg';

const sweets = [
  { _id: '1', name: 'Chocolate Truffle', category: 'Chocolate', price: 120, quantity: 10, image: reactLogo },
  { _id: '2', name: 'Strawberry Tart', category: 'Fruit', price: 90, quantity: 5, image: reactLogo },
  { _id: '3', name: 'Lemon Meringue', category: 'Citrus', price: 100, quantity: 0, image: reactLogo },
];

export default function Home() {
  return (
  <div className="min-h-screen flex flex-col bg-[#F5F5DC]">
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center w-full"
        style={{
          minHeight: 'calc(100vh - 80px)',
          background: 'linear-gradient(120deg, #F5F5DC 0%, #795548 60%, #A5D6A7 100%)',
        }}
      >
        {/* Custom SVG 3D sweets illustration */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ zIndex: 1 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: '100vh', maxWidth: '100vw' }}>
            <defs>
              <radialGradient id="bg" cx="50%" cy="50%" r="80%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#F5F5DC" />
                <stop offset="100%" stopColor="#795548" />
              </radialGradient>
              <linearGradient id="cake" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFB74D" />
                <stop offset="100%" stopColor="#795548" />
              </linearGradient>
              <linearGradient id="icing" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F5F5DC" />
                <stop offset="100%" stopColor="#A5D6A7" />
              </linearGradient>
            </defs>
            <rect width="1200" height="600" fill="url(#bg)" />
            {/* Cake base */}
            <ellipse cx="600" cy="400" rx="220" ry="80" fill="url(#cake)" stroke="#3E2723" strokeWidth="6" />
            {/* Cake icing */}
            <ellipse cx="600" cy="340" rx="200" ry="60" fill="url(#icing)" stroke="#FFB74D" strokeWidth="4" />
            {/* Sprinkles */}
            <circle cx="520" cy="340" r="8" fill="#795548" />
            <circle cx="580" cy="320" r="6" fill="#FFB74D" />
            <circle cx="650" cy="350" r="7" fill="#FFB74D" />
            <circle cx="700" cy="330" r="6" fill="#A5D6A7" />
            <circle cx="630" cy="325" r="5" fill="#F5F5DC" />
            {/* 3D shadow */}
            <ellipse cx="600" cy="480" rx="180" ry="30" fill="#FFB74D" opacity="0.3" />
            {/* Candies */}
            <circle cx="480" cy="420" r="18" fill="#F5F5DC" stroke="#FFB74D" strokeWidth="4" />
            <circle cx="720" cy="420" r="18" fill="#F5F5DC" stroke="#795548" strokeWidth="4" />
            {/* Lollipop */}
            <rect x="800" y="320" width="12" height="80" rx="6" fill="#A5D6A7" />
            <circle cx="806" cy="320" r="22" fill="#FFB74D" stroke="#F5F5DC" strokeWidth="4" />
            {/* Donut */}
            <ellipse cx="400" cy="350" rx="32" ry="22" fill="#F5F5DC" stroke="#FFB74D" strokeWidth="4" />
            <ellipse cx="400" cy="350" rx="12" ry="8" fill="#795548" />
          </svg>
        </div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={{ zIndex: 2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="backdrop-blur-lg rounded-3xl p-10 shadow-2xl border-4"
              style={{
                maxWidth: '600px',
                boxShadow: '0 8px 32px 0 #79554833',
                background: 'linear-gradient(120deg, #FFF8F0 60%, #A5D6A7 100%)',
                borderColor: '#3E2723',
              }}
            >
              <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight" style={{ color: '#3E2723', textShadow: '0 2px 12px #FFB74D88' }}>Welcome to SugarCraft</h1>
              <h2 className="text-2xl font-semibold mb-2 tracking-wide" style={{ color: '#795548' }}>The Sweet Shop Experience</h2>
              <p className="text-xl max-w-2xl mx-auto mb-6" style={{ color: '#3E2723' }}>Indulge in the finest selection of sweets, crafted with love and creativity. Experience the magic of flavors and the joy of every bite!</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <motion.span whileHover={{ scale: 1.08, rotate: -2 }} className="bg-gradient-to-r from-[#FFB74D] to-[#A5D6A7] text-[#3E2723] px-4 py-2 rounded-full font-medium shadow-lg hover:scale-105 transition cursor-pointer">Indian Mithai & Desserts</motion.span>
                <motion.span whileHover={{ scale: 1.08, rotate: 2 }} className="bg-gradient-to-r from-[#A5D6A7] to-[#FFB74D] text-[#3E2723] px-4 py-2 rounded-full font-medium shadow-lg hover:scale-105 transition cursor-pointer">Gifting Hampers</motion.span>
                <motion.span whileHover={{ scale: 1.08, rotate: 1 }} className="bg-gradient-to-r from-[#795548] to-[#FFB74D] text-[#F5F5DC] px-4 py-2 rounded-full font-medium shadow-lg hover:scale-105 transition cursor-pointer">Chocolate Treats</motion.span>
              </div>
            </motion.div>
          </div>
      </section>
      {/* About Us Section */}
      <section className="about-us py-10 px-4 bg-white bg-opacity-80 rounded-xl shadow-md mx-auto max-w-3xl mb-10 animate-fadeIn">
        <h2 className="text-3xl font-bold text-pink-500 mb-3">About Us</h2>
        <p className="text-lg text-gray-700">SugarCraft is your destination for premium, handcrafted sweets. Our passion is to bring happiness through delightful treats, blending tradition with innovation. Whether you crave classic chocolates or adventurous fruit tarts, our shop is designed to satisfy every sweet tooth. Join us and discover a world where every dessert tells a story!</p>
      </section>
      {/* Sweets Carousel */}
      <SweetCarousel sweets={sweets} />
      <Footer />
    </div>
  );
}

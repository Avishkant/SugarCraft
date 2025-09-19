import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FiArrowDownCircle } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SweetCarousel from '../components/SweetCarousel';
import reactLogo from '../assets/react.svg';


// Updated color palette
const COLORS = {
  primaryDark: '#2A2A2A',
  primaryLight: '#F8F8F8',
  secondary: '#D3C9BE',
  accentRose: '#C8879B',
  accentGold: '#B8A287',
};

const sweets = [
  { _id: '1', name: 'Chocolate Truffle', category: 'Chocolate', price: 120, quantity: 10, image: reactLogo },
  { _id: '2', name: 'Strawberry Tart', category: 'Fruit', price: 90, quantity: 5, image: reactLogo },
  { _id: '3', name: 'Lemon Meringue', category: 'Citrus', price: 100, quantity: 0, image: reactLogo },
];


export default function Home() {
  // Animate scroll snap for vertical storytelling
  useEffect(() => {
    document.body.style.scrollSnapType = 'y mandatory';
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

      {/* Product Showcase Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-[#C8879B] via-[#FFD700] to-[#B8A287] bg-clip-text text-transparent drop-shadow-xl tracking-tight">
          Our Best Sellers
        </h2>
        <div className="flex justify-center mb-8">
          <span className="block w-32 h-2 rounded-full bg-gradient-to-r from-[#FFD700] via-[#C8879B] to-[#B8A287] opacity-70"></span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Example products, replace with real images and data */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img src="https://cdn.shopify.com/s/files/1/0569/3456/4001/products/Macaron_600x600.jpg?v=1669379822" alt="Macaron" className="w-24 h-24 object-cover rounded-full mb-4" />
            <h3 className="text-xl font-bold text-[#C8879B] mb-2">Macaron</h3>
            <p className="text-[#2A2A2A] text-center mb-2">Colorful, delicate French treat.</p>
            <span className="text-[#B8A287] font-semibold mb-2">₹120</span>
            <button className="bg-[#C8879B] text-white px-4 py-2 rounded-full font-bold hover:bg-[#FFD700] transition">Add to Cart</button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img src="https://cdn.shopify.com/s/files/1/0569/3456/4001/products/Cupcake_600x600.jpg?v=1669379822" alt="Cupcake" className="w-24 h-24 object-cover rounded-full mb-4" />
            <h3 className="text-xl font-bold text-[#C8879B] mb-2">Cupcake</h3>
            <p className="text-[#2A2A2A] text-center mb-2">Decorated, fluffy, and sweet.</p>
            <span className="text-[#B8A287] font-semibold mb-2">₹90</span>
            <button className="bg-[#C8879B] text-white px-4 py-2 rounded-full font-bold hover:bg-[#FFD700] transition">Add to Cart</button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img src="https://cdn.shopify.com/s/files/1/0569/3456/4001/products/Chocolate_600x600.jpg?v=1669379822" alt="Chocolate" className="w-24 h-24 object-cover rounded-full mb-4" />
            <h3 className="text-xl font-bold text-[#C8879B] mb-2">Chocolate</h3>
            <p className="text-[#2A2A2A] text-center mb-2">Rich, artisanal, and decadent.</p>
            <span className="text-[#B8A287] font-semibold mb-2">₹150</span>
            <button className="bg-[#C8879B] text-white px-4 py-2 rounded-full font-bold hover:bg-[#FFD700] transition">Add to Cart</button>
          </div>
        </div>
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

      {/* Final Call-to-Action Section */}
  <section className="w-full py-16 px-4 bg-gradient-to-r from-[#C8879B] via-[#FFD700] to-[#F8F8F8] text-center rounded-2xl mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready for a Sweet Escape?</h2>
  <button className="bg-white text-[#C8879B] px-8 py-4 rounded-full font-bold shadow-xl hover:bg-[#FFD700] hover:text-white transition-all duration-250 text-lg">Find Your Perfect Treat</button>
        <div className="mt-4">
          <a href="#" className="text-white underline text-lg">Explore All Flavors</a>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />

    </div>
  );
}

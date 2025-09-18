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
      <section className="relative flex flex-col items-center justify-center w-full py-20 bg-gradient-to-r from-[#F5F5DC] via-[#FFB74D] to-[#A5D6A7]">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[#3E2723] drop-shadow-lg text-center">Delight in Every Bite – Fresh, Colorful, and Irresistible Sweets!</h1>
        <p className="text-xl md:text-2xl text-[#795548] mb-8 text-center max-w-2xl">Welcome to SugarCraft, your modern sweet shop. From classic Indian delights to global favorites, we craft every treat with love, flavor, and a touch of magic.</p>
        <div className="flex flex-wrap gap-6 justify-center mb-8">
          <button className="bg-[#FFB74D] text-[#3E2723] px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#A5D6A7] transition">🍬 Explore Our Sweets</button>
          <button className="bg-[#A5D6A7] text-[#3E2723] px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#FFB74D] transition">✨ Join the SugarCraft Family</button>
        </div>
      </section>
      {/* Spacer between Hero and About */}
      <div className="h-10" />
      {/* Modern About Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        viewport={{ once: true }}
  className="relative py-12 px-6 bg-gradient-to-br from-[#FDEFF2] via-[#B2DFDB]/70 to-[#FFF9C4]/70 rounded-3xl shadow-2xl mx-auto max-w-3xl mb-14 border border-[#B2DFDB]"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-[#00897B] drop-shadow-lg">About SugarCraft</h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-[#4E342E] text-center leading-relaxed mb-2"
          >
            At SugarCraft, sweets are more than food—they’re happiness, tradition, and memories wrapped in sugar.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-[#00897B] text-center leading-relaxed mb-2"
          >
            Our journey began with a dream: to bring joy to every moment through beautifully crafted sweets.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-[#4E342E] text-center leading-relaxed mb-2"
          >
            Our collection blends the richness of traditional Indian mithai with the fun of modern candies and desserts.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-[#00897B] text-center leading-relaxed"
          >
            Every sweet is prepared with care, quality ingredients, and creativity—so you taste not just sugar, but love.
          </motion.p>
        </motion.div>
        {/* Decorative animated shapes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-tr from-[#F48FB1] to-[#B2DFDB] blur-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-gradient-to-tr from-[#B2DFDB] to-[#FFF9C4] blur-2xl"
        />
      </motion.section>
      {/* Featured Sweets Carousel Section */}
      <section className="py-10 px-4 mx-auto max-w-4xl w-full animate-fadeIn">
        <h2 className="text-3xl font-bold text-[#FFB74D] mb-6 text-center">Our Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-[#3E2723] mb-2">Kaju Katli</h3>
            <p className="text-[#795548]">Smooth cashew delight that melts in your mouth.</p>
          </div>
          <div className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-[#3E2723] mb-2">Rasgulla</h3>
            <p className="text-[#795548]">Soft, spongy, and soaked in sweet syrup.</p>
          </div>
          <div className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-[#3E2723] mb-2">Chocolate Barfi</h3>
            <p className="text-[#795548]">A modern twist to a traditional classic.</p>
          </div>
          <div className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-xl font-bold text-[#3E2723] mb-2">Colorful Candies</h3>
            <p className="text-[#795548]">Bursting with flavors and childhood nostalgia.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

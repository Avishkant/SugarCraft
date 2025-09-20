
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const features = [
  {
    icon: '👐',
    title: 'Handcrafted Excellence',
    desc: 'Every sweet is made by hand, blending tradition with care for a truly authentic taste.'
  },
  {
    icon: '✨',
    title: 'Innovative Flavors',
    desc: 'We constantly experiment with new recipes, fusing classic and modern for unique delights.'
  },
  {
    icon: '🏆',
    title: 'Uncompromising Quality',
    desc: 'We use only the finest ingredients, ensuring freshness and premium quality in every bite.'
  },
  {
    icon: '🎉',
    title: 'Celebrating Moments',
    desc: 'From festivals to everyday joy, SugarCraft is part of your sweetest memories.'
  },
];

export default function About() {
  useEffect(() => {
    document.title = 'About | SugarCraft';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
  <div className="min-h-screen flex flex-col bg-[#FAFAFA] relative overflow-x-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-[#BFA2DB] opacity-20 rounded-full blur-3xl -z-10 animate-pulse"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="hidden md:block absolute bottom-0 right-0 w-96 h-96 bg-[#A8E6CF] opacity-20 rounded-full blur-3xl -z-10 animate-pulse"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <Navbar />
      {/* Hero Section */}
      <motion.section
  className="container mx-auto flex-1 py-16 px-4 flex flex-col items-center justify-center animate-fadeIn"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-[#3B3B3B] mb-6 text-center drop-shadow-lg tracking-tight font-poppins"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          About SugarCraft
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-[#6B6B6B] mb-8 text-center max-w-2xl font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          SugarCraft is dedicated to bringing you the finest handcrafted sweets, made with love and tradition. Our mission is to blend classic recipes with modern flavors, ensuring every bite is a delightful experience.<br /><br />
          We believe in quality, freshness, and a touch of magic in every sweet. Our team is passionate about innovation, constantly creating new treats to surprise and delight our customers.<br /><br />
          From festive celebrations to everyday indulgence, SugarCraft is your trusted companion for all things sweet. Thank you for making us a part of your special moments!
        </motion.p>
        {/* Animated Divider */}
        <motion.div
          className="w-32 h-2 rounded-full bg-gradient-to-r from-[#BFA2DB] via-[#FFBC9A] to-[#A8E6CF] mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{ originX: 0.5 }}
        />
        {/* Features Timeline/Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } }
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-[#FFFFFF] rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-t-4 border-[#BFA2DB] hover:scale-105 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.7 }}
            >
              <span className="text-4xl mb-4 animate-bounce" aria-label={f.title} style={{color: i % 2 === 0 ? '#BFA2DB' : '#9FD9F6'}}>{f.icon}</span>
              <h3 className="text-xl font-bold text-[#3B3B3B] mb-2">{f.title}</h3>
              <p className="text-[#6B6B6B] text-base">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      {/* Call to Action Section */}
      <motion.section
        className="w-full py-12 px-4 bg-gradient-to-r from-[#FAFAFA] via-[#F3F3F3] to-[#BFA2DB] text-center rounded-2xl mb-8 shadow-xl animate-fadeIn border border-[#BFA2DB]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#3B3B3B] mb-4">Ready to Taste the Magic?</h2>
  <a href="/sweets" className="inline-block bg-[#BFA2DB] text-[#FFFFFF] px-8 py-4 rounded-full font-bold shadow-xl hover:bg-[#9C7BC9] hover:text-[#FFFFFF] transition-all duration-250 text-lg border border-[#BFA2DB]">Shop Sweets</a>
      </motion.section>
      <Footer />
    </div>
  );
}

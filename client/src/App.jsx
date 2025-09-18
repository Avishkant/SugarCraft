

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Sweets from './pages/Sweets';
const SugarCraftLogo = 'https://res.cloudinary.com/dxt4hudrn/image/upload/v1758212653/sweets/Gemini_Generated_Image_w8vwd9w8vwd9w8vw_o8xhnp.png';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
const About = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa]">
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative flex flex-col items-center justify-center py-12 mb-8">
      <a href="/" className="absolute top-6 left-6">
        <motion.img src={SugarCraftLogo} alt="SugarCraft Logo" className="max-w-xs h-auto drop-shadow-lg hover:scale-110 transition" whileHover={{ scale: 1.15, rotate: 10 }} />
      </a>
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#06b6d4] to-[#f43f5e] mb-4 text-center drop-shadow-lg">About SugarCraft</h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-md p-8 text-[#334155] text-lg">
        <p className="mb-4">SugarCraft is your modern sweet shop, blending tradition and innovation. We craft happiness for every moment, from classic mithai to global favorites. Taste the magic!</p>
        <div className="flex gap-4 justify-center mt-4">
          <span className="text-3xl animate-bounce">🍬</span>
          <span className="text-3xl animate-pulse">🍭</span>
          <span className="text-3xl animate-spin">🍫</span>
        </div>
      </motion.div>
    </motion.div>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<CustomerDashboard />} />
      <Route path="/sweets" element={<Sweets />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;

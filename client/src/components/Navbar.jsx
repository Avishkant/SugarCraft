
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const SugarCraftLogo = 'https://res.cloudinary.com/dxt4hudrn/image/upload/v1758212653/sweets/Gemini_Generated_Image_w8vwd9w8vwd9w8vw_o8xhnp.png';

export default function Navbar() {
  const navigate = useNavigate ? useNavigate() : () => {};
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', () => {
      setLoggedIn(!!localStorage.getItem('token'));
    });
    return () => window.removeEventListener('storage', () => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
  <nav className="bg-white text-[#2E2E2E] shadow-lg sticky top-0 z-50 animate-fadeIn border-b-4 border-[#FF4D6D]">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <a href="/" className="flex items-center">
          <motion.img src={SugarCraftLogo} alt="SugarCraft Logo" className="h-10 w-auto drop-shadow-lg hover:scale-110 transition" whileHover={{ scale: 1.12, rotate: 8 }} />
        </a>
        <div className="flex gap-4 items-center">
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: '#FFB74D', color: '#3E2723', boxShadow: '0 4px 16px #FFB74D55' }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg font-semibold bg-transparent text-[#2E2E2E] transition"
            onClick={() => navigate('/')}
          >Home</motion.button>
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: '#A5D6A7', color: '#3E2723', boxShadow: '0 4px 16px #A5D6A755' }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg font-semibold bg-transparent text-[#2E2E2E] transition"
            onClick={() => navigate('/about')}
          >About</motion.button>
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: '#FF4D6D', color: '#fff', boxShadow: '0 4px 16px #FF4D6D55' }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg font-semibold bg-transparent text-[#2E2E2E] transition"
            onClick={() => navigate('/sweets')}
          >Sweets</motion.button>
          {!loggedIn && (
            <>
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/login')} className="bg-[#FFB74D] text-[#3E2723] px-4 py-2 rounded-lg font-semibold hover:bg-[#A5D6A7] hover:text-[#3E2723] transition">Login</motion.button>
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/register')} className="bg-[#F5F5DC] text-[#3E2723] px-4 py-2 rounded-lg font-semibold hover:bg-[#A5D6A7] hover:text-[#3E2723] transition">Sign Up</motion.button>
            </>
          )}
          {loggedIn && (
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.97 }} onClick={handleLogout} className="bg-[#FFB74D] text-[#3E2723] px-4 py-2 rounded-lg font-semibold hover:bg-[#A5D6A7] hover:text-[#3E2723] transition">Logout</motion.button>
          )}
        </div>
      </div>
    </nav>
  );
}

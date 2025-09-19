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
  <nav className="bg-[#F8F8F8] text-[#2A2A2A] shadow-lg sticky top-0 z-50 animate-fadeIn border-b-4 border-[#D3C9BE]">
  <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <a href="/" className="flex items-center">
          <motion.img src={SugarCraftLogo} alt="SugarCraft Logo" className="h-10 w-auto drop-shadow-lg hover:scale-110 transition" whileHover={{ scale: 1.12, rotate: 8 }} />
        </a>
        <div className="flex gap-4 items-center">
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: '#D3C9BE', color: '#2A2A2A', boxShadow: '0 4px 16px #D3C9BE55' }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg font-semibold bg-transparent text-[#2A2A2A] transition"
            onClick={() => navigate('/')}
          >Home</motion.button>
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: '#B8A287', color: '#2A2A2A', boxShadow: '0 4px 16px #B8A28755' }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg font-semibold bg-transparent text-[#2A2A2A] transition"
            onClick={() => navigate('/about')}
          >About</motion.button>
          <motion.button
            whileHover={{ scale: 1.12, backgroundColor: '#C8879B', color: '#fff', boxShadow: '0 4px 16px #C8879B55' }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg font-semibold bg-transparent text-[#2A2A2A] transition"
            onClick={() => navigate('/sweets')}
          >Sweets</motion.button>
          {!loggedIn && (
            <>
              <motion.button whileHover={{ scale: 1.08, backgroundColor: '#C8879B', color: '#fff' }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/login')} className="bg-[#C8879B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#B8A287] hover:text-[#2A2A2A] transition">Login</motion.button>
              <motion.button whileHover={{ scale: 1.08, backgroundColor: '#B8A287', color: '#2A2A2A' }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/register')} className="bg-[#B8A287] text-[#2A2A2A] px-4 py-2 rounded-lg font-semibold hover:bg-[#C8879B] hover:text-white transition">Sign Up</motion.button>
            </>
          )}
          {loggedIn && (
            <motion.button whileHover={{ scale: 1.08, backgroundColor: '#C8879B', color: '#fff' }} whileTap={{ scale: 0.97 }} onClick={handleLogout} className="bg-[#C8879B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#B8A287] hover:text-[#2A2A2A] transition">Logout</motion.button>
          )}
        </div>
      </div>
    </nav>
  );
}
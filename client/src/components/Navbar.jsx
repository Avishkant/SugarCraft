import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const SugarCraftLogo = 'https://res.cloudinary.com/dxt4hudrn/image/upload/v1758212653/sweets/Gemini_Generated_Image_w8vwd9w8vwd9w8vw_o8xhnp.png';

export default function Navbar() {
  const navigate = useNavigate ? useNavigate() : () => {};
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
    setRole(localStorage.getItem('role') || '');
    const handleStorage = () => {
      setLoggedIn(!!localStorage.getItem('token'));
      setRole(localStorage.getItem('role') || '');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setLoggedIn(false);
    setRole('');
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
          {role !== 'admin' && (
            <>
              <motion.button
                whileHover={{ scale: 1.12, backgroundColor: '#C8879B', color: '#fff', boxShadow: '0 4px 16px #C8879B55' }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-lg font-semibold bg-transparent text-[#2A2A2A] transition"
                onClick={() => navigate('/sweets')}
              >Sweets</motion.button>
              {loggedIn && location.pathname !== '/cart' && (
                <motion.button
                  whileHover={{ scale: 1.12, backgroundColor: 'var(--color-btn-secondary-hover)', color: 'var(--color-btn-text)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 rounded-lg font-semibold bg-[var(--color-btn-secondary)] text-[var(--color-btn-text-alt)] transition flex items-center gap-2"
                  onClick={() => navigate('/cart')}
                >
                  <span role="img" aria-label="cart">🛒</span> Cart
                </motion.button>
              )}
            </>
          )}
          {role === 'admin' && (
            <motion.button
              whileHover={{ scale: 1.12, backgroundColor: '#B8A287', color: '#2A2A2A', boxShadow: '0 4px 16px #B8A28755' }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-lg font-semibold bg-transparent text-[#2A2A2A] transition"
              onClick={() => navigate('/admin')}
            >Admin Dashboard</motion.button>
          )}
          {!loggedIn && (
            <>
              <motion.button whileHover={{ scale: 1.08, backgroundColor: 'var(--color-btn-primary-hover)', color: 'var(--color-btn-text-alt)' }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/login')} className="bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] px-4 py-2 rounded-lg font-semibold hover:bg-[var(--color-btn-primary-hover)] hover:text-[var(--color-btn-text-alt)] transition">Login</motion.button>
              <motion.button whileHover={{ scale: 1.08, backgroundColor: 'var(--color-btn-secondary-hover)', color: 'var(--color-btn-text)]' }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/register')} className="bg-[var(--color-btn-secondary)] text-[var(--color-btn-text-alt)] px-4 py-2 rounded-lg font-semibold hover:bg-[var(--color-btn-secondary-hover)] hover:text-[var(--color-btn-text)] transition">Sign Up</motion.button>
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
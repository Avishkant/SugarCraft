import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const SugarCraftLogo = 'https://res.cloudinary.com/dxt4hudrn/image/upload/v1758212653/sweets/Gemini_Generated_Image_w8vwd9w8vwd9w8vw_o8xhnp.png';

export default function Navbar() {
  const navigate = useNavigate ? useNavigate() : () => {};
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

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
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4 items-center">
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
        {/* Hamburger Icon for Mobile */}
        <button className="md:hidden flex items-center px-3 py-2 border-2 rounded-full bg-[#C8879B] border-[#B8A287] shadow-lg" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </div>
      {/* Overlay to close menu (outside menu container) */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setMenuOpen(false)} />
      )}
      {/* Mobile Slide-out Menu */}
      <div className={`md:hidden fixed top-0 left-0 w-3/4 max-w-xs h-full bg-[#F8F8F8] shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ borderRight: '4px solid #D3C9BE' }}>
        <div className="flex flex-col gap-4 p-6 pt-10">
          <button className="text-left font-bold text-lg mb-4 text-[#2A2A2A]" onClick={() => { setMenuOpen(false); navigate('/'); }}>Home</button>
          <button className="text-left font-bold text-lg mb-4 text-[#2A2A2A]" onClick={() => { setMenuOpen(false); navigate('/about'); }}>About</button>
          {role !== 'admin' && <button className="text-left font-bold text-lg mb-4 text-[#2A2A2A]" onClick={() => { setMenuOpen(false); navigate('/sweets'); }}>Sweets</button>}
          {loggedIn && location.pathname !== '/cart' && role !== 'admin' && <button className="text-left font-bold text-lg mb-4 text-[#2A2A2A]" onClick={() => { setMenuOpen(false); navigate('/cart'); }}>Cart</button>}
          {role === 'admin' && <button className="text-left font-bold text-lg mb-4 text-[#2A2A2A]" onClick={() => { setMenuOpen(false); navigate('/admin'); }}>Admin Dashboard</button>}
          {!loggedIn && <>
            <button className="text-left font-bold text-lg mb-4 text-[#2A2A2A]" onClick={() => { setMenuOpen(false); navigate('/login'); }}>Login</button>
            <button className="text-left font-bold text-lg mb-4 text-[#2A2A2A]" onClick={() => { setMenuOpen(false); navigate('/register'); }}>Sign Up</button>
          </>}
          {loggedIn && <button className="text-left font-bold text-lg mb-4 text-[#2A2A2A]" onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button>}
        </div>
      </div>
    </nav>
  );
}
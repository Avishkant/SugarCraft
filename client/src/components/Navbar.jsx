
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate ? useNavigate() : () => {};
  return (
    <nav className="bg-[#3E2723] text-[#F5F5DC] shadow-lg sticky top-0 z-50 animate-fadeIn border-b-4 border-[#FFB74D]">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <span className="text-2xl font-bold tracking-wide hover:text-[#FFB74D] transition cursor-pointer" onClick={() => navigate('/')}>SugarCraft</span>
        <div className="flex gap-4 items-center">
          <button className="hover:text-[#A5D6A7] transition" onClick={() => navigate('/')}>Home</button>
          <button className="hover:text-[#A5D6A7] transition" onClick={() => navigate('/about')}>About</button>
          <button className="hover:text-[#A5D6A7] transition" onClick={() => navigate('/sweets')}>Sweets</button>
          <button onClick={() => navigate('/login')} className="bg-[#FFB74D] text-[#3E2723] px-4 py-2 rounded-lg font-semibold hover:bg-[#A5D6A7] hover:text-[#3E2723] transition">Login</button>
          <button onClick={() => navigate('/register')} className="bg-[#F5F5DC] text-[#3E2723] px-4 py-2 rounded-lg font-semibold hover:bg-[#A5D6A7] hover:text-[#3E2723] transition">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

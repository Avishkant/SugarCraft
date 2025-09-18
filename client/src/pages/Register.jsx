
import React, { useState } from 'react';
import { registerUser } from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
  setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [success, setSuccess] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await registerUser(form);
      setSuccess('Registration successful! You can now login.');
  setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5DC]">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <form className="bg-[#FFF8F0] border-2 border-[#795548] rounded-2xl shadow-xl p-8 w-full max-w-md animate-fadeIn" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-[#3E2723] mb-6 text-center">Sign Up for SugarCraft</h2>
          <div className="mb-4">
            <label className="block text-[#795548] mb-2">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB74D] transition bg-[#F5F5DC] text-[#3E2723]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#795548] mb-2">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB74D] transition bg-[#F5F5DC] text-[#3E2723]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#795548] mb-2">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB74D] transition bg-[#F5F5DC] text-[#3E2723]" />
          </div>
          {error && <div className="text-[#FFB74D] mb-4 text-center animate-shake">{error}</div>}
          {success && <div className="text-[#A5D6A7] mb-4 text-center animate-fadeIn">{success}</div>}
          <button type="submit" className="w-full bg-gradient-to-r from-[#FFB74D] to-[#A5D6A7] text-[#3E2723] py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          <div className="mt-4 text-center">
            <span className="text-[#795548]">Already have an account? </span>
            <a href="/login" className="text-[#FFB74D] hover:underline font-semibold">Login</a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

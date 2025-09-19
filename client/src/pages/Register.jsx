
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
  <div className="min-h-screen flex flex-col bg-[#F8F8F8]">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
  <form className="bg-white border-2 border-[#A5E3A5] rounded-2xl shadow-xl p-8 w-full max-w-md animate-fadeIn" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-[#4A4A4A] mb-6 text-center">Sign Up for SugarCraft</h2>
          <div className="mb-4">
            <label className="block text-[#4A4A4A] mb-2">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border border-[#A5E3A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition bg-[#F5F5F5] text-[#4A4A4A]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#4A4A4A] mb-2">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-[#A5E3A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition bg-[#F5F5F5] text-[#4A4A4A]" />
          </div>
          <div className="mb-4">
            <label className="block text-[#4A4A4A] mb-2">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border border-[#A5E3A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition bg-[#F5F5F5] text-[#4A4A4A]" />
          </div>
          {error && <div className="text-[#FFD700] mb-4 text-center animate-shake">{error}</div>}
          {success && <div className="text-[#A5E3A5] mb-4 text-center animate-fadeIn">{success}</div>}
          <button type="submit" className="w-full bg-gradient-to-r from-[#FFB6C1] to-[#A5E3A5] text-[#4A4A4A] py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50" disabled={loading}>
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


import { useState, useEffect } from 'react';
import { fetchSweets, addSweet } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export default function AdminDashboard() {
  const [search, setSearch] = useState('');
  const [sweets, setSweets] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchSweets(token)
      .then(setSweets)
      .catch(err => console.error('Failed to fetch sweets:', err));
  }, []);
  const [form, setForm] = useState({ name: '', category: '', price: '', quantity: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  // Edit sweet handler
  const handleEdit = sweet => {
    setEditId(sweet._id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      image: null // Don't prefill image
    });
    setImagePreview(sweet.image || null);
  };

  // Delete sweet handler
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/sweets/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to delete sweet');
      setSweets(sweets.filter(s => s._id !== id));
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(search.toLowerCase()) ||
    sweet.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setForm({ ...form, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddOrUpdate = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      if (editId) {
        // Update sweet
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('category', form.category);
        formData.append('price', form.price);
        formData.append('quantity', form.quantity);
        if (form.image) formData.append('image', form.image);
        const res = await fetch(`${BASE_URL}/sweets/${editId}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Failed to update sweet');
        const updatedSweet = await res.json();
        setSweets(sweets.map(s => s._id === editId ? updatedSweet : s));
        setEditId(null);
      } else {
        const newSweet = await addSweet(form, token);
        setSweets([...sweets, newSweet]);
      }
      setForm({ name: '', category: '', price: '', quantity: '', image: null });
      setImagePreview(null);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5DC]">
      <Navbar />
      <div className="container mx-auto flex-1 py-10">
        <>
          <h1 className="text-4xl font-bold text-[#3E2723] mb-2 text-center">Admin Dashboard</h1>
          <h2 className="text-2xl text-[#FFB74D] mb-6 text-center">Welcome back, Sweet Master 👑 – Manage your store with ease.</h2>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#795548] mb-2">Add / Edit / Delete Sweets</h3>
              <p className="text-[#3E2723]">Manage your sweet inventory and update details.</p>
            </div>
            <div className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#795548] mb-2">Restock Sweets</h3>
              <p className="text-[#3E2723]">Keep your shop full of fresh treats.</p>
            </div>
            <div className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#795548] mb-2">Track Inventory</h3>
              <p className="text-[#3E2723]">Monitor stock levels and avoid running out.</p>
            </div>
            <div className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#795548] mb-2">View Customer Purchases</h3>
              <p className="text-[#3E2723]">See who’s loving your sweets and their orders.</p>
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search sweets by name or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB74D] transition bg-[#FFF8F0] text-[#3E2723]"
            />
          </div>
          <form className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6 mb-10 max-w-xl mx-auto" onSubmit={handleAddOrUpdate}>
            <h2 className="text-2xl font-bold text-[#795548] mb-4">{editId ? 'Update Sweet' : 'Add New Sweet'}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="px-4 py-2 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB74D] transition bg-[#F5F5DC] text-[#3E2723]" />
              <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" required className="px-4 py-2 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB74D] transition bg-[#F5F5DC] text-[#3E2723]" />
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required className="px-4 py-2 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB74D] transition bg-[#F5F5DC] text-[#3E2723]" />
              <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" required className="px-4 py-2 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB74D] transition bg-[#F5F5DC] text-[#3E2723]" />
              <input type="file" name="image" accept="image/*" onChange={handleChange} className="col-span-2 px-4 py-2 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB74D] transition bg-[#F5F5DC] text-[#3E2723]" />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="col-span-2 mt-2 rounded-lg shadow-md max-h-32 object-contain" />
              )}
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#FFB74D] to-[#A5D6A7] text-[#3E2723] py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition">{editId ? 'Update Sweet' : 'Add Sweet'}</button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredSweets.length === 0 ? (
                <div className="col-span-3 text-center text-[#795548]">No sweets found.</div>
              ) : (
                filteredSweets.map(sweet => (
                  <motion.div
                    key={sweet._id}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 40 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #FFB74D55' }}
                    className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6 flex flex-col items-center relative overflow-hidden group"
                  >
                    {sweet.image && (
                      <motion.img
                        src={sweet.image}
                        alt={sweet.name}
                        className="mb-3 rounded-lg shadow-md max-h-32 object-contain transition-transform duration-300 group-hover:scale-105"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    <h2 className="text-2xl font-bold text-[#3E2723] mb-2 group-hover:text-[#FFB74D] transition-colors duration-300">{sweet.name}</h2>
                    <p className="text-[#795548] mb-1">Category: {sweet.category}</p>
                    <p className="text-[#3E2723] font-semibold mb-2">Price: ₹{sweet.price}</p>
                    <p className="text-[#A5D6A7] mb-2">In stock: {sweet.quantity}</p>
                    <motion.div className="flex gap-2 mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <button onClick={() => handleEdit(sweet)} disabled={loading} className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#A5D6A7] to-[#FFB74D] text-[#3E2723] font-semibold shadow hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFB74D]">Edit</button>
                      <button onClick={() => handleDelete(sweet._id)} disabled={loading} className="px-3 py-1 rounded-lg bg-[#795548] text-[#F5F5DC] font-semibold shadow hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#795548]">Delete</button>
                    </motion.div>
                    {editId === sweet._id && (
                      <span className="absolute top-2 right-2 bg-[#FFB74D] text-[#3E2723] px-2 py-1 rounded shadow animate-pulse">Editing</span>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </>
        <Footer />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import SweetCard from '../components/SweetCard';

const initialForm = {
  name: '',
  category: '',
  price: '',
  quantity: '',
  image: '',
};

const AdminDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSweets = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/sweets');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch sweets');
        setSweets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSweets();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(f => ({ ...f, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/sweets/${editingId}` : '/api/sweets';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save failed');
      setForm(initialForm);
      setEditingId(null);
      // Refresh sweets list
      setSweets(prev => {
        if (editingId) {
          return prev.map(s => s.id === editingId ? data : s);
        } else {
          return [...prev, data];
        }
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = sweet => {
    setForm({ ...sweet });
    setEditingId(sweet.id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this sweet?')) return;
    try {
      const res = await fetch(`/api/sweets/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setSweets(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRestock = async id => {
    try {
      const res = await fetch(`/api/sweets/${id}/restock`, { method: 'POST' });
      if (!res.ok) throw new Error('Restock failed');
      setSweets(prev => prev.map(s => s.id === id ? { ...s, quantity: s.quantity + 1 } : s));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-light py-10 px-4">
      <h2 className="text-4xl font-extrabold text-accent mb-8 text-center drop-shadow-lg">Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl mx-auto flex flex-col gap-4 mb-10">
        <h3 className="text-2xl font-bold text-primary mb-2 text-center">{editingId ? 'Edit Sweet' : 'Add New Sweet'}</h3>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="px-4 py-2 rounded-full border-2 border-primary focus:outline-none focus:ring-2 focus:ring-accent" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="px-4 py-2 rounded-full border-2 border-secondary focus:outline-none focus:ring-2 focus:ring-primary" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" min="0" step="0.01" className="px-4 py-2 rounded-full border-2 border-accent focus:outline-none focus:ring-2 focus:ring-secondary" required />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" min="0" className="px-4 py-2 rounded-full border-2 border-primary focus:outline-none focus:ring-2 focus:ring-accent" required />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="px-4 py-2 rounded-full border-2 border-secondary" />
        {form.image && <img src={form.image} alt="Sweet" className="w-20 h-20 object-cover rounded-full mx-auto border-4 border-accent shadow-md" />}
        <button type="submit" className="px-6 py-2 rounded-full font-bold text-white bg-gradient-to-r from-primary to-accent shadow-md transition-all duration-200 hover:from-accent hover:to-primary">
          {editingId ? 'Update Sweet' : 'Add Sweet'}
        </button>
        {editingId && <button type="button" onClick={() => { setForm(initialForm); setEditingId(null); }} className="px-6 py-2 rounded-full font-bold text-dark bg-light border border-primary mt-2">Cancel</button>}
      </form>
      {loading ? (
        <div className="text-center text-primary text-xl">Loading sweets...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-xl">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {sweets.map(sweet => (
            <div key={sweet.id} className="relative">
              <SweetCard
                name={sweet.name}
                category={sweet.category}
                price={sweet.price}
                quantity={sweet.quantity}
                image={sweet.image}
                disabled={sweet.quantity === 0}
                onPurchase={() => {}}
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button onClick={() => handleEdit(sweet)} className="px-2 py-1 rounded bg-secondary text-dark font-bold shadow hover:bg-primary hover:text-white">Edit</button>
                <button onClick={() => handleDelete(sweet.id)} className="px-2 py-1 rounded bg-primary text-white font-bold shadow hover:bg-secondary hover:text-dark">Delete</button>
                <button onClick={() => handleRestock(sweet.id)} className="px-2 py-1 rounded bg-accent text-dark font-bold shadow hover:bg-primary hover:text-white">Restock</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

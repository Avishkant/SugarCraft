import React, { useState, useEffect } from 'react';
import SweetCard from '../components/SweetCard';

const CustomerDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
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

  const categories = ['All', ...Array.from(new Set(sweets.map(s => s.category)))];

  const handlePurchase = async (id) => {
    try {
      const res = await fetch(`/api/sweets/${id}/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Purchase failed');
      // Refresh sweets list after purchase
      setSweets(prev => prev.map(s => s.id === id ? { ...s, quantity: s.quantity - 1 } : s));
      alert('Purchase successful!');
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredSweets = sweets.filter(sweet => {
    const matchesSearch = sweet.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || sweet.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-light py-10 px-4">
      <h2 className="text-4xl font-extrabold text-primary mb-8 text-center drop-shadow-lg">Available Sweets</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Search sweets..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-full border-2 border-accent focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-4 py-2 rounded-full border-2 border-secondary focus:outline-none focus:ring-2 focus:ring-accent w-full sm:w-48"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-center text-primary text-xl">Loading sweets...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-xl">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {filteredSweets.map(sweet => (
            <SweetCard
              key={sweet.id}
              name={sweet.name}
              category={sweet.category}
              price={sweet.price}
              quantity={sweet.quantity}
              image={sweet.image}
              disabled={sweet.quantity === 0}
              onPurchase={() => handlePurchase(sweet.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;

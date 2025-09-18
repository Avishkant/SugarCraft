
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialSweets = [
  { _id: '1', name: 'Chocolate Truffle', category: 'Chocolate', price: 120, quantity: 10 },
  { _id: '2', name: 'Strawberry Tart', category: 'Fruit', price: 90, quantity: 5 },
  { _id: '3', name: 'Lemon Meringue', category: 'Citrus', price: 100, quantity: 0 },
];

export default function AdminDashboard() {
  const [search, setSearch] = useState('');
  const [sweets, setSweets] = useState(initialSweets);
  const [form, setForm] = useState({ name: '', category: '', price: '', quantity: '' });
  const [editId, setEditId] = useState(null);

  const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(search.toLowerCase()) ||
    sweet.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = e => {
    e.preventDefault();
    if (editId) {
      setSweets(sweets.map(sweet => sweet._id === editId ? { ...sweet, ...form, price: Number(form.price), quantity: Number(form.quantity) } : sweet));
      setEditId(null);
    } else {
      setSweets([...sweets, { _id: Date.now().toString(), ...form, price: Number(form.price), quantity: Number(form.quantity) }]);
    }
    setForm({ name: '', category: '', price: '', quantity: '' });
  };

  const handleEdit = sweet => {
    setEditId(sweet._id);
    setForm({ name: sweet.name, category: sweet.category, price: sweet.price, quantity: sweet.quantity });
  };

  const handleDelete = id => {
    setSweets(sweets.filter(sweet => sweet._id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5DC]">
      <Navbar />
      <div className="container mx-auto flex-1 py-10">
        <h1 className="text-4xl font-bold text-[#3E2723] mb-6 text-center">Admin Dashboard</h1>
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
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-[#FFB74D] to-[#A5D6A7] text-[#3E2723] py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition">{editId ? 'Update Sweet' : 'Add Sweet'}</button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSweets.length === 0 ? (
            <div className="col-span-3 text-center text-[#795548]">No sweets found.</div>
          ) : (
            filteredSweets.map(sweet => (
              <div key={sweet._id} className="bg-[#FFF8F0] border-2 border-[#795548] rounded-xl shadow-lg p-6 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-[#3E2723] mb-2">{sweet.name}</h2>
                <p className="text-[#795548] mb-1">Category: {sweet.category}</p>
                <p className="text-[#3E2723] font-semibold mb-2">Price: ₹{sweet.price}</p>
                <p className="text-[#A5D6A7] mb-2">In stock: {sweet.quantity}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleEdit(sweet)} className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#A5D6A7] to-[#FFB74D] text-[#3E2723] font-semibold shadow hover:scale-105 transition">Edit</button>
                  <button onClick={() => handleDelete(sweet._id)} className="px-3 py-1 rounded-lg bg-[#795548] text-[#F5F5DC] font-semibold shadow hover:scale-105 transition">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

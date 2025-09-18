
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sweets = [
  { _id: '1', name: 'Chocolate Truffle', category: 'Chocolate', price: 120, quantity: 10 },
  { _id: '2', name: 'Strawberry Tart', category: 'Fruit', price: 90, quantity: 5 },
  { _id: '3', name: 'Lemon Meringue', category: 'Citrus', price: 100, quantity: 0 },
];

export default function CustomerDashboard() {
  const [search, setSearch] = useState('');
  const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(search.toLowerCase()) ||
    sweet.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5DC]">
      <Navbar />
      <div className="container mx-auto flex-1 py-10">
        <h1 className="text-4xl font-bold text-[#3E2723] mb-6 text-center">Customer Dashboard</h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search sweets by name or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-[#A5D6A7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB74D] transition bg-[#FFF8F0] text-[#3E2723]"
          />
        </div>
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
                <button
                  className={`mt-2 px-4 py-2 rounded-lg font-semibold shadow-lg transition-colors duration-300 ${sweet.quantity === 0 ? 'bg-[#795548] text-[#F5F5DC] cursor-not-allowed' : 'bg-gradient-to-r from-[#FFB74D] to-[#A5D6A7] text-[#3E2723] hover:scale-105'}`}
                  disabled={sweet.quantity === 0}
                >
                  {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

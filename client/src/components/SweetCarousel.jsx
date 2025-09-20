import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SweetCarousel({ sweets, autoAdvance = false }) {
  const [index, setIndex] = useState(0);
  const cardsToShow = 3;
  // Responsive: 1 card on mobile, 2 on tablet, 3 on desktop
  const getCardsToShow = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };
  useEffect(() => {
    const handleResize = () => setWindowCards(getCardsToShow());
    setWindowCards(getCardsToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [windowCards, setWindowCards] = useState(getCardsToShow());

  useEffect(() => {
    if (!autoAdvance || sweets.length <= windowCards) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + windowCards) % sweets.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [index, autoAdvance, sweets.length, windowCards]);

  if (!sweets || sweets.length === 0) {
    return (
      <div className="w-full py-8 text-center text-lg text-[var(--color-btn-secondary)]">No sweets to show.</div>
    );
  }
  // Calculate visible cards
  const visible = [];
  for (let i = 0; i < windowCards; i++) {
    visible.push(sweets[(index + i) % sweets.length]);
  }
  return (
    <div className="w-full flex items-center justify-center py-6">
      <div className="relative w-full max-w-4xl flex items-center justify-center">
        <div className="flex gap-6 w-full px-2 sm:px-4">
          {visible.map((sweet) => (
            <motion.div
              key={sweet._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="flex-1 min-w-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center border-2 border-[#FFD700]/30 hover:border-[#C8879B]/50 transition-all duration-300"
              style={{ minHeight: '340px' }}
            >
              <img
                src={sweet.image}
                alt={sweet.name}
                className="w-32 h-32 object-cover rounded-2xl mb-4 shadow-lg border-2 border-[#C8879B]/30"
              />
              <h3 className="text-2xl font-extrabold text-[#C8879B] mb-2 text-center drop-shadow-lg font-poppins">{sweet.name}</h3>
              <p className="text-lg text-[#B8A287] mb-1 font-medium">{sweet.category}</p>
              <span className="text-xl text-[#FFD700] font-bold mb-3">₹{sweet.price}</span>
              {sweet.quantity === 0 ? (
                <span className="px-4 py-2 rounded-xl bg-gray-200 text-gray-500 font-semibold shadow cursor-not-allowed w-full text-center">Sold Out</span>
              ) : (
                <span className="px-4 py-2 rounded-xl bg-[#C8879B] text-white font-bold shadow w-full text-center hover:bg-[#B8A287] transition">In Stock</span>
              )}
            </motion.div>
          ))}
        </div>
        {/* Carousel Controls */}
        {sweets.length > windowCards && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {Array.from({ length: Math.ceil(sweets.length / windowCards) }).map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${i === Math.floor(index / windowCards) ? 'bg-[#C8879B]' : 'bg-[#FFD700]/40'} transition`}
                onClick={() => setIndex(i * windowCards)}
                aria-label={`Go to sweet group ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

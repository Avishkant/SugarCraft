// SweetCarousel.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SweetCarousel({ sweets, autoAdvance = false }) {
  const [index, setIndex] = useState(0);
  const cardsToShow = 3;

  useEffect(() => {
    if (!autoAdvance || sweets.length <= cardsToShow) return;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % sweets.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [index, autoAdvance, sweets.length]);

  if (!sweets || sweets.length === 0) {
    return (
      <div className="w-full py-8 text-center text-lg text-[#C8879B]">
        No sweets to show 🍩
      </div>
    );
  }

  // Calculate visible cards
  const visible = [];
  for (let i = 0; i < cardsToShow; i++) {
    visible.push(sweets[(index + i) % sweets.length]);
  }

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % sweets.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + sweets.length) % sweets.length);
  };

  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="relative w-full max-w-6xl overflow-hidden">
        {/* Sweet Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 sm:px-4">
          {visible.map((sweet, i) => (
            <AnimatePresence key={sweet._id} initial={false} mode="wait">
              <motion.div
                key={sweet._id}
                initial={{ opacity: 0, scale: 0.85, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="min-w-[220px] max-w-sm bg-white rounded-3xl shadow-xl p-4 sm:p-6 flex flex-col items-center justify-between border-2 border-[#FFD700]/30 hover:border-[#C8879B]/50 hover:shadow-2xl transition-all duration-300"
              >
                <motion.img
                  src={sweet.image}
                  alt={sweet.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl mb-4 shadow-md border-2 border-[#C8879B]/30"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="text-lg sm:text-xl font-extrabold text-[#C8879B] mb-2 text-center font-poppins drop-shadow">
                  {sweet.name}
                </h3>
                <p className="text-sm sm:text-base text-[#B8A287] mb-1 font-medium">
                  {sweet.category}
                </p>
                <span className="text-base sm:text-lg text-[#FFD700] font-bold mb-3">
                  ₹{sweet.price}
                </span>
                {sweet.quantity === 0 ? (
                  <span className="px-3 py-2 rounded-xl bg-gray-200 text-gray-500 font-semibold shadow cursor-not-allowed w-full text-center text-xs sm:text-base">
                    Sold Out
                  </span>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 rounded-xl bg-[#C8879B] text-white font-bold shadow w-full text-center hover:bg-[#B8A287] transition text-xs sm:text-base"
                    onClick={() => {
                      const token = localStorage.getItem('token');
                      if (!token) {
                        window.location.href = '/login';
                      } else {
                        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                        const exists = cart.find(item => item._id === sweet._id);
                        if (!exists) {
                          cart.push({ ...sweet, quantity: 1 });
                          localStorage.setItem('cart', JSON.stringify(cart));
                        }
                        alert('Sweet added to cart!');
                      }
                    }}
                  >
                    Add to Cart
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          ))}
        </div>

        {/* Navigation Arrows */}
        {sweets.length > cardsToShow && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 bg-white/90 hover:bg-[#C8879B] text-[#C8879B] hover:text-white rounded-full p-2 shadow-md transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 bg-white/90 hover:bg-[#C8879B] text-[#C8879B] hover:text-white rounded-full p-2 shadow-md transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {sweets.length > cardsToShow && (
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 mt-4 bottom-[-2rem]">
            {Array.from({ length: sweets.length }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  i === index ? "bg-[#C8879B]" : "bg-[#FFD700]/50"
                } transition`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

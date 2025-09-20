
// SweetCard component displays a single sweet's details and add-to-cart button
import React from 'react';


export default function SweetCard({ sweet, onAddToCart }) {
  // sweet: sweet object with details (name, image, price, category, quantity)
  // onAddToCart: callback to add sweet to cart
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center w-full max-w-sm mx-auto">
      {/* Sweet image preview if available */}
      {sweet.image && (
        <img
          src={sweet.image}
          alt={sweet.name}
          className="mb-3 rounded-lg shadow-md max-h-32 object-contain w-full"
        />
      )}
      {/* Sweet name */}
      <h2 className="text-2xl font-bold text-[var(--color-primary-600)] mb-1 text-center break-words w-full">
        {sweet.name}
      </h2>
      {/* Sweet category */}
      <p className="text-[var(--color-btn-secondary)] mb-1">{sweet.category}</p>
      {/* Sweet price */}
      <p className="text-[var(--color-primary-600)] mb-2">₹{sweet.price}</p>
      {/* Add to cart or sold out button */}
      <div className="flex gap-2 mt-2 w-full justify-center">
        {sweet.quantity === 0 ? (
          <button
            className="px-3 py-1 rounded-lg bg-gray-300 text-gray-500 font-semibold shadow cursor-not-allowed w-full"
            disabled
          >
            Sold Out
          </button>
        ) : (
          <button
            className="px-3 py-1 rounded-lg bg-[var(--color-btn-primary)] text-[var(--color-btn-text)] font-semibold shadow hover:bg-[var(--color-btn-primary-hover)] hover:text-[var(--color-btn-text-alt)] hover:scale-105 transition w-full"
            onClick={() => onAddToCart(sweet)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

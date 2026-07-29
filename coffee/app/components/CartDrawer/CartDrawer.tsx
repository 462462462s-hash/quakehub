"use client";

import React from "react";
// Updated path to match app/context/CartContext.tsx
import { useCart } from "@/app/context/CartContext"; 
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Panel */}
      <div className="relative w-full max-w-md bg-[#1B120C] text-[#F3E9DC] border-l border-[#3D2D23] h-full shadow-2xl flex flex-col z-10">
        
        {/* Header */}
        <div className="p-6 border-b border-[#3D2D23] flex items-center justify-between bg-[#2A1E17]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-[#D4A359]" size={22} />
            <h2 className="font-serif text-xl font-bold tracking-wide">Your Cart</h2>
            <span className="bg-[#D4A359] text-[#1B120C] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-[#A69285] hover:text-[#F3E9DC] hover:bg-[#1B120C] rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[#A69285]">
              <ShoppingBag size={48} className="opacity-30" />
              <p className="text-sm">Your cart is currently empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 text-xs font-bold uppercase tracking-widest text-[#D4A359] hover:underline"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 bg-[#2A1E17] p-4 rounded-2xl border border-[#3D2D23]"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded-xl border border-[#3D2D23]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-bold text-[#F3E9DC] truncate">{item.name}</h4>
                  {item.roast && <p className="text-[10px] text-[#A69285] uppercase tracking-wider">{item.roast}</p>}
                  <p className="text-sm font-serif font-bold text-[#D4A359] mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#A69285] hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-2 bg-[#1B120C] border border-[#3D2D23] rounded-lg px-2 py-1 text-xs">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-[#A69285] hover:text-[#D4A359]"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-bold text-[#F3E9DC] px-1">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-[#A69285] hover:text-[#D4A359]"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#3D2D23] bg-[#2A1E17] space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#A69285]">Subtotal</span>
              <span className="font-serif font-bold text-xl text-[#D4A359]">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#A69285]">Shipping & taxes calculated at checkout.</p>
            <button className="w-full bg-[#D4A359] hover:bg-[#c29248] text-[#1B120C] font-bold text-xs uppercase tracking-widest py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4A359]/10">
              Proceed to Checkout <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
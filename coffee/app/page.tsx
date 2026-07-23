"use client";

import React, { useState } from "react";
import { 
  Coffee, 
  ShoppingBag, 
  Sparkles, 
  ChevronRight, 
  Check, 
  Star, 
  Flame, 
  Clock, 
  Heart,
  Droplet,
  Sliders,
  ArrowRight
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  roast: string;
  notes: string[];
  price: number;
  rating: number;
  image: string;
  tag?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Ethiopian Yirgacheffe",
    roast: "Light-Medium Roast",
    notes: ["Jasmine", "Bergamot", "Peach"],
    price: 22,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600",
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Dark Velvet Espresso",
    roast: "Dark Roast",
    notes: ["Dark Chocolate", "Smoked Vanilla", "Hazelnut"],
    price: 20,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    tag: "Staff Pick",
  },
  {
    id: "3",
    name: "Colombian Supremo",
    roast: "Medium Roast",
    notes: ["Caramel", "Toasted Almond", "Red Apple"],
    price: 21,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=600",
  },
];

export default function CoffeeHomePage() {
  // Interactive Subscription State
  const [bagCount, setBagCount] = useState<number>(2);
  const [frequency, setFrequency] = useState<"weekly" | "biweekly" | "monthly">("biweekly");
  const [grindType, setGrindType] = useState<string>("Whole Bean");

  // Calculate Subscription Price
  const basePricePerBag = 18;
  const discountMultiplier = frequency === "weekly" ? 0.85 : frequency === "biweekly" ? 0.9 : 0.95;
  const totalPrice = (bagCount * basePricePerBag * discountMultiplier).toFixed(2);

  return (
    <div className="min-h-screen bg-[#1B120C] text-[#F3E9DC] font-sans selection:bg-[#D4A359] selection:text-[#1B120C]">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#2A1E17] border-b border-[#3D2D23] py-2 px-4 text-center text-xs tracking-widest text-[#A69285] flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#D4A359]" />
        <span>Welcome to the Lumen Coffee Experience</span>
        <Sparkles size={14} className="text-[#D4A359]" />
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#1B120C]/90 backdrop-blur-md border-b border-[#3D2D23]/60 px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2A1E17] border border-[#D4A359]/30 flex items-center justify-center text-[#D4A359]">
            <Coffee size={20} />
          </div>
          <div>
            <span className="text-xl font-serif text-[#D4A359] font-bold tracking-widest block leading-none">
              LUMEN
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#A69285] font-medium">
              Coffee Roasters
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-[#A69285]">
          <a href="#shop" className="hover:text-[#D4A359] transition-colors">OUR MENU</a>
          <a href="#subscription" className="hover:text-[#D4A359] transition-colors">CUSTOMER CLUB</a>
          <a href="#about" className="hover:text-[#D4A359] transition-colors">OUR CRAFT</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-[#A69285] hover:text-[#D4A359] transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4A359]" />
          </button>
          <button className="hidden sm:block bg-[#D4A359] hover:bg-[#c29248] text-[#1B120C] font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-[#D4A359]/10">
            Order Beans
          </button>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative px-6 sm:px-12 py-16 lg:py-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest bg-[#2A1E17] border border-[#D4A359]/30 text-[#D4A359] mb-6">
            <Flame size={12} />
            FRESHLY ROASTED DAILY
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif leading-[1.1] mb-6 text-[#F3E9DC]">
            Crafted for the quiet moments before the world wakes up.
          </h1>

          <p className="text-[#A69285] text-base sm:text-lg max-w-xl font-light leading-relaxed mb-8">
            Sourced ethically from high-altitude volcanic soils, slow-roasted in small batches to preserve natural notes of chocolate, berries, and smoke.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="bg-[#D4A359] hover:bg-[#c29248] text-[#1B120C] font-bold text-sm px-8 py-4 rounded-full transition-all flex items-center gap-2 group shadow-xl shadow-[#D4A359]/10"
            >
              Explore Menu
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#subscription"
              className="border border-[#3D2D23] hover:border-[#D4A359] text-[#F3E9DC] font-medium text-sm px-7 py-4 rounded-full transition-all"
            >
              Build Your Cup
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#3D2D23]/60">
            <div>
              <div className="text-2xl font-serif text-[#D4A359] font-bold">100%</div>
              <div className="text-xs text-[#A69285] mt-0.5">Direct Trade Beans</div>
            </div>
            <div>
              <div className="text-2xl font-serif text-[#D4A359] font-bold">48 Hrs</div>
              <div className="text-xs text-[#A69285] mt-0.5">Roast to Doorstop</div>
            </div>
            <div>
              <div className="text-2xl font-serif text-[#D4A359] font-bold">4.9 ★</div>
              <div className="text-xs text-[#A69285] mt-0.5">Over 10k Reviews</div>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-[#3D2D23] shadow-2xl bg-[#2A1E17]">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000"
              alt="Luxury Espresso Pour"
              className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B120C] via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#1B120C]/85 backdrop-blur-md border border-[#3D2D23]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#D4A359] font-bold tracking-widest uppercase">Signature Roast</span>
                <div className="flex text-[#D4A359]"><Star size={12} fill="#D4A359" /><Star size={12} fill="#D4A359" /><Star size={12} fill="#D4A359" /><Star size={12} fill="#D4A359" /><Star size={12} fill="#D4A359" /></div>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F3E9DC]">Velvet Mocha Reserve</h3>
              <p className="text-xs text-[#A69285] mt-1">Dark Roast • Cocoa & Smoked Vanilla Notes</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (STORE GRID) */}
      <section id="shop" className="px-6 sm:px-12 py-20 max-w-7xl mx-auto border-t border-[#3D2D23]/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs text-[#D4A359] font-bold tracking-[0.25em] uppercase block mb-2">
              CURATED SELECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#F3E9DC]">
              Our Best-Selling Micro-Batches
            </h2>
          </div>
          <a href="#" className="text-xs font-bold text-[#D4A359] hover:underline flex items-center gap-1 mt-4 md:mt-0">
            VIEW ALL ROASTS <ChevronRight size={14} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group bg-[#2A1E17] rounded-3xl p-5 border border-[#3D2D23] hover:border-[#D4A359]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-[#1B120C]">
                  {product.tag && (
                    <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4A359] text-[#1B120C]">
                      {product.tag}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-[#A69285] mb-2">
                  <span>{product.roast}</span>
                  <div className="flex items-center gap-1 text-[#D4A359]">
                    <Star size={12} fill="#D4A359" />
                    <span className="font-bold text-[#F3E9DC]">{product.rating}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#F3E9DC] mb-3 group-hover:text-[#D4A359] transition-colors">
                  {product.name}
                </h3>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {product.notes.map((note) => (
                    <span key={note} className="px-2.5 py-1 rounded-md text-[10px] bg-[#1B120C] text-[#A69285] border border-[#3D2D23]">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#3D2D23]">
                <div>
                  <span className="text-xs text-[#A69285]">12oz Bag</span>
                  <div className="text-xl font-serif font-bold text-[#D4A359]">${product.price}</div>
                </div>
                <button className="bg-[#1B120C] hover:bg-[#D4A359] text-[#F3E9DC] hover:text-[#1B120C] border border-[#3D2D23] hover:border-[#D4A359] p-3 rounded-full transition-all">
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE COFFEE SUBSCRIPTION WIDGET */}
      <section id="subscription" className="px-6 sm:px-12 py-20 bg-[#2A1E17]/40 border-y border-[#3D2D23]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs text-[#D4A359] font-bold tracking-[0.25em] uppercase block mb-2">
              NEVER RUN OUT
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#F3E9DC] mb-4">
              Build Your Custom Coffee Club
            </h2>
            <p className="text-[#A69285] text-sm">
              Tailor your roast frequency and bag quantity. Pause or cancel anytime with zero friction.
            </p>
          </div>

          <div className="bg-[#2A1E17] border border-[#3D2D23] rounded-3xl p-6 sm:p-10 grid lg:grid-cols-3 gap-8 shadow-2xl">
            {/* Options Panel */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bag Counter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#A69285] block mb-3">
                  1. Choose Quantity (Bags per delivery)
                </label>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBagCount(num)}
                      className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                        bagCount === num
                          ? "bg-[#D4A359] border-[#D4A359] text-[#1B120C]"
                          : "bg-[#1B120C] border-[#3D2D23] text-[#A69285] hover:border-[#D4A359]/50"
                      }`}
                    >
                      {num} {num === 1 ? "" : "Bags"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frequency Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#A69285] block mb-3">
                  2. Select Delivery Schedule
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "weekly", label: "Every Week", save: "15% OFF" },
                    { id: "biweekly", label: "Every 2 Weeks", save: "10% OFF" },
                    { id: "monthly", label: "Every Month", save: "5% OFF" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFrequency(item.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        frequency === item.id
                          ? "bg-[#D4A359]/10 border-[#D4A359] text-[#F3E9DC]"
                          : "bg-[#1B120C] border-[#3D2D23] text-[#A69285]"
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-[#D4A359] font-mono mt-1">{item.save}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#A69285] block mb-3">
                  3. Select Grind Preference
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Whole Bean", "Espresso (Fine)", "Drip (Medium)", "French Press (Coarse)"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setGrindType(type)}
                      className={`px-4 py-2 rounded-lg border text-xs font-medium transition-all ${
                        grindType === type
                          ? "bg-[#D4A359] border-[#D4A359] text-[#1B120C]"
                          : "bg-[#1B120C] border-[#3D2D23] text-[#A69285]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-[#1B120C] border border-[#3D2D23] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#F3E9DC] mb-4 pb-3 border-b border-[#3D2D23]">
                  Order Summary
                </h3>

                <ul className="space-y-3 text-xs text-[#A69285] mb-6">
                  <li className="flex justify-between">
                    <span>Selected Quantity:</span>
                    <strong className="text-[#F3E9DC]">{bagCount} Bag(s)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Frequency:</span>
                    <strong className="text-[#F3E9DC] capitalize">{frequency}</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Grind:</span>
                    <strong className="text-[#F3E9DC]">{grindType}</strong>
                  </li>
                  <li className="flex justify-between text-[#D4A359]">
                    <span>Club Discount:</span>
                    <strong>Applied</strong>
                  </li>
                </ul>
              </div>

              <div>
                <div className="pt-4 border-t border-[#3D2D23] mb-6 flex items-baseline justify-between">
                  <span className="text-xs text-[#A69285]">Total per shipment:</span>
                  <span className="text-3xl font-serif font-bold text-[#D4A359]">${totalPrice}</span>
                </div>

                <button className="w-full bg-[#D4A359] hover:bg-[#c29248] text-[#1B120C] font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="px-6 sm:px-12 py-12 border-t border-[#3D2D23] bg-[#1B120C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2A1E17] border border-[#D4A359]/30 flex items-center justify-center text-[#D4A359]">
              <Coffee size={16} />
            </div>
            <span className="text-sm font-serif text-[#D4A359] font-bold tracking-widest">
              LUMEN COFFEE
            </span>
          </div>

          <p className="text-xs text-[#A69285]">
            © {new Date().getFullYear()} Lumen Coffee Roasters. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-[#A69285]">
            <a href="#" className="hover:text-[#D4A359]">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4A359]">Terms of Service</a>
            <a href="#" className="hover:text-[#D4A359]">Contact Us</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
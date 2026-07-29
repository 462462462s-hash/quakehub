"use client";

import React, { useState } from "react";
import { 
  Coffee, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Truck, 
  ShieldCheck, 
  Gift, 
  RotateCcw,
  ArrowLeft
} from "lucide-react";

export default function CustomerClubPage() {
  // Subscription Builder State
  const [cupCount, setCupCount] = useState<number>(2);
  const [frequency, setFrequency] = useState<"weekly" | "biweekly" | "monthly">("biweekly");
  const [flavor, setFlavor] = useState<string>("Starbucks Frappuccino");

  // Pricing Logic
  const basePricePerCup = 4.50;
  const discountMultiplier = frequency === "weekly" ? 0.85 : frequency === "biweekly" ? 0.9 : 0.95;
  const totalPrice = (cupCount * basePricePerCup * discountMultiplier).toFixed(2);

  const FLAVORS = [
    "Starbucks Frappuccino",
    "Starbucks Triple Shot",
    "Nescafé Ready-to-Drink",
    "Pokka Coffee",
    "Georgia Coffee",
    "UCC Black Coffee"
  ];

  return (
    <div className="min-h-screen bg-[#1B120C] text-[#F3E9DC] font-sans selection:bg-[#D4A359] selection:text-[#1B120C]">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#2A1E17] border-b border-[#3D2D23] py-2 px-4 text-center text-xs tracking-widest text-[#A69285] flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#D4A359]" />
        <span>Join the Club & Save Up to 15% on Every Shipment</span>
        <Sparkles size={14} className="text-[#D4A359]" />
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#1B120C]/90 backdrop-blur-md border-b border-[#3D2D23]/60 px-6 sm:px-12 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
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
        </a>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-[#A69285]">
          <a href="/" className="hover:text-[#D4A359] transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> BACK TO STORE
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-[#A69285] hover:text-[#D4A359] transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4A359]" />
          </button>
        </div>
      </nav>

      {/* 3. CLUB HERO */}
      <section className="px-6 sm:px-12 pt-16 pb-12 max-w-4xl mx-auto text-center">
        <span className="text-xs text-[#D4A359] font-bold tracking-[0.25em] uppercase block mb-3">
          LUMEN CUSTOMER CLUB
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#F3E9DC] mb-6">
          Chilled cups delivered straight to your door on your terms.
        </h1>
        <p className="text-[#A69285] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Never run out of your favorite ready-to-drink coffee brands. Select your preferred flavor, set your schedule, and pause or cancel anytime.
        </p>
      </section>

      {/* 4. PERKS BANNER */}
      <section className="px-6 sm:px-12 py-8 max-w-6xl mx-auto border-y border-[#3D2D23]/60">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#2A1E17] text-[#D4A359] border border-[#3D2D23]">
              <Truck size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F3E9DC]">Free Shipping</div>
              <div className="text-[11px] text-[#A69285]">On all club orders</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#2A1E17] text-[#D4A359] border border-[#3D2D23]">
              <Gift size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F3E9DC]">Exclusive Flavors</div>
              <div className="text-[11px] text-[#A69285]">Members-only releases</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#2A1E17] text-[#D4A359] border border-[#3D2D23]">
              <RotateCcw size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F3E9DC]">Flexibility</div>
              <div className="text-[11px] text-[#A69285]">Skip or cancel anytime</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#2A1E17] text-[#D4A359] border border-[#3D2D23]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F3E9DC]">Cold-Chain Guarantee</div>
              <div className="text-[11px] text-[#A69285]">Delivered ice-cold</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SUBSCRIPTION BUILDER */}
      <section className="px-6 sm:px-12 py-16 max-w-5xl mx-auto">
        <div className="bg-[#2A1E17] border border-[#3D2D23] rounded-3xl p-6 sm:p-10 grid lg:grid-cols-3 gap-8 shadow-2xl">
          
          {/* Options Panel */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Cup Counter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#A69285] block mb-3">
                1. Choose Quantity (Cups per delivery)
              </label>
              <div className="flex items-center gap-3">
                {[2, 4, 6, 12].map((num) => (
                  <button
                    key={num}
                    onClick={() => setCupCount(num)}
                    className={`flex-1 py-3.5 rounded-xl border text-sm font-bold transition-all ${
                      cupCount === num
                        ? "bg-[#D4A359] border-[#D4A359] text-[#1B120C]"
                        : "bg-[#1B120C] border-[#3D2D23] text-[#A69285] hover:border-[#D4A359]/50"
                    }`}
                  >
                    {num} {num === 1 ? "Cup" : "Cups"}
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
                    className={`p-3.5 rounded-xl border text-left transition-all ${
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

            {/* Flavor Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#A69285] block mb-3">
                3. Select Flavor / Drink
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {FLAVORS.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFlavor(item)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between ${
                      flavor === item
                        ? "bg-[#D4A359] border-[#D4A359] text-[#1B120C] font-semibold"
                        : "bg-[#1B120C] border-[#3D2D23] text-[#A69285] hover:border-[#D4A359]/40"
                    }`}
                  >
                    <span className="line-clamp-2">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-[#1B120C] border border-[#3D2D23] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#F3E9DC] mb-4 pb-3 border-b border-[#3D2D23]">
                Club Summary
              </h3>

              <ul className="space-y-3 text-xs text-[#A69285] mb-6">
                <li className="flex justify-between">
                  <span>Selected Quantity:</span>
                  <strong className="text-[#F3E9DC]">{cupCount} Cup(s)</strong>
                </li>
                <li className="flex justify-between">
                  <span>Frequency:</span>
                  <strong className="text-[#F3E9DC] capitalize">{frequency}</strong>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="shrink-0">Flavor Choice:</span>
                  <strong className="text-[#F3E9DC] text-right truncate">{flavor}</strong>
                </li>
                <li className="flex justify-between text-[#D4A359]">
                  <span>Club Savings:</span>
                  <strong className="flex items-center gap-1">
                    <Check size={12} /> Applied
                  </strong>
                </li>
              </ul>
            </div>

            <div>
              <div className="pt-4 border-t border-[#3D2D23] mb-6 flex items-baseline justify-between">
                <span className="text-xs text-[#A69285]">Total per shipment:</span>
                <span className="text-3xl font-serif font-bold text-[#D4A359]">${totalPrice}</span>
              </div>

              <button className="w-full bg-[#D4A359] hover:bg-[#c29248] text-[#1B120C] font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-[#D4A359]/10">
                Subscribe & Join Club
              </button>
              <p className="text-[10px] text-center text-[#A69285] mt-3">
                No commitments. Pause, edit, or cancel anytime.
              </p>
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
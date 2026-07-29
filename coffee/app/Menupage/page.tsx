"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Coffee, 
  ShoppingBag, 
  Sparkles, 
  Star, 
  Flame, 
  Search, 
  Plus, 
  X,
  ArrowLeft,
  Info,
  Loader2
} from "lucide-react";
import { useCart } from "../context/CartContext"; // Adjust path if using '@/app/context/CartContext'

type Category = "Ready To Drink" | "Single Origin" | "Signature Blends" | "Espresso" | "Cold Brew" | "Decaf";

type MenuItem = {
  _id?: string;
  id: string;
  name: string;
  category: Category;
  roast: "Light Roast" | "Medium Roast" | "Dark Roast" | "Omni Roast";
  notes?: string[];
  origin?: string;
  altitude?: string;
  process?: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tag?: string;
  description: string;
};

const BRAND_QUICK_FILTERS = [
  "Starbucks Frappuccino",
  "Starbucks Triple Shot",
  "Nescafé Ready-to-Drink",
  "Pokka Coffee",
  "Georgia Coffee",
  "UCC Black Coffee"
];

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Consume global Cart Context
  const { addToCart, setIsCartOpen, cartCount } = useCart();

  // Fetch Menu Items dynamically from Database
  useEffect(() => {
    async function fetchMenuItems() {
      try {
        setLoading(true);
        const response = await fetch("/api/menu");
        const json = await response.json();

        if (json.success) {
          setMenuItems(json.data || []);
        } else {
          setError(json.error || "Failed to load menu items.");
        }
      } catch (err) {
        setError("Network error while fetching database content.");
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, []);

  // Filter items safely with null checks on DB fields
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return menuItems;

    return menuItems.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(q) ?? false;
      const categoryMatch = item.category?.toLowerCase().includes(q) ?? false;
      const originMatch = item.origin?.toLowerCase().includes(q) ?? false;
      const notesMatch = Array.isArray(item.notes) 
        ? item.notes.some(n => n.toLowerCase().includes(q)) 
        : false;

      return nameMatch || categoryMatch || originMatch || notesMatch;
    });
  }, [searchQuery, menuItems]);

  return (
    <div className="min-h-screen bg-[#1B120C] text-[#F3E9DC] font-sans selection:bg-[#D4A359] selection:text-[#1B120C]">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#2A1E17] border-b border-[#3D2D23] py-2 px-4 text-center text-xs tracking-widest text-[#A69285] flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#D4A359]" />
        <span>Complimentary Shipping On Orders Over $50</span>
        <Sparkles size={14} className="text-[#D4A359]" />
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-[#1B120C]/90 backdrop-blur-md border-b border-[#3D2D23]/60 px-6 sm:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="text-[#A69285] hover:text-[#D4A359] transition-colors p-1">
            <ArrowLeft size={20} />
          </a>
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
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-[#A69285]">
          <a href="/" className="hover:text-[#D4A359] transition-colors">HOME</a>
          <a href="#" className="text-[#D4A359]">OUR MENU</a>
          <a href="/about" className="hover:text-[#D4A359] transition-colors">OUR CRAFT</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#A69285] hover:text-[#D4A359] transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4A359] text-[#1B120C] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* 3. MENU HEADER SECTION */}
      <section className="px-6 sm:px-12 pt-16 pb-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest bg-[#2A1E17] border border-[#D4A359]/30 text-[#D4A359] mb-4">
          <Flame size={12} />
          ARTISAN ROASTS & CHILLED CLASSICS
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif text-[#F3E9DC] mb-4">
          Our Coffee Selection
        </h1>
        <p className="text-[#A69285] text-base max-w-2xl mx-auto font-light leading-relaxed">
          Explore single-origin micro-lots, artisanal roasts, and top-tier cold coffee cans like Starbucks Frappuccino, Pokka, and UCC Black.
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69285]" />
          <input
            type="text"
            placeholder="Search by brand, origin, roast, or tasting notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2A1E17] border border-[#3D2D23] focus:border-[#D4A359] rounded-full py-3 pl-11 pr-4 text-xs text-[#F3E9DC] placeholder-[#A69285] outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A69285] hover:text-[#F3E9DC]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* FEATURED QUICK FILTERS */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="text-[11px] text-[#A69285] uppercase tracking-wider font-semibold mr-1">
            Quick Find:
          </span>
          {BRAND_QUICK_FILTERS.map((brand) => (
            <button
              key={brand}
              onClick={() => setSearchQuery(brand)}
              className={`text-[11px] px-3.5 py-1.5 rounded-full border transition-all ${
                searchQuery === brand
                  ? "bg-[#D4A359] text-[#1B120C] border-[#D4A359] font-bold"
                  : "bg-[#2A1E17]/60 border-[#3D2D23] text-[#A69285] hover:border-[#D4A359]/60 hover:text-[#F3E9DC]"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      {/* 4. PRODUCTS GRID */}
      <section className="px-6 sm:px-12 pb-24 max-w-7xl mx-auto mt-4">
        {loading ? (
          <div className="text-center py-20 bg-[#2A1E17]/30 rounded-3xl border border-[#3D2D23] flex flex-col items-center justify-center">
            <Loader2 size={36} className="text-[#D4A359] animate-spin mb-3" />
            <p className="text-xs text-[#A69285]">Fetching coffees from database...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-[#2A1E17]/30 rounded-3xl border border-red-500/30">
            <Info size={32} className="mx-auto text-red-400 mb-3" />
            <h3 className="font-serif text-lg text-[#F3E9DC]">Error Loading Coffee Data</h3>
            <p className="text-xs text-[#A69285] mt-1">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#2A1E17]/30 rounded-3xl border border-[#3D2D23]">
            <Info size={32} className="mx-auto text-[#D4A359] mb-3" />
            <h3 className="font-serif text-lg text-[#F3E9DC]">No coffees found matching your search</h3>
            <p className="text-xs text-[#A69285] mt-1">Try clearing your search bar or typing a different keyword.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-xs text-[#D4A359] underline font-semibold"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => {
              const itemKey = product._id || product.id || `product-${idx}`;
              return (
                <div
                  key={itemKey}
                  className="group bg-[#2A1E17] rounded-3xl p-5 border border-[#3D2D23] hover:border-[#D4A359]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-[#1B120C]">
                      {product.tag && (
                        <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4A359] text-[#1B120C]">
                          {product.tag}
                        </span>
                      )}
                      <img
                        src={product.image || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Roast & Rating */}
                    <div className="flex items-center justify-between text-xs text-[#A69285] mb-2">
                      <span className="font-medium text-[#D4A359]">{product.roast}</span>
                      <div className="flex items-center gap-1 text-[#D4A359]">
                        <Star size={12} fill="#D4A359" />
                        <span className="font-bold text-[#F3E9DC]">{product.rating ?? 5.0}</span>
                        <span className="text-[10px] text-[#A69285]">({product.reviewsCount ?? 0})</span>
                      </div>
                    </div>

                    {/* Title & Origin */}
                    <h3 className="font-serif text-xl font-bold text-[#F3E9DC] mb-1 group-hover:text-[#D4A359] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#A69285] mb-3 font-light">{product.origin || "Specialty Selection"}</p>

                    <p className="text-xs text-[#A69285]/80 line-clamp-2 mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Tasting Notes */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {Array.isArray(product.notes) && product.notes.map((note, nIdx) => (
                        <span key={`${itemKey}-note-${nIdx}`} className="px-2.5 py-1 rounded-md text-[10px] bg-[#1B120C] text-[#A69285] border border-[#3D2D23]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#3D2D23]">
                    <div>
                      <span className="text-[10px] uppercase text-[#A69285] tracking-wider block">Price</span>
                      <div className="text-xl font-serif font-bold text-[#D4A359]">${product.price}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedItem(product)}
                        className="text-xs text-[#A69285] hover:text-[#F3E9DC] px-3 py-2"
                      >
                        Details
                      </button>
                      <button 
                        onClick={() => addToCart({
                          id: product._id || product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          notes: product.notes?.[0] || product.roast || "Specialty Blend"
                        })}
                        className="bg-[#1B120C] hover:bg-[#D4A359] text-[#F3E9DC] hover:text-[#1B120C] border border-[#3D2D23] hover:border-[#D4A359] p-3 rounded-full transition-all flex items-center justify-center"
                        title="Add to cart"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. QUICK VIEW / PRODUCT MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-[#1B120C]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#2A1E17] border border-[#3D2D23] rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 text-[#A69285] hover:text-[#F3E9DC] p-1"
            >
              <X size={20} />
            </button>

            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#1B120C]">
                <img src={selectedItem.image || "/placeholder.jpg"} alt={selectedItem.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#D4A359] tracking-widest uppercase">{selectedItem.category}</span>
                <h3 className="text-2xl font-serif font-bold text-[#F3E9DC] mt-1">{selectedItem.name}</h3>
                <p className="text-xs text-[#A69285] mt-1 leading-relaxed">{selectedItem.description}</p>

                <div className="my-4 pt-4 border-t border-[#3D2D23] space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-[#A69285]">Origin:</span> <span className="text-[#F3E9DC]">{selectedItem.origin || "N/A"}</span></div>
                  <div className="flex justify-between"><span className="text-[#A69285]">Altitude / Spec:</span> <span className="text-[#F3E9DC]">{selectedItem.altitude || "N/A"}</span></div>
                  <div className="flex justify-between"><span className="text-[#A69285]">Process:</span> <span className="text-[#F3E9DC]">{selectedItem.process || "N/A"}</span></div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#3D2D23] mt-6">
                  <span className="text-2xl font-serif font-bold text-[#D4A359]">${selectedItem.price}</span>
                  <button 
                    onClick={() => {
                      addToCart({
                        id: selectedItem._id || selectedItem.id,
                        name: selectedItem.name,
                        price: selectedItem.price,
                        image: selectedItem.image,
                        notes: selectedItem.notes?.[0] || selectedItem.roast || "Specialty Blend"
                      });
                      setSelectedItem(null);
                    }}
                    className="bg-[#D4A359] hover:bg-[#c29248] text-[#1B120C] font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-all"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
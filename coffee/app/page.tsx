"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  Coffee, 
  ShoppingBag, 
  Sparkles, 
  ChevronRight, 
  Star, 
  Flame, 
  ArrowRight,
  Play,
  Loader2,
  Award,
  Heart,
  Globe
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type Product = {
  _id?: string;
  id?: string;
  name: string;
  roast: string;
  notes: string[];
  price: number;
  rating: number;
  image: string;
  tag?: string;
};

type PageContent = {
  announcementText: string;
  heroBadge: string;
  heroHeading: string;
  heroDescription: string;
  heroPrimaryBtnText: string;
  heroSecondaryBtnText: string;
  heroCardTag: string;
  heroCardTitle: string;
  heroCardSubtitle: string;
  heroCardImage: string;
  documentaryTitle: string;
  documentaryDescription: string;
  youtubeVideoId: string;
  products: Product[];
};

const WhatsappIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-.5-.5H9a.5.5 0 0 0-.5.5v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

// ABOUT COMPONENT
function About() {
  return (
    <section id="about" className="px-6 sm:px-12 py-20 max-w-7xl mx-auto border-t border-[#3D2D23]/60">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest bg-[#2A1E17] border border-[#D4A359]/30 text-[#D4A359] mb-4">
            <Coffee size={12} />
            OUR CRAFT & PASSION
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#F3E9DC] mb-6 leading-tight">
            Elevating Coffee Culture From Origin to Cup
          </h2>
          <p className="text-[#A69285] text-base font-light leading-relaxed mb-6">
            At Lumen Coffee Roasters, we believe that exceptional coffee starts with respect—respect for the farmers, the land, and the delicate process of roasting. We source single-origin specialty beans directly from sustainable micro-lots across the globe.
          </p>
          <p className="text-[#A69285] text-base font-light leading-relaxed mb-8">
            Every batch is precision-roasted in small quantities to unlock complex flavor profiles, ensuring that every cup tells the unique story of its origin.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-[#3D2D23]/60">
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#2A1E17] border border-[#3D2D23] flex items-center justify-center text-[#D4A359]">
                <Globe size={20} />
              </div>
              <h4 className="font-serif text-base font-bold text-[#F3E9DC]">Ethical Sourcing</h4>
              <p className="text-xs text-[#A69285]">100% direct-trade partnerships with origin farms.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#2A1E17] border border-[#3D2D23] flex items-center justify-center text-[#D4A359]">
                <Award size={20} />
              </div>
              <h4 className="font-serif text-base font-bold text-[#F3E9DC]">Master Roasting</h4>
              <p className="text-xs text-[#A69285]">Small-batch artisan profiles tailored per bean.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#2A1E17] border border-[#3D2D23] flex items-center justify-center text-[#D4A359]">
                <Heart size={20} />
              </div>
              <h4 className="font-serif text-base font-bold text-[#F3E9DC]">Pure Freshness</h4>
              <p className="text-xs text-[#A69285]">Roasted to order and shipped within 24–48 hours.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden border border-[#3D2D23] bg-[#2A1E17] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop" 
              alt="Artisan Roaster" 
              className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B120C] via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CoffeeHomePage() {
  const [data, setData] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const playerRef = useRef<any>(null);

  // Cart Context Hook
  const { addToCart, totalItems, setIsCartOpen } = useCart();

  // Fetch dynamic content from DB API
  useEffect(() => {
    async function fetchHomeData() {
      try {
        const res = await fetch("/api/home-data");
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to load home page content", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomeData();
  }, []);

  // Initialize YouTube API player dynamically based on database videoId
  useEffect(() => {
    if (!data?.youtubeVideoId) return;

    let checkInterval: NodeJS.Timeout;

    const initPlayer = () => {
      if (playerRef.current || !window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player("yt-player", {
        videoId: data.youtubeVideoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.playVideo();

            checkInterval = setInterval(() => {
              if (playerRef.current && typeof playerRef.current.getDuration === "function") {
                const duration = playerRef.current.getDuration();
                const currentTime = playerRef.current.getCurrentTime();
                
                if (duration > 20 && currentTime >= duration - 20) {
                  playerRef.current.seekTo(0);
                  playerRef.current.playVideo();
                }
              }
            }, 500);
          },
          onStateChange: (event: any) => {
            if (window.YT && event.data === window.YT.PlayerState?.PAUSED) {
              event.target.playVideo();
            }
          }
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [data?.youtubeVideoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B120C] text-[#F3E9DC] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#D4A359] mb-4" size={36} />
        <p className="text-sm uppercase tracking-widest text-[#A69285]">Loading Roastery Experience...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#1B120C] text-[#F3E9DC] font-sans selection:bg-[#D4A359] selection:text-[#1B120C]">
      
      {/* 1. ANNOUNCEMENT BAR */}
      <div className="bg-[#2A1E17] border-b border-[#3D2D23] py-2 px-4 text-center text-xs tracking-widest text-[#A69285] flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-[#D4A359]" />
        <span>{data.announcementText}</span>
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
          <a href="/Menupage" className="hover:text-[#D4A359] transition-colors">OUR MENU</a>
          <a href="/about" className="hover:text-[#D4A359] transition-colors">OUR CRAFT</a>
          <a href="/CustomerClubPage" className="hover:text-[#D4A359] transition-colors">CUSTOMER CLUB</a>
        </div>

        <div className="flex items-center gap-4">
          {/* Cart Icon Trigger */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#A69285] hover:text-[#D4A359] transition-colors"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4A359] text-[#1B120C] text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <a
            href="/CustomerClubPage"
            className="hidden sm:block bg-[#D4A359] hover:bg-[#c29248] text-[#1B120C] font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-[#D4A359]/10"
          >
            Join the Club
          </a>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative px-6 sm:px-12 py-16 lg:py-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest bg-[#2A1E17] border border-[#D4A359]/30 text-[#D4A359] mb-6">
            <Flame size={12} />
            {data.heroBadge}
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif leading-[1.1] mb-6 text-[#F3E9DC]">
            {data.heroHeading}
          </h1>

          <p className="text-[#A69285] text-base sm:text-lg max-w-xl font-light leading-relaxed mb-8">
            {data.heroDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="bg-[#D4A359] hover:bg-[#c29248] text-[#1B120C] font-bold text-sm px-8 py-4 rounded-full transition-all flex items-center gap-2 group shadow-xl shadow-[#D4A359]/10"
            >
              {data.heroPrimaryBtnText}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/CustomerClubPage"
              className="border border-[#3D2D23] hover:border-[#D4A359] text-[#F3E9DC] font-medium text-sm px-7 py-4 rounded-full transition-all"
            >
              {data.heroSecondaryBtnText}
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
              src={data.heroCardImage}
              alt="Luxury Espresso Pour"
              className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B120C] via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#1B120C]/85 backdrop-blur-md border border-[#3D2D23]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#D4A359] font-bold tracking-widest uppercase">{data.heroCardTag}</span>
                <div className="flex text-[#D4A359]">
                  <Star size={12} fill="#D4A359" />
                  <Star size={12} fill="#D4A359" />
                  <Star size={12} fill="#D4A359" />
                  <Star size={12} fill="#D4A359" />
                  <Star size={12} fill="#D4A359" />
                </div>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F3E9DC]">{data.heroCardTitle}</h3>
              <p className="text-xs text-[#A69285] mt-1">{data.heroCardSubtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION */}
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
          <a href="/Menupage" className="text-xs font-bold text-[#D4A359] hover:underline flex items-center gap-1 mt-4 md:mt-0">
            VIEW ALL ROASTS <ChevronRight size={14} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.products.map((product, idx) => {
            const productId = product._id || product.id || String(idx);
            return (
              <div
                key={productId}
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
                  {/* FUNCTIONAL ADD TO CART BUTTON */}
                  <button 
                    onClick={() =>
                      addToCart({
                        id: productId,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        roast: product.roast,
                      })
                    }
                    className="bg-[#1B120C] hover:bg-[#D4A359] text-[#F3E9DC] hover:text-[#1B120C] border border-[#3D2D23] hover:border-[#D4A359] p-3 rounded-full transition-all shadow-md active:scale-95"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <About />

      {/* 6. DOCUMENTARY VIDEO SECTION */}
      <section id="farming-video" className="px-6 sm:px-12 py-20 pb-28 max-w-7xl mx-auto border-t border-[#3D2D23]/60">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest bg-[#2A1E17] border border-[#D4A359]/30 text-[#D4A359] mb-4">
            <Play size={12} fill="#D4A359" />
            FIELD DOCUMENTARY
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#F3E9DC] mb-4">
            {data.documentaryTitle}
          </h2>
          <p className="text-[#A69285] text-sm sm:text-base font-light leading-relaxed">
            {data.documentaryDescription}
          </p>
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex md:flex-col items-start gap-4 z-30 shrink-0">
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="group relative flex items-center h-10 rounded-full bg-[#1B120C]/90 backdrop-blur-md border border-[#3D2D23] text-[#A69285] hover:text-white hover:border-[#25D366] hover:bg-[#25D366] transition-all duration-300 px-2.5 shadow-2xl">
              <WhatsappIcon size={18} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-2 text-xs font-semibold tracking-wide transition-all duration-300 ease-in-out">WhatsApp</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group relative flex items-center h-10 rounded-full bg-[#1B120C]/90 backdrop-blur-md border border-[#3D2D23] text-[#A69285] hover:text-white hover:border-[#E1306C] hover:bg-[#E1306C] transition-all duration-300 px-2.5 shadow-2xl">
              <InstagramIcon size={18} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-2 text-xs font-semibold tracking-wide transition-all duration-300 ease-in-out">Instagram</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group relative flex items-center h-10 rounded-full bg-[#1B120C]/90 backdrop-blur-md border border-[#3D2D23] text-[#A69285] hover:text-white hover:border-[#1877F2] hover:bg-[#1877F2] transition-all duration-300 px-2.5 shadow-2xl">
              <FacebookIcon size={18} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-2 text-xs font-semibold tracking-wide transition-all duration-300 ease-in-out">Facebook</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group relative flex items-center h-10 rounded-full bg-[#1B120C]/90 backdrop-blur-md border border-[#3D2D23] text-[#A69285] hover:text-white hover:border-[#1DA1F2] hover:bg-[#1DA1F2] transition-all duration-300 px-2.5 shadow-2xl">
              <TwitterIcon size={18} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-2 text-xs font-semibold tracking-wide transition-all duration-300 ease-in-out">Twitter</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="group relative flex items-center h-10 rounded-full bg-[#1B120C]/90 backdrop-blur-md border border-[#3D2D23] text-[#A69285] hover:text-white hover:border-[#FF0000] hover:bg-[#FF0000] transition-all duration-300 px-2.5 shadow-2xl">
              <YoutubeIcon size={18} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-2 text-xs font-semibold tracking-wide transition-all duration-300 ease-in-out">YouTube</span>
            </a>
          </div>

          <div className="relative w-full h-[320px] sm:h-[420px] rounded-3xl border border-[#3D2D23] shadow-2xl bg-[#2A1E17] overflow-hidden flex-1">
            <div className="absolute inset-0 z-10 bg-transparent" />
            <div className="absolute inset-x-0 -top-[15%] h-[135%] pointer-events-none scale-110">
              <div id="yt-player" className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
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
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Award,
  Globe2,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft, // Added ArrowLeft import
  Leaf,
  Droplets,
  Thermometer,
  Compass,
  Loader2,
  LucideIcon,
} from "lucide-react";

// Icon mapping dictionary for dynamic rendering
const iconMap: Record<string, LucideIcon> = {
  Globe2,
  Flame,
  ShieldCheck,
  Leaf,
  Droplets,
  Thermometer,
  Sparkles,
  Compass,
  Award,
  Coffee,
};

// Framer Motion Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const res = await fetch("/api/about-data");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          console.error("Failed to fetch data:", res.statusText);
        }
      } catch (err) {
        console.error("Error fetching about page data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B120C] flex items-center justify-center text-[#D4A359]">
        <Loader2 size={36} className="animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#1B120C] flex items-center justify-center text-[#F3E9DC]">
        <p>No about data found in the database.</p>
      </div>
    );
  }

  const { hero, stats, philosophy, pillars, methodSteps, showcaseGallery, cta } = data;

  return (
    <div className="min-h-screen bg-[#1B120C] text-[#F3E9DC] font-sans selection:bg-[#D4A359] selection:text-[#1B120C] overflow-hidden relative">
      
      {/* BACK BUTTON TO HOME PAGE */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-6 sm:left-12 z-50"
      >
        <motion.a
          href="/"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-[#2A1E17]/80 hover:bg-[#2A1E17] text-[#A69285] hover:text-[#D4A359] border border-[#3D2D23] hover:border-[#D4A359]/40 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all backdrop-blur-md shadow-lg"
        >
          <ArrowLeft size={16} />
          <span>BACK TO HOME</span>
        </motion.a>
      </motion.div>

      {/* 1. CREATIVE ANIMATED HERO */}
      <section className="relative py-28 px-6 sm:px-12 border-b border-[#3D2D23]/60 bg-gradient-to-b from-[#251810] to-[#1B120C]">
        <motion.div 
          animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-80px] right-[-80px] w-96 h-96 bg-[#D4A359]/20 rounded-full blur-[110px] pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-[-80px] w-96 h-96 bg-[#D4A359]/10 rounded-full blur-[110px] pointer-events-none"
        />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 pt-6 sm:pt-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest bg-[#2A1E17] border border-[#D4A359]/40 text-[#D4A359] shadow-lg shadow-[#D4A359]/5"
          >
            <Coffee size={14} className="animate-bounce" />
            {hero?.badgeText}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-7xl font-serif text-[#F3E9DC] tracking-tight leading-tight"
          >
            {hero?.titlePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A359] via-[#F3E9DC] to-[#D4A359]">
              {hero?.titleHighlight}
            </span>{" "}
            {hero?.titleSuffix}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#A69285] text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            {hero?.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="border-b border-[#3D2D23]/60 bg-[#221710]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#3D2D23]/60"
        >
          {stats?.map((stat: { value: string; label: string }, idx: number) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="p-8 text-center space-y-1 cursor-default transition-all"
            >
              <div className="text-3xl sm:text-5xl font-serif font-bold text-[#D4A359]">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-[#A69285] font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. PHILOSOPHY SECTION */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#3D2D23] bg-[#2A1E17] shadow-2xl relative group">
              <img
                src={philosophy?.imageUrl}
                alt={philosophy?.imageAlt}
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B120C]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 hidden sm:block bg-[#2A1E17]/95 backdrop-blur-md border border-[#D4A359]/40 p-6 rounded-2xl max-w-xs shadow-2xl"
            >
              <div className="flex items-center gap-2 text-[#D4A359] font-bold text-lg mb-1">
                <Award size={20} />
                {philosophy?.badgeTitle}
              </div>
              <p className="text-xs text-[#A69285]">
                {philosophy?.badgeDescription}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs font-bold text-[#D4A359] uppercase tracking-[0.25em] block">
              {philosophy?.badgeText}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F3E9DC] leading-snug">
              {philosophy?.title}
            </h2>
            <p className="text-[#A69285] text-sm sm:text-base leading-relaxed font-light">
              {philosophy?.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-[#3D2D23]">
              {philosophy?.bulletPoints?.map((item: string, idx: number) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-sm text-[#F3E9DC] transition-transform"
                >
                  <CheckCircle2 size={18} className="text-[#D4A359] shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. CRAFT PILLARS */}
      <section className="py-24 px-6 sm:px-12 bg-[#221710]/50 border-y border-[#3D2D23]/60 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs font-bold text-[#D4A359] uppercase tracking-[0.25em]">
              The Four Pillars
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F3E9DC]">
              Our Guiding Craft
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {pillars?.map((pillar: { icon: string; title: string; description: string }, idx: number) => {
              const Icon = iconMap[pillar.icon] || Coffee;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-[#2A1E17]/60 border border-[#3D2D23] p-8 rounded-3xl hover:border-[#D4A359]/60 hover:shadow-xl hover:shadow-[#D4A359]/5 transition-all group relative overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1B120C] border border-[#3D2D23] flex items-center justify-center text-[#D4A359] mb-6 group-hover:scale-110 group-hover:bg-[#D4A359] group-hover:text-[#1B120C] transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#F3E9DC] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#A69285] leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. PROCESS STEPS */}
      <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-bold text-[#D4A359] uppercase tracking-[0.25em]">
            Precision & Science
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#F3E9DC]">
            The Roasting Journey
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {methodSteps?.map((step: { number: string; icon: string; title: string; details: string }, idx: number) => {
            const StepIcon = iconMap[step.icon] || Droplets;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-[#2A1E17]/40 border border-[#3D2D23] hover:border-[#D4A359]/40 rounded-3xl p-8 space-y-4 relative overflow-hidden transition-colors"
              >
                <span className="text-6xl font-serif font-bold text-[#D4A359]/15 block">
                  {step.number}
                </span>
                <div className="flex items-center gap-3 text-[#D4A359]">
                  <StepIcon size={22} />
                  <h3 className="font-serif text-xl font-bold text-[#F3E9DC]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-[#A69285] leading-relaxed font-light">
                  {step.details}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 6. SHOWCASE GALLERY */}
      <section className="py-24 px-6 sm:px-12 bg-[#221710]/50 border-t border-[#3D2D23]/60">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs font-bold text-[#D4A359] uppercase tracking-[0.25em]">
              Visualizing Quality
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F3E9DC]">
              The Roastery Elements
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {showcaseGallery?.map((item: { image: string; title: string; subtitle: string }, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -6 }}
                className="bg-[#2A1E17]/40 border border-[#3D2D23] rounded-3xl overflow-hidden group hover:border-[#D4A359]/40 transition-all shadow-2xl relative"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#1B120C] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B120C] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-6 space-y-1 relative z-10">
                  <div className="text-xs font-medium text-[#D4A359] uppercase tracking-widest">
                    {item.subtitle}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#F3E9DC]">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-28 px-6 sm:px-12 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-8 relative z-10"
        >
          <h2 className="text-4xl sm:text-6xl font-serif text-[#F3E9DC]">
            {cta?.title}
          </h2>
          <p className="text-[#A69285] text-base font-light max-w-xl mx-auto">
            {cta?.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={cta?.primaryBtnLink || "/Menupage"}
              className="bg-[#D4A359] hover:bg-[#c29248] text-[#1B120C] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-[#D4A359]/20"
            >
              {cta?.primaryBtnText} <ArrowRight size={16} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={cta?.secondaryBtnLink || "/CustomerClubPage"}
              className="border border-[#3D2D23] hover:border-[#D4A359] text-[#F3E9DC] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all"
            >
              {cta?.secondaryBtnText}
            </motion.a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
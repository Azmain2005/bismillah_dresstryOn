"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiArrowRight, FiZap } from "react-icons/fi";

// 1. Updated Navigation Data with highlight property
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Bedsheets", href: "/demopage" }, 
  { name: "Dresses", href: "/trydress"}, // Highlighted for AI Try-on
  { name: "New Arrivals", href: "#new-arrivals" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[60] transition-all duration-500 ${
          scrolled 
            ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-3" 
            : "py-6 bg-black"
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex items-center justify-between ">
          
          {/* 1. Logo Section - UPDATED TO SHOW ON MOBILE */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-cyan-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-black text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg font-serif italic text-xl md:text-2xl border border-white/20 transition-transform duration-500 group-hover:scale-110">
                T
              </div>
            </div>
            {/* Removed 'hidden sm:block' so it shows on all screens */}
            <span className="text-lg md:text-xl font-light tracking-[0.1em] md:tracking-[0.2em] text-white uppercase block">
              Trydress<span className="font-bold text-cyan-400">.Style</span>
            </span>
          </Link>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`relative text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 group ${
                    link.highlight ? "text-cyan-400" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-[1px] bg-cyan-400 transition-all duration-300 ${link.highlight ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* 3. Action Icons & AI CTA */}
          <div className="flex items-center space-x-2 md:space-x-6">
            <button className="p-2 text-white hover:text-cyan-400 transition-colors">
              <FiSearch className="text-xl" />
            </button>
            
            <Link href="/cart" className="relative p-2 text-white hover:text-cyan-400 transition-colors">
                <FiShoppingCart className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-cyan-400 text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                    2
                </span>
            </Link>

            <Link 
                href="/trydress" 
                className="hidden lg:flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all duration-300 active:scale-95"
            >
                <FiZap className="fill-current" />
                Quick Try-On
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-2xl text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Modern Mobile Side Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[70] md:hidden"
            />
            
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-zinc-950 border-l border-white/10 z-[80] p-10 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-16">
                <span className="text-xs tracking-[0.3em] text-gray-500 font-bold">MENU</span>
                <button onClick={() => setMobileOpen(false)} className="p-3 bg-white/5 rounded-full text-white">
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex flex-col space-y-10">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-4xl font-serif flex items-center justify-between group ${
                        link.highlight ? "text-cyan-400" : "text-white"
                      }`}
                    >
                      {link.name}
                      <FiArrowRight size={20} className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-6">
                <Link href="/account" className="flex items-center gap-4 text-white">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                        <FiUser />
                    </div>
                    <span className="text-sm font-bold tracking-widest uppercase">My Account</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
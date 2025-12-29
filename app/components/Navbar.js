"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiArrowRight } from "react-icons/fi";

// 1. Centralized Navigation Data
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Bedsheets", href: "/demopage" }, // Change these to your actual routes
  { name: "Dresses", href: "#dresses" },
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
            ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] py-3" 
            : "bg-white py-5"
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <FiMenu />
          </button>

          {/* Logo - Refined Styling */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-xl group-hover:rotate-12 transition-transform duration-300">
              B
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900 hidden sm:block">
              Bismillah<span className="text-gray-400">.</span>Fabrics
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="relative text-[13px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="hidden lg:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 text-gray-400 hover:border-gray-300 transition-all">
              <FiSearch className="text-lg" />
              <span className="text-sm">Search...</span>
            </button>
            
            <div className="flex items-center">
                <Link href="/account" className="p-2.5 text-gray-700 hover:bg-gray-100 rounded-full transition-all">
                    <FiUser className="text-xl md:text-2xl" />
                </Link>

                <Link href="/cart" className="relative p-2.5 text-gray-700 hover:bg-gray-100 rounded-full transition-all">
                    <FiShoppingCart className="text-xl md:text-2xl" />
                    <span className="absolute top-1 right-1 bg-black text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-1 ring-2 ring-white">
                        0
                    </span>
                </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Mobile Side Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-[80] shadow-2xl p-8 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-black text-xl tracking-tighter">NAVIGATION</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-3xl font-bold flex items-center justify-between group hover:text-gray-500 transition-colors"
                    >
                      {link.name}
                      <FiArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">
                        <FiUser />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Welcome back</p>
                        <Link href="/account" className="font-bold underline">Login / Register</Link>
                    </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-[80px]" />
    </>
  );
}
"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react'; 

// --- Image Data (Updated with External URLs) ---
// NOTE: For Next.js to load external images, you must add the domains 
// (gstatic.com, s3.ap-south-1.amazonaws.com, virtuzone.com) 
// to the `images.remotePatterns` or `images.domains` array in your `next.config.js` file.
const heroImages = [
  { 
    src: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmclMjBicmFuZHxlbnwwfHwwfHx8MA%3D%3D", 
    alt: "Professional woman in a dark suit standing in a modern office", 
    title: "THE EXECUTIVE VISION", 
    category: "BRAND ARCHITECTS" 
  },
{ 
    src: "https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    alt: "Luxurious, high thread count patterned cotton bedding on a large bed", 
    title: "THE SIGNATURE COMFORT", 
    category: "FINE LINENS" 
},
  { 
    src: "https://virtuzone.com/wp-content/uploads/2024/06/how-to-start-a-clothing-brand.jpg", 
    alt: "Design studio with focus on clothing and manufacturing", 
    title: "THE DESIGN LAB", 
    category: "INNOVATION & CRAFT" 
  },
];

// Configuration constants
const AUTO_SCROLL_INTERVAL = 6000; 

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false); 
  const [isHovered, setIsHovered] = useState(false); 

const nextImage = useCallback(() => {
  setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
}, []);

  
  // Auto-scroll effect (paused on hover)
  useEffect(() => {
    setHasLoaded(true); 

    if (isHovered) return;

    const interval = setInterval(nextImage, AUTO_SCROLL_INTERVAL);
    
    return () => clearInterval(interval);
  }, [nextImage, isHovered]);
  
  const currentItem = heroImages[currentImageIndex];

  // Helper class for fade-in effect
  // Note: For dynamic delays (like delay-[400ms]), you might need to safelist classes 
  // in tailwind.config.js or use inline style for robust performance.
  const fadeInClass = (delay = 0) => 
    `transition-opacity duration-1000 ease-in-out ${hasLoaded ? 'opacity-100' : 'opacity-0'} ${delay ? `delay-[${delay}ms]` : ''}`;


  return (
    // ULTRA-CLASSY THEME: True Black background for maximum contrast and elegance
    <div className='bg-black text-white min-h-[90vh] relative overflow-hidden'>
      
      {/* ======================= 1. Main Image Area (Visual Dominance) ======================= */}
      <div 
          className="relative w-full h-[60vh] lg:h-[90vh] transition-opacity duration-1000"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
          <Image
              src={currentItem.src}
              alt={currentItem.alt}
              fill
              sizes="100vw"
              className="object-cover object-center transition-all duration-1000 ease-in-out opacity-80"
              priority
              key={currentImageIndex} 
          />
          {/* Subtle Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
      </div>

      {/* ======================= 2. Text Content (Absolute/Overlay & Fully Responsive) ======================= */}
      <div className="absolute inset-0 flex items-end lg:items-center justify-start z-20 p-8 md:p-12 lg:p-24">
        
        {/* Content Box - Responsive sizing, elegant border, and backdrop blur */}
        <div className={`w-full lg:w-3/5 xl:w-2/5 p-6 md:p-8 lg:p-10 bg-black/70 backdrop-blur-sm ${fadeInClass(300)} border-l-2 border-white`}>
          
          <p className={`text-xs font-semibold text-gray-400 uppercase mb-3 tracking-[0.2em] ${fadeInClass(400)}`}>
            {currentItem.category} | Future-Proofing Your Business
          </p>
          
          {/* Animated Title Block */}
          <div key={currentImageIndex} className='overflow-hidden'>
            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-light font-serif mb-6 leading-tight 
                transition-all duration-700 ease-out transform
                `}>
                {currentItem.title}
            </h1>
          </div>
          
          <p className={`text-sm lg:text-base text-gray-300 mb-8 font-extralight ${fadeInClass(600)}`}>
            We provide strategic guidance and bespoke solutions for the modern enterprise. Achieve scale and efficiency with our world-class expertise.
          </p>
          
          {/* Minimalist CTA */}
          <button className={`flex items-center text-white text-base px-0 py-2 border-b border-gray-400 
                            font-medium transition duration-300 hover:border-white self-start uppercase tracking-widest ${fadeInClass(700)}`}>
            DISCOVER STRATEGY <ArrowRight size={18} className="ml-4" />
          </button>
        </div>
      </div>

      {/* ======================= 3. Subtle Dot Navigation ======================= */}
      <div className="absolute bottom-6 right-8 lg:bottom-12 lg:right-12 z-30 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrentImageIndex(index); setIsHovered(true); }}
            aria-label={`Go to item ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImageIndex === index 
                ? 'bg-white w-6' 
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight, Sparkles, Scan } from 'lucide-react'; 

// --- Updated with 'Before' (Person) and 'After' (Dressed) pairs ---
const heroImages = [
  { 
    id: 1,
    // Person in basic white tee
    before: "https://i.postimg.cc/ZnysX4bZ/Gemini-Generated-Image-kz3cgskz3cgskz3c.png", 
    // Person in a structured suit/traditional wear
    after: "https://i.postimg.cc/7LtkkPkF/Gemini-Generated-Image-3fma433fma433fma.png",  
    title: "VIRTUAL TRY-ON", 
    category: "AI TEXTURE MAPPING" 
  },
  { 
    id: 2,
    // Person in neutral casual
    before: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1920&auto=format&fit=crop", 
    // Person in high-fashion dress
    after: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1920&auto=format&fit=crop", 
    title: "SEE IT ON YOU", 
    category: "INSTANT TRANSFER" 
  }
];

const AUTO_SCROLL_INTERVAL = 8000; 

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false); 
  const [isHovered, setIsHovered] = useState(false); 

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    setHasLoaded(true); 
    if (isHovered) return;
    const interval = setInterval(nextImage, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [nextImage, isHovered]);
  
  const currentItem = heroImages[currentImageIndex];

  return (
    <div className='bg-black text-white min-h-screen relative overflow-hidden flex flex-col lg:flex-row pt-20'>
      
      {/* ======================= 1. Visual Side (The Reveal Effect) ======================= */}
      <div 
          className="relative w-full h-[55vh] lg:h-screen lg:w-1/2 order-1 lg:order-2 overflow-hidden bg-zinc-900"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
          {/* LAYER 1: The "After" Image (The Result) - Always in background */}
          <div className="absolute inset-0 z-0">
            <Image
                src={currentItem.after}
                alt="After AI Try-on"
                fill
                className="object-cover object-center scale-105"
                priority
                key={`after-${currentItem.id}`}
            />
          </div>

          {/* LAYER 2: The "Before" Image (The Original Person) - Clipped by animation */}
          <div className="absolute inset-0 z-10 animate-reveal-clip">
            <Image
                src={currentItem.before}
                alt="Original Person"
                fill
                className="object-cover object-center scale-105"
                priority
                key={`before-${currentItem.id}`}
            />
          </div>

          {/* LAYER 3: The Scanner Bar - Synced with clip animation */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             <div className="w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] absolute top-0 animate-scan-line"></div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent lg:bg-gradient-to-r lg:from-black lg:to-transparent lg:w-1/4 z-30"></div>
      </div>

      {/* ======================= 2. Text Content ======================= */}
      <div className="relative w-full lg:w-1/2 flex items-center z-40 p-6 md:p-12 lg:p-24 order-2 lg:order-1">
        
        <div className={`max-w-xl transition-all duration-1000 ${hasLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          
          <div className="flex items-center space-x-2 text-cyan-400 mb-6">
            <Scan size={18} className="animate-pulse" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">{currentItem.category}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-light mb-8 leading-[1.1] tracking-tight">
            The Digital <br />
            <span className="italic font-normal">Dressing Room.</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl font-light mb-10 leading-relaxed max-w-md">
            Watch the magic happen. Upload your photo and let our AI engine scan and fit high-end fashion to your unique frame instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <button className="group flex items-center bg-white text-black px-8 py-4 rounded-full font-semibold transition-all hover:pr-12 active:scale-95">
              <Link href="/trydress">TRY ON NOW <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" /></Link>
            </button>
            
          </div>
        </div>
      </div>

      {/* ======================= 3. Minimalist Controls ======================= */}
      <div className="absolute bottom-10 left-6 md:left-12 lg:left-24 z-50 flex items-center space-x-6">
        <div className="flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => { setCurrentImageIndex(index); setIsHovered(true); }}
              className={`h-1 transition-all duration-500 rounded-full ${
                currentImageIndex === index ? 'bg-cyan-400 w-12' : 'bg-gray-800 w-6 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* The reveal effect: hides the top image from top to bottom */
        @keyframes reveal-clip {
          0% { clip-path: inset(0 0 0 0); }
          30% { clip-path: inset(0 0 0 0); }
          70% { clip-path: inset(100% 0 0 0); }
          100% { clip-path: inset(100% 0 0 0); }
        }

        /* The scanner bar line synced with the clip */
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          30% { top: 0%; opacity: 1; }
          70% { top: 100%; opacity: 1; }
          71% { top: 100%; opacity: 0; }
          100% { top: 100%; opacity: 0; }
        }

        .animate-reveal-clip {
          animation: reveal-clip 5s ease-in-out infinite;
        }
        .animate-scan-line {
          animation: scan-line 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
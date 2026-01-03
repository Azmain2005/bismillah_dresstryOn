"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiLayers, FiMaximize } from 'react-icons/fi';

export default function EditorialShowcase() {
  return (
    <section className="bg-black py-24 lg:py-40 relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: The "Texture" focus */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative group">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=2070&auto=format&fit=crop" 
                  alt="Fabric detail"
                  className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                
                {/* Floating Specs Card */}
                <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 text-cyan-400 mb-2">
                    <FiLayers size={14} />
                    <span className="text-[10px] font-bold tracking-widest uppercase">Fabric Mesh</span>
                  </div>
                  <p className="text-white text-xs font-mono">POLY_DENSITY: 420fps</p>
                </div>
              </motion.div>

              {/* Back Decorative Frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-cyan-400/20 rounded-2xl -z-10 translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
            </div>
          </div>

          {/* Right Side: The Content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase">Premium Rendering</span>
              </div>

              <h2 className="text-5xl lg:text-8xl font-serif font-light text-white leading-tight">
                Beyond <br /> 
                <span className="italic">Pixels.</span>
              </h2>

              <p className="text-gray-400 text-lg lg:text-xl font-light leading-relaxed max-w-lg">
                Our AI doesn't just overlay an image. It simulates weight, drape, and texture—ensuring the virtual silk flows exactly like the physical thread.
              </p>

              <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/10">
                <div>
                  <h4 className="text-white text-3xl font-light mb-2">99.2%</h4>
                  <p className="text-gray-500 text-xs tracking-widest uppercase">Fit Accuracy</p>
                </div>
                <div>
                  <h4 className="text-white text-3xl font-light mb-2">0.4s</h4>
                  <p className="text-gray-500 text-xs tracking-widest uppercase">Warp Speed</p>
                </div>
              </div>

              <div className="pt-10">
                <button className="group flex items-center gap-6 text-white text-sm font-bold tracking-widest uppercase">
                  Explore the Technology 
                  <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-black transition-all">
                    <FiMaximize />
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
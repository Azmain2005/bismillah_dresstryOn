"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiShield, FiSmile, FiZap } from 'react-icons/fi';

const FEATURES = [
  {
    icon: <FiCpu className="text-2xl" />,
    title: "Neural Engine 2.0",
    desc: "Our proprietary AI understands body contours, fabric drape, and lighting for 99% realistic mapping.",
    color: "bg-cyan-500/10",
    border: "border-cyan-500/20"
  },
  {
    icon: <FiShield className="text-2xl" />,
    title: "Privacy First",
    desc: "Your photos are processed locally and never stored on our servers. Your data stays yours.",
    color: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    icon: <FiZap className="text-2xl" />,
    title: "Instant Results",
    desc: "Zero wait time. Switch between 500+ outfits in seconds with real-time rendering technology.",
    color: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    icon: <FiSmile className="text-2xl" />,
    title: "Zero Returns",
    desc: "Know exactly how it fits before you buy. Reduce sizing errors and the hassle of returns.",
    color: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  }
];

export default function TechShowcase() {
  return (
    <section className="bg-[#050505] py-24 lg:py-40 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
      
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          
          {/* Left Column: AI Visual Interface */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-square max-w-md mx-auto lg:ml-0 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900"
            >
              {/* Abstract Tech Image */}
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                alt="Cyber-tech surface"
                className="object-cover w-full h-full opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Floating Live Processing Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping absolute inset-0"></div>
                    <div className="relative w-3 h-3 bg-cyan-400 rounded-full"></div>
                  </div>
                  <span className="text-[10px] tracking-[0.4em] font-black text-white uppercase">Neural Fit Processing</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-[9px] font-mono text-cyan-400/70">
                    <span>ANALYZING_MESH</span>
                    <span>88%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "88%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-1 w-8 bg-cyan-400/20 rounded-full"></div>
                    <div className="h-1 w-12 bg-cyan-400/40 rounded-full"></div>
                    <div className="h-1 w-4 bg-cyan-400/10 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Content Grid */}
          <div className="w-full lg:w-1/2">
            <div className="mb-12">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
              >
                Why Trydress.Style?
              </motion.span>
              <h2 className="text-4xl lg:text-7xl font-serif font-light text-white mb-8 leading-tight">
                Advanced AI. <br />
                <span className="italic font-normal">Personal Fit.</span>
              </h2>
              <p className="text-gray-400 text-lg font-light max-w-lg leading-relaxed">
                We bridge the gap between imagination and reality, allowing you to try on any outfit with pixel-perfect accuracy.
              </p>
            </div>

            {/* Feature Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.03)" }}
                  className={`p-8 rounded-2xl border ${feature.border} ${feature.color} backdrop-blur-md transition-all group relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    <div className="mb-5 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <h4 className="text-white font-bold mb-3 tracking-tight text-xl">{feature.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                      {feature.desc}
                    </p>
                  </div>
                  
                  {/* Subtle Gradient Reveal on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
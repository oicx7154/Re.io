import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Crosshair, Code, Ghost, Cpu } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "100% Undetected",
    description: "Advanced bypass methods ensure your account stays safe while you dominate."
  },
  {
    icon: Zap,
    title: "Lighting Fast",
    description: "Optimized Lua execution engine providing zero lag and maximum performance."
  },
  {
    icon: Crosshair,
    title: "Universal Aimbot",
    description: "Highly customizable aimbot with silent aim, smoothing, and prediction."
  },
  {
    icon: Ghost,
    title: "ESP & Visuals",
    description: "See players, items, and objectives through walls with fully customizable ESP."
  },
  {
    icon: Code,
    title: "Auto-Update",
    description: "The script automatically fetches the latest offsets and patches on injection."
  },
  {
    icon: Cpu,
    title: "Key System Free",
    description: "No annoying key systems or linkvertise. Just copy, execute, and play."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Lumina?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Built by developers who actually play the game. We focus on performance and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-violet-500/50 hover:bg-white/10 transition-all group"
            >
              <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

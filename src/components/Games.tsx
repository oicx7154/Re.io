import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Users } from 'lucide-react';

const games = [
  {
    title: "Blox Fruits",
    users: "50k+",
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=600",
    icon: "https://images.unsplash.com/photo-1533577116850-9cc66dad8fe4?auto=format&fit=crop&q=80&w=100", // Skull/Pirate placeholder
    color: "text-cyan-400",
    dot: "bg-cyan-400",
    border: "group-hover:border-cyan-500/50",
    features: ["Auto Farm Level", "Fruit Sniper", "Raid Aura", "ESP Players"]
  },
  {
    title: "Pet Simulator 99",
    users: "32k+",
    image: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?auto=format&fit=crop&q=80&w=600",
    icon: "https://images.unsplash.com/photo-1560167016-022b78a0258e?auto=format&fit=crop&q=80&w=100", // Cute animal/pet placeholder
    color: "text-pink-400",
    dot: "bg-pink-400",
    border: "group-hover:border-pink-500/50",
    features: ["Auto Hatch", "Gem Farm", "Item Sniper", "Relic Finder"]
  },
  {
    title: "Bedwars",
    users: "15k+",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600",
    icon: "https://images.unsplash.com/photo-1631603090989-93f9ef6f9d63?auto=format&fit=crop&q=80&w=100", // Sword/Battle placeholder
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    border: "group-hover:border-emerald-500/50",
    features: ["Kill Aura", "Fly / Speed", "Auto Bridge", "Nuker"]
  },
  {
    title: "Da Hood",
    users: "28k+",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=600",
    icon: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=100", // Hood/Mask placeholder
    color: "text-orange-400",
    dot: "bg-orange-400",
    border: "group-hover:border-orange-500/50",
    features: ["Silent Aim", "God Mode", "Cash Farm", "Teleports"]
  }
];

export const Games = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {games.map((game, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`group relative overflow-hidden rounded-2xl bg-slate-900/80 border border-white/5 ${game.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
          </div>

          <div className="relative p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <div className={`absolute inset-0 blur-lg opacity-50 ${game.dot}`} />
                <img 
                  src={game.icon} 
                  alt="icon" 
                  className="relative w-12 h-12 rounded-xl border border-white/10 shadow-lg object-cover"
                />
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md border border-white/5 rounded-full text-xs font-medium text-white">
                <Users className="w-3 h-3" />
                {game.users}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white/90">{game.title}</h3>
            
            <div className="space-y-2.5">
              {game.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  <div className={`w-1 h-1 rounded-full ${game.dot}`} />
                  {feat}
                </div>
              ))}
            </div>

            <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${
              game.color === 'text-cyan-400' ? 'from-cyan-500 to-blue-500' :
              game.color === 'text-pink-400' ? 'from-pink-500 to-rose-500' :
              game.color === 'text-emerald-400' ? 'from-emerald-500 to-teal-500' :
              'from-orange-500 to-red-500'
            } opacity-0 group-hover:opacity-100 transition-opacity`} />
          </div>
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/5 border-dashed flex flex-col items-center justify-center p-6 text-center hover:bg-white/10 transition-colors cursor-pointer"
      >
        <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform">
          <Gamepad2 className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">More Games</h3>
        <p className="text-sm text-slate-400">Check our Discord for full list</p>
      </motion.div>
    </div>
  );
};

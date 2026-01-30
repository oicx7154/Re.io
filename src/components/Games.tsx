import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

// Import images directly
import SSImage from './GameJpg/SS.jpg';
import DarkDeceptionImage from './GameJpg/黑暗欺骗.jpg';
import HunterImage from './GameJpg/Hunter.jpg';
import ForsakenImage from './GameJpg/Forsaken.jpg';
import HSImage from './GameJpg/HS.jpg';

const games = [
  {
    title: "樱花摊位",
    image: SSImage,
    icon: SSImage,
    color: "text-cyan-400",
    dot: "bg-cyan-400",
    border: "group-hover:border-cyan-500/50",
    features: ["透视诅咒", "秒杀", "等功能"]
  },
  {
    title: "黑暗欺骗",
    image: DarkDeceptionImage,
    icon: DarkDeceptionImage,
    color: "text-pink-400",
    dot: "bg-pink-400",
    border: "group-hover:border-pink-500/50",
    features: ["自动捡等"]
  },
  {
    title: "Hunter",
    image: HunterImage,
    icon: HunterImage,
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    border: "group-hover:border-emerald-500/50",
    features: ["杀戮光环", "自动农场", "安全点等",]
  },
  {
    title: "Forsaken",
    image: ForsakenImage,
    icon: ForsakenImage,
    color: "text-orange-400",
    dot: "bg-orange-400",
    border: "group-hover:border-orange-500/50",
    features: ["自动修电机", "透视杀手", "无限体力等",]
  },
  {
    title: "天堂站立",
    image: HSImage,
    icon: HSImage,
    color: "text-yellow-400",
    dot: "bg-yellow-400",
    border: "group-hover:border-yellow-500/50",
    features: ["自动捡箱子等"]
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
          className={`group relative overflow-hidden rounded-2xl bg-slate-900/80 border border-white/5 ${game.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col`}
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
          </div>

          <div className="relative z-10 p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <div className={`absolute inset-0 blur-lg opacity-50 ${game.dot}`} />
                <img 
                  src={game.icon} 
                  alt="icon" 
                  className="relative w-12 h-12 rounded-xl border border-white/10 shadow-lg object-cover"
                />
              </div>
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
      
    </div>
  );
};

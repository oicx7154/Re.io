import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Users } from 'lucide-react';

const games = [
  {
    title: "樱花摊位",
    users: "1k+",
    image: "GameJpg/SS.jpg",
    icon: "GameJpg/SS.jpg",
    color: "text-cyan-400",
    dot: "bg-cyan-400",
    border: "group-hover:border-cyan-500/50",
    features: ["透视诅咒", "秒杀", "等功能"]
  },
  {
    title: "黑暗欺骗",
    users: "1k+",
    image: "GameJpg/黑暗欺骗.jpg",
    icon: "GameJpg/黑暗欺骗.jpg",
    color: "text-pink-400",
    dot: "bg-pink-400",
    border: "group-hover:border-pink-500/50",
    features: ["自动捡等"]
  },
  {
    title: "Hunter",
    users: "200+",
    image: "GameJpg/Hunter.jpg",
    icon: "GameJpg/Hunter.jpg",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    border: "group-hover:border-emerald-500/50",
    features: ["杀戮光环", "自动农场", "安全点等",]
  },
  {
    title: "Forsaken",
    users: "20k+",
    image: "GameJpg/Forsaken.jpg",
    icon: "GameJpg/ForSaken.jpg",
    color: "text-orange-400",
    dot: "bg-orange-400",
    border: "group-hover:border-orange-500/50",
    features: ["自动修电机", "透视杀手", "无限体力等",]
  },
  {
    title: "天堂站立",
    user: "500+",
    image: "GameJpg/HS.jpg",
    icon: "GameJpg/HS.jpg",
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
      </motion.div>
    </div>
  );
};

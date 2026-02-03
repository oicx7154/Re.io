import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Github, Disc } from 'lucide-react';

import SSImage from './icon.png';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-slate-950/70 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center justify-center">
            <img 
              src={SSImage}
              alt="Logo" 
              className="w-50 h-200 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
            />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            灵构 丨 RS HUB
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">特征</a>
          <a href="#games" className="hover:text-white transition-colors">支持的游戏</a>
          <a href="#script" className="hover:text-white transition-colors">获取脚本</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
          </a>
          <a href="#" className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-indigo-400">
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

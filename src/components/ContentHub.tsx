import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Games } from './Games';
import { Injectors } from './Injectors';
import { Gamepad2, Syringe } from 'lucide-react';

type Tab = 'games' | 'injectors';

export const ContentHub = () => {
  const [activeTab, setActiveTab] = useState<Tab>('games');

  return (
    <section id="games" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {activeTab === 'games' ? 'Supported Games' : 'Recommended Injectors'}
            </h2>
            <p className="text-slate-400 max-w-xl">
              {activeTab === 'games' 
                ? "We constantly update our script hub with new games to ensure you have the best experience."
                : "Top-tier executors verified by our team to work perfectly with Lumina Script."}
            </p>
          </div>

          <div className="flex p-1 bg-slate-950 border border-white/5 rounded-xl">
            <button
              onClick={() => setActiveTab('games')}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-2 ${
                activeTab === 'games' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === 'games' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-violet-600 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" /> Games
              </span>
            </button>
            <button
              onClick={() => setActiveTab('injectors')}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-2 ${
                activeTab === 'injectors' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === 'injectors' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-violet-600 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Syringe className="w-4 h-4" /> Injectors
              </span>
            </button>
          </div>
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'games' ? (
              <motion.div
                key="games"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Games />
              </motion.div>
            ) : (
              <motion.div
                key="injectors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Injectors />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

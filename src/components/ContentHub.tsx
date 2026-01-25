import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Games } from './Games';
import { Injectors } from './Injectors';
import { ScriptSection } from './ScriptSection';
import { Gamepad2, Syringe, Code } from 'lucide-react';

type Tab = 'games' | 'injectors' | 'script';

export const ContentHub = () => {
  const [activeTab, setActiveTab] = useState<Tab>('games');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#script') {
        setActiveTab('script');
        const element = document.getElementById('games');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section id="games" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {activeTab === 'games' ? 'Supported Games' : activeTab === 'injectors' ? 'Recommended Injectors' : 'Get the Script'}
            </h2>
            <p className="text-slate-400 max-w-xl">
              {activeTab === 'games' 
                ? "我们不断更新新游戏的脚本中心,以确保您拥有最佳体验."
                : activeTab === 'injectors' 
                ? "寻找注入器"
                : "获取最新的脚本"}
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
            <button
              onClick={() => setActiveTab('script')}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-2 ${
                activeTab === 'script' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === 'script' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-violet-600 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Code className="w-4 h-4" /> 获取脚本
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
            ) : activeTab === 'injectors' ? (
              <motion.div
                key="injectors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Injectors />
              </motion.div>
            ) : (
              <motion.div
                key="script"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ScriptSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { RobloxVersion } from './RobloxVersion';

const injectors = [
  {
    name: "Synapse Z",
    status: "Working",
    platform: "PC",
    type: "Paid",
    risk: "Low",
    features: ["Level 8 Executor", "100% UNC", "Decompiler"],
    url: "#"
  },
  {
    name: "Wave",
    status: "Working",
    platform: "PC",
    type: "Freemium",
    risk: "Medium",
    features: ["Good Stability", "Fast Injection", "User Friendly"],
    url: "#"
  },
  {
    name: "Solara",
    status: "Updated",
    platform: "PC",
    type: "Free",
    risk: "Low",
    features: ["Lightweight", "Keyless", "Basic Execution"],
    url: "#"
  },
  {
    name: "Codex",
    status: "Working",
    platform: "Mobile/PC",
    type: "Free",
    risk: "Low",
    features: ["Android Support", "Clean UI", "Script Hub"],
    url: "#"
  }
];

export const Injectors = () => {
  return (
    <div>
      <RobloxVersion />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {injectors.map((injector, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-slate-900/80 border border-white/5 hover:border-violet-500/30 transition-all p-5 flex flex-col justify-between"
          >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck className="w-24 h-24 text-white" />
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                {injector.name}
              </h3>
              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                injector.type === 'Free' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                injector.type === 'Paid' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                {injector.type}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4 text-xs">
              <span className="flex items-center gap-1 text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                <CheckCircle className="w-3 h-3 text-green-500" /> {injector.status}
              </span>
              <span className="flex items-center gap-1 text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                <AlertTriangle className="w-3 h-3 text-orange-500" /> Risk: {injector.risk}
              </span>
            </div>

            <div className="space-y-1.5 mb-5">
              {injector.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="w-1 h-1 rounded-full bg-slate-500" />
                  {feat}
                </div>
              ))}
            </div>
          </div>

          <a 
            href={injector.url}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm font-medium text-white transition-all group-hover:border-violet-500/30"
          >
            Download / View <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      ))}
      </div>
    </div>
  );
};

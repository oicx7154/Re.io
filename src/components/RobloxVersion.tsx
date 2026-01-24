import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Monitor, Apple, AlertCircle } from 'lucide-react';

interface VersionInfo {
  version: string;
  guid: string;
  timestamp: string;
}

export const RobloxVersion = () => {
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState<VersionInfo | null>(null);
  const [prevVersion, setPrevVersion] = useState<VersionInfo | null>(null);

  const fetchVersion = async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data - in a real app, you'd fetch from https://clientsettings.roblox.com/v2/client-version/WindowsPlayer
    setVersion({
      version: "version-fa45239d56714041",
      guid: "4829-4102-9982-1102",
      timestamp: new Date().toLocaleDateString()
    });
    
    setPrevVersion({
      version: "version-e334239d56714040",
      guid: "4829-4102-9982-1101",
      timestamp: new Date(Date.now() - 86400000 * 7).toLocaleDateString()
    });
    
    setLoading(false);
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Monitor className="w-5 h-5 text-violet-400" />
            Roblox Client Version
          </h3>
          <p className="text-sm text-slate-400">Check current client hash for compatibility.</p>
        </div>
        <button 
          onClick={fetchVersion}
          disabled={loading}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Latest Version Card */}
        <div className="p-5 rounded-xl bg-green-500/5 border border-green-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Download className="w-20 h-20 text-green-400" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/20">
                LATEST
              </span>
              <span className="text-xs text-slate-400">{version ? version.timestamp : 'Loading...'}</span>
            </div>
            
            <div className="font-mono text-lg text-white mb-4 break-all">
              {loading ? (
                <div className="h-7 w-32 bg-white/10 rounded animate-pulse" />
              ) : (
                version?.version
              )}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors">
                <Monitor className="w-4 h-4" /> Win
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors">
                <Apple className="w-4 h-4" /> Mac
              </button>
            </div>
          </div>
        </div>

        {/* Previous Version Card */}
        <div className="p-5 rounded-xl bg-orange-500/5 border border-orange-500/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-3 opacity-10">
            <AlertCircle className="w-20 h-20 text-orange-400" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/20">
                PREVIOUS
              </span>
              <span className="text-xs text-slate-400">{prevVersion ? prevVersion.timestamp : 'Loading...'}</span>
            </div>
            
            <div className="font-mono text-lg text-slate-300 mb-4 break-all">
              {loading ? (
                <div className="h-7 w-32 bg-white/10 rounded animate-pulse" />
              ) : (
                prevVersion?.version
              )}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-slate-300 transition-colors">
                <Monitor className="w-4 h-4" /> Win
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-slate-300 transition-colors">
                <Apple className="w-4 h-4" /> Mac
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

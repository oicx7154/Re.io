import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to not overwhelm the user immediately
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 flex justify-center pointer-events-none"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-violet-500/10 rounded-xl hidden md:block">
                <Cookie className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">We use cookies</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  我们使用Cookie来增强您的浏览体验、提供个性化内容并分析我们的流量。 
                  点击“接受”即表示您同意我们使用cookies。
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
              >
                不接受
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-8 py-2.5 rounded-xl text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20 transition-all hover:scale-105"
              >
                接受
              </button>
            </div>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

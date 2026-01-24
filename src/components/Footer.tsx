import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/5 bg-slate-950">
      <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Lumina Script. All rights reserved.</p>
        <p className="mt-2 text-xs">
          Not affiliated with Roblox Corporation.
        </p>
      </div>
    </footer>
  );
};

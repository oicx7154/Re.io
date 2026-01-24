import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/5 bg-slate-950">
      <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} 灵构</p>
        <p className="mt-2 text-xs">
          Love From RS
        </p>
      </div>
    </footer>
  );
};

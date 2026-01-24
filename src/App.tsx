import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ContentHub } from './components/ContentHub';
import { ScriptSection } from './components/ScriptSection';
import { Footer } from './components/Footer';
import { Background } from './components/Background';

function App() {
  return (
    <div className="min-h-screen bg-transparent text-slate-50 selection:bg-violet-500 selection:text-white relative">
      <Background />
      <Navbar />
      <Hero />
      <Features />
      <ContentHub />
      <ScriptSection />
      <Footer />
    </div>
  );
}

export default App;

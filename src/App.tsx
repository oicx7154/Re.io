import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ContentHub } from './components/ContentHub';
import { ScriptSection } from './components/ScriptSection';
import { Footer } from './components/Footer';
import { Background } from './components/Background';
import { CookieConsent } from './components/CookieConsent';

function App() {
  return (
    <div className="min-h-screen bg-transparent text-slate-50 selection:bg-violet-500 selection:text-white relative">
      <Background />
      <CookieConsent />
      <Navbar />
      <Hero />
      <ScriptSection />
      <Features />
      <ContentHub />
      <Footer />
    </div>
  );
}

export default App;

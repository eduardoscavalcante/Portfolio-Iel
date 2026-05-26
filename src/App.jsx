import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import LoadingScreen from "./components/LoadingScreen";
import PortfolioPage from "./pages/PortfolioPage";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import PhraseSection from "./sections/PhraseSection";
import ServicesSection from "./sections/ServicesSection";
import SalesSection from "./sections/SalesSection";
import VisitGallerySection from "./sections/VisitGallerySection";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [SanityStudio, setSanityStudio] = useState(null);
  const [sanityConfig, setSanityConfig] = useState(null);

  useEffect(() => {
    const isInsideAdmin = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
    
    if (isInsideAdmin) {
      setIsAdmin(true);
      Promise.all([
        import('sanity'),
        import('../sanity.config')
      ]).then(([sanityModule, configModule]) => {
        setSanityStudio(() => sanityModule.Studio);
        setSanityConfig(() => configModule.default);
      }).catch(err => {
        console.error("Erro ao carregar o Sanity Studio dinamicamente:", err);
      });
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin) {
    if (!SanityStudio || !sanityConfig) {
      return <div className="bg-black text-zinc-500 font-mono p-8 text-xs">[ INICIALIZANDO_AMBIENTE_SANITY... ]</div>;
    }
    
    const StudioComponent = SanityStudio;
    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <StudioComponent config={sanityConfig} />
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-zinc-100 selection:bg-[#ff0000] selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <Router>
            <Routes>
              
              <Route path="/" element={
                <div className="w-full">
                  <Hero />
                  <PhraseSection />
                  <ServicesSection />
                  <div id="acervo">
                    <SalesSection />
                  </div>
                  <VisitGallerySection />
                </div>
              } />

              <Route path="/portfolio" element={<PortfolioPage />} />

            </Routes>

            <Footer />
          </Router>
        )}
      </AnimatePresence>
    </div>
  );
}
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Telas principais
import LoadingScreen from "./components/LoadingScreen";
import PortfolioPage from "./pages/PortfolioPage";

// Suas seções originais (agora agrupadas na Home)
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
    // 1. Checa a rota de forma isolada
    const isInsideAdmin = window.location.pathname === '/admin' || window.location.pathname.startsWith('/admin/');
    
    if (isInsideAdmin) {
      setIsAdmin(true);
      // 2. Só importa a biblioteca pesada do Sanity e as configurações se o usuário REALMENTE estiver no /admin
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

  // SE FOR A ROTA ADMIN: Renderiza direto o painel isolado (sem roteador por cima para evitar conflitos)
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

  // SITE NORMAL: Roteamento de Engenharia para os usuários
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-zinc-100 selection:bg-[#ff0000] selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <Router>
            <Routes>
              
              {/* ROTA HOME (Tudo o que estava na One-Page, MENOS a PortfolioSection) */}
              <Route path="/" element={
                <div className="w-full">
                  <Hero />
                  <PhraseSection />
                  <ServicesSection />
                  <SalesSection />
                  <VisitGallerySection />
                </div>
              } />

              {/* ROTA SEPARADA DO PORTFÓLIO */}
              <Route path="/portfolio" element={<PortfolioPage />} />

            </Routes>
          </Router>
        )}
      </AnimatePresence>
    </div>
  );
}
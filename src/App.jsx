import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import LoadingScreen from "./components/LoadingScreen";
import Hero from "./sections/Hero";
import PhraseSection from "./sections/PhraseSection";
import ServicesSection from "./sections/ServicesSection";
import SalesSection from "./sections/SalesSection";
import PortfolioSection from "./sections/PortfolioSection";

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
      // Isso evita que o estúdio quebre o carregamento da página principal do site
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

  // Se for a rota admin e os módulos já carregaram, renderiza o painel
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

  // Site normal do Anderson (completamente protegido contra quebras do CMS)
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-zinc-100 selection:bg-[#ff0000] selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <div key="content" className="w-full">
            <Hero />
            <PhraseSection />
            <ServicesSection />
            <SalesSection />
            <PortfolioSection />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
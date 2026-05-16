import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import fotoArtista from "../assets/art/IMG_0744.jpg"; // Seu asset intocável

export default function AboutSection() {
  const [isMobile, setIsMobile] = useState(false);

  // Monitora o tamanho da tela para travar a rotação no mobile se necessário
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen bg-[#bf1c21] flex flex-col md:flex-row items-center justify-between overflow-hidden py-24 px-6 md:px-16 select-none"
    >
      
      {/* 1. FUNDO ESPIRAL PSICODÉLICO BRUTALISTA DE DUAS CORES */}
      <div className="absolute inset-0 z-0 flex items-center justify-center scale-[1.3] md:scale-[1.6] pointer-events-none">
        <div 
          className={`w-[250vw] h-[250vw] sm:w-[180vh] sm:h-[180vh] rounded-full mix-blend-multiply opacity-95 ${
            isMobile ? "animate-[spin_45s_linear_infinite]" : "animate-[spin_25s_linear_infinite]"
          }`}
          style={{
            backgroundImage: `repeating-conic-gradient(
              #bf1c21 0deg 18deg,
              #fe0000 18deg 36deg
            )`
          }}
        />
        
        {/* Camada de interferência e granulação analógica pesada sobre a espiral */}
        <div className="absolute inset-0 opacity-[0.35] bg-repeat bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27heavyNoise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.95%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27matrix%27 values=%271 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1.5 -0.1%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23heavyNoise)%27/%3E%3C/svg%3E')]" />
      </div>

      {/* 2. SILHUETA FOTOGRÁFICA GIGANTE NO OLHO DO FURACÃO */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05, rotate: 1 }}
          whileInView={{ opacity: 0.75, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden"
        >
          <img 
            src={fotoArtista} 
            alt="Iel - Retrato Cru" 
            className="w-full h-full object-contain mix-blend-luminosity grayscale contrast-[1.4] brightness-[0.95] select-none pointer-events-none"
          />
        </motion.div>
      </div>

      {/* DETALHES MARGINAIS DE CATÁLOGO NAS QUINAS */}
      <div className="absolute top-8 left-8 z-20 hidden md:block text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
        SISTEMA_SOBRE_V.06 // BIOGRAFIA
      </div>
      <div className="absolute bottom-8 right-8 z-20 hidden md:block text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
        IEL LAB © 2026
      </div>

      {/* 3. COMPOSIÇÃO DESARTICULADA (DISJOINTED) SEM O BLOCÃO CENTRAL */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 mt-12 md:mt-0">
        
        {/* BLOQUINHO DA BIO - Flutuando e reagindo via mix-blend-difference */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:max-w-md mix-blend-difference text-white selection:bg-white selection:text-black"
        >
          <p className="font-sans text-sm md:text-base leading-relaxed tracking-wide text-justify md:text-left select-text uppercase opacity-90">
            Sou Iel, designer gráfica e artista visual focada em tencionar os limites entre estruturas físicas e digitais brutas. Meu trabalho atua como uma colisão intencional entre o erro analógico, a colagem expressiva e o rigor geométrico editorial. Desenvolvo identidades visuais de alta voltagem, cartazes de cunho manifesto e composições artísticas que desafiam o comportamento padrão da retina. Cada projeto é um sistema independente de ruptura visual.
          </p>
        </motion.div>

        {/* BOTÕES INDUSTRIAIS ISOLADOS - Posicionados assimetricamente na direita/base */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 w-full md:w-auto md:self-end items-end font-mono text-xs tracking-widest uppercase"
        >
          {/* Botão Contato - Texto Limpo com Efeito Líquido */}
          <a 
            href="#contato"
            className="group w-full md:w-56 px-6 py-4 bg-white hover:bg-[#fe0000] text-black hover:text-white font-bold transition-all duration-300 flex items-center justify-between border border-white/20 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:scale-98"
          >
            <span>CONTATO</span>
            <span className="transform group-hover:translate-x-1 transition-transform">➔</span>
          </a>

          {/* Botão Imprimir CV - Linha Tecnológica e Invisível */}
          <button 
            onClick={() => window.print()}
            className="group w-full md:w-56 px-6 py-4 border border-white/40 hover:border-white bg-black/40 hover:bg-black text-white transition-all duration-300 flex items-center justify-between active:scale-98"
          >
            <span>IMPRIMIR CV</span>
            <span className="transform group-hover:translate-y-0.5 transition-transform">⤓</span>
          </button>
        </motion.div>

      </div>

    </motion.section>
  );
}
import { motion } from "framer-motion";

import logoIelBranca from "../assets/logo/logo completa branca.png";
import logoIelVermelha from "../assets/logo/logo completa vermelha.png";

import headerBg from "../assets/bg/hero.png";
import { Link } from "react-router-dom";

// 1. Orquestrador do container (controla quando os elementos de texto/logo aparecem)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Espera o fundo começar a se revelar para começar a soltar os textos
      delayChildren: 0.8,
      staggerChildren: 0.25
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 }
  }
};

// 2. A MÁGICA DO FUNDO: Efeito de revelação e foco suave
const backgroundVariants = {
  hidden: {
    opacity: 0,
    scale: 1.08,
    filter: "blur(20px)" // Começa embaçado como mágica
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)", // Ganha foco nitidamente
    transition: {
      duration: 1.8, // Uma transição longa e suave para dar o tom artístico
      ease: [0.16, 1, 0.3, 1] // Transição cúbica ultra elegante
    }
  }
};

// 3. Animação para os elementos de texto
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
  }
};

// 4. Animação da Logo
const logoAnimation = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Hero() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative min-h-screen flex flex-col justify-between pt-12 pb-10 px-6 md:px-16 overflow-hidden bg-zinc-950 selection:bg-iel-red selection:text-white"
    >
      {/* O FUNDO MÁGICO REVELADO */}
      <motion.div
        variants={backgroundVariants}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-grain pointer-events-none"
        style={{ backgroundImage: `url(${headerBg})` }}
      />

      {/* LINHA SUPERIOR */}
      <motion.div
        variants={fadeInUp}
        className="w-full flex justify-between items-center border-b border-zinc-800/40 pb-5 text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase relative z-20"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-iel-red"></span>
          <span>IEL © 2026</span>
        </div>
        <div className="text-right text-zinc-400">
          [ ABERTA PARA PROJETOS ]
        </div>
      </motion.div>

      {/* CENTRO: Logo Vertical Reajustada e Sem Espaçamento Morto */}
      <div className="relative w-full my-auto flex flex-col justify-center items-start py-0 z-10">
        <motion.div
          variants={logoAnimation}
          className="w-full flex flex-col items-start group cursor-default select-none"
        >
          {/* CONTAINER DA LOGO CALIBRADO PARA NÃO VAZAR ELEMENTOS */}
          <div className="relative h-[45vh] sm:h-[52vh] md:h-[58vh] w-auto aspect-[3/4] transform transition-transform duration-700 hover:scale-[1.015]">
            
            {/* LOGO BRANCA (Padrão visível, some no hover) */}
            <img
              src={logoIelBranca}
              alt="Logo Iel Branca"
              className="absolute inset-0 w-full h-full select-none object-contain pointer-events-none transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            />

            {/* LOGO VERMELHA (Invisível, surge suavemente no hover) */}
            <img
              src={logoIelVermelha}
              alt="Logo Iel Vermelha"
              className="absolute inset-0 w-full h-full select-none object-contain pointer-events-none opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            />
            
          </div>
        </motion.div>
      </div>

      {/* BASE: Ficha Técnica e Botão de Ação */}
      <motion.div
        variants={fadeInUp}
        className="w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t border-zinc-800/40 pt-6 gap-6 relative z-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-end gap-8 md:gap-12 text-[10px] font-mono tracking-wider text-zinc-400">
          <div className="inline-block bg-iel-red text-iel-white font-mono text-[9px] md:text-[11px] tracking-[0.3em] font-bold uppercase px-5 py-2.5 shadow-xl border border-iel-red/20 hover:bg-white hover:text-iel-dark hover:border-white transition-all duration-300 cursor-default">
            ARTES PLÁSTICAS / DESIGN GRÁFICO
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-zinc-600 uppercase text-[9px] tracking-[0.2em]">LOCALIZAÇÃO</span>
            <span className="text-zinc-300">Brasil // Global</span>
          </div>
        </div>

        <Link
          to="/portfolio"
          className="group relative flex items-center gap-4 text-zinc-400 hover:text-iel-white transition-colors duration-300 py-2 w-full md:w-auto justify-between md:justify-start"
        >
          <span className="font-mono text-[11px] font-bold tracking-[0.4em] uppercase">
            ENTRAR NA GALERIA
          </span>
          <span className="font-mono text-xs transform group-hover:translate-x-2 transition-transform duration-300 text-iel-red">
            ➔
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-iel-white group-hover:w-full transition-all duration-300"></span>
        </Link>
      </motion.div>

    </motion.section>
  );
}
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PortfolioSection from "../sections/PortfolioSection";

// Reutilizando seus assets idênticos aos do Hero
import logoIelBranca from "../assets/logo/logo completa branca.png";
import logoIelVermelha from "../assets/logo/logo completa vermelha.png";
import headerBg from "../assets/bg/FUNDOS-04.png";

// 1. Orquestrador do container (sincroniza a entrada dos elementos e da logo)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 }
  }
};

// 2. A MÁGICA DO FUNDO: Revelação cinematográfica idêntica ao Hero
const backgroundVariants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// 3. Animação para as linhas técnicas superiores e inferiores
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
  }
};

// 4. Animação de Entrada da Logo Monolítica
const logoAnimation = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function PortfolioPage() {
  // Força a janela a resetar o scroll para o topo ao entrar na página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white font-sans selection:bg-iel-red selection:text-white overflow-x-hidden">
      
      {/* SEÇÃO DE ENTRADA / ESTILO HERO HEADER */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative h-screen flex flex-col justify-between pt-12 pb-10 px-6 md:px-16 overflow-hidden"
      >
        {/* O FUNDO MÁGICO REVELADO COM SEU ASSET DO HERO */}
        <motion.div
          variants={backgroundVariants}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-grain pointer-events-none"
          style={{ backgroundImage: `url(${headerBg})` }}
        />

        {/* LINHA SUPERIOR TÉCNICA */}
        <motion.div
          variants={fadeInUp}
          className="w-full flex justify-between items-center border-b border-zinc-800/40 pb-5 text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase relative z-20"
        >
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-iel-red"></span>
            <span>PORTFÓLIO ATIVO</span>
          </div>
          <div className="text-right text-zinc-400">
            [ CATÁLOGO GERAL 2026 ]
          </div>
        </motion.div>

        {/* CENTRO: Sua Logo Interativa Cruzada (Agora envelopada com Link de retorno) */}
        <div className="relative w-full my-auto flex flex-col justify-center items-start py-0 z-10">
          <Link to="/" className="w-full block group">
            <motion.div
              variants={logoAnimation}
              className="w-full flex flex-col items-start cursor-pointer select-none"
            >
              <div className="relative h-[45vh] sm:h-[52vh] md:h-[58vh] w-auto aspect-[3/4] transform transition-transform duration-700 hover:scale-[1.015]">
                
                {/* LOGO BRANCA */}
                <img
                  src={logoIelBranca}
                  alt="Logo Iel Branca"
                  className="absolute inset-0 w-full h-full select-none object-contain pointer-events-none transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                />

                {/* LOGO VERMELHA */}
                <img
                  src={logoIelVermelha}
                  alt="Logo Iel Vermelha"
                  className="absolute inset-0 w-full h-full select-none object-contain pointer-events-none opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                />
                
              </div>
            </motion.div>
          </Link>
        </div>

        {/* BASE: Ficha de Localização e o Botão de Retorno Industrial */}
        <motion.div
          variants={fadeInUp}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t border-zinc-800/40 pt-6 gap-6 relative z-20"
        >
          {/* Dados Técnicos à Esquerda */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-8 md:gap-12 text-[10px] font-mono tracking-wider text-zinc-400">
            <div className="inline-block bg-zinc-900 text-zinc-300 font-mono text-[9px] md:text-[11px] tracking-[0.3em] font-bold uppercase px-5 py-2.5 border border-zinc-800">
              ACERVO ONLINE
            </div>
          </div>

          {/* Botão de Retorno para a Home à Direita usando React Router */}
          <Link
            to="/"
            className="group relative flex items-center gap-4 text-zinc-400 hover:text-white transition-colors duration-300 py-2 w-full md:w-auto justify-between md:justify-start"
          >
            <span className="font-mono text-xs text-iel-red transform group-hover:-translate-x-2 transition-transform duration-300">
              🡨
            </span>
            <span className="font-mono text-[11px] font-bold tracking-[0.4em] uppercase">
              RETORNAR PARA A HOME
            </span>
            <span className="absolute bottom-0 right-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.div>
      </motion.section>

      {/* SEÇÃO DA GALERIA DO CMS (Rola logo abaixo da dobra com os filtros limpos) */}
      <main className="w-full relative z-10 bg-zinc-950 border-t border-zinc-900">
        <PortfolioSection />
      </main>

    </div>
  );
}
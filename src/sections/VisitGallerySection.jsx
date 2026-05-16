import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// IMPORT DE ASSETS GENERALIZADOS
import sectionDefaultBg from "../assets/art/IMG_3295.jpg"; 
import cardBg from "../assets/art/IMG_3295.jpg"; 
import logoVermelha from "../assets/logo/logo vermelha.png";

// Imagens individuais de cada botão
import imgArteIel from "../assets/art/ARTE IEL.jpg"; 
import imgEterea from "../assets/art/ETEREA.JPG"; 
import imgBehance from "../assets/art/BEHANCE.jpg"; 

// Criamos um componente motion baseado no Link do React Router para herdar as animações do Framer Motion
const MotionLink = motion(Link);

export default function VisitGallerySectionDisruptive() {
  const [hoveredBg, setHoveredBg] = useState(null);
  const controls = useAnimation();

  // Coreografia de trepidação física da estática de TV
  const tvStaticAnimation = {
    x: [0, -15, 30, -5, 20, -25, 10, -35, 0],
    y: [0, 25, -10, 20, -30, 5, -15, 25, 0],
    transition: {
      duration: 0.04, 
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear"
    }
  };

  // Variantes de entrada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="w-full bg-black text-white py-32 px-4 md:px-16 select-none overflow-hidden relative min-h-screen flex items-center z-30 font-brutal"
    >
      
      {/* ─── FUNDO FIXO COM ESTÁTICA E DISRUPÇÃO ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden [clip-path:inset(0_0_0_0)] z-0">
        <div className="fixed inset-0 w-full h-screen z-0">
          <AnimatePresence mode="popLayout">
            {!hoveredBg ? (
              <motion.img
                key="default-bg"
                src={sectionDefaultBg}
                alt="Background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover mix-blend-luminosity grayscale filter contrast-[1.1] brightness-[0.5]"
              />
            ) : (
              <motion.img
                key={hoveredBg}
                src={hoveredBg}
                alt="Hovered Background"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full object-cover mix-blend-color-dodge filter contrast-[1.6]"
              />
            )}
          </AnimatePresence>

          {/* Granulação Dinâmica (Pointer Events forçados direto no style para liberar os cliques) */}
          <motion.div 
            animate={tvStaticAnimation}
            className="absolute -inset-40 opacity-[0.18] pointer-events-none bg-repeat z-10"
            style={{
              pointerEvents: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='highContrastNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.8 -0.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23highContrastNoise)'/%3E%3C/svg%3E")`,
              backgroundSize: "130px 130px"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70 z-20" />

          {/* DISRUPÇÃO 1: LINHA DE CÓDIGO CORROMPIDO */}
          <div className="absolute top-1/4 -right-10 font-mono text-[10px] text-zinc-800 tracking-widest leading-none rotate-90 opacity-20 whitespace-nowrap z-30 select-none pointer-events-none">
            ERR_SYSTEM_FAILURE_0x00FFED / DATALOSS_PREVENT: DISABLE / SYSTEM://RAW_DATA_STREAM / [DEBUG]
          </div>

          {/* DISRUPÇÃO 2: PARTÍCULAS DE ERRO */}
          {[...Array(6)].map((_, i) => (
            <div key={i} 
              className="absolute w-2 h-2 border border-dashed border-[#fe0000]/30 z-30 pointer-events-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.1 + Math.random() * 0.2
              }}
            />
          ))}

        </div>
      </div>

      {/* LINHA TÉCNICA VERMELHA SUPERIOR */}
      <div className="absolute top-1 left-[5%] w-[90%] h-[1px] bg-gradient-to-r from-transparent via-[#fe0000] to-transparent opacity-40 z-10" />

      {/* 🛠️ GRID DO CONTEÚDO PRINCIPAL (Injetado relative z-50 para pular para cima de qualquer camada) */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-50">
        
        {/* 1. O CARD MONUMENTAL DA GALERIA */}
        <MotionLink
          to="/portfolio"
          variants={itemVariants}
          whileHover="hover"
          className="group relative lg:col-span-6 flex flex-col justify-between overflow-hidden min-h-[480px] cursor-pointer bg-zinc-950 border border-zinc-900 shadow-2xl rounded-lg z-50"
        >
          <motion.div 
            variants={{
              hover: { scale: 1.03, brightness: 0.85, opacity: 0.9 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 z-0 opacity-70 contrast-[1.1] brightness-[0.8]"
          >
            <img src={cardBg} alt="Visite a Galeria" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            variants={{ hover: { opacity: 0.3 } }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#fe0000] mix-blend-color opacity-0 z-10" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

          <div className="relative z-20 mt-auto p-8 pt-0">
            <h2 className="font-brutal text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-[0.85] text-white uppercase group-hover:text-[#fe0000] transition-colors duration-500 relative">
              VISITE A <br />
              <span className="relative inline-block text-[#fe0000] group-hover:text-white transition-colors duration-500 glitch-text">
                GALERIA
                <span className="absolute inset-0 text-white opacity-0 group-hover:opacity-70 group-hover:animate-glitch translate-x-[2px] transition-opacity duration-300 pointer-events-none mix-blend-screen glitch-layer">GALERIA</span>
                <span className="absolute inset-0 text-white opacity-0 group-hover:opacity-70 group-hover:animate-glitch_rev translate-x-[-2px] transition-opacity duration-300 pointer-events-none mix-blend-screen glitch-layer">GALERIA</span>
              </span>
            </h2>
            <p className="font-mono text-xs tracking-widest text-zinc-400 uppercase mt-6 flex items-center gap-3">
              <span>EXPLORAR CONCEITOS</span>
              <span className="text-[#fe0000] transform transition-transform duration-500 group-hover:translate-x-4">➔</span>
            </p>
          </div>
        </MotionLink>

        {/* 2. HUB EXTERNO: 3 BOTÕES QUADRADOS */}
        <div className="lg:col-span-6 flex flex-col justify-center relative z-50">
          
          <motion.div variants={itemVariants} className="mb-8 lg:pl-2">
            <h3 className="font-brutal text-4xl text-[#fe0000] tracking-tight leading-none uppercase mb-3 relative">
              CONHEÇA <br /><span className="text-white relative glitch-text">MINHA ARTE.</span>
            </h3>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
              Canais oficiais e registros de processos físicos.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 w-full relative z-50">
            <style>{`
              @keyframes glitch {
                0% { clip-path: inset(80% 0 0 0); }
                10% { clip-path: inset(10% 0 85% 0); }
                20% { clip-path: inset(50% 0 30% 0); }
                30% { clip-path: inset(10% 0 85% 0); }
                40% { clip-path: inset(80% 0 0 0); }
                50% { clip-path: inset(10% 0 85% 0); }
                60% { clip-path: inset(50% 0 30% 0); }
                70% { clip-path: inset(10% 0 85% 0); }
                80% { clip-path: inset(80% 0 0 0); }
                90% { clip-path: inset(10% 0 85% 0); }
                100% { clip-path: inset(50% 0 30% 0); }
              }
              @keyframes glitch_rev {
                0% { clip-path: inset(10% 0 85% 0); }
                10% { clip-path: inset(80% 0 0 0); }
                20% { clip-path: inset(10% 0 85% 0); }
                30% { clip-path: inset(50% 0 30% 0); }
                40% { clip-path: inset(10% 0 85% 0); }
                50% { clip-path: inset(80% 0 0 0); }
                60% { clip-path: inset(10% 0 85% 0); }
                70% { clip-path: inset(50% 0 30% 0); }
                80% { clip-path: inset(10% 0 85% 0); }
                90% { clip-path: inset(80% 0 0 0); }
                100% { clip-path: inset(10% 0 85% 0); }
              }
              .disruptive-btn {
                transition: transform 0.4s ease, border-color 0.4s ease;
              }
              .disruptive-btn:hover {
                transform: skewX(-2deg) skewY(1deg) scale(0.99) !important;
                border-color: #fe0000/50 !important;
              }
            `}</style>
            
            {/* BOTÃO 01: ARTE_IEL */}
            <motion.a 
              href="https://instagram.com/arte_iel" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredBg(imgArteIel)}
              onMouseLeave={() => setHoveredBg(null)}
              className="relative disruptive-btn w-full aspect-square bg-zinc-950 border border-zinc-900/80 overflow-hidden group/btn cursor-pointer rounded-lg z-50"
            >
              <motion.img 
                src={imgArteIel} 
                alt="Arte Iel" 
                variants={{
                  hover: { scale: 1.05, brightness: 0.55 }
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.5] brightness-[0.35]" 
              />
              
              <motion.div 
                variants={{ hover: { opacity: 0.15 } }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-[#fe0000] opacity-45 mix-blend-multiply z-20" 
              />
              <motion.div 
                variants={{ hover: { opacity: 0.20 } }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#bf1c21] opacity-0 pointer-events-none z-20" 
              />

              <div className="absolute inset-0 flex items-center justify-center p-2 text-center z-30">
                <h4 className="text-white text-xs sm:text-sm md:text-xl font-brutal font-bold tracking-tighter uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  ARTE_IEL
                </h4>
              </div>
            </motion.a>

            {/* BOTÃO 02: EM.ETEREA */}
            <motion.a 
              href="https://instagram.com/em.eterea" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredBg(imgEterea)}
              onMouseLeave={() => setHoveredBg(null)}
              className="relative disruptive-btn w-full aspect-square bg-zinc-950 border border-zinc-900/80 overflow-hidden group/btn cursor-pointer rounded-lg z-50"
            >
              <motion.img 
                src={imgEterea} 
                alt="Eterea" 
                variants={{
                  hover: { scale: 1.05, brightness: 0.55 }
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.5] brightness-[0.35]" 
              />
              <motion.div 
                variants={{ hover: { opacity: 0.15 } }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-[#fe0000] opacity-45 mix-blend-multiply z-20" 
              />
              <motion.div 
                variants={{ hover: { opacity: 0.20 } }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#bf1c21] opacity-0 pointer-events-none z-20" 
              />

              <div className="absolute inset-0 flex items-center justify-center p-2 text-center z-30">
                <h4 className="text-white text-xs sm:text-sm md:text-xl font-brutal font-bold tracking-tighter uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  EM.ETEREA
                </h4>
              </div>
            </motion.a>

            {/* BOTÃO 03: BEHANCE */}
            <motion.a 
              href="https://behance.net/seu_behance" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setHoveredBg(imgBehance)}
              onMouseLeave={() => setHoveredBg(null)}
              className="relative disruptive-btn w-full aspect-square bg-zinc-950 border border-zinc-900/80 overflow-hidden group/btn cursor-pointer rounded-lg z-50"
            >
              <motion.img 
                src={imgBehance} 
                alt="Behance" 
                variants={{
                  hover: { scale: 1.05, brightness: 0.55 }
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.5] brightness-[0.35]" 
              />
              <motion.div 
                variants={{ hover: { opacity: 0.15 } }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-[#fe0000] opacity-45 mix-blend-multiply z-20" 
              />
              <motion.div 
                variants={{ hover: { opacity: 0.20 } }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#bf1c21] opacity-0 pointer-events-none z-20" 
              />

              <div className="absolute inset-0 flex items-center justify-center p-2 text-center z-30">
                <h4 className="text-white text-xs sm:text-sm md:text-xl font-brutal font-bold tracking-tighter uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  BEHANCE
                </h4>
              </div>
            </motion.a>

          </div>
        </div>

      </div>
    </motion.section>
  );
}
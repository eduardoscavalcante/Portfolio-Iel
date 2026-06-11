import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import sectionDefaultBg from "../assets/art/IMG_3295.jpg"; 
import cardBg from "../assets/art/IMG_3295.jpg"; 
import imgArteIel from "../assets/art/ARTE IEL.jpg"; 
import imgEterea from "../assets/art/EM.ETEREA.JPG"; 
import imgBehance from "../assets/art/BEHANCE.jpg"; 

const MotionLink = motion(Link);

export default function VisitGallerySectionDisruptive() {
  const [hoveredBg, setHoveredBg] = useState(null);

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
      className="w-full bg-black text-white py-20 sm:py-32 px-4 md:px-16 select-none overflow-hidden relative min-h-screen flex items-center z-30 font-brutal"
    >
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

          <div className="absolute top-1/4 -right-10 font-mono text-[10px] text-zinc-800 tracking-widest leading-none rotate-90 opacity-20 whitespace-nowrap z-30 select-none pointer-events-none">
            ERR_SYSTEM_FAILURE_0x00FFED / DATALOSS_PREVENT: DISABLE / SYSTEM://RAW_DATA_STREAM / [DEBUG]
          </div>

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

      <div className="absolute top-1 left-[5%] w-[90%] h-[1px] bg-gradient-to-r from-transparent via-[#fe0000] to-transparent opacity-40 z-10" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-50">
        
        <MotionLink
          to="/portfolio"
          variants={itemVariants}
          whileHover="hover"
          className="group relative lg:col-span-6 flex flex-col justify-between overflow-hidden min-h-[340px] sm:min-h-[480px] cursor-pointer bg-zinc-950 border border-zinc-900 shadow-2xl rounded-lg z-50"
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
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" 
          />

          <div className="relative z-20 mt-auto p-6 sm:p-8 pt-0">
            <h2 className="font-brutal text-4xl sm:text-6xl md:text-7xl tracking-tighter leading-[0.85] text-white uppercase group-hover:text-[#fe0000] transition-colors duration-500 relative">
              VISITE A <br />
              <span className="relative inline-block text-[#fe0000] group-hover:text-white transition-colors duration-500 glitch-text">
                GALERIA
                <span className="absolute inset-0 text-white opacity-0 group-hover:opacity-70 group-hover:animate-glitch translate-x-[2px] transition-opacity duration-300 pointer-events-none mix-blend-screen glitch-layer">GALERIA</span>
                <span className="absolute inset-0 text-white opacity-0 group-hover:opacity-70 group-hover:animate-glitch_rev translate-x-[-2px] transition-opacity duration-300 pointer-events-none mix-blend-screen glitch-layer">GALERIA</span>
              </span>
            </h2>
            <p className="font-mono text-[10px] sm:text-xs tracking-widest text-zinc-400 uppercase mt-4 sm:mt-6 flex items-center gap-3">
              <span>EXPLORAR CONCEITOS</span>
              <span className="text-[#fe0000] transform transition-transform duration-500 group-hover:translate-x-4">➔</span>
            </p>
          </div>
        </MotionLink>

        <div className="lg:col-span-6 flex flex-col justify-center relative z-50 w-full">
          
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8 lg:pl-2">
            <h3 className="font-brutal text-3xl sm:text-4xl text-[#fe0000] tracking-tight leading-none uppercase mb-3 relative">
              CONHEÇA <br /><span className="text-white relative glitch-text">MINHA ARTE.</span>
            </h3>
            <p className="font-mono text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">
              Canais oficiais e registros de processos físicos.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3 md:gap-4 w-full">
            
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
                  border-color: rgba(254, 0, 0, 0.5) !important;
                }
              `}</style>
              
              <motion.a 
                href="https://instagram.com/arte.iel" 
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
                  variants={{ hover: { scale: 1.05, brightness: 0.55 } }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.5] brightness-[0.35]" 
                />
                <motion.div variants={{ hover: { opacity: 0.15 } }} className="absolute inset-0 bg-[#fe0000] opacity-45 mix-blend-multiply z-20" />
                <div className="absolute inset-0 flex items-center justify-center p-1 sm:p-2 text-center z-30">
                  <h4 className="text-white text-[9px] min-[380px]:text-xs sm:text-sm md:text-xl font-brutal font-bold tracking-tighter uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    ARTE.IEL
                  </h4>
                </div>
              </motion.a>

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
                  variants={{ hover: { scale: 1.05, brightness: 0.55 } }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.5] brightness-[0.35]" 
                />
                <motion.div variants={{ hover: { opacity: 0.15 } }} className="absolute inset-0 bg-[#fe0000] opacity-45 mix-blend-multiply z-20" />
                <div className="absolute inset-0 flex items-center justify-center p-1 sm:p-2 text-center z-30">
                  <h4 className="text-white text-[9px] min-[380px]:text-xs sm:text-sm md:text-xl font-brutal font-bold tracking-tighter uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    EM.ETEREA
                  </h4>
                </div>
              </motion.a>

              <motion.a 
                href="https://www.behance.net/ielferreira" 
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
                  variants={{ hover: { scale: 1.05, brightness: 0.55 } }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.5] brightness-[0.35]" 
                />
                <motion.div variants={{ hover: { opacity: 0.15 } }} className="absolute inset-0 bg-[#fe0000] opacity-45 mix-blend-multiply z-20" />
                <div className="absolute inset-0 flex items-center justify-center p-1 sm:p-2 text-center z-30">
                  <h4 className="text-white text-[9px] min-[380px]:text-xs sm:text-sm md:text-xl font-brutal font-bold tracking-tighter uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    BEHANCE
                  </h4>
                </div>
              </motion.a>

            </div>

            <div className="flex flex-col gap-2 w-full relative z-50">
              
              <motion.a
                href="https://www.linkedin.com/in/iel-silva-18b900373/"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ x: 6 }}
                className="w-full flex items-center justify-between py-2.5 px-3 sm:py-3.5 sm:px-4 bg-zinc-950 border-b border-zinc-900 text-zinc-400 hover:text-white transition-all duration-300 group/sub-btn cursor-pointer font-mono text-[10px] sm:text-xs tracking-widest uppercase"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-3.5 h-3.5 fill-current text-zinc-500 group-hover/sub-btn:text-[#fe0000] transition-colors duration-300" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>LinkedIn</span>
                </div>
                <span className="text-zinc-600 group-hover/sub-btn:text-white transition-colors duration-300 font-sans text-xs">➔</span>
              </motion.a>

              <motion.a
                href="https://www.tiktok.com/@ielferr?_r=1&_t=ZS-9753GgzSvbB"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ x: 6 }}
                className="w-full flex items-center justify-between py-2.5 px-3 sm:py-3.5 sm:px-4 bg-zinc-950 border-b border-zinc-900 text-zinc-400 hover:text-white transition-all duration-300 group/sub-btn cursor-pointer font-mono text-[10px] sm:text-xs tracking-widest uppercase"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-3.5 h-3.5 fill-current stroke-current text-zinc-500 group-hover/sub-btn:text-[#fe0000] transition-colors duration-300" viewBox="0 0 32 32">
                    <g strokeWidth="0"></g>
                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                    <g>
                      <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
                    </g>
                  </svg>
                  <span>TikTok</span>
                </div>
                <span className="text-zinc-600 group-hover/sub-btn:text-white transition-colors duration-300 font-sans text-xs">➔</span>
              </motion.a>

            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}
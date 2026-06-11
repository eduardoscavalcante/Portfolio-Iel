import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sobreImg from "../assets/art/IMG_0744.jpg"; 

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("BIO");

  const centerImageVariants = {
    hidden: { opacity: 0, scale: 1.12, filter: "blur(12px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const lineDrawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.4,
      transition: { delay: 0.9, duration: 1.4, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { delay: 1.5 + i * 0.12, duration: 0.5, ease: "easeOut" } 
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 12, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { opacity: 0, scale: 0.99, y: -6, filter: "blur(4px)", transition: { duration: 0.25 } }
  };

  const tvStaticAnimation = {
    x: [0, -8, 12, -4, 8, -12, 0],
    y: [0, 8, -4, 10, -8, 4, 0],
    transition: { duration: 0.06, repeat: Infinity, ease: "linear" }
  };

  return (
    <motion.section 
      initial={{ backgroundColor: "#050505" }}
      whileInView={{ backgroundColor: "#0a0303" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.5 }}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 px-6 md:px-16 overflow-hidden select-none bg-[#050505]"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fe0000] to-transparent shadow-[0_0_15px_#fe0000] z-40 pointer-events-none animate-[scan_1.8s_ease-in-out_forwards]" />
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 bg-repeat opacity-[0.012] pointer-events-none z-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h1v1H1z' fill='%23fff' fill-opacity='.3'/%3E%3C/svg%3E")` }} />

      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center min-h-[380px] mb-8">
        
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-10"
          viewBox="0 0 800 380"
          fill="none"
        >
          <defs>
            <linearGradient id="glow-left" x1="400" y1="190" x2="220" y2="190" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#111" />
              <stop offset="100%" stopColor="#fe0000" />
            </linearGradient>
            <linearGradient id="glow-right-top" x1="400" y1="190" x2="580" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#111" />
              <stop offset="100%" stopColor="#fe0000" />
            </linearGradient>
            <linearGradient id="glow-right-bottom" x1="400" y1="190" x2="580" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#111" />
              <stop offset="100%" stopColor="#fe0000" />
            </linearGradient>
          </defs>

          <motion.path 
            d="M 330 190 L 220 190" 
            stroke="url(#glow-left)" strokeWidth="1.2"
            variants={lineDrawVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          />
          <circle cx="220" cy="190" r="2" fill="#fe0000" />
          
          <motion.path 
            d="M 470 190 L 530 190 L 550 120 L 580 120" 
            stroke="url(#glow-right-top)" strokeWidth="1.2"
            variants={lineDrawVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          />
          <circle cx="580" cy="120" r="2" fill="#fe0000" />

          <motion.path 
            d="M 470 190 L 530 190 L 550 260 L 580 260" 
            stroke="url(#glow-right-bottom)" strokeWidth="1.2"
            variants={lineDrawVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          />
          <circle cx="580" cy="260" r="2" fill="#fe0000" />
        </svg>

        <motion.div
          variants={centerImageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative w-40 h-40 md:w-44 md:h-44 bg-zinc-950 overflow-hidden z-20 p-1 bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-2xl"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)" }}
        >
          <div className="w-full h-full overflow-hidden bg-black relative" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)" }}>
            <img 
              src={sobreImg} 
              alt="Anderson Core" 
              className="w-full h-full object-cover mix-blend-luminosity opacity-85 grayscale contrast-[1.25] brightness-95"
            />
            <motion.div 
              animate={tvStaticAnimation}
              className="absolute -inset-20 opacity-[0.08] pointer-events-none bg-repeat z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.98' numOctaves='2' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fe0000]/5 to-transparent h-1/4 w-full animate-[pulse_2s_infinite] pointer-events-none z-10" />
          </div>
        </motion.div>

        <motion.div
          custom={0} variants={buttonVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="static md:absolute md:left-2 md:top-1/2 md:-translate-y-1/2 mt-8 md:mt-0 z-30 w-full md:w-auto flex justify-center"
        >
          <button
            onClick={() => setActiveTab("BIO")}
            className={`font-mono text-[11px] tracking-[0.3em] uppercase py-2 px-4 transition-all duration-300 cursor-pointer w-44 text-left relative flex items-center justify-between group ${
              activeTab === "BIO"
                ? "text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-1 h-1 rounded-full transition-all duration-300 ${activeTab === "BIO" ? "bg-[#fe0000] scale-125" : "bg-zinc-700 group-hover:bg-zinc-400"}`} />
              CORE//BIO
            </span>
            <span className="text-[9px] text-zinc-600 opacity-60 font-sans tracking-normal">01</span>
          </button>
        </motion.div>

        <motion.div
          custom={1} variants={buttonVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="static md:absolute md:right-2 md:top-[28%] mt-2 md:mt-0 z-30 w-full md:w-auto flex justify-center"
        >
          <button
            onClick={() => setActiveTab("EXPERIENCIAS")}
            className={`font-mono text-[11px] tracking-[0.3em] uppercase py-2 px-4 transition-all duration-300 cursor-pointer w-44 text-left relative flex items-center justify-between group ${
              activeTab === "EXPERIENCIAS"
                ? "text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-1 h-1 rounded-full transition-all duration-300 ${activeTab === "EXPERIENCIAS" ? "bg-[#fe0000] scale-125" : "bg-zinc-700 group-hover:bg-zinc-400"}`} />
              SYS//EXP
            </span>
            <span className="text-[9px] text-zinc-600 opacity-60 font-sans tracking-normal">02</span>
          </button>
        </motion.div>

        <motion.div
          custom={2} variants={buttonVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="static md:absolute md:right-2 md:top-[64%] mt-2 md:mt-0 z-30 w-full md:w-auto flex justify-center"
        >
          <button
            onClick={() => setActiveTab("CONTATOS")}
            className={`font-mono text-[11px] tracking-[0.3em] uppercase py-2 px-4 transition-all duration-300 cursor-pointer w-44 text-left relative flex items-center justify-between group ${
              activeTab === "CONTATOS"
                ? "text-white font-bold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className={`w-1 h-1 rounded-full transition-all duration-300 ${activeTab === "CONTATOS" ? "bg-[#fe0000] scale-125" : "bg-zinc-700 group-hover:bg-zinc-400"}`} />
              LNK//CTX
            </span>
            <span className="text-[9px] text-zinc-600 opacity-60 font-sans tracking-normal">03</span>
          </button>
        </motion.div>

      </div>

      <div className="w-full max-w-xl min-h-[150px] relative z-20 px-4">
        <AnimatePresence mode="wait">
          {activeTab === "BIO" && (
            <motion.div
              key="bio" 
              variants={cardVariants} 
              initial="hidden" 
              animate="visible" 
              exit="exit"
              className="w-full bg-zinc-900/20 backdrop-blur-md border border-white/5 p-6 rounded-lg flex flex-col gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <h3 className="font-brutal text-lg uppercase tracking-tight text-zinc-200">
                Diretriz_Primitiva
              </h3>
              <p className="font-mono text-zinc-400 text-[11px] leading-relaxed tracking-wide uppercase">
              Me chamo IEL. Tenho 24 anos e opero como artista plástica, cineasta, tatuadora e multiartista. Meu foco é traduzir ideias e ideais de forma disruptiva e visceral, dissecando as disfunções do sistema social em que estamos inseridos. Meu trabalho converge experiências próprias e alheias, amparadas por um denso embasamento político e cultural, onde o surrealismo simbólico e a estética punk dão forma a sentimentos cruamente realistas.
              Minha trajetória reflete essa intensidade. Expus minhas obras na Galeria do Teatro Deodoro e no Museu da Imagem e do Som (MISA). No audiovisual, assinei a produção de três curtas-metragens. Desenvolvi a identidade visual da Mostra Sururu (2022) e colaborei com a EDUFAL na Bienal do Livro, criando designs inspirados no mercado popular alagoano. No campo institucional, estruturei campanhas para o Ministério Público — incluindo as ações do Mês do Orgulho e da Visibilidade Trans — e colaborei com o projeto Mandala360. Em um percurso deliberadamente curto, acumulo ainda lançamentos editoriais, artigos publicados e desenvolvimento de jogos. Não sigo fórmulas; crio o impacto que a realidade exige.  
              </p>
            </motion.div>
          )}

          {activeTab === "EXPERIENCIAS" && (
            <motion.div
              key="experiencias" 
              variants={cardVariants} 
              initial="hidden" 
              animate="visible" 
              exit="exit"
              className="w-full bg-zinc-900/20 backdrop-blur-md border border-white/5 p-6 rounded-lg flex flex-col gap-3 font-mono text-[11px] uppercase tracking-wider text-zinc-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <h3 className="font-brutal text-lg uppercase tracking-tight text-zinc-200 mb-1">
                Registros_Campo
              </h3>
              <div className="flex flex-col gap-2">
                <p><span className="text-white font-bold">[2024 - PRESENTE]</span> Diretor de Arte Independente.</p>
                <p><span className="text-zinc-600">[2022 - 2024]</span> Ilustrador e Design de Superfície.</p>
                <p><span className="text-zinc-600">[2020 - 2022]</span> Exposições Autônomas de Guerrilha.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "CONTATOS" && (
            <motion.div
              key="contatos" 
              variants={cardVariants} 
              initial="hidden" 
              animate="visible" 
              exit="exit"
              className="w-full bg-zinc-900/20 backdrop-blur-md border border-white/5 p-6 rounded-lg flex flex-col gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <h3 className="font-brutal text-lg uppercase tracking-tight text-zinc-200">
                Acesso_Direto
              </h3>
              <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-widest pt-0.5">
                <a href="mailto:contato@iel.com" className="text-zinc-400 hover:text-white transition-colors duration-200 w-fit flex items-center gap-1.5">
                  <span>&gt;</span> E-MAIL // contato@iel.com
                </a>
                <a href="https://wa.me/seunumero" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors duration-200 w-fit flex items-center gap-1.5">
                  <span>&gt;</span> WHATSAPP // +55 AL ↗
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
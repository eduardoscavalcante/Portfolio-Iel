import { motion } from "framer-motion";
// Assets Oficiais e Definitivos importados para o Layout Brutalista
import bgPlaceholder from "../assets/art/IMG_0744.jpg"; 
import bgArte from "../assets/art/arte-background.jpg";
import logoVermelha from "../assets/logo vermelha.png";

export default function ServicesSection() {
  const services = [
    { name: "ACERVO À VENDA", link: "#acervo", img: bgPlaceholder },
    { name: "PORTFÓLIO DE ARTES", link: "#portfolio", img: bgPlaceholder },
    { name: "AUDIOVISUAL", link: "#audiovisual", img: bgPlaceholder },
    { name: "TATUAGEM", link: "#tatuagem", img: bgPlaceholder, isSoon: true }, // Marcado como Em Breve
    { name: "CUSTOMIZAÇÃO", link: "#customizacao", img: bgPlaceholder, isSoon: true }, // Marcado como Em Breve
  ];

  // Configuração do motor de trepidação física da estática de TV (Aceleração e ganho de amplitude)
  const tvStaticAnimation = {
    x: [0, -15, 30, -5, 20, -25, 10, -35, 0],
    y: [0, 25, -10, 20, -30, 5, -15, 25, 0],
    transition: {
      duration: 0.04, // Ainda mais rápido para ferver a imagem
      repeat: Infinity,
      ease: "linear"
    }
  };

  // Variantes de animação para os blocos surgirem com impacto seco de bloco de concreto
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      className="relative w-full bg-black text-white py-16 px-4 md:px-12 z-30" 
    >
      {/* 1. ENGENHARIA DE FUNDO FIXO E TRAVADO (Substitui o Sticky instável por Fixed com isolamento de Seção) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden [clip-path:inset(0_0_0_0)]">
        <div className="fixed inset-0 w-full h-screen z-0">
          
          {/* Imagem de Fundo Crua (Contraste e Opacidade Expandidos) */}
          <img
            src={bgArte} 
            alt="Fundo Fixo"
            className="w-full h-full object-cover grayscale opacity-60 contrast-[1.6] brightness-[0.5]"
          />

          {/* EFEITO DE GRANULAÇÃO DINÂMICA ULTRA-APARENTE (Contraste matemático SVG escalado) */}
          <motion.div 
            animate={tvStaticAnimation}
            className="absolute -inset-40 opacity-[0.65] pointer-events-none bg-repeat z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='highContrastNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.5 -0.4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23highContrastNoise)'/%3E%3C/svg%3E")`,
              backgroundSize: "130px 130px"
            }}
          />

          {/* Sombra brutalista espessa para amalgamar o layout nas pontas */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90 z-20" />
        </div>
      </div>

      {/* CONTEÚDO DA SEÇÃO (Z-10 flutuando por cima do fundo) */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER MINI DA SEÇÃO */}
        <div className="w-full flex justify-between items-center mb-10 border-b border-zinc-800/60 pb-4 select-none">
          <span className="text-xs font-mono tracking-widest text-white opacity-70">EXPERTISE</span>
        </div>

        {/* GRID DOS 5 QUADRADOS BRUTALISTAS */}
        {/* Mudado para grid-cols-3 no mobile e adicionado justify-center para alinhar a última fileira de 2 cards */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 justify-center">
          {services.map((service, index) => (
            <motion.a
              key={index}
              href={service.isSoon ? undefined : service.link} // Remove o link se for "Em Breve"
              variants={cardVariants}
              whileHover="hover"
              className={`relative w-full aspect-square bg-zinc-950 border border-zinc-900/80 overflow-hidden group select-none ${
                service.isSoon ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {/* Imagem interna do card (Efeito P&B de Alto Contraste) */}
              <img
                src={service.img}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.5] brightness-[0.35] transition-all duration-700 group-hover:scale-105 group-hover:brightness-[0.55]"
              />

              {/* Overlays Cromáticos Brutalistas */}
              <div className="absolute inset-0 bg-[#fe0000] opacity-45 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-15" />
              <div className="absolute inset-0 bg-[#bf1c21] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

              {/* ÍCONE INDUSTRIAL COMPLETO (LOGO VERMELHA REAGINDO NO HOVER) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-2 sm:p-4">
                <img
                  src={logoVermelha}
                  alt="Ícone de Foco"
                  className="w-5/6 h-5/6 object-contain opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-[0.16,1,0.3,1]"
                />
              </div>

              {/* TEXTO CENTRALIZADO TRAVADO (RÍGIDO EM BRANCO) */}
              <div className="absolute inset-0 flex items-center justify-center p-2 text-center z-20">
                <h3 className="text-white text-[10px] sm:text-sm md:text-xl font-brutal font-bold tracking-tighter uppercase whitespace-normal leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {service.name}
                </h3>
              </div>

              {/* SELO BRUTALISTA "EM BREVE" */}
              {service.isSoon && (
                <div className="absolute top-0 right-0 z-30 bg-yellow-500 text-black text-[7px] sm:text-[9px] font-mono font-black tracking-widest px-1.5 py-0.5 uppercase border-b border-l border-black select-none shadow-md">
                  EM BREVE
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
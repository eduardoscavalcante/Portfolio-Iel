import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
// 🛠️ Importando o motor de conexão do Sanity
import { client, urlFor } from "../services/sanityClient";

function FloatingCard({ src, title, status, price, link, alignment, rotateDir, sizeClass, technicalData, onImageClick }) {
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.75, 1, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [rotateDir * 7, rotateDir * -3, rotateDir * 5]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);

  const alignClasses = {
    left: "justify-start md:pl-2",
    center: "justify-center md:px-8",
    right: "justify-end md:pr-2"
  }[alignment];

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, rotate, opacity }}
      layout
      exit={{ opacity: 0, scale: 0.8 }}
      className={`w-full flex ${alignClasses} my-12 md:my-16 first:mt-0 last:mb-0 select-none z-10`}
    >
      <div className={`relative w-full ${sizeClass} bg-zinc-900/40 p-4 border border-zinc-800/60 backdrop-blur-sm flex flex-col`}>
        
        {/* CONTAINER DA OBRA */}
        <div className="w-full aspect-[4/5] overflow-hidden bg-zinc-950 border border-zinc-800">
          <img
            src={src}
            alt={title}
            onClick={() => onImageClick(src, title)}
            className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>

        {/* METADADOS PRINCIPAIS DO CARD */}
        <div className="w-full flex justify-between items-end mt-4 font-mono uppercase text-[10px] tracking-wider text-zinc-400">
          <div className="flex flex-col gap-1">
            <span className="text-white text-xs font-sans tracking-normal font-bold normal-case">
              {title}
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${status === "Disponível" ? "bg-emerald-500 animate-pulse" : "bg-zinc-600"}`} />
              <span>{status === "Disponível" ? "Disponível" : "Coleção Privada"}</span>
            </div>
            {/* 💸 EXIBIÇÃO DO VALOR DA PEÇA */}
            {status === "Disponível" && price && (
              <span className="text-zinc-200 font-bold mt-0.5 text-[11px] tracking-normal font-sans">
                {price}
              </span>
            )}
          </div>

          {status === "Disponível" ? (
            <a
              href={link || "#contato"}
              className="px-2.5 py-1.5 border border-zinc-700 hover:border-white hover:text-white transition-colors duration-300 text-[9px] bg-zinc-950"
            >
              Tenho Interesse ➔
            </a>
          ) : (
            <span className="text-zinc-600 border border-transparent px-2.5 py-1.5">
              Vendido
            </span>
          )}
        </div>

        {/* FICHA TÉCNICA FIXA */}
        <div className="w-full bg-zinc-950/60 text-zinc-400 p-3 font-mono text-[9px] uppercase tracking-tight border border-zinc-800/60 flex flex-col gap-1 mt-4">
          <div className="flex justify-between border-b border-zinc-800 pb-1 text-zinc-500 font-bold">
            <span>Ficha Técnica</span>
            <span>{technicalData.code || "EXP_PRV"}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-zinc-500">Dimensões:</span>
            <span className="text-zinc-300 font-bold">{technicalData.size || "S/D"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Suporte:</span>
            <span className="text-zinc-300 font-bold">{technicalData.surface || "TELA"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Técnica:</span>
            <span className="text-zinc-300 font-bold">{technicalData.medium || "Mista"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Ano:</span>
            <span className="text-zinc-300 font-bold">{technicalData.year}</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function SalesSection() {
  const containerRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  
  // ESTADOS DOS DADOS DO CMS
  const [obras, setObras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados dos filtros
  const [statusFilter, setStatusFilter] = useState("TODOS");
  const [surfaceFilter, setSurfaceFilter] = useState("TODOS");

  // 📦 PARÂMETROS DE PAGINAÇÃO (Ajuste aqui a quantidade inicial e o pulo do load)
  const ITEMS_PER_PAGE = 4; // Mostra 4 inicialmente
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // ⚡ CONEXÃO DINÂMICA GROQ
  useEffect(() => {
    async function getSalesArtworks() {
      try {
        const query = `*[_type == "artwork" && isForSale == true] | order(year desc) {
          _id,
          title,
          status,
          price,
          link,
          year,
          mainImage,
          code,
          size,
          medium,
          surface
        }`;
        const data = await client.fetch(query);
        setObras(data);
      } catch (err) {
        console.error("Erro ao buscar acervo de vendas no Sanity:", err);
      } finally {
        setIsLoading(false);
      }
    }
    getSalesArtworks();
  }, []);

  // ⚙️ Engenharia de Segurança: Reseta a paginação ao mudar qualquer filtro
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [statusFilter, surfaceFilter]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#1a141c", "#140f16", "#221924", "#171119", "#261c29", "#110b12"]
  );

  const titleContainerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.03 } }
  };

  const letterVariants = {
    initial: { y: "110%", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const renderAnimatedText = (text) => {
    return Array.from(text).map((char, index) => (
      <span key={index} className="inline-block vertical-align-bottom pb-[0.05em] overflow-visible">
        <motion.span variants={letterVariants} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      </span>
    ));
  };

  // Listas matemáticas fixas para herdar o posicionamento randômico brutalista por índice
  const alignments = ["left", "right", "center", "left", "right"];
  const rotations = [-1.2, 1, -0.6, 1.4, -1];
  const sizeClasses = [
    "max-w-[280px] sm:max-w-[320px]",
    "max-w-[340px] sm:max-w-[380px]",
    "max-w-[300px] sm:max-w-[340px]",
    "max-w-[260px] sm:max-w-[300px]",
    "max-w-[320px] sm:max-w-[360px]"
  ];

  // Filtro casado dinâmico por status e superfície física
  const filteredObras = obras.filter((obra) => {
    const matchStatus = statusFilter === "TODOS" || 
      (statusFilter === "DISPONÍVEL" && obra.status === "Disponível") || 
      (statusFilter === "VENDIDO" && obra.status === "Coleção Privada");
      
    const matchSurface = surfaceFilter === "TODOS" || obra.surface === surfaceFilter;
    
    return matchStatus && matchSurface;
  });

  // 🗡️ Fatiamento da lista filtrada com base no limite do botão
  const paginatedObras = filteredObras.slice(0, visibleCount);

  return (
    <>
      <motion.section
        ref={containerRef}
        style={{ backgroundColor }}
        className="relative w-full text-white px-6 md:px-16 py-32 font-sans grid grid-cols-1 md:grid-cols-12 gap-12 transition-colors duration-300"
      >
        {/* COLUNA ESQUERDA FIXA */}
        <div className="md:col-span-5 h-fit md:sticky md:top-24 flex flex-col justify-between py-6 z-20 gap-8">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
              [ ACERVO ÚNICO ]
            </span>
            
            <motion.h2 
              variants={titleContainerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="font-brutal text-4xl md:text-5xl uppercase leading-[0.95] tracking-tighter w-full flex flex-col gap-1"
            >
              <span className="w-full block overflow-hidden whitespace-nowrap">
                {renderAnimatedText("OBRAS")}
              </span>
              <span className="w-full block overflow-hidden whitespace-nowrap text-[#fe0000]">
                {renderAnimatedText("À VENDA.")}
              </span>
            </motion.h2>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs normal-case font-normal mt-2">
              Edições físicas e peças originais desenvolvidas sob experimentação gráfica. Artes originais e únicas.
            </p>
          </div>

          {/* CONTROLADORES DO FILTRO */}
          <div className="border-t border-zinc-800 pt-8 flex flex-col gap-6 font-mono text-[10px]">
            {/* Filtro de Disponibilidade */}
            <div className="flex flex-col gap-2">
              <span className="text-zinc-500 uppercase tracking-wider">// STATUS COLECIONÁVEL</span>
              <div className="flex flex-wrap gap-2">
                {["TODOS", "DISPONÍVEL", "VENDIDO"].map((st) => (
                  <button
                    key={st}
                    node_modules
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 border transition-all duration-200 uppercase ${
                      statusFilter === st 
                        ? "bg-white text-black border-white font-bold" 
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
                    }`}
                  >
                    {st === "VENDIDO" ? "COLEÇÃO PRIVADA" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro de Superfície */}
            <div className="flex flex-col gap-2">
              <span className="text-zinc-500 uppercase tracking-wider">// SUPORTE FÍSICO</span>
              <div className="flex flex-wrap gap-2">
                {["TODOS", "TELA", "PAPEL", "MADEIRA"].map((surf) => (
                  <button
                    key={surf}
                    onClick={() => setSurfaceFilter(surf)}
                    className={`px-3 py-1.5 border transition-all duration-200 uppercase ${
                      surfaceFilter === surf 
                        ? "bg-white text-black border-white font-bold" 
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
                    }`}
                  >
                    {surf}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-zinc-600 mt-2">
              ARQUIVO: {isLoading ? "..." : Math.min(visibleCount, filteredObras.length)} / {filteredObras.length} EXIBIDOS // INTEGRAL: {obras.length}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA DOS CARDS */}
        <div className="md:col-span-7 w-full flex flex-col justify-start min-h-[60vh]">
          {isLoading ? (
            <div className="w-full py-32 flex justify-center font-mono text-xs text-zinc-500 uppercase animate-pulse">[ CONECTANDO_ACERVO_COMERCIAL... ]</div>
          ) : (
            <motion.div layout className="w-full flex flex-col">
              <AnimatePresence mode="popLayout">
                {paginatedObras.map((obra, index) => (
                  <FloatingCard
                    key={obra._id}
                    src={obra.mainImage ? urlFor(obra.mainImage).width(600).auto("format").url() : ""}
                    title={obra.title}
                    status={obra.status}
                    price={obra.price}
                    link={obra.link}
                    alignment={alignments[index % alignments.length]}
                    rotateDir={rotations[index % rotations.length]}
                    sizeClass={sizeClasses[index % sizeClasses.length]}
                    technicalData={{
                      code: obra.code,
                      size: obra.size,
                      medium: obra.medium,
                      surface: obra.surface,
                      year: obra.year
                    }}
                    onImageClick={(src, title) => setActiveImage({ src, title })}
                  />
                ))}
              </AnimatePresence>
              
              {/* ⚠️ BOTÃO CARREGAR MAIS (Apenas exibe se o total filtrado for maior que o exibido) */}
              {filteredObras.length > visibleCount && (
                <motion.div 
                  layout
                  className="w-full flex justify-center pt-8 pb-16"
                >
                  <button
                    onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                    className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 border border-zinc-800 hover:border-white hover:text-white px-8 py-4 transition-all duration-300 bg-zinc-950/40 backdrop-blur-sm active:scale-95"
                  >
                    [ Carregar Mais Obras // + ]
                  </button>
                </motion.div>
              )}

              {filteredObras.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="w-full py-20 text-center font-mono text-zinc-500 text-xs border border-dashed border-zinc-800 uppercase"
                >
                  Nenhuma peça registrada sob esta combinação de parâmetros.
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center p-4 md:p-12 select-none cursor-zoom-out"
          />
        )}
        {activeImage && (
          <div className="fixed inset-0 z-50 flex flex-col justify-center items-center p-4 md:p-12 pointer-events-none select-none">
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 font-mono text-xs uppercase text-zinc-400 hover:text-white border-2 border-zinc-800 bg-zinc-950/60 px-3 py-1.5 transition-colors duration-200 pointer-events-auto cursor-pointer"
            >
              [ fechar X ]
            </button>

            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="relative max-w-5xl max-h-[80vh] border-2 border-zinc-900 bg-black flex items-center justify-center overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={activeImage.src} alt={activeImage.title} className="max-w-full max-h-[80vh] object-contain" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-6 font-mono text-[10px] uppercase text-zinc-400 tracking-wider text-center">
              Exibição Expandida // <span className="text-white font-sans font-bold normal-case text-xs">{activeImage.title}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
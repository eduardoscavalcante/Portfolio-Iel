import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { client, urlFor } from "../services/sanityClient";

import logoBranca from "../assets/logo/logo branca.png";
import logoVermelha from "../assets/logo/logo vermelha.png";

function FloatingCard({ src, title, status, price, link, alignment, rotateDir, sizeClass, technicalData, onImageClick, obra, preventImageSave }) {
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
      <div className={`relative w-full ${sizeClass} bg-zinc-900/40 p-4 border border-zinc-800/60 backdrop-blur-sm flex flex-col group/card`}>
        
        <div className="absolute -top-6 -right-6 z-50 h-12 w-36 select-none pointer-events-none mix-blend-screen rotate-12 transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-[18deg]">
          <img 
            src={logoBranca} 
            alt="Badge External White" 
            className="absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-500 ease-in-out group-hover/card:opacity-0" 
          />
          <img 
            src={logoVermelha} 
            alt="Badge External Red" 
            className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 ease-in-out group-hover/card:opacity-100" 
          />
        </div>

        <div className="w-full aspect-[4/5] overflow-hidden bg-zinc-950 border border-zinc-800 relative cursor-zoom-in">
          <div className="absolute top-3 left-3 z-30 font-mono text-[9px] uppercase tracking-wider px-2 py-1 bg-black border border-zinc-800 text-white flex items-center gap-1.5 shadow-md">
            <span className={`w-1.5 h-1.5 rounded-full ${status === "Disponível" ? "bg-emerald-500 animate-pulse" : "bg-zinc-600"}`} />
            {status === "Disponível" ? "À Venda" : "Acervo Privado"}
          </div>

          <div className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto" onClick={() => onImageClick(obra)} onContextMenu={preventImageSave} />

          <img
            src={src}
            alt={title}
            onContextMenu={preventImageSave}
            onDragStart={preventImageSave}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-[1.02] select-none pointer-events-none z-10"
          />
        </div>

        <div className="w-full flex justify-between items-end mt-4 font-mono uppercase text-[10px] tracking-wider text-zinc-400">
          <div className="flex flex-col gap-1 w-full max-w-[65%]">
            <span className="text-white text-xs font-sans tracking-normal font-bold normal-case truncate block">
              {title}
            </span>
            <div className="flex items-center gap-1.5 text-[9px] text-zinc-500">
              <span>{technicalData.category || "Não Categorizado"}</span>
            </div>
            
            <div className="mt-1 font-mono text-[10px] tracking-tight">
              {status === "Disponível" ? (
                price ? (
                  <span className="text-emerald-400 font-sans font-bold text-xs tracking-normal">{price}</span>
                ) : (
                  <span className="text-zinc-500 italic lowercase text-[9px]">[sob consulta]</span>
                )
              ) : (
                <span className="text-zinc-600 line-through">[valor retido]</span>
              )}
            </div>
          </div>

          <div className="w-max flex justify-end">
            {status === "Disponível" ? (
              <a
                href={link || "#contato"}
                className="px-2.5 py-1.5 border border-zinc-700 hover:border-[#fe0000] hover:text-[#fe0000] transition-colors duration-300 text-[9px] bg-zinc-950 whitespace-nowrap font-bold"
              >
                Tenho Interesse ➔
              </a>
            ) : (
              <span className="text-zinc-600 border border-zinc-800 bg-zinc-950/20 px-2.5 py-1.5 text-[9px] cursor-not-allowed uppercase font-bold tracking-widest">
                Esgotado
              </span>
            )}
          </div>
        </div>

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
  const [activeArtwork, setActiveArtwork] = useState(null);
  
  const [obras, setObras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState("TODOS");
  const [surfaceFilter, setSurfaceFilter] = useState("TODOS");

  const ITEMS_PER_PAGE = 3;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const preventImageSave = (e) => {
    e.preventDefault();
  };

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
          category,
          mainImage,
          fullImage,
          code,
          size,
          medium,
          surface,
          description
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

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [categoryFilter, surfaceFilter]);

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

  const alignments = ["left", "right", "center", "left", "right"];
  const rotations = [-1.2, 1, -0.6, 1.4, -1];
  const sizeClasses = [
    "max-w-[280px] sm:max-w-[320px]",
    "max-w-[340px] sm:max-w-[380px]",
    "max-w-[300px] sm:max-w-[340px]",
    "max-w-[260px] sm:max-w-[300px]",
    "max-w-[320px] sm:max-w-[360px]"
  ];

  const filteredObras = obras.filter((obra) => {
    const matchCategory = categoryFilter === "TODOS" || obra.category === categoryFilter;
    const matchSurface = surfaceFilter === "TODOS" || obra.surface === surfaceFilter;
    return matchCategory && matchSurface;
  });

  const paginatedObras = filteredObras.slice(0, visibleCount);

  return (
    <>
      <motion.section
        ref={containerRef}
        style={{ backgroundColor }}
        className="relative w-full text-white px-6 md:px-16 py-32 font-sans grid grid-cols-1 md:grid-cols-12 gap-12 transition-colors duration-300"
      >
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
              Peças originais e edições físicas exclusivas desenvolvidas sob experimentação cromática.
            </p>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col gap-6 font-mono text-[10px]">
            <div className="flex flex-col gap-2">
              <span className="text-zinc-500 uppercase tracking-wider">// CATEGORIA ARTÍSTICA</span>
              <div className="flex flex-wrap gap-2">
                {["TODOS", "Pinturas", "Desenhos", "Prints", "Design Gráfico"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 border transition-all duration-200 uppercase ${
                      categoryFilter === cat 
                        ? "bg-[#fe0000] text-white border-[#fe0000] font-bold" 
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-zinc-500 uppercase tracking-wider">// SUPORTE MATERIAL</span>
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
                      year: obra.year,
                      category: obra.category
                    }}
                    obra={obra}
                    onImageClick={(item) => setActiveArtwork(item)}
                    preventImageSave={preventImageSave}
                  />
                ))}
              </AnimatePresence>
              
              {filteredObras.length > visibleCount && (
                <motion.div layout className="w-full flex justify-center pt-8 pb-16">
                  <button
                    onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                    className="font-mono text-[10px] uppercase tracking-widest text-white border border-zinc-800 hover:border-white hover:bg-white hover:text-black px-8 py-4 transition-all duration-300 bg-zinc-950/40 backdrop-blur-sm active:scale-95"
                  >
                    [ Mostrar Mais // +3 ]
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

      <AnimatePresence>
        {activeArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArtwork(null)}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center p-4 md:p-12 select-none cursor-zoom-out"
          />
        )}
        {activeArtwork && (
          <div className="fixed inset-0 z-50 flex flex-col justify-center items-center p-4 md:p-12 pointer-events-none select-none">
            <button 
              onClick={() => setActiveArtwork(null)}
              className="absolute top-6 right-6 font-mono text-xs uppercase text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 transition-colors duration-200 pointer-events-auto cursor-pointer"
            >
              [ fechar X ]
            </button>

            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="relative max-w-5xl max-h-[70vh] border border-zinc-900 bg-black flex items-center justify-center overflow-hidden pointer-events-auto group/modal-img"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute bottom-4 right-4 z-30 h-7 w-20 select-none pointer-events-none mix-blend-screen">
                <img 
                  src={logoBranca} 
                  alt="Modal Watermark White" 
                  className="absolute inset-0 h-full w-full object-contain opacity-35 transition-opacity duration-500 ease-in-out group-hover/modal-img:opacity-0" 
                />
                <img 
                  src={logoVermelha} 
                  alt="Modal Watermark Red" 
                  className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 ease-in-out group-hover/modal-img:opacity-90 animate-pulse" 
                />
              </div>

              <div className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto" onContextMenu={preventImageSave} />

              <img 
                src={urlFor(activeArtwork.fullImage ? activeArtwork.fullImage : activeArtwork.mainImage).width(1200).auto("format").url()} 
                alt={activeArtwork.title} 
                onContextMenu={preventImageSave}
                onDragStart={preventImageSave}
                className="max-w-full max-h-[70vh] object-contain select-none pointer-events-none z-10" 
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mt-6 font-mono text-[10px] uppercase text-zinc-400 tracking-wider text-center max-w-2xl leading-relaxed pointer-events-auto bg-zinc-950/80 p-4 border border-zinc-900 backdrop-blur-md w-full flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="text-left flex flex-col gap-0.5">
                <div>
                  EXIBIÇÃO EXPANDIDA // <span className="text-white font-sans font-bold normal-case text-sm">{activeArtwork.title}</span>
                </div>
                {activeArtwork.description && (
                  <p className="text-zinc-500 font-sans tracking-tight text-[11px] normal-case mt-0.5">{activeArtwork.description}</p>
                )}
              </div>
              
              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-zinc-800 pt-3 md:pt-0 md:pl-4 w-full md:w-auto justify-between md:justify-end">
                <div className="flex flex-col items-end text-right font-mono text-[9px]">
                  <span className="text-zinc-500">ESTADO COMERCIAL:</span>
                  <span className={activeArtwork.status === "Disponível" ? "text-emerald-400 font-bold" : "text-zinc-600 font-bold"}>
                    {activeArtwork.status === "Disponível" ? `DISPONÍVEL // ${activeArtwork.price || "SOB CONSULTA"}` : "COLEÇÃO PRIVADA"}
                  </span>
                </div>

                {activeArtwork.status === "Disponível" && (
                  <a
                    href={activeArtwork.link || "#contato"}
                    className="px-3 py-1.5 bg-[#fe0000] text-white hover:bg-white hover:text-black transition-colors duration-200 font-bold tracking-normal font-sans text-xs"
                  >
                    Negociar Obra
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { client, urlFor } from "../services/sanityClient";
import headerBg from "../assets/bg/FUNDOS-02.png";

import logoBranca from "../assets/logo/logo branca.png";
import logoVermelha from "../assets/logo/logo vermelha.png";

export default function PortfolioSection() {
  const sectionRef = useRef(null);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorApi, setErrorApi] = useState(false);
  
  // Estado de Filtros Combinados
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [selectedStatus, setSelectedStatus] = useState("TODOS"); // "TODOS", "Disponível", "Coleção Privada"
  
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const ITEMS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const categories = ["TODOS", "Pinturas", "Desenhos", "Prints", "Design Gráfico"];
  const statusOptions = ["TODOS", "Disponível", "Coleção Privada"];

  const preventImageSave = (e) => {
    e.preventDefault();
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothScrollProgress, [0, 1], ["15%", "65%"]);

  useEffect(() => {
    async function fetchArtworks() {
      try {
        setIsLoading(true);
        setErrorApi(false);
        
        // Atualizado order(isFeatured desc, year desc) para respeitar a sua marcação de prioridade do Sanity
        const query = `*[_type == "artwork"] | order(isFeatured desc, year desc) {
          _id,
          title,
          year,
          description,
          category,
          tags,
          isFeatured,
          mainImage,
          fullImage,
          gallery,
          medium,
          size,
          isForSale,
          status,
          price,
          link
        }`;
        
        const data = await client.fetch(query);
        setItems(data);
      } catch (err) {
        console.error("SANITY_CMS_FETCH_ERROR:", err);
        setErrorApi(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArtworks();
  }, []);

  // Reseta a paginação caso mude de categoria ou status
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory, selectedStatus]);

  useEffect(() => {
    setCurrentPhotoIndex(0);
  }, [selectedArtwork]);

  // --- ENGENHARIA DE FILTRAGEM COMBINADA ---
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "TODOS" || item.category === selectedCategory;
    
    // Se o filtro for Disponível, o item precisa ter isForSale == true E status == "Disponível"
    // Se o filtro for Coleção Privada, pode ser isForSale == true com status == "Coleção Privada" OU não estar catalogado pra venda (isForSale == false)
    let matchesStatus = true;
    if (selectedStatus === "Disponível") {
      matchesStatus = item.isForSale && item.status === "Disponível";
    } else if (selectedStatus === "Coleção Privada") {
      matchesStatus = !item.isForSale || item.status === "Coleção Privada";
    }

    return matchesCategory && matchesStatus;
  });

  const paginatedItems = filteredItems.slice(0, visibleCount);

  const getArtworkImages = (artwork) => {
    if (!artwork) return [];
    const images = [];
    if (artwork.fullImage || artwork.mainImage) {
      images.push(artwork.fullImage ? artwork.fullImage : artwork.mainImage);
    }
    if (artwork.gallery && artwork.gallery.length > 0) {
      artwork.gallery.forEach((img) => images.push(img));
    }
    return images;
  };

  const activeImages = getArtworkImages(selectedArtwork);

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="relative w-full min-h-screen text-white px-6 md:px-16 py-32 border-t border-zinc-900 select-none overflow-hidden bg-zinc-950"
    >
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-grain opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: `url(${headerBg})`,
          backgroundPositionX: "center",
          backgroundPositionY: backgroundY
        }}
      />

      <div className="relative z-10 w-full">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/20 pb-8 mb-12 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-zinc-500 block mb-2">[ ACERVO ]</span>
            <h2 className="text-5xl md:text-7xl font-brutal tracking-tighter leading-none uppercase">
              GALERIA.
            </h2>
          </div>
          <div className="text-right font-mono text-xs text-zinc-400">
            STATUS: {isLoading ? "CONECTANDO_SANITY_CDN..." : "ONLINE"} // EXIBINDO: {paginatedItems.length} DE {filteredItems.length}
          </div>
        </div>

        {isLoading && (
          <div className="w-full py-32 flex flex-col items-center justify-center border border-zinc-900 bg-zinc-950/40 animate-pulse backdrop-blur-sm">
            <span className="font-mono text-xs text-zinc-500 tracking-widest mb-4">[ FETCHING_SANITY_DATASETS... ]</span>
            <div className="w-12 h-[2px] bg-[#fe0000]" />
          </div>
        )}

        {!isLoading && errorApi && (
          <div className="w-full py-24 border border-dashed border-[#fe0000] flex flex-col items-center justify-center text-center bg-red-950/10 backdrop-blur-sm">
            <span className="font-mono text-xs text-[#fe0000] tracking-widest mb-2">[ SANITY_CMS_CONNECTION_FAILED ]</span>
            <p className="font-brutal text-2xl uppercase text-zinc-400 max-w-md">Não foi possível sincronizar com a base de dados do Sanity Studio.</p>
          </div>
        )}

        {!isLoading && !errorApi && (
          <>
            {/* GRUPO DE FILTROS DUPLOS (CATEGORIA & DISPONIBILIDADE) */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16 max-w-7xl items-start justify-between">
              
              {/* Filtro 1: Categorias Principais */}
              <div className="flex flex-col gap-4 max-w-4xl">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">// CATEGORIAS</span>
                <div className="flex flex-wrap gap-3 items-center">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 text-xs md:text-sm font-mono tracking-wider uppercase border transition-all duration-300 cursor-pointer
                          ${isSelected
                            ? "bg-[#fe0000] text-white border-[#fe0000] font-bold"
                            : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:border-white hover:text-white"
                          }`}
                      >
                        {cat === "TODOS" ? "EXIBIR TODOS" : cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filtro 2: Disponibilidade / Filtro Comercial Comercial */}
              <div className="flex flex-col gap-4 md:w-auto w-full">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">// DISPONIBILIDADE</span>
                <div className="flex flex-wrap md:justify-end gap-2.5 items-center">
                  {statusOptions.map((st) => {
                    const isSelected = selectedStatus === st;
                    return (
                      <button
                        key={st}
                        onClick={() => setSelectedStatus(st)}
                        className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase border transition-all duration-200 cursor-pointer
                          ${isSelected
                            ? "bg-white text-black border-white font-bold"
                            : "bg-zinc-950/40 text-zinc-500 border-zinc-900 hover:border-zinc-700 hover:text-zinc-300"
                          }`}
                      >
                        {st === "TODOS" ? "TODAS" : st === "Disponível" ? "À Venda" : "Acervo Retido"}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {paginatedItems.length > 0 ? (
              <div className="flex flex-col gap-16">
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  <AnimatePresence mode="popLayout">
                    {paginatedItems.map((item) => (
                      <motion.div
                        key={item._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 10 }}
                        transition={{ type: "spring", stiffness: 380, damping: 38 }}
                        className="group relative flex flex-col bg-zinc-950/80 border border-zinc-900 p-4 hover:border-white/40 transition-colors duration-300 backdrop-blur-xs"
                      >
                        <div 
                          onClick={() => setSelectedArtwork(item)}
                          className="w-full aspect-[3/4] overflow-hidden bg-zinc-900 relative border border-zinc-900 cursor-zoom-in group/img"
                        >
                          {/* BADGE DE VENDA OU BADGE DE PRIORIDADE */}
                          <div className="absolute top-3 left-3 z-30 flex flex-col gap-1">
                            {item.isFeatured && (
                              <div className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#fe0000] border border-[#fe0000] text-white font-bold w-fit shadow-md animate-pulse">
                                ★ DESTAQUE
                              </div>
                            )}
                            {item.isForSale && (
                              <div className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 bg-black border border-zinc-800 text-white flex items-center gap-1.5 shadow-md w-fit">
                                <span className={`w-1.5 h-1.5 rounded-full ${item.status === "Disponível" ? "bg-emerald-500 animate-pulse" : "bg-zinc-600"}`} />
                                {item.status === "Disponível" ? "À Venda" : "Coleção Privada"}
                              </div>
                            )}
                          </div>

                          <div className="absolute bottom-3 right-3 z-30 h-5 w-12 select-none pointer-events-none mix-blend-screen">
                            <img 
                              src={logoBranca} 
                              alt="Watermark White" 
                              className="absolute inset-0 h-full w-full object-contain opacity-35 transition-opacity duration-500 ease-in-out group-hover/img:opacity-0" 
                            />
                            <img 
                              src={logoVermelha} 
                              alt="Watermark Red" 
                              className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 ease-in-out group-hover/img:opacity-85" 
                            />
                          </div>

                          <div className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto" onContextMenu={preventImageSave} />

                          {item.mainImage && (
                            <motion.img
                              layoutId={`art-img-${item._id}`}
                              src={urlFor(item.mainImage).width(600).auto("format").url()} 
                              alt={item.title}
                              onContextMenu={preventImageSave}
                              onDragStart={preventImageSave}
                              className="w-full h-full object-cover transition-transform duration-500 transform group-hover/img:scale-[1.02] select-none pointer-events-none z-10"
                            />
                          )}
                        </div>

                        <div className="mt-4 flex flex-col justify-between flex-grow gap-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-start gap-4">
                              <h3 className="font-brutal text-xl md:text-2xl tracking-tight leading-none uppercase text-zinc-200 group-hover:text-[#fe0000] transition-colors duration-200 truncate max-w-[80%]">
                                {item.title}
                              </h3>
                              <span className="font-mono text-sm text-zinc-600">{item.year}</span>
                            </div>

                            <div className="flex justify-between items-center pt-1 font-mono text-[9px] text-zinc-500 uppercase">
                              <span>{item.category || "Geral"}</span>
                              
                              {item.isForSale && (
                                <span className={`font-mono text-[10px] font-bold ${item.status === "Disponível" ? "text-emerald-400" : "text-zinc-600 line-through"}`}>
                                  {item.status === "Disponível" ? (item.price || "[ SOB CONSULTA ]") : "[ RETIDO ]"}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedArtwork(item)}
                            className="w-full py-2 border border-zinc-800 font-mono text-xs text-zinc-400 uppercase tracking-wider text-center cursor-pointer transition-colors hover:border-white hover:text-white group-hover:bg-zinc-900/80"
                          >
                            VER MAIS DETALHES
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredItems.length > visibleCount && (
                  <div className="w-full flex justify-center pt-4">
                    <button
                      onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                      className="px-6 py-4 bg-zinc-950 text-white font-mono text-xs tracking-widest border border-zinc-800 hover:border-white hover:bg-white hover:text-black transition-all duration-300 uppercase cursor-pointer"
                    >
                      MAIS OBRAS
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full py-24 border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center bg-zinc-950/50 backdrop-blur-sm">
                <span className="font-mono text-xs text-[#fe0000] tracking-widest mb-2">[ ZERO_MATCH_ERROR ]</span>
                <p className="font-brutal text-2xl md:text-3xl uppercase text-zinc-400 max-w-md">Nenhuma obra combina com os cruzamentos selecionados.</p>
                <button 
                  onClick={() => { setSelectedCategory("TODOS"); setSelectedStatus("TODOS"); }} 
                  className="mt-6 px-4 py-2 font-mono text-xs uppercase bg-white text-black border border-white font-bold hover:bg-transparent hover:text-white transition-colors cursor-pointer"
                >
                  Resetar Filtros
                </button>
              </motion.div>
            )}
          </>
        )}

      </div>

      <AnimatePresence>
        {selectedArtwork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtwork(null)}
              className="absolute inset-0 bg-black backdrop-blur-md cursor-zoom-out"
            />
            <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col md:flex-row bg-zinc-950 border border-zinc-800 p-6 gap-6 z-10 overflow-y-auto md:overflow-visible">
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute -top-12 right-0 md:top-6 md:right-6 font-mono text-xs tracking-widest bg-[#fe0000] text-white px-3 py-1.5 font-bold uppercase cursor-pointer border border-[#fe0000] hover:bg-transparent hover:text-[#fe0000] transition-colors z-40"
              >
                [ FECHAR X ]
              </button>
              
              <div className="w-full md:w-3/5 flex flex-col bg-zinc-900 border border-zinc-900 relative group/modal-img h-[50vh] md:h-[65vh] select-none">
                
                <div className="absolute bottom-4 right-4 z-30 h-7 w-20 select-none pointer-events-none mix-blend-screen">
                  <img 
                    src={logoBranca} 
                    alt="Modal Watermark White" 
                    className="absolute inset-0 h-full w-full object-contain opacity-35 transition-opacity duration-500 ease-in-out group-hover/modal-img:opacity-0" 
                  />
                  <img 
                    src={logoVermelha} 
                    alt="Modal Watermark Red" 
                    className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 ease-in-out group-hover/modal-img:opacity-90" 
                  />
                </div>

                <div className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto" onContextMenu={preventImageSave} />

                <div className="w-full flex-grow flex items-center justify-center relative overflow-hidden bg-black/40">
                  <AnimatePresence mode="wait">
                    {activeImages.length > 0 && (
                      <motion.img
                        key={currentPhotoIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        src={urlFor(activeImages[currentPhotoIndex]).width(1200).auto("format").url()}
                        alt={`${selectedArtwork.title} - Foto ${currentPhotoIndex + 1}`}
                        onContextMenu={preventImageSave}
                        onDragStart={preventImageSave}
                        className="max-w-full max-h-full object-contain select-none pointer-events-none z-10 p-2"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {activeImages.length > 1 && (
                  <div className="w-full flex justify-between items-center border-t border-zinc-800 bg-zinc-950 p-3 z-30 relative pointer-events-auto">
                    <button
                      onClick={handlePrevPhoto}
                      className="font-mono text-[10px] tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer uppercase py-1 px-2 border border-zinc-900 hover:border-zinc-700 bg-zinc-900/30"
                    >
                      [ &lt; ANTERIOR ]
                    </button>

                    <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                      FOTO: {currentPhotoIndex + 1} // {activeImages.length}
                    </span>

                    <button
                      onClick={handleNextPhoto}
                      className="font-mono text-[10px] tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer uppercase py-1 px-2 border border-zinc-900 hover:border-zinc-700 bg-zinc-900/30"
                    >
                      [ SEGUINTE &gt; ]
                    </button>
                  </div>
                )}
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: 0.15 }}
                className="w-full md:w-2/5 flex flex-col justify-between pt-2 gap-6"
              >
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                    // ID_{selectedArtwork._id.substring(0, 6)}
                  </span>
                  <h3 className="font-brutal text-3xl md:text-4xl tracking-tighter leading-none uppercase text-[#fe0000]">
                    {selectedArtwork.title}
                  </h3>
                  <div className="flex flex-col gap-1 font-mono text-xs text-zinc-400 border-y border-zinc-900 py-3 my-2">
                    <div><span className="text-zinc-600">ANO:</span> {selectedArtwork.year}</div>
                    <div><span className="text-zinc-600">CATEGORIA:</span> {selectedArtwork.category || "GERAL"}</div>
                    {selectedArtwork.size && <div><span className="text-zinc-600">DIMENSÕES:</span> {selectedArtwork.size}</div>}
                    {selectedArtwork.medium && <div><span className="text-zinc-600">TÉCNICA:</span> {selectedArtwork.medium}</div>}
                  </div>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed uppercase tracking-wide">
                    {selectedArtwork.description || "Trabalho conceitual unindo experimentação de suporte físico, deformação cromática digital e alinhamento tipográfico assimétrico estruturado."}
                  </p>
                </div>

                {/* Box de Informações Comerciais */}
                {selectedArtwork.isForSale ? (
                  <div className="w-full bg-zinc-900/60 border border-zinc-900 p-4 font-mono text-[10px] uppercase flex flex-col gap-3 mt-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500">ESTADO DA VENDA:</span>
                      <span className={`font-bold ${selectedArtwork.status === "Disponível" ? "text-emerald-400" : "text-zinc-600"}`}>
                        {selectedArtwork.status === "Disponível" ? "DISPONÍVEL" : "COLEÇÃO PRIVADA"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-zinc-800/60 pt-2">
                      <span className="text-zinc-500">VALOR DA OBRA:</span>
                      <span className="text-white font-sans font-bold text-sm">
                        {selectedArtwork.status === "Disponível" ? (selectedArtwork.price || "SOB CONSULTA") : "VENDIDO"}
                      </span>
                    </div>

                    {selectedArtwork.status === "Disponível" && (
                      <a
                        href={selectedArtwork.link || "#contato"}
                        className="w-full mt-1 py-2 bg-white text-black hover:bg-[#fe0000] hover:text-white text-center font-sans text-xs font-bold tracking-normal transition-colors duration-200 block uppercase"
                      >
                        Tenho Interesse na Peça ➔
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="w-full border border-dashed border-zinc-900 p-3 text-center font-mono text-[9px] text-zinc-600 uppercase mt-auto">
                    [ Obra não catalogada para fins comerciais ]
                  </div>
                )}

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
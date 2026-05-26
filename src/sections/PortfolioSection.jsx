import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { client, urlFor } from "../services/sanityClient";
import headerBg from "../assets/bg/FUNDOS-02.png";

export default function PortfolioSection() {
  const sectionRef = useRef(null);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorApi, setErrorApi] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const ITEMS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const tags = ["ARTES PLÁSTICAS", "ILUSTRAÇÃO", "DESIGN GRÁFICO", "AUDIOVISUAL"];

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
        
        const query = `*[_type == "artwork"] | order(year desc) {
          _id,
          title,
          year,
          description,
          tags,
          mainImage
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

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedTags]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => setSelectedTags([]);

  const filteredItems = selectedTags.length === 0
    ? items
    : items.filter((item) => {
        if (!item.tags || item.tags.length === 0) return false;
        
        const selectedClean = selectedTags.map(t => t.trim().toUpperCase());
        const itemTagsClean = item.tags.map(t => t.trim().toUpperCase());

        return itemTagsClean.some((tag) => selectedClean.includes(tag));
      });

  const paginatedItems = filteredItems.slice(0, visibleCount);

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
            <div className="flex flex-col gap-4 mb-16 max-w-5xl">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">// Filtragem</span>
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={clearFilters}
                  className={`px-4 py-2 text-xs md:text-sm font-mono tracking-wider uppercase border transition-all duration-200 cursor-pointer
                    ${selectedTags.length === 0
                      ? "bg-white text-black border-white font-bold"
                      : "bg-zinc-950/80 text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-white"
                    }`}
                >
                  [ EXIBIR TODOS ]
                </button>
                <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block" />
                {tags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 text-xs md:text-sm font-mono tracking-wider uppercase border transition-all duration-300 cursor-pointer
                        ${isSelected
                          ? "bg-[#fe0000] text-white border-[#fe0000] font-bold"
                          : "bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:border-white hover:text-white"
                        }`}
                    >
                      <span className="mr-2 text-[10px]">{isSelected ? "[X]" : "[ ]"}</span>
                      {tag}
                    </button>
                  );
                })}
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
                          className="w-full aspect-square overflow-hidden bg-zinc-900 relative border border-zinc-900 cursor-zoom-in"
                        >
                          {item.mainImage && (
                            <motion.img
                              layoutId={`art-img-${item._id}`}
                              src={urlFor(item.mainImage).width(800).auto("format").url()} 
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-[1.02]"
                            />
                          )}
                        </div>

                        <div className="mt-4 flex flex-col justify-between flex-grow gap-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-start gap-4">
                              <h3 className="font-brutal text-xl md:text-2xl tracking-tight leading-none uppercase text-zinc-200 group-hover:text-[#fe0000] transition-colors duration-200">
                                {item.title}
                              </h3>
                              <span className="font-mono text-sm text-zinc-600">{item.year}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900">
                              {item.tags?.map((t) => (
                                <span key={t} className={`text-[10px] font-mono tracking-widest uppercase ${selectedTags.includes(t.trim().toUpperCase()) ? "text-[#fe0000] font-bold" : "text-zinc-500"}`}>
                                  #{t.trim().replace(" ", "_").toUpperCase()}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedArtwork(item)}
                            className="w-full py-2 border border-zinc-800 font-mono text-xs text-zinc-400 uppercase tracking-wider text-center cursor-pointer transition-colors hover:border-white hover:text-white group-hover:bg-zinc-900/80"
                          >
                            [ DETALHES // + ]
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
                      className="px-8 py-4 bg-zinc-950 text-white font-mono text-sm tracking-widest border border-zinc-800 hover:border-white hover:bg-white hover:text-black transition-all duration-300 uppercase cursor-pointer"
                    >
                      [ CARREGAR MAIS OBRAS // + ]
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full py-24 border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center bg-zinc-950/50 backdrop-blur-sm">
                <span className="font-mono text-xs text-[#fe0000] tracking-widest mb-2">[ ZERO_MATCH_ERROR ]</span>
                <p className="font-brutal text-2xl md:text-3xl uppercase text-zinc-400 max-w-md">Nenhuma obra combina com os cruzamentos selecionados.</p>
                <button onClick={clearFilters} className="mt-6 px-4 py-2 font-mono text-xs uppercase bg-white text-black border border-white font-bold hover:bg-transparent hover:text-white transition-colors cursor-pointer">Resetar Filtros</button>
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
            <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col md:flex-row bg-zinc-950 border border-zinc-800 p-6 gap-6 z-10">
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute -top-12 right-0 md:top-6 md:right-6 font-mono text-xs tracking-widest bg-[#fe0000] text-white px-3 py-1.5 font-bold uppercase cursor-pointer border border-[#fe0000] hover:bg-transparent hover:text-[#fe0000] transition-colors"
              >
                [ FECHAR X ]
              </button>
              <div className="w-full md:w-3/5 flex items-center justify-center bg-zinc-900 border border-zinc-900 overflow-hidden aspect-square md:aspect-auto md:h-[65vh]">
                {selectedArtwork.mainImage && (
                  <motion.img
                    layoutId={`art-img-${selectedArtwork._id}`}
                    src={urlFor(selectedArtwork.mainImage).width(1200).auto("format").url()}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: 0.15 }}
                className="w-full md:w-2/5 flex flex-col justify-between pt-2"
              >
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                    // ID_{selectedArtwork._id.substring(0, 6)}
                  </span>
                  <h3 className="font-brutal text-3xl md:text-4xl tracking-tighter leading-none uppercase text-[#fe0000]">
                    {selectedArtwork.title}
                  </h3>
                  <div className="flex gap-4 font-mono text-xs text-zinc-400 border-y border-zinc-900 py-3 my-2">
                    <div><span className="text-zinc-600">ANO:</span> {selectedArtwork.year}</div>
                    <div><span className="text-zinc-600">STATUS:</span> CATALOGADO</div>
                  </div>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed uppercase tracking-wide">
                    {selectedArtwork.description || "Trabalho conceitual unindo experimentação de suporte físico, deformação cromática digital e alinhamento tipográfico assimétrico estruturado."}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-wrap gap-2">
                  {selectedArtwork.tags?.map((t) => (
                    <span key={t} className="px-2 py-1 bg-zinc-900 text-zinc-400 font-mono text-[10px] uppercase border border-zinc-800">
                      {t.trim().toUpperCase()}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
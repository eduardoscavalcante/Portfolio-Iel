import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const footerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="w-full bg-zinc-950 px-6 md:px-16 pb-12 pt-16 flex flex-col gap-12 selection:bg-[#ff0000] selection:text-white"
    >
      <div className="w-full border-t border-zinc-800/40 pt-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-zinc-400 font-mono text-[11px] tracking-wider uppercase">
        
        <div className="flex flex-col gap-3">
          <span className="text-zinc-600 font-bold tracking-[0.2em]">Navegação</span>
          <Link to="/#acervo" className="hover:text-white transition-colors duration-300 w-fit">Acervo à Venda</Link>
          <Link to="/portfolio" className="hover:text-white transition-colors duration-300 w-fit">Portfólio de Artes</Link>
          <Link to="/#sobre" className="hover:text-white transition-colors duration-300 w-fit">Sobre Mim</Link>
          <Link to="/#contato" className="hover:text-white transition-colors duration-300 w-fit">Contato</Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-zinc-600 font-bold tracking-[0.2em]">Redes / Conexões</span>
          <a href="https://instagram.com/arte.iel" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0000] transition-colors duration-300 w-fit">Instagram Principal ↗</a>
          <a href="https://instagram.com/em.eterea" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0000] transition-colors duration-300 w-fit">Instagram Secundário ↗</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0000] transition-colors duration-300 w-fit">Behance ↗</a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff0000] transition-colors duration-300 w-fit">LinkedIn ↗</a>
        </div>

        <div className="flex flex-col justify-between items-start md:items-end gap-6">
          <div className="text-left md:text-right">
            <span className="text-zinc-600 block mb-1 font-bold tracking-[0.2em]">Disponibilidade / Local</span>
            <span className="text-white flex items-center gap-2 md:justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Disponível para freelas — Maceió - AL
            </span>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 text-[10px] tracking-[0.3em]"
          >
            VOLTAR AO TOPO <span className="transform group-hover:-translate-y-1 transition-transform duration-300">↑</span>
          </button>
        </div>

      </div>

      <div className="w-full flex flex-col sm:flex-row justify-between items-center border-t border-zinc-900 pt-6 text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase">
        <span>Desenvolvido por Eduardo Serpa</span>
        <span className="mt-2 sm:mt-0">© 2026 Todos os direitos reservados</span>
      </div>
    </motion.footer>
  );
}
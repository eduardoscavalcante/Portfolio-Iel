// 1. Importe a logo aqui também
import logoIel from "../assets/logo completa branca.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-iel-dark/90 backdrop-blur-sm z-50 border-b border-zinc-900 bg-premium-grain">
      <div className="max-w-[1920px] mx-auto px-6 md:px-16 h-24 flex items-center justify-between">
        
        {/* --- ALTERAÇÃO AQUI: Logo na Navbar --- */}
        <a href="#home" className="block group">
          <img 
            src={logoIel} 
            alt="Logo Iel" 
            className="h-10 w-auto block" // Altura menor para a Navbar
          />
        </a>

        {/* Links de Navegação Sophisticated */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-400 font-mono">
          <a href="#home" className="text-iel-white hover:text-iel-red transition-colors relative">
            Início
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-iel-red group-hover:w-full transition-all"></span>
          </a>
          <a href="#galeria" className="hover:text-iel-white transition-colors">Galeria</a>
          <a href="#sobre" className="hover:text-iel-white transition-colors">Sobre</a>
          <a href="#contato" className="hover:text-iel-white transition-colors">Contato</a>
          <span className="text-zinc-800">|</span>
          <span className="text-iel-red">2026_INDEX</span>
        </div>
      </div>
    </nav>
  );
}
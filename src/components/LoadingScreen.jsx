import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoIelBranca from "../assets/logo completa branca.png";
import logoIelVermelha from "../assets/logo completa vermelha.png"; // Importado aqui

const PALAVRAS = [
  "ARTES PLÁSTICAS",
  "DESIGN GRÁFICO",
  "RUPTURA VISUAL",
  "EXPRESSIONISMO",
  "CONCEITO ANÁLOGO",
  "SISTEMA ATIVO"
];

// Configuração da animação das faixas do desmanche
const faixaVariante = {
  initial: { y: 0 },
  exit: (i) => ({
    y: "-100%",
    transition: { 
      duration: 0.8, 
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05 // Cria o efeito de desmanche em cascata
    }
  })
};

export default function LoadingScreen({ onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === PALAVRAS.length - 1) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 350);

    return () => clearInterval(interval);
  }, [index, onComplete]);

  // Calcula o progresso do carregamento (de 0 a 1)
  const progresso = index / (PALAVRAS.length - 1);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex">
      
      {/* O FUNDO: 5 faixas verticais que se desmancham saindo para cima */}
      <div className="absolute inset-0 flex z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={faixaVariante}
            initial="initial"
            exit="exit"
            className="w-1/5 h-full bg-iel-dark bg-premium-grain border-r border-zinc-900/10 last:border-0"
          />
        ))}
      </div>

      {/* O CONTEÚDO: Some suavizando (fade-out) antes do fundo se desmanchar */}
      <motion.div
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6"
      >
        <div className="flex flex-col items-center gap-8 max-w-xs text-center">
          
          {/* O BLOCO DA LOGO: Mantém toda a animação original de entrada (y, scale, opacity) */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-[15vh] w-48 select-none block" // w-48 ou a largura aproximada da sua logo para não quebrar o layout
          >
            {/* Logo Branca: Vai sumindo conforme o progresso chega a 1 */}
            <motion.img
              animate={{ opacity: 1 - progresso }}
              transition={{ duration: 0.3 }}
              src={logoIelBranca}
              alt="Logo Iel Branca"
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* Logo Vermelha: Vai aparecendo por cima conforme o progresso chega a 1 */}
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: progresso }}
              transition={{ duration: 0.3 }}
              src={logoIelVermelha}
              alt="Logo Iel Vermelha"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </motion.div>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-px bg-zinc-800"
          />

          <div className="h-6 overflow-hidden relative w-full flex justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="font-mono text-[10px] tracking-[0.4em] text-iel-red font-bold uppercase absolute"
              >
                {PALAVRAS[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-12 font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
          [ CARREGANDO DIRETRIZES VISUAIS ]
        </div>
      </motion.div>
    </div>
  );
}
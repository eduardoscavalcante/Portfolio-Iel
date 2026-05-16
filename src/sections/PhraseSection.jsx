import { motion } from "framer-motion";
// Import oficial e definitivo do seu asset — intocável!
import tvImage from "../assets/art/IMG_0744.jpg"; 

// Função que quebra o texto e aplica o impacto seco com o tremor inicial
const brutalImpactEffect = (text) => {
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.7, 
      x: 0,
      rotate: -12,
      color: "#ffffff" // Começa branca no impacto inicial
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: [0, -8, 6, -4, 2, 0], 
      rotate: [0, -12, 8, -5, 2, 0], 
      color: "#9b0100", // Alvo: Vermelho escuro sólido pedido
      transition: { 
        duration: 0.7, // Tremor inicial nítido e pesado
        ease: "easeOut",
        // A transição de cor leva 3.5 segundos para um efeito bem lento e denso
        color: { duration: 3.5, delay: 0.6, ease: "easeInOut" }
      } 
    }
  };

  return text.split('').map((char, index) => (
    <motion.span
      key={`${char}-${index}`}
      variants={letterVariants}
      className="inline-block origin-center select-none"
      style={{ willChange: "transform, opacity, color" }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  ));
};

export default function PhraseSection() {
  // Container principal que gerencia o background dinâmico interligando as seções
  const sectionVariants = {
    hidden: { 
      backgroundColor: "#bf1c21", // Sempre inicia tingido no vermelho escuro para evitar o vazio preto
    },
    visible: {
      backgroundColor: "#fe0000", // Transiciona lentamente até o vermelho puro na rolagem
      transition: {
        duration: 3.0, // Transição de fundo de 3 segundos
        delay: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Variantes exclusivas para o texto gerenciar o Blend Mode
  const textContainerVariants = {
    hidden: { 
      opacity: 0,
      mixBlendMode: "difference" // Inversão agressiva no impacto inicial
    },
    visible: {
      opacity: 1,
      mixBlendMode: "normal", // Transiciona para mate sólido
      transition: {
        triggerChildren: 0, // Todas as linhas surgem juntas
        mixBlendMode: { duration: 3.5, delay: 0.6, ease: "easeInOut" } // Acompanha os 3.5s das letras
      }
    }
  };

  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08, // Cadência perfeita e ritmada letra por letra
        delayChildren: 0.2
      }
    }
  };

  // Entrada em estilo "Soco na Tela" - Desacelerada para dar imponência ao gigantismo
  const starHoleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 3, 
      rotate: -20 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      transition: { 
        duration: 1.2, // Frenagem pesada e cinematográfica
        ease: [0.11, 0, 0, 1] // Curva de impacto seco (Impact Punch)
      }
    }
  };

  // Imagem surge de forma contínua sintonizando o sinal da TV
  const imageFadeInVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.1 
    },
    visible: { 
      opacity: 0.65, 
      scale: 1,
      transition: { 
        duration: 3.5, // Imagem sintoniza de forma bem gradual
        delay: 0.6,    
        ease: "easeInOut" 
      }
    }
  };

  // Animação de estática agressiva de alta frequência para ferver a granulação
  const tvStaticAnimation = {
    x: [0, -20, 40, -10, 25, -30, 15, -40, 0],
    y: [0, 30, -15, 25, -35, 10, -20, 30, 0],
    transition: {
      duration: 0.05, 
      repeat: Infinity,
      ease: "linear"
    }
  };

  return (
    <motion.section 
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-25%" }}
      className="relative w-full min-h-screen bg-[#bf1c21] flex flex-col justify-center items-center overflow-hidden py-24 px-4 md:px-12 select-none"
    >
      {/* Textura global de papel de fundo do manifesto */}
      <div className="absolute inset-0 bg-grain opacity-15 mix-blend-overlay pointer-events-none" />

      {/* CRATERA EM FORMATO DE ESTRELA ESTILHAÇADA */}
      <motion.div 
        variants={starHoleVariants}
        className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none p-4"
      >
        <div 
          /* 
            MUDANÇA AQUI:
            - Removido os tamanhos arbitrários de viewport espichados (h-[85vh], etc).
            - Adicionado `w-full max-w-[90vw] md:max-w-[55vw]` para controlar a largura responsiva.
            - Adicionado `aspect-square` para garantir que a proporção X e Y seja idêntica, impedindo o achatamento.
            - No desktop (`md:`), se preferir ela levemente mais alta, mude de `aspect-square` para `md:aspect-[4/5]`, mas o quadrado mata o erro em qualquer tela.
          */
          className="w-full max-w-[95vw] sm:max-w-[75vw] md:max-w-[55vw] aspect-square bg-[#0c0c0c] relative overflow-hidden pointer-events-auto"
          style={{
            clipPath: "polygon(50% 0%, 57% 18%, 78% 8%, 70% 28%, 95% 25%, 80% 43%, 100% 55%, 78% 62%, 88% 85%, 65% 78%, 60% 100%, 48% 82%, 30% 95%, 35% 72%, 5% 82%, 18% 58%, 0% 45%, 22% 38%, 10% 15%, 32% 25%, 38% 3%, 46% 20%)"
          }}
        >
          {/* IMAGEM REVELANDO NO FUNDO DA TV */}
          <motion.img 
            variants={imageFadeInVariants}
            src={tvImage}
            alt="Revelação Visual"
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
          />

          {/* EFEITO DE GRANULAÇÃO COBRINDO A IMAGEM */}
          <motion.div 
            animate={tvStaticAnimation}
            className="absolute -inset-40 opacity-[0.38] pointer-events-none bg-repeat z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='tvNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.99' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.8 -0.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23tvNoise)'/%3E%3C/svg%3E")`,
              backgroundSize: "120px 120px"
            }}
          />
          
          {/* Linha horizontal fantasma simulando varredura CRT de monitor quebrado */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full animate-[pulse_1s_infinite] pointer-events-none mix-blend-overlay z-10" />
        </div>
      </motion.div>

      {/* CONTAINER DO MANIFESTO */}
      <motion.div 
        variants={textContainerVariants}
        className="w-full max-w-[1300px] mx-auto flex flex-col justify-center items-center text-center relative z-20 font-brutal"
      >
        {/* LINHA 1 */}
        <motion.h2 variants={lineVariants} className="text-[15vw] md:text-[11vw] leading-[0.8] tracking-tight uppercase w-full max-w-5xl">
          {brutalImpactEffect("Arte")}
        </motion.h2>

        {/* LINHA 2 */}
        <motion.h2 variants={lineVariants} className="text-[9vw] md:text-[6.5vw] leading-[0.85] tracking-tighter uppercase w-full max-w-4xl my-2">
          {brutalImpactEffect("como exposição")}
        </motion.h2>

        {/* LINHA 3 */}
        <motion.h2 variants={lineVariants} className="text-[5.5vw] md:text-[4vw] leading-[0.9] tracking-widest uppercase w-full max-w-xl my-1 opacity-80">
          {brutalImpactEffect("das")}
        </motion.h2>

        {/* LINHA 4 */}
        <motion.h2 variants={lineVariants} className="text-[13vw] md:text-[9.5vw] leading-[0.8] tracking-tight uppercase w-full max-w-5xl my-2">
          {brutalImpactEffect("Vísceras")}
        </motion.h2>

        {/* LINHA 5 */}
        <motion.h2 variants={lineVariants} className="text-[5.5vw] md:text-[4vw] leading-[0.9] tracking-widest uppercase w-full max-w-xl my-1 opacity-80">
          {brutalImpactEffect("e da")}
        </motion.h2>

        {/* LINHA 6 */}
        <motion.h2 variants={lineVariants} className="text-[13vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase w-full max-w-5xl mt-2">
          {brutalImpactEffect("realidade.")}
        </motion.h2>
      </motion.div>

      {/* Detalhes marginais de catálogo técnico - AGORA CORRIGIDO PARA BRANCO */}
      <div className="absolute bottom-8 left-6 md:left-12 font-mono text-[9px] tracking-[0.2em] text-white/60 uppercase hidden sm:block">
        [ MANIFESTO VISUAL ]
      </div>
      
      <div className="absolute bottom-8 right-6 md:right-12 font-mono text-[9px] tracking-[0.2em] text-zinc-100 uppercase hidden sm:block">
        <a href="https://instagram.com/arte_iel" target="_blank" rel="noreferrer">@arte_iel</a>
      </div>
    </motion.section>
  );
}
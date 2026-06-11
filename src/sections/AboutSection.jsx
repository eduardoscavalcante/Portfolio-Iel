import React from 'react';
import { motion } from 'framer-motion';

// Novo Path: Corner agressivo no canto inferior esquerdo (espinho massivo)
const cornerSpikeClipPath = "polygon(0% 20%, 30% 20%, 40% 0%, 50% 30%, 60% 10%, 70% 40%, 85% 20%, 100% 30%, 100% 100%, 0% 100%)";

export default function AboutSection() {
  return (
    <section id="sobre" className="relative min-h-screen w-full flex items-end justify-start p-6 md:p-12 lg:p-20 bg-zinc-50 overflow-hidden">
      
      {/* CORNER DE ESPINHOS COM FOTO (Canto Inferior Esquerdo) */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.11, 0, 0, 1] }}
        className="absolute bottom-0 left-0 w-[45vw] h-[60vh] z-10"
        style={{ clipPath: cornerSpikeClipPath }}
      >
        <img 
          src="src/assets/iel/iel apresentação.png" 
          alt="IEL"
          className="w-full h-full object-cover scale-105"
        />
        {/* Overlay para dar profundidade ao "buraco" */}
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* TEXTO MONUMENTAL (Direita/Centro) */}
      <div className="relative z-20 w-full md:w-1/2 ml-auto flex flex-col gap-10">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
          IEL.
        </h2>
        
        <div className="text-lg md:text-xl font-medium leading-relaxed text-zinc-800 space-y-6 max-w-xl">
          <p>
            Me chamo IEL. Tenho 24 anos e opero como artista plástica, designer, cineasta, 
            tatuadora e multiartista. Meu foco é traduzir ideias e ideais de forma disruptiva 
            e visceral, dissecando as disfunções do sistema social em que estamos inseridos. 
          </p>
          <p>
            Meu trabalho converge experiências próprias e alheias, amparadas por um denso 
            embasamento político e cultural, onde o surrealismo simbólico e a estética punk 
            dão forma a sentimentos cruamente realistas.
          </p>
          <p>
            Minha trajetória reflete essa intensidade. Expus minhas obras na Galeria do 
            Teatro Deodoro e no Museu da Imagem e do Som (MISA). No audiovisual, assinei 
            a produção de três curtas-metragens. Desenvolvi a identidade visual da Mostra Sururu 
            (2022) e colaborei com a EDUFAL na Bienal do Livro... Não sigo fórmulas; crio o 
            impacto que a realidade exige.
          </p>
        </div>

        {/* Botões mantendo o estilo de colagem seca */}
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-zinc-950 text-white font-bold uppercase tracking-widest border border-zinc-950 hover:bg-transparent hover:text-zinc-950 transition-colors">
            Gerar CV
          </button>
          <button className="px-8 py-4 bg-transparent text-zinc-950 font-bold uppercase tracking-widest border-2 border-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors">
            Iniciar Projeto
          </button>
        </div>
      </div>
    </section>
  );
}
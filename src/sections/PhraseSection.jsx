import { motion } from "framer-motion";
import tvImage from "../assets/art/A ISCA.JPG"; 

const brutalImpactEffect = (text) => {
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.7, 
      x: 0,
      rotate: -12,
      color: "#ffffff"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: [0, -8, 6, -4, 2, 0], 
      rotate: [0, -12, 8, -5, 2, 0], 
      color: "#9b0100",
      transition: { 
        duration: 0.7,
        ease: "easeOut",
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
  const sectionVariants = {
    hidden: { 
      backgroundColor: "#bf1c21",
    },
    visible: {
      backgroundColor: "#fe0000",
      transition: {
        duration: 3.0,
        delay: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const textContainerVariants = {
    hidden: { 
      opacity: 0,
      mixBlendMode: "difference"
    },
    visible: {
      opacity: 1,
      mixBlendMode: "normal",
      transition: {
        triggerChildren: 0,
        mixBlendMode: { duration: 3.5, delay: 0.6, ease: "easeInOut" } 
      }
    }
  };

  const lineVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

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
        duration: 1.2,
        ease: [0.11, 0, 0, 1]
      }
    }
  };

  const imageFadeInVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.1 
    },
    visible: { 
      opacity: 0.65, 
      scale: 1,
      transition: { 
        duration: 3.5,
        delay: 0.6,    
        ease: "easeInOut" 
      }
    }
  };

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
      <div className="absolute inset-0 bg-grain opacity-15 mix-blend-overlay pointer-events-none" />

      <motion.div 
        variants={starHoleVariants}
        className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none p-4"
      >
        <div 
          className="w-full max-w-[95vw] sm:max-w-[75vw] md:max-w-[55vw] aspect-square bg-[#0c0c0c] relative overflow-hidden pointer-events-auto"
          style={{
            clipPath: "polygon(50% 0%, 57% 18%, 78% 8%, 70% 28%, 95% 25%, 80% 43%, 100% 55%, 78% 62%, 88% 85%, 65% 78%, 60% 100%, 48% 82%, 30% 95%, 35% 72%, 5% 82%, 18% 58%, 0% 45%, 22% 38%, 10% 15%, 32% 25%, 38% 3%, 46% 20%)"
          }}
        >
          <motion.img 
            variants={imageFadeInVariants}
            src={tvImage}
            alt="Revelação Visual"
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
          />

          <motion.div 
            animate={tvStaticAnimation}
            className="absolute -inset-40 opacity-[0.38] pointer-events-none bg-repeat z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='tvNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.99' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.8 -0.2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23tvNoise)'/%3E%3C/svg%3E")`,
              backgroundSize: "120px 120px"
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full animate-[pulse_1s_infinite] pointer-events-none mix-blend-overlay z-10" />
        </div>
      </motion.div>

      <motion.div 
        variants={textContainerVariants}
        className="w-full max-w-[1300px] mx-auto flex flex-col justify-center items-center text-center relative z-20 font-brutal"
      >
        <motion.h2 variants={lineVariants} className="text-[15vw] md:text-[11vw] leading-[0.8] tracking-tight uppercase w-full whitespace-nowrap">
          {brutalImpactEffect("Arte")}
        </motion.h2>

        <motion.h2 variants={lineVariants} className="text-[9vw] md:text-[6.5vw] leading-[0.85] tracking-tighter uppercase w-full my-2 whitespace-nowrap">
          {brutalImpactEffect("como exposiçao")}
        </motion.h2>

        <motion.h2 variants={lineVariants} className="text-[5.5vw] md:text-[4vw] leading-[0.9] tracking-widest uppercase w-full my-1 opacity-80 whitespace-nowrap">
          {brutalImpactEffect("das")}
        </motion.h2>

        <motion.h2 variants={lineVariants} className="text-[13vw] md:text-[9.5vw] leading-[0.8] tracking-tight uppercase w-full my-2 whitespace-nowrap">
          {brutalImpactEffect("Vísceras")}
        </motion.h2>

        <motion.h2 variants={lineVariants} className="text-[5.5vw] md:text-[4vw] leading-[0.9] tracking-widest uppercase w-full my-1 opacity-80 whitespace-nowrap">
          {brutalImpactEffect("e da")}
        </motion.h2>

        <motion.h2 variants={lineVariants} className="text-[13vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase w-full mt-2 whitespace-nowrap">
          {brutalImpactEffect("realidade.")}
        </motion.h2>
      </motion.div>

      <div className="absolute bottom-8 left-6 md:left-12 font-mono text-[9px] tracking-[0.2em] text-white/60 uppercase hidden sm:block">
        [ MANIFESTO VISUAL ]
      </div>
      
      <div className="absolute bottom-8 right-6 md:right-12 font-mono text-[9px] tracking-[0.2em] text-zinc-100 uppercase hidden sm:block">
        <a href="https://instagram.com/arte_iel" target="_blank" rel="noreferrer">@arte_iel</a>
      </div>
    </motion.section>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Database, Filter, Brain, Monitor, PenLine, Zap, HardDrive, Scissors, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

interface ResearchAnimationProps {
  isOpen: boolean;
  onClose: () => void;
}

// Reusable horizontal arrow with traveling dot
const AnimatedArrow = ({ active, delay = 0, width = 36 }: { active: boolean; delay?: number; width?: number }) => (
  <svg width={width} height="16" viewBox={`0 0 ${width} 16`}>
    <path
      d={`M0 8 L${width - 8} 8 M${width - 14} 3 L${width - 6} 8 L${width - 14} 13`}
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={active ? 1 : 0.3}
    />
    {active && (
      <motion.circle
        r="2.5"
        cy="8"
        fill="hsl(var(--primary))"
        initial={{ cx: 0, opacity: 0 }}
        animate={{ cx: [0, width - 8], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1,
          delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    )}
  </svg>
);

// Reusable vertical arrow with traveling dot
const AnimatedVerticalArrow = ({ active }: { active: boolean }) => (
  <svg width="20" height="24" viewBox="0 0 20 24">
    <path
      d="M10 0 L10 16 M5 12 L10 20 L15 12"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={active ? 1 : 0.3}
    />
    {active && (
      <motion.circle
        r="2.5"
        cx="10"
        fill="hsl(var(--primary))"
        initial={{ cy: 0, opacity: 0 }}
        animate={{ cy: [0, 16], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    )}
  </svg>
);

const ResearchAnimation = ({ isOpen, onClose }: ResearchAnimationProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      return;
    }

    const runAnimation = () => {
      setPhase(1); // Ingestion arrows animate

      const timers: NodeJS.Timeout[] = [];

      timers.push(setTimeout(() => setPhase(2), 2000));  // Data flows to VectorDB + Query starts
      timers.push(setTimeout(() => setPhase(3), 3500));  // Retriever ↔ VectorDB
      timers.push(setTimeout(() => setPhase(4), 5000));  // Prompt+Context to LLM
      timers.push(setTimeout(() => setPhase(5), 6500));  // LLM answer to Web App
      timers.push(setTimeout(() => {
        setPhase(0);
        setTimeout(runAnimation, 500);
      }, 9000));

      return timers;
    };

    const timers = runAnimation();

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [isOpen]);

  const ingestionSteps = [
    { icon: FileText, label: "Tax Docs", sublabel: "PDFs" },
    { icon: HardDrive, label: "S3 Store", sublabel: "Archive" },
    { icon: Zap, label: "Lambda", sublabel: "Trigger" },
    { icon: Scissors, label: "Chunking", sublabel: "Split" },
    { icon: Cpu, label: "Embed", sublabel: "Vectors" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-[min(920px,calc(100vw-3rem))] h-[min(580px,calc(100vh-3rem))] bg-card border border-border rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Main container */}
            <div className="relative w-full h-full flex flex-col px-6 py-5 gap-1.5">

              {/* INGESTION PIPELINE */}
              <div className="border border-sky-500/30 rounded-lg p-3 bg-sky-500/5">
                <span className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  Ingestion Pipeline
                </span>

                <div className="flex items-center justify-between px-2">
                  {ingestionSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-lg bg-muted/40 border border-border/50 flex items-center justify-center">
                          <step.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-[10px] text-foreground font-medium mt-1">{step.label}</span>
                        <span className="text-[8px] text-muted-foreground">{step.sublabel}</span>
                      </div>

                      {i < ingestionSteps.length - 1 && (
                        <AnimatedArrow active={phase >= 1 && phase < 5} delay={i * 0.2} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow from Ingestion to RAG */}
              <div className="flex justify-center">
                <AnimatedVerticalArrow active={phase >= 2 && phase < 5} />
              </div>

              {/* RAG KNOWLEDGE BASE */}
              <div className="border border-primary/30 rounded-lg p-3 bg-primary/5 flex-1 flex flex-col justify-center">
                <span className="text-[10px] text-primary font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-3 justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  RAG Knowledge Base
                </span>

                <div className="flex items-center justify-center gap-6">
                  {/* Vector DB */}
                  <motion.div
                    animate={{
                      boxShadow: phase >= 2 && phase < 5
                        ? ['0 0 0px hsl(var(--primary) / 0)', '0 0 15px hsl(var(--primary) / 0.4)', '0 0 0px hsl(var(--primary) / 0)']
                        : 'none'
                    }}
                    transition={{ duration: 1.5, repeat: phase >= 2 && phase < 5 ? Infinity : 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-muted/40 border-2 border-primary/40 flex items-center justify-center">
                      <Database className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-foreground font-medium mt-1">VectorDB</span>
                    <span className="text-[8px] text-muted-foreground">Tax Knowledge</span>
                  </motion.div>

                  {/* Arrow VectorDB → Retriever */}
                  <AnimatedArrow active={phase >= 3 && phase < 5} width={40} />

                  {/* Retriever */}
                  <motion.div
                    animate={{
                      scale: phase >= 3 && phase < 5 ? [1, 1.05, 1] : 1
                    }}
                    transition={{ duration: 1, repeat: phase >= 3 && phase < 5 ? Infinity : 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-muted/40 border-2 border-primary/40 flex items-center justify-center">
                      <Filter className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-foreground font-medium mt-1">Retriever</span>
                    <span className="text-[8px] text-muted-foreground">Semantic Search</span>
                  </motion.div>
                </div>

                {/* Prompt + Context label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase >= 4 ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[10px] text-primary/70 text-center mt-2"
                >
                  Prompt + Context →
                </motion.div>
              </div>

              {/* Arrow from RAG to Query */}
              <div className="flex justify-center">
                <AnimatedVerticalArrow active={phase >= 3 && phase < 5} />
              </div>

              {/* QUERY PIPELINE */}
              <div className="border border-emerald-500/30 rounded-lg p-3 bg-emerald-500/5">
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Query Pipeline
                </span>

                <div className="flex items-center justify-center gap-4">
                  {/* Query */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-muted/40 border border-border/50 flex items-center justify-center">
                      <PenLine className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] text-foreground font-medium mt-1">Query</span>
                  </div>

                  {/* Arrow Query → Web App */}
                  <AnimatedArrow active={phase >= 2 && phase < 5} />

                  {/* Web App */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-muted/40 border border-border/50 flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] text-foreground font-medium mt-1">Web App</span>
                  </div>

                  {/* Bidirectional arrow Web App ↔ LLM */}
                  <svg width="40" height="16" viewBox="0 0 40 16">
                    <path
                      d="M0 8 L32 8"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      opacity={phase >= 4 ? 1 : 0.3}
                    />
                    <path
                      d="M6 3 L0 8 L6 13"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={phase >= 5 ? 1 : 0.3}
                    />
                    <path
                      d="M26 3 L32 8 L26 13"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={phase >= 4 ? 1 : 0.3}
                    />
                    {/* Dot going right: Web App → LLM (Prompt+Context) */}
                    {phase >= 4 && phase < 5 && (
                      <motion.circle
                        r="2.5"
                        cy="8"
                        fill="hsl(var(--primary))"
                        initial={{ cx: 0, opacity: 0 }}
                        animate={{ cx: [0, 32], opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    {/* Dot going left: LLM → Web App (Answer) */}
                    {phase >= 5 && (
                      <motion.circle
                        r="2.5"
                        cy="8"
                        fill="hsl(var(--primary))"
                        initial={{ cx: 32, opacity: 0 }}
                        animate={{ cx: [32, 0], opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </svg>

                  {/* LLM */}
                  <motion.div
                    animate={{
                      scale: phase >= 4 && phase < 5 ? [1, 1.08, 1] : 1,
                      boxShadow: phase >= 4 && phase < 5
                        ? ['0 0 0px hsl(var(--primary) / 0)', '0 0 15px hsl(var(--primary) / 0.4)', '0 0 0px hsl(var(--primary) / 0)']
                        : 'none'
                    }}
                    transition={{ duration: 1, repeat: phase >= 4 && phase < 5 ? Infinity : 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/50 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-primary mt-1">LLM</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
              Click anywhere outside to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResearchAnimation;

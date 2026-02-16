import { motion, AnimatePresence } from "framer-motion";
import { X, User, BookOpen, Flag, Monitor, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface FlaggingSimpleDiagramProps {
  isOpen: boolean;
  onClose: () => void;
  onDetailedExplanation?: () => void;
  /** When true, render only the diagram (no modal, no header). Used inside a shared modal. */
  embedded?: boolean;
}

const ARROW_WIDTH = 80;
const ARROW_WIDTH_NONCOMPLIANT = 120; // longer so "Non-compliant / activity" fits
const ARROW_HEIGHT_V = 48; // QuickBooks → Numina (larger)
const DOT_SIZE = 10;

const FlaggingSimpleDiagram = ({ isOpen, onClose, onDetailedExplanation, embedded = false }: FlaggingSimpleDiagramProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const seq = [1, 2, 3, 4] as const;
    let idx = 0;
    const advance = () => {
      setPhase(seq[idx]);
      idx = (idx + 1) % seq.length;
    };
    const t1 = setTimeout(advance, 600);
    const interval = setInterval(advance, 2400);
    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [isOpen]);

  const nodeHighlight = (p: number) =>
    phase === p
      ? "border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.25)] bg-primary/10"
      : "border-border/50 bg-muted/30";
  const numinaActive = phase >= 1 && phase <= 3;
  const numinaGlow = numinaActive ? "border-primary shadow-[0_0_32px_hsl(var(--primary)/0.3)] bg-primary/15" : "border-primary/50 bg-primary/10";

  const diagramContent = (
    <div className={`w-full h-full flex flex-col items-center justify-center overflow-auto ${embedded ? "pb-6 px-4 md:px-8" : "pt-14 pb-6 px-4 md:px-8"}`}>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 text-center">
              {/* CPA */}
              <div className="flex flex-col items-center shrink-0">
                <motion.div
                  className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl border flex items-center justify-center transition-all duration-300 ${nodeHighlight(1)}`}
                >
                  <User className={`w-12 h-12 md:w-14 md:h-14 ${phase === 1 ? "text-primary" : "text-muted-foreground"}`} />
                </motion.div>
                <span className="text-base md:text-lg font-semibold text-foreground mt-3">CPA</span>
                <span className="text-sm text-muted-foreground text-center max-w-[120px]">Writes rules in plain English</span>
              </div>

              {/* Arrow: Plaintext rules + dot (same style as FlaggingAnimation) */}
              <div className="flex flex-col items-center justify-center shrink-0 pb-10 relative overflow-visible" style={{ width: ARROW_WIDTH }}>
                <svg width={ARROW_WIDTH} height={12} className="absolute overflow-visible" style={{ top: "50%", marginTop: -6 }} viewBox={`0 0 ${ARROW_WIDTH} 12`}>
                  <path
                    d={`M0 6 L${ARROW_WIDTH - 8} 6 M${ARROW_WIDTH - 12} 2 L${ARROW_WIDTH - 4} 6 L${ARROW_WIDTH - 12} 10`}
                    stroke="hsl(var(--primary) / 0.5)"
                    strokeWidth={1}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {phase === 1 && (
                  <motion.div
                    key="arrow1"
                    className="absolute rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                    style={{ width: DOT_SIZE, height: DOT_SIZE, left: 0, top: "50%", marginTop: -DOT_SIZE / 2 }}
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: ARROW_WIDTH - DOT_SIZE, opacity: 0.3 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                )}
                <span className="text-base text-muted-foreground mt-5 italic whitespace-nowrap relative z-10">Plaintext rules</span>
              </div>

              {/* Numina column: QuickBooks above + Numina (shifted up so Numina block center aligns with other icons) */}
              <div className="flex flex-col items-center shrink-0 gap-3 -mt-32 md:-mt-40 lg:-mt-48">
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`rounded-xl border flex items-center justify-center transition-all duration-300 ${nodeHighlight(2)}`}
                    style={{ width: 72, height: 72 }}
                  >
                    <BookOpen className={`w-9 h-9 md:w-10 md:h-10 ${phase === 2 ? "text-primary" : "text-muted-foreground"}`} />
                  </motion.div>
                  <span className="text-sm text-muted-foreground mt-1">QuickBooks / ERP</span>
                  {/* Vertical arrow: QuickBooks → Numina (same style as FlaggingAnimation, down) + dot */}
                  <div className="relative flex justify-center overflow-visible" style={{ width: 12, height: ARROW_HEIGHT_V }}>
                    <svg width={12} height={ARROW_HEIGHT_V} className="absolute left-1/2 -translate-x-1/2 overflow-visible" viewBox={`0 0 12 ${ARROW_HEIGHT_V}`}>
                      <path
                        d={`M6 0 L6 ${ARROW_HEIGHT_V - 6} M2 ${ARROW_HEIGHT_V - 10} L6 ${ARROW_HEIGHT_V - 2} L10 ${ARROW_HEIGHT_V - 10}`}
                        stroke="hsl(var(--primary) / 0.5)"
                        strokeWidth={1}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {phase === 2 && (
                      <motion.div
                        key="arrow2"
                        className="absolute rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                        style={{ width: DOT_SIZE, height: DOT_SIZE, left: "50%", marginLeft: -DOT_SIZE / 2 }}
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: ARROW_HEIGHT_V - DOT_SIZE, opacity: 0.3 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                      />
                    )}
                  </div>
                </div>
                <motion.div
                  className={`w-44 h-36 md:w-52 md:h-40 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all duration-300 ${numinaGlow}`}
                  style={{ boxShadow: numinaActive ? "0 0 40px hsl(var(--primary) / 0.2)" : "0 0 32px hsl(var(--primary) / 0.15), 0 0 64px hsl(var(--primary) / 0.08)" }}
                >
                  <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                  <span className="text-lg md:text-xl font-bold text-foreground">Numina</span>
                  <span className="text-xs md:text-sm text-muted-foreground text-center px-2 leading-tight">Understands rules & evaluates transactions</span>
                </motion.div>
              </div>

              {/* Arrow: Non-compliant activity + dot (same style as FlaggingAnimation) */}
              <div className="flex flex-col items-center justify-center shrink-0 pb-10 relative overflow-visible" style={{ width: ARROW_WIDTH_NONCOMPLIANT }}>
                <svg width={ARROW_WIDTH_NONCOMPLIANT} height={12} className="absolute overflow-visible" style={{ top: "50%", marginTop: -6 }} viewBox={`0 0 ${ARROW_WIDTH_NONCOMPLIANT} 12`}>
                  <path
                    d={`M0 6 L${ARROW_WIDTH_NONCOMPLIANT - 8} 6 M${ARROW_WIDTH_NONCOMPLIANT - 12} 2 L${ARROW_WIDTH_NONCOMPLIANT - 4} 6 L${ARROW_WIDTH_NONCOMPLIANT - 12} 10`}
                    stroke="hsl(var(--primary) / 0.5)"
                    strokeWidth={1}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {phase === 3 && (
                  <motion.div
                    key="arrow3"
                    className="absolute rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                    style={{ width: DOT_SIZE, height: DOT_SIZE, left: 0, top: "50%", marginTop: -DOT_SIZE / 2 }}
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: ARROW_WIDTH_NONCOMPLIANT - DOT_SIZE, opacity: 0.3 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                )}
                <span className="text-base text-muted-foreground mt-12 italic relative z-10 text-center block">
                  Non-compliant<br /><span className="block mt-1.5">activity</span>
                </span>
              </div>

              {/* Flag / Alert — margin-left so "Non-compliant activity" label doesn’t overlap icon */}
              <div className="flex flex-col items-center shrink-0 ml-6 md:ml-8">
                <motion.div
                  className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl border flex items-center justify-center transition-all duration-300 ${phase === 3 || phase === 4 ? "border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.25)] bg-primary/10" : "border-border/50 bg-muted/30"}`}
                >
                  <Flag className="w-12 h-12 md:w-14 md:h-14 text-primary" />
                </motion.div>
                <span className="text-base md:text-lg font-semibold text-foreground mt-3">Flag / Alert</span>
              </div>

              {/* Arrow: Notify + dot (same style as FlaggingAnimation) */}
              <div className="flex flex-col items-center justify-center shrink-0 pb-10 relative overflow-visible" style={{ width: ARROW_WIDTH }}>
                <svg width={ARROW_WIDTH} height={12} className="absolute overflow-visible" style={{ top: "50%", marginTop: -6 }} viewBox={`0 0 ${ARROW_WIDTH} 12`}>
                  <path
                    d={`M0 6 L${ARROW_WIDTH - 8} 6 M${ARROW_WIDTH - 12} 2 L${ARROW_WIDTH - 4} 6 L${ARROW_WIDTH - 12} 10`}
                    stroke="hsl(var(--primary) / 0.5)"
                    strokeWidth={1}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {phase === 4 && (
                  <motion.div
                    key="arrow4"
                    className="absolute rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                    style={{ width: DOT_SIZE, height: DOT_SIZE, left: 0, top: "50%", marginTop: -DOT_SIZE / 2 }}
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: ARROW_WIDTH - DOT_SIZE, opacity: 0.3 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                )}
                <span className="text-base text-muted-foreground mt-5 italic relative z-10">Notify</span>
              </div>

              {/* Auditor Dashboard */}
              <div className="flex flex-col items-center shrink-0">
                <motion.div
                  className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl border flex items-center justify-center transition-all duration-300 ${nodeHighlight(4)}`}
                >
                  <Monitor className={`w-12 h-12 md:w-14 md:h-14 ${phase === 4 ? "text-primary" : "text-muted-foreground"}`} />
                </motion.div>
                <span className="text-base md:text-lg font-semibold text-foreground mt-3 text-center">Auditor Dashboard</span>
              </div>
            </div>
          </div>
  );

  if (embedded) return diagramContent;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-card overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header: close left, title centred to screen (primary), Detailed explanation right */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/80 backdrop-blur-sm">
            <button onClick={onClose} className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors shrink-0 relative z-[1]" title="Close">
              <X className="w-5 h-5" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h3 className="text-xl font-semibold text-primary">Numina — Automatic Flagging</h3>
            </div>
            {onDetailedExplanation && (
              <button
                onClick={onDetailedExplanation}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-colors shrink-0 relative z-[1]"
              >
                Detailed explanation
              </button>
            )}
          </div>
          {diagramContent}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlaggingSimpleDiagram;

import { motion } from "framer-motion";
import { FileText, User, Sparkles, MessageSquare, BookOpen, FileCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface NuminaIntelligenceDiagramProps {
  /** When true, render only the diagram (no modal). Used inside a shared modal. */
  embedded?: boolean;
}

const ARROW_STROKE = "hsl(var(--primary) / 0.5)";
const DOT_SIZE = 6;
const ARROW_HEIGHT = 36;
const ARROW_HEIGHT_OUT = 40;

// Vertical arrow with traveling dot; only one arrow is active at a time (phase), so they run in sequence
const AnimatedVerticalArrowSvg = ({ height = 32, label, active }: { height?: number; label?: string; active: boolean }) => (
  <div className="flex flex-col items-center justify-center shrink-0">
    <div className="relative" style={{ width: 12, height }}>
      <svg width={12} height={height} viewBox={`0 0 12 ${height}`} className="overflow-visible absolute inset-0">
        <path
          d={`M6 0 L6 ${height - 6} M2 ${height - 10} L6 ${height - 2} L10 ${height - 10}`}
          stroke={ARROW_STROKE}
          strokeWidth={1}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {active && (
          <motion.circle
            r={DOT_SIZE / 2}
            cx={6}
            fill="hsl(var(--primary))"
            initial={{ cy: 0, opacity: 0 }}
            animate={{ cy: height - DOT_SIZE, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
    {label && (
      <span className="text-xs text-muted-foreground mt-1 italic text-center max-w-[72px]">{label}</span>
    )}
  </div>
);

const NuminaIntelligenceDiagram = ({ embedded = false }: NuminaIntelligenceDiagramProps) => {
  // Phase 0 = Grounding knowledge, 1 = Questions, 2 = Decisions & insights — one at a time so not in parallel
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 3), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`w-full flex flex-col items-center justify-center overflow-auto ${embedded ? "py-4" : "py-8"} px-4`}>
      <div className="flex flex-col items-center gap-6 md:gap-8 max-w-4xl">
        {/* Inputs row */}
        <div className="flex flex-wrap items-end justify-center gap-8 md:gap-12">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-28 h-24 md:w-32 md:h-28 rounded-xl border border-border/60 bg-muted/20 flex flex-col items-center justify-center px-3 shadow-sm">
              <FileText className="w-7 h-7 md:w-8 md:h-8 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground text-center leading-tight mt-1">Knowledge Sources</span>
            </div>
          </div>

          <div className="flex flex-col items-center shrink-0">
            <div className="w-28 h-24 md:w-32 md:h-28 rounded-xl border border-border/60 bg-muted/20 flex flex-col items-center justify-center gap-1 px-3 shadow-sm">
              <User className="w-7 h-7 md:w-8 md:h-8 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground text-center">CPA / Auditor</span>
              <span className="text-[10px] md:text-xs text-muted-foreground text-center">Asks questions or defines rules</span>
            </div>
          </div>
        </div>

        {/* Arrows down to Numina — animated, one at a time (phase 0 then 1) */}
        <div className="flex items-center justify-center gap-16 md:gap-24 -mt-2">
          <AnimatedVerticalArrowSvg height={ARROW_HEIGHT} label="Grounding knowledge" active={phase === 0} />
          <AnimatedVerticalArrowSvg height={ARROW_HEIGHT} label="Questions" active={phase === 1} />
        </div>

        {/* Central box: NUMINA Knowledgebase */}
        <div
          className="w-40 h-24 md:w-48 md:h-28 rounded-xl border-2 border-primary/50 bg-primary/10 flex flex-col items-center justify-center gap-1 px-4 shadow-[0_0_40px_hsl(var(--primary)/0.15)]"
          style={{ boxShadow: "0 0 48px hsl(var(--primary) / 0.12), 0 0 96px hsl(var(--primary) / 0.06)" }}
        >
          <Sparkles className="w-8 h-8 md:w-9 md:h-9 text-primary" />
          <span className="text-sm md:text-base font-bold text-foreground text-center block w-full">NUMINA Knowledgebase</span>
        </div>

        {/* Arrow down to outputs — animated (phase 2) */}
        <AnimatedVerticalArrowSvg height={ARROW_HEIGHT_OUT} label="Decisions & insights" active={phase === 2} />

        {/* Outputs row — all three highlight when phase 2 (dot reaches outputs) */}
        <div className="flex flex-wrap items-stretch justify-center gap-4 md:gap-6">
          {[
            { icon: MessageSquare, label: "Answer / Recommendation" },
            { icon: BookOpen, label: "Citations" },
            { icon: FileCheck, label: "Audit-ready explanation" },
          ].map(({ icon: Icon, label }) => {
            const highlighted = phase === 2;
            return (
              <div
                key={label}
                className={`w-32 md:w-36 rounded-xl border flex flex-col items-center justify-center gap-1.5 py-4 px-3 shadow-sm min-h-[72px] transition-all duration-300 ${
                  highlighted
                    ? "border-primary/60 bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
                    : "border-border/60 bg-muted/20"
                }`}
              >
                <Icon className={`w-6 h-6 shrink-0 ${highlighted ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-xs font-medium text-foreground text-center leading-tight">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NuminaIntelligenceDiagram;

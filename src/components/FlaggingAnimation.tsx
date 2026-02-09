import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Brain, Database, FileText, Bell, Shield, Zap, BookOpen, Cloud, Cpu, User } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface FlaggingAnimationProps {
  isOpen: boolean;
  onClose: () => void;
}

// Horizontal arrow with traveling dot
const AnimatedArrow = ({ active, delay = 0, width = 60, label, repeat = Infinity, reverse = false }: { active: boolean; delay?: number; width?: number; label?: string; repeat?: number; reverse?: boolean }) => (
  <div className="flex flex-col items-center justify-center" style={{ minWidth: width }}>
    {label && (
      <span className="text-[8px] text-muted-foreground mb-0.5 whitespace-nowrap italic">{label}</span>
    )}
    <svg width={width} height="12" viewBox={`0 0 ${width} 12`} className="overflow-visible">
      {reverse ? (
        <>
          <path
            d={`M${width} 6 L8 6 M14 2 L6 6 L14 10`}
            stroke="hsl(var(--primary) / 0.5)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {active && (
            <motion.circle
              r="2"
              cy="6"
              fill="hsl(var(--primary))"
              initial={{ cx: width, opacity: 0 }}
              animate={{ cx: [width, 8], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, delay, repeat, ease: "easeInOut" }}
            />
          )}
        </>
      ) : (
        <>
          <path
            d={`M0 6 L${width - 8} 6 M${width - 12} 2 L${width - 4} 6 L${width - 12} 10`}
            stroke="hsl(var(--primary) / 0.5)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {active && (
            <motion.circle
              r="2"
              cy="6"
              fill="hsl(var(--primary))"
              initial={{ cx: 0, opacity: 0 }}
              animate={{ cx: [0, width - 8], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, delay, repeat, ease: "easeInOut" }}
            />
          )}
        </>
      )}
    </svg>
  </div>
);

// Vertical arrow
const AnimatedVerticalArrow = ({ active, height = 30, label, direction = "down", repeat = Infinity }: { active: boolean; height?: number; label?: string; direction?: "down" | "up"; repeat?: number }) => (
  <div className="flex items-center gap-1 justify-center">
    <svg width="12" height={height} viewBox={`0 0 12 ${height}`} className="overflow-visible">
      {direction === "down" ? (
        <>
          <path
            d={`M6 0 L6 ${height - 6} M2 ${height - 10} L6 ${height - 2} L10 ${height - 10}`}
            stroke="hsl(var(--primary) / 0.5)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {active && (
            <motion.circle r="2" cx="6" fill="hsl(var(--primary))"
              initial={{ cy: 0, opacity: 0 }}
              animate={{ cy: [0, height - 6], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, repeat, ease: "easeInOut" }}
            />
          )}
        </>
      ) : (
        <>
          <path
            d={`M6 ${height} L6 6 M2 10 L6 2 L10 10`}
            stroke="hsl(var(--primary) / 0.5)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {active && (
            <motion.circle r="2" cx="6" fill="hsl(var(--primary))"
              initial={{ cy: height, opacity: 0 }}
              animate={{ cy: [height, 6], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, repeat, ease: "easeInOut" }}
            />
          )}
        </>
      )}
    </svg>
    {label && (
      <span className="text-[7px] text-muted-foreground whitespace-nowrap italic">{label}</span>
    )}
  </div>
);

// Card component
const Card = ({ icon: Icon, label, sublabel, highlighted = false }: {
  icon: any;
  label: string;
  sublabel?: string;
  highlighted?: boolean;
}) => (
  <div className="flex flex-col items-center">
    <div className={`w-12 h-12 rounded-lg bg-muted/30 flex items-center justify-center border transition-all duration-300 ${highlighted ? "border-primary/60 shadow-[0_0_12px_hsl(var(--primary)/0.3)]" : "border-border/40"}`}>
      <Icon className={`w-4 h-4 ${highlighted ? "text-primary" : "text-muted-foreground"}`} />
    </div>
    <span className="text-[10px] text-foreground font-medium mt-1 text-center leading-tight">{label}</span>
    {sublabel && <span className="text-[8px] text-muted-foreground text-center">{sublabel}</span>}
  </div>
);

const FlaggingAnimation = ({ isOpen, onClose }: FlaggingAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
      return;
    }

    const runAnimation = () => {
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
      setPhase(0);

      // Rule Intake flow
      timersRef.current.push(setTimeout(() => setPhase(1), 500));    // Accountant → LLM
      timersRef.current.push(setTimeout(() => setPhase(2), 2500));   // LLM processing
      timersRef.current.push(setTimeout(() => setPhase(3), 4500));   // LLM → Rules DB (store JSON)

      // Context flow + Rule Enforcement
      timersRef.current.push(setTimeout(() => setPhase(4), 7000));   // Context: Accountant → QB
      timersRef.current.push(setTimeout(() => setPhase(5), 9000));   // QB → Transaction Queue
      timersRef.current.push(setTimeout(() => setPhase(6), 11000));  // Queue → Engine + Fetch rules
      timersRef.current.push(setTimeout(() => setPhase(7), 13500));  // Engine → Flagging Service
      timersRef.current.push(setTimeout(() => setPhase(8), 15500));  // Flagging → Notification
      timersRef.current.push(setTimeout(() => setPhase(9), 17500));  // Notification → Auditor

      // Loop
      timersRef.current.push(setTimeout(() => {
        setPhase(0);
        setTimeout(runAnimation, 800);
      }, 20000));
    };

    runAnimation();
    return () => {
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
    };
  }, [isOpen]);

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
            className="relative w-[min(1100px,calc(100vw-2rem))] h-[min(520px,calc(100vh-3rem))] bg-card border border-border rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
              <X className="w-4 h-4" />
            </button>

            {/* Grid background */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Title */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
              <h3 className="text-sm font-bold text-foreground">Numina — Automatic Flagging</h3>
            </div>

            {/* Main layout */}
            <div className="relative w-full h-full pt-14 pb-8 px-8">

              {/* === TOP ROW: QuickBooks + Transaction Queue → Rule Enforcement box → Notification → Auditor === */}
              <div className="flex items-center justify-center gap-2 mb-4">

                {/* Context arrow from below (visual label) */}
                <div className="flex flex-col items-center">
                  <Card icon={BookOpen} label="QuickBooks" sublabel="(External)" highlighted={phase >= 4} />
                </div>

                <AnimatedArrow active={phase >= 5} width={50} />

                <Card icon={FileText} label="Transaction" sublabel="Queue" highlighted={phase >= 5} />

                <AnimatedArrow active={phase >= 6} width={50} label="Process transaction" />

                {/* RULE ENFORCEMENT BOX */}
                <div className="border border-blue-500/40 rounded-lg px-4 py-3 bg-blue-500/5 relative">
                  <span className="absolute -top-2.5 left-3 bg-card px-2 text-[9px] text-blue-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Rule Enforcement
                  </span>
                  <div className="flex items-start gap-3 mt-1">
                    {/* Engine + Flagging Service inside */}
                    <div className="flex flex-col items-center">
                      <Card icon={Cpu} label="Rule" sublabel="Enforcement Engine" highlighted={phase >= 6} />
                    </div>

                    {/* Internal arrow: Flag non-compliance */}
                    <div className="flex flex-col items-center justify-center pt-2">
                      <AnimatedArrow active={phase >= 7} width={60} label="Flag non-compliance" />
                    </div>

                    <div className="flex flex-col items-center">
                      <Card icon={Zap} label="Flagging" sublabel="Service" highlighted={phase >= 7} />
                    </div>
                  </div>
                </div>

                <AnimatedArrow active={phase >= 8} width={50} label="Alert" />

                <Card icon={Bell} label="Notification" sublabel="System" highlighted={phase >= 8} />

                <AnimatedArrow active={phase >= 9} width={50} label="Notify" />

                <Card icon={Monitor} label="Auditor" sublabel="Dashboard" highlighted={phase >= 9} />
              </div>

              {/* Vertical connectors */}
              <div className="flex items-start justify-center gap-2 relative">
                {/* Left side: Context arrow (Accountant up to QuickBooks) */}
                <div className="absolute left-[60px] top-0">
                  <AnimatedVerticalArrow active={phase >= 4} height={30} label="Context" direction="up" />
                </div>

                {/* Right-center: Fetch rules arrow (Engine down to Rules DB) */}
                {/* This is positioned between the enforcement box and Rules DB */}
              </div>

              {/* === BOTTOM ROW: Rule Intake box + Rules Database === */}
              <div className="flex items-end justify-between mt-6 px-4">

                {/* RULE INTAKE BOX - bottom left */}
                <div className="border border-amber-500/40 rounded-lg px-4 py-3 bg-amber-500/5 relative">
                  <span className="absolute -top-2.5 left-3 bg-card px-2 text-[9px] text-amber-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Rule Intake
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Card icon={User} label="Accountant" sublabel="Interface" highlighted={phase >= 1} />
                    <AnimatedArrow active={phase >= 1} width={60} label="Plaintext Rule" />
                    <Card icon={Cloud} label="LLM Rule" sublabel="Converter" highlighted={phase >= 2} />
                  </div>
                </div>

                {/* Long arrow: Store JSON rule → Rules DB */}
                <div className="flex items-center gap-2 self-center">
                  <AnimatedArrow active={phase >= 3} width={120} label="Store JSON rule" />
                </div>

                {/* Rules Database - bottom right */}
                <div className="flex flex-col items-center">
                  <Card icon={Database} label="Rules" sublabel="Database" highlighted={phase >= 3 || phase >= 6} />
                  {/* Fetch rules arrow going up to Engine */}
                  <div className="mt-1">
                    <AnimatedVerticalArrow active={phase >= 6} height={24} label="Fetch rules" direction="up" />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom label */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
              Click anywhere outside to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlaggingAnimation;

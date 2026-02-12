import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Database, Bell, Shield, Zap, BookOpen, Cpu, User, RotateCcw, Save, Pencil, Check, Sparkles } from "lucide-react";
import { useEffect, useLayoutEffect, useState, useRef } from "react";

interface FlaggingAnimationProps {
  isOpen: boolean;
  onClose: () => void;
}

// Horizontal arrow with traveling dot (runs once per activation via onAnimationComplete)
const AnimatedArrow = ({ active, delay = 0, width = 60, label, repeat = 1, reverse = false, onAnimationComplete }: { active: boolean; delay?: number; width?: number; label?: string; repeat?: number; reverse?: boolean; onAnimationComplete?: () => void }) => (
  <div className="flex flex-col items-center justify-center" style={{ minWidth: width }}>
    {label && (
      <span className="text-sm text-muted-foreground mb-0.5 whitespace-nowrap italic">{label}</span>
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
              onAnimationComplete={onAnimationComplete}
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
              onAnimationComplete={onAnimationComplete}
            />
          )}
        </>
      )}
    </svg>
  </div>
);

// Vertical arrow (runs once per activation via onAnimationComplete)
const AnimatedVerticalArrow = ({ active, height = 30, label, direction = "down", repeat = 1, onAnimationComplete }: { active: boolean; height?: number; label?: string; direction?: "down" | "up"; repeat?: number; onAnimationComplete?: () => void }) => (
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
              onAnimationComplete={onAnimationComplete}
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
              onAnimationComplete={onAnimationComplete}
            />
          )}
        </>
      )}
    </svg>
    {label && (
      <span className="text-sm text-muted-foreground whitespace-nowrap italic">{label}</span>
    )}
  </div>
);

// Card component (larger icons)
const Card = ({ icon: Icon, label, sublabel, highlighted = false }: {
  icon: any;
  label: string;
  sublabel?: string;
  highlighted?: boolean;
}) => (
  <div className="flex flex-col items-center">
    <div className={`w-16 h-16 rounded-xl bg-muted/30 flex items-center justify-center border-2 transition-all duration-300 ${highlighted ? "border-primary/60 shadow-[0_0_16px_hsl(var(--primary)/0.3)]" : "border-border/40"}`}>
      <Icon className={`w-8 h-8 ${highlighted ? "text-primary" : "text-muted-foreground"}`} />
    </div>
    <span className="text-sm text-foreground font-medium mt-1.5 text-center leading-tight">{label}</span>
    {sublabel && <span className="text-xs text-muted-foreground text-center">{sublabel}</span>}
  </div>
);

// Resize handle: drag to change arrow length (no +/- buttons); only active in edit mode
const ResizeHandle = ({
  arrowId,
  isVertical,
  currentSize,
  onResize,
  disabled,
  className,
}: {
  arrowId: string;
  isVertical: boolean;
  currentSize: number;
  onResize: (id: string, newSize: number) => void;
  disabled?: boolean;
  className?: string;
}) => {
  const ref = useRef<{ start: number; initialSize: number } | null>(null);
  if (disabled) return null;
  return (
    <div
      role="slider"
      aria-label={isVertical ? "Resize arrow height" : "Resize arrow width"}
      className={`touch-none rounded-sm bg-primary/10 hover:bg-primary/20 transition-colors ${isVertical ? "cursor-ns-resize w-3 h-4" : "cursor-ew-resize w-4 h-3"} ${className ?? ""}`}
      onPointerDown={(e) => {
        e.stopPropagation();
        ref.current = { start: isVertical ? e.clientY : e.clientX, initialSize: currentSize };
        const handleMove = (ev: PointerEvent) => {
          if (!ref.current) return;
          const delta = isVertical ? ev.clientY - ref.current.start : ev.clientX - ref.current.start;
          const newSize = Math.min(MAX_ARROW_SIZE, Math.max(MIN_ARROW_SIZE, ref.current.initialSize + delta));
          onResize(arrowId, newSize);
          ref.current.start = isVertical ? ev.clientY : ev.clientX;
          ref.current.initialSize = newSize;
        };
        const handleUp = () => {
          ref.current = null;
          window.removeEventListener("pointermove", handleMove);
          window.removeEventListener("pointerup", handleUp);
        };
        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
      }}
    />
  );
};

type NodeId = string;
const Draggable = ({
  id,
  position,
  onDragEnd,
  children,
  disabled,
  className = "flex flex-col items-center shrink-0 cursor-grab active:cursor-grabbing touch-none",
}: {
  id: NodeId;
  position: { x: number; y: number };
  onDragEnd: (id: NodeId, offset: { x: number; y: number }) => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) => (
  <motion.div
    className={disabled ? className.replace("cursor-grab active:cursor-grabbing touch-none", "cursor-default") : className}
    drag={!disabled}
    dragMomentum={false}
    dragElastic={0}
    style={{ x: position.x, y: position.y }}
    onDragEnd={(_e, info) => !disabled && onDragEnd(id, { x: info.offset.x, y: info.offset.y })}
    whileDrag={disabled ? undefined : { scale: 1.02, zIndex: 10 }}
  >
    {children}
  </motion.div>
);

const NODE_IDS = [
  "quickbooks",
  "rule-engine",
  "flagging-service",
  "rules-database",
  "notification",
  "auditor",
  "accountant",
  "llm-converter",
  "arrow-process",
  "arrow-flag",
  "arrow-alert",
  "arrow-notify",
  "arrow-plaintext",
  "arrow-store-json",
  "arrow-context",
  "arrow-fetch-rules",
  "box-rule-enforcement",
  "box-rule-intake",
] as const;

const STORAGE_KEY = "flagging-animation-positions";
const ARROW_SIZES_KEY = "flagging-animation-arrow-sizes";

const ARROW_DEFAULT_SIZES: Record<string, number> = {
  "arrow-process": 56,
  "arrow-flag": 56,
  "arrow-alert": 52,
  "arrow-notify": 52,
  "arrow-plaintext": 52,
  "arrow-store-json": 80,
  "arrow-context": 36,
  "arrow-fetch-rules": 44,
};

function loadSavedPositions(): Record<string, { x: number; y: number }> {
  const defaults = Object.fromEntries(NODE_IDS.map((id) => [id, { x: 0, y: 0 }]));
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Record<string, { x: number; y: number }>;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

function loadSavedArrowSizes(): Record<string, number> {
  try {
    const raw = localStorage.getItem(ARROW_SIZES_KEY);
    if (!raw) return { ...ARROW_DEFAULT_SIZES };
    const parsed = JSON.parse(raw) as Record<string, number>;
    return { ...ARROW_DEFAULT_SIZES, ...parsed };
  } catch {
    return { ...ARROW_DEFAULT_SIZES };
  }
}

function savePositions(positions: Record<string, { x: number; y: number }>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // ignore quota / private mode
  }
}

function saveArrowSizes(sizes: Record<string, number>) {
  try {
    localStorage.setItem(ARROW_SIZES_KEY, JSON.stringify(sizes));
  } catch {
    // ignore
  }
}

const MIN_ARROW_SIZE = 24;
const MAX_ARROW_SIZE = 200;

// Module-level ref so "dot already shown" survives React Strict Mode unmount/remount
const dotShownForPhaseRef = { current: {} as Record<number, boolean> };

const FlaggingAnimation = ({ isOpen, onClose }: FlaggingAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(loadSavedPositions);
  const [arrowSizes, setArrowSizes] = useState<Record<string, number>>(loadSavedArrowSizes);
  const handleDragEnd = (id: string, offset: { x: number; y: number }) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { x: (prev[id]?.x ?? 0) + offset.x, y: (prev[id]?.y ?? 0) + offset.y },
    }));
  };
  const pos = (id: string) => positions[id] ?? { x: 0, y: 0 };
  const arrowSize = (id: string) => arrowSizes[id] ?? ARROW_DEFAULT_SIZES[id] ?? 48;
  const setArrowSizeAbsolute = (id: string, newSize: number) => {
    const size = Math.min(MAX_ARROW_SIZE, Math.max(MIN_ARROW_SIZE, newSize));
    setArrowSizes((prev) => ({ ...prev, [id]: size }));
  };

  const saveCurrentLayout = () => {
    savePositions(positions);
    saveArrowSizes(arrowSizes);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 1500);
  };

  const resetLayout = () => {
    const defaults = Object.fromEntries(NODE_IDS.map((id) => [id, { x: 0, y: 0 }]));
    savePositions(defaults);
    setPositions(defaults);
    setArrowSizes({ ...ARROW_DEFAULT_SIZES });
    saveArrowSizes(ARROW_DEFAULT_SIZES);
  };

  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      dotShownForPhaseRef.current = {};
      setIsEditMode(false);
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
      return;
    }

    const runAnimation = () => {
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
      setPhase(0);

      // 1. Accountant → LLM (Plaintext Rule arrow), highlight Accountant + LLM
      timersRef.current.push(setTimeout(() => setPhase(1), 500));
      // 2. QuickBooks → LLM (Context arrow), highlight QuickBooks + LLM
      timersRef.current.push(setTimeout(() => setPhase(2), 2000));
      // 3. LLM → Rules DB (Store JSON arrow), highlight LLM + Rules DB
      timersRef.current.push(setTimeout(() => setPhase(3), 3500));
      // 4. 2 sec pause, then Process transaction arrow, highlight QuickBooks + Rule Enforcement Engine
      timersRef.current.push(setTimeout(() => setPhase(4), 5500));   // 3500 + 2000 pause
      // 5. Rules DB + Fetch rules arrow
      timersRef.current.push(setTimeout(() => setPhase(5), 7500));
      // 6. Flag non-compliance arrow + Flagging Service
      timersRef.current.push(setTimeout(() => setPhase(6), 9500));
      // 7. Alert arrow + Notification System
      timersRef.current.push(setTimeout(() => setPhase(7), 11500));
      // 8. Notify arrow + Auditor (complete flow)
      timersRef.current.push(setTimeout(() => setPhase(8), 13500));

      // Loop: reset phase and dot-shown refs so arrows run again next cycle
      timersRef.current.push(setTimeout(() => {
        setPhase(0);
        dotShownForPhaseRef.current = {};
        setTimeout(runAnimation, 800);
      }, 16000));
    };

    runAnimation();
    return () => {
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
    };
  }, [isOpen]);

  // Clear "dot shown" when phase is 0 so next cycle can run
  useLayoutEffect(() => {
    if (phase === 0) dotShownForPhaseRef.current = {};
  }, [phase]);

  const dotActive = (n: number) => phase === n && !dotShownForPhaseRef.current[n];
  const markDotShown = (n: number) => {
    dotShownForPhaseRef.current[n] = true;
  };

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
            className="relative w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] max-w-full max-h-full bg-card border border-border rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close, Edit mode toggle, Save layout (edit only), Reset layout (edit only) */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <button onClick={onClose} className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors" title="Close">
                <X className="w-5 h-5" />
              </button>
              <button onClick={() => setIsEditMode((v) => !v)} className={`p-2 rounded-full transition-colors flex items-center gap-1.5 text-sm ${isEditMode ? "bg-primary/20 hover:bg-primary/30 text-primary" : "bg-muted/50 hover:bg-muted"}`} title={isEditMode ? "Done editing" : "Edit layout"}>
                {isEditMode ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                <span className="hidden sm:inline">{isEditMode ? "Done" : "Edit"}</span>
              </button>
              {isEditMode && (
                <>
                  <button onClick={saveCurrentLayout} className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors flex items-center gap-1.5 text-sm" title="Save current layout">
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">{saveFeedback ? "Saved!" : "Save layout"}</span>
                  </button>
                  <button onClick={resetLayout} className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors flex items-center gap-1.5 text-sm" title="Reset layout to default">
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">Reset layout</span>
                  </button>
                </>
              )}
            </div>

            {/* Grid background */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Title */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
              <h3 className="text-lg font-bold text-foreground">Numina — Automatic Flagging</h3>
            </div>

            <div className="relative w-full h-full pt-12 sm:pt-14 pb-6 sm:pb-8 px-6 sm:px-8 lg:px-10 flex flex-col items-center justify-center overflow-auto">
              <div className="flex flex-col items-center gap-4 sm:gap-5 w-full max-w-6xl">
                {/* Row 1: QuickBooks (with Context down) | Arrow | Transaction Queue | Process | Rule Enforcement | Alert | Notification | Notify | Auditor — all on same horizontal line */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
                  <div className="flex flex-col items-center shrink-0">
                    <Draggable id="quickbooks" position={pos("quickbooks")} onDragEnd={handleDragEnd} disabled={!isEditMode}>
                      <Card icon={BookOpen} label="QuickBooks" sublabel="(External)" highlighted={phase === 2 || phase === 4} />
                    </Draggable>
                    <div className="mt-1 flex flex-col items-center gap-0.5">
                      <Draggable id="arrow-context" position={pos("arrow-context")} onDragEnd={handleDragEnd} disabled={!isEditMode} className="shrink-0 cursor-grab active:cursor-grabbing touch-none inline-flex flex-col items-center gap-0.5">
                        <AnimatedVerticalArrow active={dotActive(2)} height={arrowSize("arrow-context")} label="Context" direction="down" onAnimationComplete={() => markDotShown(2)} />
                        <ResizeHandle arrowId="arrow-context" isVertical currentSize={arrowSize("arrow-context")} onResize={setArrowSizeAbsolute} disabled={!isEditMode} />
                      </Draggable>
                    </div>
                  </div>
                  <Draggable id="arrow-process" position={pos("arrow-process")} onDragEnd={handleDragEnd} disabled={!isEditMode} className="shrink-0 cursor-grab active:cursor-grabbing touch-none inline-flex flex-col items-center">
                    <div className="flex items-center gap-0.5">
                      <AnimatedArrow active={dotActive(4)} width={arrowSize("arrow-process")} label="Process transaction" onAnimationComplete={() => markDotShown(4)} />
                      <ResizeHandle arrowId="arrow-process" isVertical={false} currentSize={arrowSize("arrow-process")} onResize={setArrowSizeAbsolute} disabled={!isEditMode} />
                    </div>
                  </Draggable>
                  <Draggable id="box-rule-enforcement" position={pos("box-rule-enforcement")} onDragEnd={handleDragEnd} disabled={!isEditMode} className="flex flex-col items-start shrink-0 cursor-grab active:cursor-grabbing touch-none">
                    <div className="border border-blue-500/40 rounded-lg px-2 sm:px-3 py-3 bg-blue-500/5 relative">
                      <span className="absolute -top-2.5 left-2 sm:left-3 bg-card px-2 text-[10px] sm:text-xs text-blue-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Rule Enforcement
                      </span>
                      <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                        <Draggable id="rule-engine" position={pos("rule-engine")} onDragEnd={handleDragEnd} disabled={!isEditMode}>
                          <Card icon={Cpu} label="Rule" sublabel="Enforcement Engine" highlighted={phase === 4 || phase === 5} />
                        </Draggable>
                        <Draggable id="arrow-flag" position={pos("arrow-flag")} onDragEnd={handleDragEnd} disabled={!isEditMode} className="shrink-0 cursor-grab active:cursor-grabbing touch-none inline-flex flex-col items-center">
                          <div className="flex items-center gap-0.5">
                            <AnimatedArrow active={dotActive(6)} width={arrowSize("arrow-flag")} label="Flag non-compliance" onAnimationComplete={() => markDotShown(6)} />
                            <ResizeHandle arrowId="arrow-flag" isVertical={false} currentSize={arrowSize("arrow-flag")} onResize={setArrowSizeAbsolute} disabled={!isEditMode} />
                          </div>
                        </Draggable>
                        <Draggable id="flagging-service" position={pos("flagging-service")} onDragEnd={handleDragEnd} disabled={!isEditMode}>
                          <Card icon={Zap} label="Flagging" sublabel="Service" highlighted={phase === 6} />
                        </Draggable>
                      </div>
                    </div>
                    <div className="flex flex-col items-center mt-1 ml-3 w-16">
                      <Draggable id="arrow-fetch-rules" position={pos("arrow-fetch-rules")} onDragEnd={handleDragEnd} disabled={!isEditMode} className="shrink-0 cursor-grab active:cursor-grabbing touch-none inline-flex flex-col items-center gap-0.5">
                        <ResizeHandle arrowId="arrow-fetch-rules" isVertical currentSize={arrowSize("arrow-fetch-rules")} onResize={setArrowSizeAbsolute} disabled={!isEditMode} />
                        <AnimatedVerticalArrow active={dotActive(5)} height={arrowSize("arrow-fetch-rules")} label="Fetch rules" direction="up" onAnimationComplete={() => markDotShown(5)} />
                      </Draggable>
                      <Draggable id="rules-database" position={pos("rules-database")} onDragEnd={handleDragEnd} disabled={!isEditMode}>
                        <Card icon={Database} label="Rules" sublabel="Database" highlighted={phase === 3 || phase === 5} />
                      </Draggable>
                    </div>
                  </Draggable>
                  <Draggable id="arrow-alert" position={pos("arrow-alert")} onDragEnd={handleDragEnd} disabled={!isEditMode} className="shrink-0 cursor-grab active:cursor-grabbing touch-none inline-flex flex-col items-center">
                    <div className="flex items-center gap-0.5">
                      <AnimatedArrow active={dotActive(7)} width={arrowSize("arrow-alert")} label="Alert" onAnimationComplete={() => markDotShown(7)} />
                      <ResizeHandle arrowId="arrow-alert" isVertical={false} currentSize={arrowSize("arrow-alert")} onResize={setArrowSizeAbsolute} disabled={!isEditMode} />
                    </div>
                  </Draggable>
                  <Draggable id="notification" position={pos("notification")} onDragEnd={handleDragEnd} disabled={!isEditMode}>
                    <Card icon={Bell} label="Notification" sublabel="System" highlighted={phase === 7} />
                  </Draggable>
                  <Draggable id="arrow-notify" position={pos("arrow-notify")} onDragEnd={handleDragEnd} disabled={!isEditMode} className="shrink-0 cursor-grab active:cursor-grabbing touch-none inline-flex flex-col items-center">
                    <div className="flex items-center gap-0.5">
                      <AnimatedArrow active={dotActive(8)} width={arrowSize("arrow-notify")} label="Notify" onAnimationComplete={() => markDotShown(8)} />
                      <ResizeHandle arrowId="arrow-notify" isVertical={false} currentSize={arrowSize("arrow-notify")} onResize={setArrowSizeAbsolute} disabled={!isEditMode} />
                    </div>
                  </Draggable>
                  <Draggable id="auditor" position={pos("auditor")} onDragEnd={handleDragEnd} disabled={!isEditMode}>
                    <Card icon={Monitor} label="Auditor" sublabel="Dashboard" highlighted={phase === 8} />
                  </Draggable>
                </div>

                {/* Row 2: Rule Intake (Accountant → Plaintext → LLM under QuickBooks) + Store JSON arrow; LLM aligned under QuickBooks so Context points to it */}
                <div className="flex items-center justify-center w-full pl-[92px]">
                  <div className="flex items-center -ml-[92px]">
                    <Draggable id="box-rule-intake" position={pos("box-rule-intake")} onDragEnd={handleDragEnd} disabled={!isEditMode} className="flex items-center shrink-0 cursor-grab active:cursor-grabbing touch-none">
                      <div className="border border-amber-500/40 rounded-lg px-2 sm:px-3 py-3 bg-amber-500/5 relative shrink-0">
                        <span className="absolute -top-2.5 right-2 sm:right-3 bg-card px-2 text-[10px] sm:text-xs text-amber-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Rule Intake
                        </span>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                          <Draggable id="accountant" position={pos("accountant")} onDragEnd={handleDragEnd} disabled={!isEditMode}>
                            <Card icon={User} label="Accountant" sublabel="Interface" highlighted={phase === 1} />
                          </Draggable>
                          <Draggable id="arrow-plaintext" position={pos("arrow-plaintext")} onDragEnd={handleDragEnd} disabled={!isEditMode} className="shrink-0 cursor-grab active:cursor-grabbing touch-none inline-flex flex-col items-center">
                            <div className="flex items-center gap-0.5">
                              <AnimatedArrow active={dotActive(1)} width={arrowSize("arrow-plaintext")} label="Plaintext Rule" onAnimationComplete={() => markDotShown(1)} />
                              <ResizeHandle arrowId="arrow-plaintext" isVertical={false} currentSize={arrowSize("arrow-plaintext")} onResize={setArrowSizeAbsolute} disabled={!isEditMode} />
                            </div>
                          </Draggable>
                          <Draggable id="llm-converter" position={pos("llm-converter")} onDragEnd={handleDragEnd} disabled={!isEditMode}>
                            <Card icon={Sparkles} label="LLM Rule" sublabel="Converter" highlighted={phase === 1 || phase === 2 || phase === 3} />
                          </Draggable>
                        </div>
                      </div>
                    </Draggable>
                    <Draggable id="arrow-store-json" position={pos("arrow-store-json")} onDragEnd={handleDragEnd} disabled={!isEditMode} className="shrink-0 cursor-grab active:cursor-grabbing touch-none inline-flex flex-col items-center">
                      <div className="flex items-center gap-0.5">
                        <AnimatedArrow active={dotActive(3)} width={arrowSize("arrow-store-json")} label="Store JSON rule" onAnimationComplete={() => markDotShown(3)} />
                        <ResizeHandle arrowId="arrow-store-json" isVertical={false} currentSize={arrowSize("arrow-store-json")} onResize={setArrowSizeAbsolute} disabled={!isEditMode} />
                      </div>
                    </Draggable>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlaggingAnimation;

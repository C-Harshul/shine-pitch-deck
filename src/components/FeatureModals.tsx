import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useFeatureModals } from "@/contexts/FeatureModalsContext";
import DocumentProcessingAnimation from "@/components/DocumentProcessingAnimation";
import ResearchAnimation from "@/components/ResearchAnimation";
import NuminaIntelligenceDiagram from "@/components/NuminaIntelligenceDiagram";
import FlaggingSimpleDiagram from "@/components/FlaggingSimpleDiagram";
import FlaggingAnimation from "@/components/FlaggingAnimation";

const gridBg = {
  backgroundImage:
    "linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

const FeatureModals = () => {
  const {
    reconcileOpen,
    closeReconcile,
    researchView,
    setResearchView,
    flaggingView,
    setFlaggingView,
  } = useFeatureModals();

  return (
    <>
      <DocumentProcessingAnimation isOpen={reconcileOpen} onClose={closeReconcile} />

      <AnimatePresence>
        {researchView !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm"
            onClick={() => setResearchView(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] max-w-full max-h-full bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/80 backdrop-blur-sm shrink-0">
                <button
                  onClick={() => setResearchView(null)}
                  className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors shrink-0 relative z-[1]"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h3 className="text-xl font-semibold text-primary">Numina — Research</h3>
                </div>
                {researchView === "simple" ? (
                  <button
                    onClick={() => setResearchView("detailed")}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-colors shrink-0 relative z-[1]"
                  >
                    Detailed explanation
                  </button>
                ) : (
                  <button
                    onClick={() => setResearchView("simple")}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 border border-border transition-colors shrink-0 relative z-[1]"
                  >
                    Overview
                  </button>
                )}
              </div>
              <div className="flex-1 min-h-[280px] overflow-auto relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={gridBg} />
                <div className="relative w-full h-full min-h-[240px] flex flex-col items-center justify-center overflow-auto pt-4 pb-6 px-4 md:px-8">
                  {researchView === "simple" && (
                    <div key="research-simple" className="w-full flex-1 min-h-0 flex items-center justify-center">
                      <NuminaIntelligenceDiagram embedded />
                    </div>
                  )}
                  {researchView === "detailed" && (
                    <ResearchAnimation
                      key="research-detailed"
                      isOpen={true}
                      onClose={() => setResearchView(null)}
                      embedded
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flaggingView !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm"
            onClick={() => setFlaggingView(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] max-w-full max-h-full bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/80 backdrop-blur-sm shrink-0">
                <button
                  onClick={() => setFlaggingView(null)}
                  className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors shrink-0 relative z-[1]"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h3 className="text-xl font-semibold text-primary">Numina — Automatic Flagging</h3>
                </div>
                {flaggingView === "simple" ? (
                  <button
                    onClick={() => setFlaggingView("detailed")}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-colors shrink-0 relative z-[1]"
                  >
                    Detailed explanation
                  </button>
                ) : (
                  <button
                    onClick={() => setFlaggingView("simple")}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 border border-border transition-colors shrink-0 relative z-[1]"
                  >
                    Overview
                  </button>
                )}
              </div>
              <div className="flex-1 min-h-[280px] overflow-auto relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={gridBg} />
                <div className="relative w-full h-full min-h-[240px] flex flex-col items-center justify-center overflow-auto pt-4 pb-6 px-4 md:px-8">
                  {flaggingView === "simple" && (
                    <div key="flagging-simple" className="w-full flex-1 min-h-0 flex items-center justify-center">
                      <FlaggingSimpleDiagram isOpen={true} onClose={() => setFlaggingView(null)} embedded />
                    </div>
                  )}
                  {flaggingView === "detailed" && (
                    <FlaggingAnimation
                      key="flagging-detailed"
                      isOpen={true}
                      onClose={() => setFlaggingView(null)}
                      embedded
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeatureModals;

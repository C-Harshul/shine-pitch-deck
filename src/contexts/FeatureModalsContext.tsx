import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ResearchView = "simple" | "detailed" | null;
type FlaggingView = "simple" | "detailed" | null;

interface FeatureModalsState {
  reconcileOpen: boolean;
  researchView: ResearchView;
  flaggingView: FlaggingView;
}

interface FeatureModalsContextValue extends FeatureModalsState {
  openReconcile: () => void;
  closeReconcile: () => void;
  openResearch: (startWithDetailed?: boolean) => void;
  setResearchView: (view: ResearchView) => void;
  openFlagging: (startWithDetailed?: boolean) => void;
  setFlaggingView: (view: FlaggingView) => void;
}

const FeatureModalsContext = createContext<FeatureModalsContextValue | null>(null);

export const FeatureModalsProvider = ({ children }: { children: ReactNode }) => {
  const [reconcileOpen, setReconcileOpen] = useState(false);
  const [researchView, setResearchViewState] = useState<ResearchView>(null);
  const [flaggingView, setFlaggingViewState] = useState<FlaggingView>(null);

  const openReconcile = useCallback(() => setReconcileOpen(true), []);
  const closeReconcile = useCallback(() => setReconcileOpen(false), []);
  const openResearch = useCallback((startWithDetailed = false) => {
    setResearchViewState(startWithDetailed ? "detailed" : "simple");
  }, []);
  const openFlagging = useCallback((startWithDetailed = false) => {
    setFlaggingViewState(startWithDetailed ? "detailed" : "simple");
  }, []);
  const setResearchView = useCallback((view: ResearchView) => setResearchViewState(view), []);
  const setFlaggingView = useCallback((view: FlaggingView) => setFlaggingViewState(view), []);

  const value: FeatureModalsContextValue = {
    reconcileOpen,
    researchView,
    flaggingView,
    openReconcile,
    closeReconcile,
    openResearch,
    setResearchView,
    openFlagging,
    setFlaggingView,
  };

  return (
    <FeatureModalsContext.Provider value={value}>
      {children}
    </FeatureModalsContext.Provider>
  );
};

export const useFeatureModals = () => {
  const ctx = useContext(FeatureModalsContext);
  if (!ctx) throw new Error("useFeatureModals must be used within FeatureModalsProvider");
  return ctx;
};

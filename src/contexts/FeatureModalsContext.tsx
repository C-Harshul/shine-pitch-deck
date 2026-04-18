import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";

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
  /** Returns true if a modal step was consumed (caller should NOT advance slide). */
  advanceCapabilities: () => boolean;
  /** Returns true if a modal step was consumed (caller should NOT navigate back). */
  reverseCapabilities: () => boolean;
  /** Reset capability walkthrough state (called when leaving the slide). */
  resetCapabilitiesWalkthrough: () => void;
}

const FeatureModalsContext = createContext<FeatureModalsContextValue | null>(null);

export const FeatureModalsProvider = ({ children }: { children: ReactNode }) => {
  const [reconcileOpen, setReconcileOpen] = useState(false);
  const [researchView, setResearchViewState] = useState<ResearchView>(null);
  const [flaggingView, setFlaggingViewState] = useState<FlaggingView>(null);

  // Step tracker for the capabilities walkthrough: 0 = none shown, 1 = reconcile, 2 = flag, 3 = research, 4 = done
  const stepRef = useRef(0);

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

  const closeAll = useCallback(() => {
    setReconcileOpen(false);
    setFlaggingViewState(null);
    setResearchViewState(null);
  }, []);

  const advanceCapabilities = useCallback(() => {
    const next = stepRef.current + 1;
    if (next === 1) {
      closeAll();
      setReconcileOpen(true);
      stepRef.current = 1;
      return true;
    }
    if (next === 2) {
      closeAll();
      setFlaggingViewState("simple");
      stepRef.current = 2;
      return true;
    }
    if (next === 3) {
      closeAll();
      setResearchViewState("simple");
      stepRef.current = 3;
      return true;
    }
    // Walkthrough complete — close and let navigation continue
    closeAll();
    stepRef.current = 0;
    return false;
  }, [closeAll]);

  const reverseCapabilities = useCallback(() => {
    const prev = stepRef.current - 1;
    if (stepRef.current === 0) return false;
    if (prev <= 0) {
      closeAll();
      stepRef.current = 0;
      return true; // consume the back press, return to clean slide
    }
    if (prev === 1) {
      closeAll();
      setReconcileOpen(true);
      stepRef.current = 1;
      return true;
    }
    if (prev === 2) {
      closeAll();
      setFlaggingViewState("simple");
      stepRef.current = 2;
      return true;
    }
    return false;
  }, [closeAll]);

  const resetCapabilitiesWalkthrough = useCallback(() => {
    closeAll();
    stepRef.current = 0;
  }, [closeAll]);

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
    advanceCapabilities,
    reverseCapabilities,
    resetCapabilitiesWalkthrough,
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

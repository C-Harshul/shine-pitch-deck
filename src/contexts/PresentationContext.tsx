import { createContext, useContext } from "react";

export interface PresentationContextValue {
  goToSlide: (index: number, dir?: "next" | "prev") => void;
  currentSlide: number;
  totalSlides: number;
  /** Number of main content slides (after Athena). Counter and progress bar use this; appendix slides are excluded. */
  contentSlideCount: number;
}

const PresentationContext = createContext<PresentationContextValue | null>(null);

export const usePresentation = () => {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation must be used within Presentation");
  return ctx;
};

export default PresentationContext;

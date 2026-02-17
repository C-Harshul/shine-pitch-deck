import { List } from "lucide-react";
import { usePresentation } from "@/contexts/PresentationContext";

export const AppendixBackToTOC = () => {
  const { goToSlide, contentSlideCount } = usePresentation();
  const appendixTOCIndex = contentSlideCount + 1;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        goToSlide(appendixTOCIndex);
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted/80 hover:bg-muted border border-border hover:border-primary/30 transition-colors"
    >
      <List className="w-4 h-4" />
      Back to table of contents
    </button>
  );
};

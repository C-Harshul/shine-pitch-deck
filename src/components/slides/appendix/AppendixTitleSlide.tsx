import Slide from "@/components/Slide";
import { usePresentation } from "@/contexts/PresentationContext";
import { ChevronRight } from "lucide-react";

const APPENDIX_TOC = [
  { title: "T-shaped intelligence", indexOffset: 1 },
  { title: "Strategic positioning & user", indexOffset: 2 },
  { title: "Fellowship timeline", indexOffset: 3 },
  { title: "Team", indexOffset: 4 },
  { title: "Resources & support", indexOffset: 5 },
  { title: "Variance equation & capacity maths", indexOffset: 6 },
  { title: "Detailed feature animations", indexOffset: 7 },
  { title: "Full report (PDF)", indexOffset: 8 },
];

const AppendixTitleSlide = () => {
  const { goToSlide, contentSlideCount } = usePresentation();
  const appendixStartIndex = contentSlideCount + 1;

  return (
    <Slide variant="centered">
      <div className="max-w-4xl mx-auto w-full">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
          Appendix
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
          Additional detail from the <span className="text-primary">Conrades proposal</span>
        </h2>
        <p className="text-muted-foreground text-xl mb-10">
          Table of contents — click to jump to a section
        </p>

        <nav className="space-y-2" onClick={(e) => e.stopPropagation()}>
          {APPENDIX_TOC.map((item, i) => {
            const slideIndex = appendixStartIndex + item.indexOffset;
            return (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(slideIndex);
                }}
                className="w-full flex items-center justify-between gap-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 px-5 py-4 text-left transition-colors group"
              >
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
              </button>
            );
          })}
        </nav>
      </div>
    </Slide>
  );
};

export default AppendixTitleSlide;

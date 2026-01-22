import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PresentationProps {
  children: React.ReactNode[];
}

const Presentation = ({ children }: PresentationProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const totalSlides = children.length;

  const goToSlide = useCallback((index: number, dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1, "next");
    }
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1, "prev");
    }
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Click to advance
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't advance if clicking on interactive elements
    if (target.closest("button") || target.closest("a")) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    
    // Click on left 20% goes back, rest goes forward
    if (clickX < rect.width * 0.2) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-background relative cursor-pointer"
      onClick={handleClick}
    >
      {/* Slide container */}
      <div className="relative h-full w-full">
        {children.map((child, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-all duration-600 ease-out",
              index === currentSlide 
                ? "opacity-100 translate-x-0 pointer-events-auto" 
                : index < currentSlide
                  ? "opacity-0 -translate-x-full pointer-events-none"
                  : "opacity-0 translate-x-full pointer-events-none"
            )}
            style={{
              transitionDuration: "600ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className={cn(
          "absolute left-6 top-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full flex items-center justify-center",
          "bg-card/50 border border-border/50 backdrop-blur-sm",
          "transition-all duration-300 hover:bg-card hover:border-primary/30",
          currentSlide === 0 && "opacity-30 pointer-events-none"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className={cn(
          "absolute right-6 top-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full flex items-center justify-center",
          "bg-card/50 border border-border/50 backdrop-blur-sm",
          "transition-all duration-300 hover:bg-card hover:border-primary/30",
          currentSlide === totalSlides - 1 && "opacity-30 pointer-events-none"
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { 
              e.stopPropagation(); 
              goToSlide(index, index > currentSlide ? "next" : "prev"); 
            }}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentSlide 
                ? "w-8 bg-primary" 
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 z-50 text-sm text-muted-foreground font-medium">
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Click hint */}
      <div className="absolute bottom-8 left-8 z-50 text-xs text-muted-foreground/50">
        Click to advance • Arrow keys to navigate
      </div>
    </div>
  );
};

export default Presentation;

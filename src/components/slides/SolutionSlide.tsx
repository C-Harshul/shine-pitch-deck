import { Zap } from "lucide-react";
import Slide from "@/components/Slide";

const SolutionSlide = () => {
  return (
    <Slide variant="centered">
      <div className="max-w-4xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          The Solution
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-up delay-100">
          Introducing Numina
        </h2>
        
        <p className="text-2xl md:text-3xl text-gradient font-semibold mt-4 animate-fade-up delay-200">
          The AI layer for continuous financial closing
        </p>

        <div className="feature-card max-w-2xl mx-auto mt-12 p-10 animate-fade-up delay-300">
          <div className="step-number mx-auto mb-6">
            <Zap className="w-5 h-5" />
          </div>
          
          <p className="text-xl">
            We don't replace systems like QuickBooks.
          </p>
          <p className="text-xl text-primary font-medium mt-2">
            We replace the manual chase that happens around them.
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default SolutionSlide;

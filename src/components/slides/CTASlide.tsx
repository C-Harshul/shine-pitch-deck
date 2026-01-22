import { ArrowRight, Sparkles } from "lucide-react";
import Slide from "@/components/Slide";

const CTASlide = () => {
  return (
    <Slide variant="centered">
      <div className="max-w-4xl mx-auto">
        <span className="pill mb-8 animate-fade-up">
          <Sparkles className="w-3 h-3" />
          Let's Connect
        </span>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-up delay-100">
          Let's build the future
          <br />
          <span className="text-gradient">of advisory, together.</span>
        </h2>

        <p className="text-xl text-muted-foreground mt-8 mb-12 animate-fade-up delay-200">
          Schedule a private demo to see our platform in action.
        </p>

        <div className="flex flex-wrap justify-center gap-4 animate-fade-up delay-300">
          <button className="btn-primary group text-lg px-10 py-4">
            Schedule Demo
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-border/30 animate-fade-up delay-400">
          <p className="text-2xl font-bold text-gradient">numina.ai</p>
        </div>
      </div>
    </Slide>
  );
};

export default CTASlide;

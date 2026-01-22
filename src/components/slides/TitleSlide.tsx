import { Sparkles } from "lucide-react";
import Slide from "@/components/Slide";

const TitleSlide = () => {
  return (
    <Slide variant="centered">
      <div className="max-w-4xl mx-auto">
        <span className="pill mb-8 animate-fade-up">
          <Sparkles className="w-3 h-3" />
          Investor Deck
        </span>

        <h1 className="headline animate-fade-up delay-100">
          <span className="text-gradient text-6xl md:text-7xl lg:text-8xl">Numina</span>
        </h1>

        <p className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground mt-8 animate-fade-up delay-200">
          Real-Time Financial Intelligence
          <br />
          for the Small Business
        </p>

        <div className="mt-12 pt-8 border-t border-border/30 animate-fade-up delay-300">
          <p className="text-lg text-muted-foreground">
            Making every small business a firm's best client.
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default TitleSlide;

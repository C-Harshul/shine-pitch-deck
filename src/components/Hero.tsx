import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="section relative overflow-hidden bg-radial">
      <div className="bg-grid absolute inset-0 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="animate-fade-up">
          <span className="pill mb-8">
            <Sparkles className="w-3 h-3" />
            Now in Beta
          </span>
        </div>

        <h1 className="headline animate-fade-up delay-100">
          <span className="text-foreground">Real-Time Financial</span>
          <br />
          <span className="text-gradient">Intelligence</span>
          <br />
          <span className="text-muted-foreground">for the Small Business</span>
        </h1>

        <p className="subtitle mt-8 animate-fade-up delay-200">
          Making every small business a firm's best client. Numina does the grunt 
          work so you can serve more clients profitably.
        </p>

        <div className="flex flex-wrap gap-4 mt-12 animate-fade-up delay-300">
          <button className="btn-primary group">
            Join the Beta
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="btn-ghost">
            Watch Demo
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-6 animate-fade-up delay-400">
          Free pilot for qualified CPAs
        </p>
      </div>
    </section>
  );
};

export default Hero;

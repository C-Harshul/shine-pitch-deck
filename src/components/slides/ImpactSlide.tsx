import Slide from "@/components/Slide";

const ImpactSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Impact
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mb-12 animate-fade-up delay-100">
          Transform firm economics
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="feature-card text-center animate-fade-up delay-200">
            <div className="text-sm text-muted-foreground mb-2">Clients per CPA</div>
            <div className="flex items-center justify-center gap-4 my-4">
              <span className="text-2xl text-muted-foreground">10-15</span>
              <span className="text-2xl text-primary">→</span>
              <span className="text-3xl font-bold">20-30</span>
            </div>
            <div className="text-4xl font-bold text-gradient">2x</div>
          </div>

          <div className="feature-card text-center animate-fade-up delay-300">
            <div className="text-sm text-muted-foreground mb-2">Revenue per month</div>
            <div className="flex items-center justify-center gap-4 my-4">
              <span className="text-2xl text-muted-foreground">$30K-60K</span>
              <span className="text-2xl text-primary">→</span>
              <span className="text-3xl font-bold">$60K-120K</span>
            </div>
            <div className="text-4xl font-bold text-gradient">2x</div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ImpactSlide;

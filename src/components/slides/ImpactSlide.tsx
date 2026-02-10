import Slide from "@/components/Slide";

const ImpactSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Economic Impact
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up delay-100">
          Revenue grows through throughput, not hours
        </h2>

        <p className="text-muted-foreground text-lg mb-10 max-w-3xl animate-fade-up delay-150">
          When each accountant can sustainably serve more clients at the same SLA, firm revenue scales without adding headcount or overtime.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="feature-card text-center animate-fade-up delay-200">
            <div className="text-sm text-muted-foreground mb-2">Sustainable clients per accountant</div>
            <div className="flex items-center justify-center gap-4 my-4">
              <span className="text-2xl text-muted-foreground">10–15</span>
              <span className="text-2xl text-primary">→</span>
              <span className="text-3xl font-bold">20–30</span>
            </div>
            <div className="text-4xl font-bold text-gradient">2×</div>
          </div>

          <div className="feature-card text-center animate-fade-up delay-300">
            <div className="text-sm text-muted-foreground mb-2">Revenue per accountant / month</div>
            <div className="flex items-center justify-center gap-4 my-4">
              <span className="text-2xl text-muted-foreground">$30K–60K</span>
              <span className="text-2xl text-primary">→</span>
              <span className="text-3xl font-bold">$60K–120K</span>
            </div>
            <div className="text-4xl font-bold text-gradient">2×</div>
          </div>
        </div>

        <p className="text-muted-foreground/60 text-xs text-center mt-8 animate-fade-up delay-400">
          Capacity gains driven by variance reduction and exception elimination—not longer work weeks.
        </p>
      </div>
    </Slide>
  );
};

export default ImpactSlide;

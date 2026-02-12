import Slide from "@/components/Slide";

const ImpactSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-base font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Economic Impact
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-up delay-100">
          Revenue grows with <span className="text-primary">increased capacity</span>
        </h2>

        <p className="text-muted-foreground text-xl mb-10 max-w-3xl animate-fade-up delay-150">
          When each accountant can sustainably serve more clients at the same SLA, firm revenue scales without adding headcount or overtime.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="feature-card text-center animate-fade-up delay-200 p-8">
            <div className="text-base text-muted-foreground mb-3">Sustainable clients per accountant</div>
            <div className="flex items-center justify-center gap-4 my-5">
              <span className="text-3xl text-muted-foreground">10–15</span>
              <span className="text-3xl text-primary">→</span>
              <span className="text-4xl font-bold">20–30</span>
            </div>
          </div>

          <div className="feature-card text-center animate-fade-up delay-300 p-8">
            <div className="text-base text-muted-foreground mb-3">Revenue per accountant / month</div>
            <div className="flex items-center justify-center gap-4 my-5">
              <span className="text-3xl text-muted-foreground">$30K–60K</span>
              <span className="text-3xl text-primary">→</span>
              <span className="text-4xl font-bold">$60K–120K</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground/60 text-sm text-center mt-8 animate-fade-up delay-400">
          Capacity gains driven by variance reduction and exception elimination, not longer work weeks.
        </p>
      </div>
    </Slide>
  );
};

export default ImpactSlide;

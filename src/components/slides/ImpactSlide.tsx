import Slide from "@/components/Slide";

const ImpactSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-base font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Monetisation Strategy
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-up delay-100">
          <span className="text-primary">Value based pricing</span> tied to firm revenue
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-3xl animate-fade-up delay-150">
          We're determining the optimal pricing model and percentage. This approach aligns our incentives with CPA firm success.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="feature-card text-center animate-fade-up delay-200 p-8">
            <div className="text-base text-foreground mb-3">Revenue per firm / month</div>
            <div className="flex items-center justify-center gap-4 my-5">
              <span className="text-3xl text-foreground">$30K–60K</span>
              <span className="text-3xl text-primary">→</span>
              <span className="text-4xl font-bold text-foreground">$60K–120K</span>
            </div>
          </div>

          <div className="feature-card text-center animate-fade-up delay-300 p-8">
            <div className="text-base text-foreground mb-3">
              Our approach<span className="text-primary font-bold">?</span>
            </div>
            <div className="flex items-center justify-center my-5">
              <span className="text-4xl font-bold">$3K–6K per firm</span>
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              At just 10% of captured value
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ImpactSlide;

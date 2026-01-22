import Slide from "@/components/Slide";

const ProblemSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          The Problem
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-fade-up delay-100">
          A market failure:
          <br />
          <span className="text-muted-foreground">
            The businesses that need CPAs most
            <br />
            can't be profitably served
          </span>
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-8 animate-fade-up delay-200">
          <div className="feature-card">
            <div className="text-5xl font-bold text-primary mb-4">60-70%</div>
            <p className="text-muted-foreground">
              of CPA time spent on validation and error correction
            </p>
          </div>
          
          <div className="feature-card">
            <div className="text-5xl font-bold text-primary mb-4">15-25 hrs</div>
            <p className="text-muted-foreground">
              per month spent on reconciliation alone
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ProblemSlide;

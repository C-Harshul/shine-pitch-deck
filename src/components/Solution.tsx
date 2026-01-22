import { Zap } from "lucide-react";

const Solution = () => {
  return (
    <section className="section bg-radial">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            The Solution
          </span>
          <h2 className="headline text-3xl md:text-4xl lg:text-5xl mx-auto max-w-4xl">
            Introducing Numina:
            <br />
            <span className="text-gradient">The AI layer for continuous financial closing</span>
          </h2>
        </div>

        <div className="feature-card max-w-4xl mx-auto text-center p-12">
          <div className="step-number mx-auto mb-8">
            <Zap className="w-5 h-5" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            We don't replace systems like QuickBooks
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            We replace the <span className="text-primary">manual chase</span> that happens around them.
          </p>
          
          <div className="border-t border-border/50 pt-8">
            <p className="text-muted-foreground">
              Instead of month-end crunch time, Numina delivers <span className="text-foreground font-medium">real-time closing</span>, 
              where transactions are captured, validated, and reconciled as they occur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;

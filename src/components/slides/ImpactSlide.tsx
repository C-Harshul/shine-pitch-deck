import Slide from "@/components/Slide";
import { ArrowRight, ShoppingCart, Utensils, User, Briefcase, ArrowUp, DollarSign } from "lucide-react";

const ImpactSlide = () => {
  return (
    <Slide>
      <div className="max-w-7xl mx-auto w-full">
        <span className="text-primary text-base font-medium tracking-widest uppercase mb-4 block animate-fade-up">
          Business Model
        </span>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 animate-fade-up delay-100 max-w-5xl leading-tight">
          Numina's <span className="text-primary">breadth</span> + CPA's <span className="text-primary">depth</span>
        </h2>

        <div className="grid grid-cols-12 gap-6 items-center mt-8">
          {/* Left side — Service model T-shape */}
          <div className="col-span-12 lg:col-span-7 animate-fade-up delay-200">
            <div className="relative rounded-2xl border-2 border-dashed border-primary/40 p-6 pt-10">
              <span className="absolute -top-3 left-6 bg-background px-3 text-sm font-medium tracking-widest uppercase text-primary">
                Service Model
              </span>

              <div className="flex flex-col items-center gap-0">
                {/* Horizontal bar — Numina (Breadth) */}
                <div className="w-full">
                  <div className="feature-card p-5 text-center bg-primary/10 border-primary/40">
                    <div className="text-2xl font-bold text-foreground">Numina</div>
                    <div className="text-sm text-muted-foreground mt-1">Orchestration engine</div>
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-3 mb-1">
                    <span className="text-primary text-xl">←</span>
                    <span className="text-primary text-lg font-bold tracking-widest uppercase">Breadth</span>
                    <span className="text-primary text-xl">→</span>
                  </div>
                </div>

                {/* Vertical bar — Accountants (Depth) */}
                <div className="flex items-stretch gap-4 mt-2">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-primary text-lg font-bold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
                      Depth
                    </span>
                    <span className="text-primary text-xl mt-2">↓</span>
                  </div>
                  <div className="feature-card p-8 text-center bg-primary/5 border-primary/30 w-64 min-h-[280px] flex flex-col justify-center relative">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary">
                      <ArrowUp className="w-8 h-8" strokeWidth={2.5} />
                      <div className="flex items-center gap-1 text-xs font-bold tracking-widest uppercase whitespace-nowrap mt-1">
                        <DollarSign className="w-3.5 h-3.5" strokeWidth={2.5} />
                        Increased capacity + top line
                      </div>
                    </div>
                    <div className="text-xl font-bold text-foreground">Accountants / CPAs</div>
                    <div className="text-sm text-muted-foreground mt-2">Domain experts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex col-span-1 items-center justify-center animate-fade-up delay-300">
            <ArrowRight className="w-12 h-12 text-primary" strokeWidth={2.5} />
          </div>

          {/* Right side — SMBs */}
          <div className="col-span-12 lg:col-span-4 animate-fade-up delay-300">
            <div className="feature-card p-5">
              <div className="text-center mb-4">
                <div className="text-xl font-bold text-foreground">SMBs</div>
                <div className="text-sm text-muted-foreground">End beneficiary</div>
              </div>
              <div className="space-y-2">
                {[
                  { icon: ShoppingCart, label: "E-commerce" },
                  { icon: Utensils, label: "Restaurants" },
                  { icon: User, label: "Freelancers" },
                  { icon: Briefcase, label: "Professional services" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ImpactSlide;

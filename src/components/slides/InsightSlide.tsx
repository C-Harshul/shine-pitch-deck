import Slide from "@/components/Slide";

const InsightSlide = () => {
  return (
    <Slide>
      <div className="max-w-6xl mx-auto w-full">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-8 block animate-fade-up">
          The Insight That Started Numina
        </span>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Quote Card */}
          <div className="animate-fade-up delay-100">
            <div className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm p-8 md:p-10 relative">
              <div className="text-primary/30 text-7xl font-serif leading-none absolute top-4 left-6">"</div>
              <blockquote className="relative z-10 pt-8">
                <p className="text-xl md:text-2xl lg:text-[1.65rem] font-medium leading-relaxed text-foreground/90 tracking-tight">
                  I'm{" "}
                  <span className="text-primary font-semibold">
                    turning away paying clients
                  </span>
                  , not because of demand, but because we don't have the{" "}
                  <span className="text-primary font-semibold">
                    capacity to handle more messy books
                  </span>
                  .
                </p>
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-muted border border-border flex items-center justify-center">
                  <span className="text-muted-foreground text-xs font-medium">Photo</span>
                </div>
                <div>
                  <div className="text-foreground font-semibold text-base">Edward Collins, CPA</div>
                  <div className="text-muted-foreground text-sm">United States</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Context */}
          <div className="animate-fade-up delay-200 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              A real constraint,{" "}
              <span className="text-muted-foreground">not an abstract idea</span>
            </h3>

            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Small and mid-sized accounting firms are{" "}
                <span className="text-foreground font-medium">capacity-constrained</span>{" "}
                despite strong demand. The bottleneck isn't talent — it's the quality of incoming data.
              </p>
              <p>
                Smaller businesses produce unstructured, messy financial records that require{" "}
                <span className="text-foreground font-medium">disproportionate time</span>{" "}
                to reconcile and validate.
              </p>
              <p>
                This creates a hard capacity ceiling and directly results in{" "}
                <span className="text-foreground font-medium">lost revenue</span>{" "}
                — firms literally turn away paying clients.
              </p>
              <p>
                Numina is being built to remove this constraint, with{" "}
                <span className="text-foreground font-medium">accounting firms validating the solution</span>{" "}
                as it's developed.
              </p>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground italic">
                We didn't start with a solution looking for a problem. We started with a real,
                revenue-impacting constraint — and we're building with practitioners to solve it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default InsightSlide;

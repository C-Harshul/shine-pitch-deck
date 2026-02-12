import Slide from "@/components/Slide";

const InsightSlide = () => {
  return (
    <Slide>
      <div className="max-w-6xl mx-auto w-full">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-8 block animate-fade-up text-center">
          The Insight That Started Numina
        </span>

        <div className="max-w-5xl mx-auto">
          {/* Quote Card */}
          <div className="animate-fade-up delay-100">
            <div className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm p-10 md:p-14 lg:p-16 relative">
              <div className="text-primary/30 text-8xl md:text-9xl font-serif leading-none absolute top-6 left-8">"</div>
              <blockquote className="relative z-10 pt-10 md:pt-12">
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-foreground/90 tracking-tight">
                  I'm{" "}
                  <span className="text-primary font-semibold">
                    turning away paying clients
                  </span>
                  , because we don't have the{" "}
                  <span className="text-primary font-semibold">
                    capacity to handle more messy books
                  </span>
                  .
                </p>
              </blockquote>

              <div className="mt-10 md:mt-12 flex items-center gap-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-border flex-shrink-0">
                  <img 
                    src="/edward-collins.jpg" 
                    alt="Edward Collins, CPA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-foreground font-semibold text-lg">Edward Collins, CPA</div>
                  <div className="text-muted-foreground text-base">United States</div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-12 max-w-2xl mx-auto text-center text-muted-foreground text-base md:text-lg leading-relaxed animate-fade-up delay-200">
            We didn't build a solution and then try to sell it. From the outset, we spoke with industry stakeholders to understand their problems and built specifically for their needs.
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default InsightSlide;

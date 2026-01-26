import Slide from "@/components/Slide";

const MarketExpansionSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Market Expansion
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-left animate-fade-up delay-100">
          Market expansion for the accountants
        </h2>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-left max-w-3xl animate-fade-up delay-150">
          A market that was previously unserviceable
          <br />
          is now accessible with Numina
        </p>

        <div className="flex items-center justify-center gap-8 md:gap-12 my-12 animate-fade-up delay-200">
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <span className="text-sm md:text-base font-bold text-primary">Enterprise</span>
            </div>
          </div>
          <span className="text-3xl md:text-4xl text-primary">→</span>
          <div className="flex flex-col items-center gap-4">
            <div className="w-72 h-72 md:w-[500px] md:h-[500px] rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-primary">SMBs +</div>
                <div className="text-lg md:text-2xl font-bold text-primary">Enterprise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default MarketExpansionSlide;

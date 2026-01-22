import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="section">
      <div className="max-w-4xl mx-auto text-center">
        <div className="feature-card p-12 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial pointer-events-none" />
          
          <div className="relative z-10">
            <span className="pill mb-8 inline-flex">
              <Sparkles className="w-3 h-3" />
              Limited spots available
            </span>

            <h2 className="headline text-3xl md:text-4xl lg:text-5xl mb-6">
              Ready to take on
              <br />
              <span className="text-gradient">more clients?</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Free pilot for qualified CPAs. We prove the ROI before you pay.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary group">
                Join the Beta
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="btn-ghost">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

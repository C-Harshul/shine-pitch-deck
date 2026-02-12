import Slide from "@/components/Slide";

const VisionSlide = () => {
  return (
    <Slide variant="centered">
      <div className="max-w-4xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Vision
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-up delay-100">
          The future of accounting is{" "}
          <span className="text-primary">Realtime Closing</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="feature-card text-left animate-fade-up delay-200">
            <div className="text-muted-foreground/50 text-sm uppercase tracking-widest mb-2">Past</div>
            <h3 className="text-2xl font-bold text-muted-foreground">Manual & Reactive</h3>
          </div>
          
          <div className="feature-card text-left animate-fade-up delay-300">
            <div className="text-primary text-sm uppercase tracking-widest mb-2">Future</div>
            <h3 className="text-2xl font-bold">Automated and proactive</h3>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mt-12 animate-fade-up delay-400">
          Empowering CPAs to transition from reactive data entry to proactive strategic advisory.
        </p>
      </div>
    </Slide>
  );
};

export default VisionSlide;

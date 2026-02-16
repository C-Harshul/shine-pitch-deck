import Slide from "@/components/Slide";

const TitleSlide = () => {
  return (
    <Slide variant="centered">
      <div className="max-w-4xl mx-auto">
        <h1 className="headline animate-fade-up delay-100 text-center">
          <span className="text-gradient text-6xl md:text-7xl lg:text-8xl">NUMINA</span>
        </h1>

        <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mt-8 animate-fade-up delay-200">
          The future of accounting is{" "}
          <span className="text-primary">Realtime Closing</span>
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12 animate-fade-up delay-300">
          <div className="feature-card text-left p-6">
            <div className="text-muted-foreground/50 text-sm uppercase tracking-widest mb-2">Past</div>
            <h3 className="text-2xl font-bold text-muted-foreground">Manual & reactive</h3>
          </div>
          <div className="feature-card text-left p-6">
            <div className="text-primary text-sm uppercase tracking-widest mb-2">Future</div>
            <h3 className="text-2xl font-bold">Automated & proactive</h3>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default TitleSlide;

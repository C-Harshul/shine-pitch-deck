import Slide from "@/components/Slide";

const TitleSlide = () => {
  return (
    <Slide variant="centered">
      <div className="max-w-4xl mx-auto">
        <h1 className="headline animate-fade-up delay-100">
          <span className="text-gradient text-6xl md:text-7xl lg:text-8xl">Numina</span>
        </h1>

        <p className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground mt-8 animate-fade-up delay-200">
          Agents for Real-Time Closing
        </p>

        <div className="mt-12 pt-8 border-t border-border/30 animate-fade-up delay-300">
          <p className="text-lg text-muted-foreground">
            Making every small business a firm's best client.
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default TitleSlide;

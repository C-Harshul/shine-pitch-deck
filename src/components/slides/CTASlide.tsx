import Slide from "@/components/Slide";

const CTASlide = () => {
  return (
    <Slide variant="centered">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-up delay-100">
          Help us build the future of accounting with
          <br />
          <span className="text-primary">Realtime Closing</span>
        </h2>

        <div className="mt-16 pt-8 border-t border-border/30 animate-fade-up delay-200 text-center space-y-6">
          <a
            href="https://www.numina-ai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-bold text-primary hover:underline block"
          >
            numina-ai.com
          </a>
          <img
            src={`${import.meta.env.BASE_URL}athena.png`}
            alt="Athena"
            className="w-20 h-20 md:w-24 md:h-24 object-contain mx-auto"
          />
        </div>
      </div>
    </Slide>
  );
};

export default CTASlide;

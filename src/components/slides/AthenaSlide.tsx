import Slide from "@/components/Slide";

const AthenaSlide = () => {
  return (
    <Slide variant="centered">
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] gap-8">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
          NUMINA
        </h2>
        <img
          src={`${import.meta.env.BASE_URL}athena.png`}
          alt="Athena"
          className="w-52 h-52 md:w-64 md:h-64 object-contain"
        />
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center text-foreground max-w-2xl">
          The Future of accounting is Realtime Closing
        </p>
      </div>
    </Slide>
  );
};

export default AthenaSlide;

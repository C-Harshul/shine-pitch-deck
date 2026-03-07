import Slide from "@/components/Slide";

const AthenaSlide = () => {
  return (
    <Slide variant="centered">
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] gap-6">
        <img
          src={`${import.meta.env.BASE_URL}numina-logo.png`}
          alt="NUMINA"
          className="h-12 md:h-16 object-contain"
        />
        <img
          src={`${import.meta.env.BASE_URL}athena.png`}
          alt="Athena"
          className="w-52 h-52 md:w-64 md:h-64 object-contain"
        />
        <p className="text-xl md:text-2xl font-semibold text-center text-foreground">
          The Future of accounting is Realtime Closing
        </p>
      </div>
    </Slide>
  );
};

export default AthenaSlide;

import Slide from "@/components/Slide";

const AthenaSlide = () => {
  return (
    <Slide variant="centered">
      <div className="flex items-center justify-center w-full min-h-[60vh]">
        <img
          src={`${import.meta.env.BASE_URL}athena.png`}
          alt="Athena"
          className="w-52 h-52 md:w-64 md:h-64 object-contain"
        />
      </div>
    </Slide>
  );
};

export default AthenaSlide;

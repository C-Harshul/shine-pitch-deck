import Presentation from "@/components/Presentation";
import TitleSlide from "@/components/slides/TitleSlide";
import ProblemSlide from "@/components/slides/ProblemSlide";
import PainPointsSlide from "@/components/slides/PainPointsSlide";
import SolutionSlide from "@/components/slides/SolutionSlide";
import HowItWorksSlide from "@/components/slides/HowItWorksSlide";
import FeaturesSlide from "@/components/slides/FeaturesSlide";
import HockeyStickSlide from "@/components/slides/HockeyStickSlide";
import ControlSlide from "@/components/slides/ControlSlide";
import ImpactSlide from "@/components/slides/ImpactSlide";
import MarketExpansionSlide from "@/components/slides/MarketExpansionSlide";
import GTMSlide from "@/components/slides/GTMSlide";
import VisionSlide from "@/components/slides/VisionSlide";
import SummarySlide from "@/components/slides/SummarySlide";
import CTASlide from "@/components/slides/CTASlide";

const Index = () => {
  return (
    <Presentation>
      <TitleSlide />
      <ProblemSlide />
      <PainPointsSlide />
      <SolutionSlide />
      <HowItWorksSlide />
      <FeaturesSlide />
      <ControlSlide />
      <HockeyStickSlide />
      <ImpactSlide />
      <MarketExpansionSlide />
      <GTMSlide />
      <VisionSlide />
      <SummarySlide />
      <CTASlide />
    </Presentation>
  );
};

export default Index;

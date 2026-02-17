import Presentation from "@/components/Presentation";
import { FeatureModalsProvider } from "@/contexts/FeatureModalsContext";
import FeatureModals from "@/components/FeatureModals";
import AthenaSlide from "@/components/slides/AthenaSlide";
import TitleSlide from "@/components/slides/TitleSlide";
import InsightSlide from "@/components/slides/InsightSlide";
import ProblemSlide from "@/components/slides/ProblemSlide";
import PainPointsSlide from "@/components/slides/PainPointsSlide";
import SolutionSlide from "@/components/slides/SolutionSlide";
import HowItWorksSlide from "@/components/slides/HowItWorksSlide";
import FeaturesSlide from "@/components/slides/FeaturesSlide";
import HockeyStickSlide from "@/components/slides/HockeyStickSlide";
import ControlSlide from "@/components/slides/ControlSlide";
import ImpactSlide from "@/components/slides/ImpactSlide";
import MarketExpansionSlide from "@/components/slides/MarketExpansionSlide";
import MomentumSlide from "@/components/slides/MomentumSlide";
import CTASlide from "@/components/slides/CTASlide";
import AppendixTitleSlide from "@/components/slides/appendix/AppendixTitleSlide";
import TShapedSlide from "@/components/slides/appendix/TShapedSlide";
import StrategicPositioningSlide from "@/components/slides/appendix/StrategicPositioningSlide";
import FellowshipTimelineSlide from "@/components/slides/appendix/FellowshipTimelineSlide";
import TeamSlide from "@/components/slides/appendix/TeamSlide";
import ResourcesSlide from "@/components/slides/appendix/ResourcesSlide";
import VarianceEquationSlide from "@/components/slides/appendix/VarianceEquationSlide";
import DetailedAnimationsSlide from "@/components/slides/appendix/DetailedAnimationsSlide";
import ReportLinkSlide from "@/components/slides/appendix/ReportLinkSlide";

const Index = () => {
  return (
    <FeatureModalsProvider>
      <Presentation contentSlideCount={13}>
        <AthenaSlide />
        <TitleSlide />
        <InsightSlide />
        <ProblemSlide />
        <PainPointsSlide />
        <SolutionSlide />
        <HowItWorksSlide />
        <FeaturesSlide />
        <ControlSlide />
        <HockeyStickSlide />
        <MarketExpansionSlide />
        <ImpactSlide />
        <MomentumSlide />
        <CTASlide />
        {/* Appendix */}
        <AppendixTitleSlide />
        <TShapedSlide />
        <StrategicPositioningSlide />
        <FellowshipTimelineSlide />
        <TeamSlide />
        <ResourcesSlide />
        <VarianceEquationSlide />
        <DetailedAnimationsSlide />
        <ReportLinkSlide />
      </Presentation>
      <FeatureModals />
    </FeatureModalsProvider>
  );
};

export default Index;

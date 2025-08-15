import HeroSection from "../components/section/HeroSection"
import ProcessSection from "../components/section/ProcessSection";
import ServiceSection from "../components/section/ServiceSection";
import PortfolioSection from "../components/section/PortfolioSection";
import ContactSection from "../components/section/ContactSection";
import ReviewSection from "../components/section/ReviewSection";
import ServicePackages from "../components/section/package";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <ProcessSection />
      <ServicePackages/>
      <ReviewSection />
      <PortfolioSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
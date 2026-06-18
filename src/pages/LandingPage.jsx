import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import AnalyticsSection from "../components/home/AnalyticsSection";
import Header from "../components/header";
import Footer from "../components/footer";

function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-base-200 text-base-content">
      <Header />

      <div className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AnalyticsSection />
      </div>

      <Footer />
    </main>
  );
}

export default LandingPage;

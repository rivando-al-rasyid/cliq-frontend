import { useLoaderData } from "react-router";

import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import AnalyticsSection from "../components/home/AnalyticsSection";
import Header from "../components/header";
import Footer from "../components/footer";

function LandingPage() {
  const { user } = useLoaderData() || {};
  const isAuthenticated = Boolean(user);

  return (
    <main className="flex min-h-screen flex-col bg-base-200 text-base-content">
      <Header isAuthenticated={isAuthenticated} user={user} />

      <div className="flex-1">
        <HeroSection isAuthenticated={isAuthenticated} />
        <FeaturesSection />
        <AnalyticsSection />
      </div>

      <Footer />
    </main>
  );
}

export default LandingPage;

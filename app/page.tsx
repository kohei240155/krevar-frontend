import styles from "./page.module.css";
import HomePage from "./home/page";
import HeroSection from "../features/routes/layouts/components/HeroSection";
import StatsSection from "../features/routes/layouts/components/StatsSection";
import FAQSection from "../features/routes/layouts/components/FAQSection";
import FeatureSection from "../features/routes/layouts/components/FeatureSection";
import PricingSection from "../features/routes/layouts/components/PricingSection";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="space-y-12">
          <HeroSection />
          <StatsSection />
          <FeatureSection />
          <PricingSection />
          <FAQSection />
        </div>
      </main>
    </div>
  );
}

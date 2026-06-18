import { Check } from "lucide-react";
import heroImg from "../../assets/hero.png";

function AnalyticsSection() {
  return (
    <section className="bg-base-100">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-24 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl shadow-2xl">
          <img
            src={heroImg}
            alt="Analytics dashboard preview"
            className="h-85 w-full object-cover md:h-125"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-base-content/50">
            Data Driven Insights
          </p>

          <h2 className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-tight md:text-4xl">
            Observe your link architecture in real-time.
          </h2>

          <p className="mt-7 max-w-xl leading-7 text-base-content/60">
            Every click is a data point. Our dashboard provides surgical
            precision into where your traffic originates, who is engaging, and
            how your team communications are performing across the globe.
          </p>

          <ul className="mt-8 space-y-4 text-sm font-medium text-base-content">
            <li className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-content">
                <Check className="h-3 w-3" strokeWidth={4} />
              </span>
              Geographic Distribution Maps
            </li>

            <li className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-content">
                <Check className="h-3 w-3" strokeWidth={4} />
              </span>
              Device & Browser Breakdown
            </li>

            <li className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-content">
                <Check className="h-3 w-3" strokeWidth={4} />
              </span>
              UTM Parameter Tracking
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsSection;

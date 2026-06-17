import { useState } from "react";
import heroImg from "./assets/hero.png";

function App() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("URL to shorten:", url);
  };

  return (
    <main className="min-h-screen bg-base-200 text-base-content">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
        <nav className="navbar mx-auto max-w-7xl px-5">
          <div className="navbar-start">
            <a className="text-xl font-black tracking-tight">
              Short<span className="text-primary">Link</span>
            </a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-2 px-1 text-sm">
              <li>
                <a className="border-b-2 border-primary text-primary rounded-none">
                  Dashboard
                </a>
              </li>
              <li>
                <a className="text-base-content/50 hover:text-primary">
                  Analytics
                </a>
              </li>
              <li>
                <a className="text-base-content/50 hover:text-primary">Links</a>
              </li>
            </ul>
          </div>

          <div className="navbar-end gap-3">
            <button className="btn btn-ghost btn-sm hidden sm:inline-flex">
              Login
            </button>
            <button className="btn btn-primary btn-sm shadow-md">Logout</button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-5 py-24 text-center md:py-32">
        <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
          Shorten URLs. <span className="text-primary">Share Easily.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-base-content/60 md:text-lg">
          Create short, memorable links for your team communications. Transform
          long, cumbersome URLs into powerful digital assets that drive
          engagement.
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <button className="btn btn-primary px-8">Get Started</button>
          <button className="btn btn-outline border-base-300 px-8 text-primary hover:bg-primary hover:border-primary hover:text-primary-content">
            Learn More
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-16 w-full max-w-3xl rounded-2xl bg-base-100 p-3 shadow-xl ring-1 ring-base-300"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="input input-bordered flex flex-1 items-center gap-3 border-base-200 bg-base-200">
              <LinkIcon />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
                className="grow text-sm text-base-content placeholder:text-base-content/30"
              />
            </label>

            <button className="btn btn-primary px-8">Shorten</button>
          </div>
        </form>
      </section>

      {/* Features */}
      <section className="bg-base-300">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Architectural Features
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight">
            Built for Enterprise Precision
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<FlashIcon />}
              title="Easy Create"
              description="Instantly generate high-performance short links with a single click or through our surgical API endpoints."
              accent="primary"
            />

            <FeatureCard
              icon={<EditIcon />}
              title="Custom Slugs"
              description="Maintain brand authority with readable, custom link endings that resonate with your digital audience."
              accent="primary"
            />

            <FeatureCard
              icon={<TeamIcon />}
              title="Team Ready"
              description="Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards."
              accent="secondary"
            />
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className="bg-base-100">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-24 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl shadow-2xl">
            <img
              src={heroImg}
              alt="Analytics dashboard preview"
              className="h-[340px] w-full object-cover md:h-[500px]"
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
              <InsightItem text="Geographic Distribution Maps" />
              <InsightItem text="Device & Browser Breakdown" />
              <InsightItem text="UTM Parameter Tracking" />
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-base-300 bg-base-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-xs font-bold uppercase tracking-[0.25em] text-base-content/50 md:flex-row md:items-center md:justify-between">
          <p>© 2024 Shortlink. The Digital Architect.</p>

          <div className="flex flex-wrap gap-6">
            <a className="hover:text-primary">Privacy Policy</a>
            <a className="hover:text-primary">Terms of Service</a>
            <a className="hover:text-primary">API Documentation</a>
            <a className="hover:text-primary">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description, accent = "primary" }) {
  const isSecondary = accent === "secondary";

  return (
    <article className="card bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="card-body p-8">
        <div
          className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${
            isSecondary
              ? "bg-secondary/20 text-secondary"
              : "bg-primary/20 text-primary"
          }`}
        >
          {icon}
        </div>

        <h3 className="text-xl font-black">{title}</h3>

        <p className="mt-2 leading-7 text-base-content/60">{description}</p>

        <div
          className={`mt-5 h-1 w-12 rounded-full ${
            isSecondary ? "bg-secondary/40" : "bg-primary/40"
          }`}
        />
      </div>
    </article>
  );
}

function InsightItem({ text }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-content">
        <CheckIcon />
      </span>
      {text}
    </li>
  );
}

function LinkIcon() {
  return (
    <svg
      className="h-5 w-5 text-base-content/30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 7h10" />
      <path d="M4 12h7" />
      <path d="M4 17h5" />
      <path d="m16 15 2 2 4-4" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 11a4 4 0 1 0-8 0" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M17 20a4 4 0 0 0-3-3.87" />
      <path d="M18 8a3 3 0 1 1 0 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default App;

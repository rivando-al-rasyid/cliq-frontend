import { useState } from "react";
import { Link as LinkIcon } from "lucide-react";

function HeroSection() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("URL to shorten:", url);
  };

  return (
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
        <button className="btn btn-outline border-base-300 px-8 text-primary hover:border-primary hover:bg-primary hover:text-primary-content">
          Learn More
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-16 w-full max-w-3xl rounded-2xl bg-base-100 p-3 shadow-xl ring-1 ring-base-300"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="input input-bordered flex flex-1 items-center gap-3 border-base-200 bg-base-200">
            <LinkIcon className="h-5 w-5 text-base-content/30" />

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
  );
}

export default HeroSection;

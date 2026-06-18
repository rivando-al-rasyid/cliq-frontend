import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import LinkCard from "../components/LinkCard";
const links = [
  {
    shortUrl: "shrt.lnk/aB3x9",
    originalUrl: "https://www.architecturaldigest.com/story/modern-mini...",
    date: "OCT 24, 2023",
    clicks: "1.2K",
  },
  {
    shortUrl: "shrt.lnk/v9Pq2",
    originalUrl: "https://medium.com/design-ethics/the-future-of-headle...",
    date: "OCT 21, 2023",
    clicks: "842",
  },
  {
    shortUrl: "shrt.lnk/zR4t1",
    originalUrl: "https://github.com/frameworks/modern-stack-documen...",
    date: "OCT 19, 2023",
    clicks: "2.4K",
  },
  {
    shortUrl: "shrt.lnk/mL5k8",
    originalUrl: "https://dribbble.com/shots/21435678-Fintech-Dashboar...",
    date: "OCT 15, 2023",
    clicks: "341",
  },
];

function DashboardPage() {
  return (
    <section className="bg-base-200">
      <div className="mx-auto max-w-3xl px-5 py-10 md:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-base-content">
              My Links
            </h1>
            <p className="mt-2 text-sm text-base-content/70">
              Manage and track your shortened digital assets.
            </p>
          </div>

          <div className="text-left sm:text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-base-content/60">
              Total Active
            </p>
            <p className="mt-1 text-3xl font-black text-primary">124</p>
          </div>
        </div>

        <div className="mt-8 flex items-center rounded-xl border border-base-300 bg-base-100 px-4 shadow-sm">
          <Search className="h-5 w-5 text-base-content/40" />

          <input
            type="text"
            placeholder="Search by name or URL..."
            className="input w-full border-0 bg-transparent text-base focus:outline-none"
          />

          <button className="btn btn-ghost btn-sm">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 space-y-5">
          {links.map((link) => (
            <LinkCard key={link.shortUrl} link={link} />
          ))}
        </div>

        <div className="mt-14 flex items-center justify-between text-sm font-bold text-base-content/60">
          <button className="btn btn-ghost btn-sm gap-1 px-0">
            <ChevronLeft className="h-4 w-4" />
            Prev Page
          </button>

          <div className="flex items-center gap-5">
            <span className="rounded-lg bg-primary/10 px-3 py-2 font-black text-primary">
              1
            </span>
            <span>of</span>
            <span className="font-black text-base-content">5</span>
          </div>

          <button className="btn btn-ghost btn-sm gap-1 px-0">
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;

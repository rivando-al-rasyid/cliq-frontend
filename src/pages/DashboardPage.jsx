import {
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Link, useLoaderData } from "react-router";

import LinkCard from "../components/LinkCard";

function DashboardPage() {
  const {
    links = [],
    totalActive = 0,
    page = 1,
    totalPages = 1,
    error = "",
  } = useLoaderData() || {};

  const hasLinks = links.length > 0;
  const previousPage = Math.max(Number(page) - 1, 1);
  const nextPage = Math.min(Number(page) + 1, Number(totalPages));

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
            <p className="mt-1 text-3xl font-black text-primary">
              {totalActive}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center rounded-xl border border-base-300 bg-base-100 px-4 shadow-sm">
          <Search className="h-5 w-5 text-base-content/40" />

          <input
            type="text"
            placeholder="Search by name or URL..."
            className="input w-full border-0 bg-transparent text-base focus:outline-none"
          />

          <button className="btn btn-ghost btn-sm" type="button">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="alert alert-error mt-8">
            <span>{error}</span>
          </div>
        )}

        <div className="mt-10 space-y-5">
          {hasLinks ? (
            links.map((link) => <LinkCard key={link.id || link.slug} link={link} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LinkIcon className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-xl font-black">No links yet</h2>
              <p className="mt-2 text-sm text-base-content/60">
                Create your first short link and it will appear here.
              </p>

              <Link to="/dashboard/create" className="btn btn-primary mt-6">
                Create Link
              </Link>
            </div>
          )}
        </div>

        {hasLinks && (
          <div className="mt-14 flex items-center justify-between text-sm font-bold text-base-content/60">
            <Link
              to={`?page=${previousPage}`}
              className={`btn btn-ghost btn-sm gap-1 px-0 ${
                Number(page) <= 1 ? "pointer-events-none opacity-40" : ""
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Prev Page
            </Link>

            <div className="flex items-center gap-5">
              <span className="rounded-lg bg-primary/10 px-3 py-2 font-black text-primary">
                {page}
              </span>
              <span>of</span>
              <span className="font-black text-base-content">{totalPages}</span>
            </div>

            <Link
              to={`?page=${nextPage}`}
              className={`btn btn-ghost btn-sm gap-1 px-0 ${
                Number(page) >= Number(totalPages)
                  ? "pointer-events-none opacity-40"
                  : ""
              }`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default DashboardPage;

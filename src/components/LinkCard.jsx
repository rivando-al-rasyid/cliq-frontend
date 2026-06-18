import { BarChart3, Calendar, Copy, Link2, Trash2 } from "lucide-react";

function LinkCard({ link }) {
  return (
    <article className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-black text-primary">
            <Link2 className="h-4 w-4" />
            <p className="truncate">{link.shortUrl}</p>
          </div>

          <p className="mt-3 truncate text-sm text-base-content/70">
            {link.originalUrl}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-black uppercase tracking-[0.15em] text-base-content/40">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {link.date}
            </span>

            <span className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              {link.clicks} Clicks
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button className="btn btn-square btn-sm border-0 bg-primary/10 text-primary hover:bg-primary hover:text-primary-content">
            <Copy className="h-5 w-5" />
          </button>

          <button className="btn btn-square btn-sm btn-ghost text-base-content/40 hover:text-error">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default LinkCard;

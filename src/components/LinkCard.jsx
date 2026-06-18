import {
  BarChart3,
  Calendar,
  Copy,
  ExternalLink,
  Link2,
  Trash2,
} from "lucide-react";
import { Form } from "react-router";

import { showToast } from "../utils/sweetAlert";

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function formatClicks(value) {
  const clicks = Number(value) || 0;
  if (clicks >= 1000) return `${(clicks / 1000).toFixed(1)}K`;
  return String(clicks);
}

function LinkCard({ link }) {
  const shortUrl = link.short_url || link.shortUrl || "-";
  const originalUrl = link.origin_link || link.originalUrl || "-";
  const createdAt = link.created_at || link.date;
  const clicks = link.clicks ?? 0;
  const linkID = link.id;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => showToast("Short link copied to clipboard."))
      .catch(() => showToast("Copy failed. Please copy it manually.", "error"));
  };

  const confirmDelete = (event) => {
    if (!window.confirm("Delete this short link? This action will hide it from your dashboard.")) {
      event.preventDefault();
    }
  };

  return (
    <article className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-black text-primary">
            <Link2 className="h-4 w-4" />
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="truncate hover:underline"
            >
              {shortUrl}
            </a>
          </div>

          <p className="mt-3 truncate text-sm text-base-content/70">
            {originalUrl}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-black uppercase tracking-[0.15em] text-base-content/40">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(createdAt)}
            </span>

            <span className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              {formatClicks(clicks)} Clicks
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={originalUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-square btn-sm btn-ghost text-base-content/40 hover:text-primary"
            aria-label="Open original URL"
          >
            <ExternalLink className="h-5 w-5" />
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-square btn-sm border-0 bg-primary/10 text-primary hover:bg-primary hover:text-primary-content"
            aria-label="Copy short URL"
          >
            <Copy className="h-5 w-5" />
          </button>

          <Form
            method="delete"
            action={`/dashboard/links/${linkID}/delete`}
            onSubmit={confirmDelete}
          >
            <button
              type="submit"
              className="btn btn-square btn-sm btn-ghost text-base-content/40 hover:text-error"
              aria-label="Delete link"
              disabled={!linkID}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </Form>
        </div>
      </div>
    </article>
  );
}

export default LinkCard;

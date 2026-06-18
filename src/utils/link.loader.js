import { redirect } from "react-router";

import { apiRequest, extractApiData, parseApiResponse } from "./api";

export async function dashboardLinksLoader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const query = new URLSearchParams({ page, limit: "10" });

  const res = await apiRequest(`/link/dashboard?${query.toString()}`);

  if (res.status === 401 || res.status === 403) {
    const redirectTo = `${url.pathname}${url.search}`;
    throw redirect(`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  if (!res.ok) {
    return {
      links: [],
      totalActive: 0,
      totalClicks: 0,
      page: Number(page) || 1,
      totalPages: 1,
      error: "Failed to load dashboard links.",
    };
  }

  const result = await parseApiResponse(res);
  const data = extractApiData(result) || {};

  return {
    links: Array.isArray(data.links) ? data.links : [],
    totalActive: data.total_active ?? 0,
    totalClicks: data.total_clicks ?? 0,
    page: data.page ?? Number(page) ?? 1,
    totalPages: data.total_pages ?? 1,
  };
}

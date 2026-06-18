import { redirect } from "react-router";

import {
  API_URL,
  apiRequest,
  extractApiData,
  getApiMessage,
  parseApiResponse,
} from "./api";
import { getCurrentUser, rememberPendingUrl } from "./auth";

const RESERVED_SLUGS = new Set([
  "api",
  "login",
  "register",
  "dashboard",
  "auth",
  "link",
  "profile",
  "swagger",
  "img",
]);

function normalizeSlug(value) {
  return String(value || "").trim().replaceAll(" ", "-");
}

function validateSlug(value) {
  if (!value) return "";

  if (value.length < 3 || value.length > 50) {
    return "Slug must be 3-50 characters.";
  }

  if (!/^[A-Za-z0-9-]+$/.test(value)) {
    return "Slug can only contain letters, numbers, and hyphens.";
  }

  if (RESERVED_SLUGS.has(value.toLowerCase())) {
    return "This slug is reserved. Please use another slug.";
  }

  return "";
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function fallbackShortUrl(slug) {
  const baseUrl = import.meta.env.VITE_SHORT_URL_BASE || API_URL;
  return `${baseUrl.replace(/\/$/, "")}/${slug}`;
}

export async function homeShortenAction({ request }) {
  const formData = await request.formData();
  const destinationUrl = String(formData.get("destinationUrl") || "").trim();

  if (!destinationUrl) {
    return {
      error: "Destination URL is required.",
    };
  }

  if (!isValidHttpUrl(destinationUrl)) {
    return {
      error: "URL must start with http:// or https://",
    };
  }

  rememberPendingUrl(destinationUrl);

  const user = await getCurrentUser();

  if (user) {
    throw redirect("/dashboard/create");
  }

  return {
    authRequired: true,
    destinationUrl,
  };
}

export async function createLinkAction({ request }) {
  const formData = await request.formData();

  const destinationUrl = String(formData.get("destinationUrl") || "").trim();
  const customSlug = normalizeSlug(formData.get("slug"));

  if (!destinationUrl) {
    return {
      error: "Destination URL is required.",
    };
  }

  if (!isValidHttpUrl(destinationUrl)) {
    return {
      error: "URL must start with http:// or https://",
    };
  }

  const slugError = validateSlug(customSlug);
  if (slugError) {
    return {
      error: slugError,
    };
  }

  const body = {
    origin_link: destinationUrl,
  };

  if (customSlug) {
    body.slug = customSlug;
  }

  const res = await apiRequest("/link/create", {
    method: "POST",
    body,
  });

  if (res.status === 401 || res.status === 403) {
    throw redirect("/auth/login?redirectTo=/dashboard/create");
  }

  const result = await parseApiResponse(res);

  if (!res.ok || result?.isSuccess === false) {
    return {
      error: getApiMessage(result, "Failed to create short link."),
    };
  }

  const data = extractApiData(result) || {};
  const slug = data.slug || customSlug;

  return {
    success: true,
    destinationUrl: data.origin_link || destinationUrl,
    slug,
    shortUrl: data.short_url || fallbackShortUrl(slug),
  };
}

export async function deleteLinkAction({ params, request }) {
  const linkID = params.id;

  if (!linkID) {
    return {
      error: "Invalid link id.",
    };
  }

  const res = await apiRequest(`/link/${linkID}`, {
    method: "DELETE",
  });

  if (res.status === 401 || res.status === 403) {
    const url = new URL(request.url);
    throw redirect(`/auth/login?redirectTo=${encodeURIComponent(url.pathname)}`);
  }

  if (!res.ok) {
    const result = await parseApiResponse(res);
    return {
      error: getApiMessage(result, "Failed to delete link."),
    };
  }

  return redirect("/dashboard");
}

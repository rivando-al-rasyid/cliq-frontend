import { redirect } from "react-router";

import { isAuthenticated, rememberPendingUrl } from "./auth";

function createRandomSlug() {
  return Math.random().toString(36).slice(2, 8);
}

function normalizeSlug(value) {
  return String(value || "")
    .trim()
    .replaceAll(" ", "-")
    .toLowerCase();
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
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

  if (isAuthenticated()) {
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

  if (customSlug && !/^[a-z0-9-]+$/.test(customSlug)) {
    return {
      error: "Slug can only contain letters, numbers, and hyphens.",
    };
  }

  const slug = customSlug || createRandomSlug();
  const shortUrl = `https://short.link/${slug}`;

  // TODO: Replace this local result with your backend request when the endpoint is ready.
  // Example shape:
  // await fetch(`${API_URL}/links`, { method: "POST", body: JSON.stringify({ destinationUrl, slug }) })
  return {
    success: true,
    destinationUrl,
    slug,
    shortUrl,
  };
}

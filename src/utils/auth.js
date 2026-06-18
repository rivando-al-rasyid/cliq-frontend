import { redirect } from "react-router";

import { apiRequest, extractApiData, parseApiResponse } from "./api";

export function getSafeRedirectPath(value, fallback = "/dashboard") {
  if (!value || typeof value !== "string") return fallback;

  // Only allow internal redirects. This prevents redirecting users to another site
  // after login through a crafted redirectTo query string.
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;

  return value;
}

export async function getCurrentUser() {
  try {
    const res = await apiRequest("/auth/me");

    if (res.status === 401 || res.status === 403) return null;
    if (!res.ok) return null;

    const result = await parseApiResponse(res);

    if (result?.isSuccess === false) return null;

    const data = extractApiData(result);

    // Some APIs return { isSuccess: true, data: { user: ... } }, while others
    // return the user object directly. Keep this tolerant so the frontend is
    // not tightly coupled to one response shape.
    if (data && typeof data === "object" && data.user) return data.user;

    return data || null;
  } catch {
    return null;
  }
}

export async function optionalAuthLoader() {
  const user = await getCurrentUser();

  return { user };
}

export async function requireAuthLoader({ request }) {
  const user = await getCurrentUser();

  if (user) {
    return { user };
  }

  const currentUrl = new URL(request.url);
  const redirectTo = `${currentUrl.pathname}${currentUrl.search}`;

  throw redirect(`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`);
}

export async function guestOnlyLoader({ request }) {
  const user = await getCurrentUser();

  if (!user) return null;

  const currentUrl = new URL(request.url);
  const redirectTo = getSafeRedirectPath(
    currentUrl.searchParams.get("redirectTo"),
    "/dashboard",
  );

  throw redirect(redirectTo);
}

export function rememberPendingUrl(url) {
  if (typeof window === "undefined" || !url) return;
  window.sessionStorage.setItem("pendingDestinationUrl", url);
}

export function takePendingUrl() {
  if (typeof window === "undefined") return "";

  const url = window.sessionStorage.getItem("pendingDestinationUrl") || "";
  window.sessionStorage.removeItem("pendingDestinationUrl");

  return url;
}

export function setFlashMessage(key, message) {
  if (typeof window === "undefined" || !message) return;
  window.sessionStorage.setItem(`flash:${key}`, message);
}

export function takeFlashMessage(key) {
  if (typeof window === "undefined") return "";

  const message = window.sessionStorage.getItem(`flash:${key}`) || "";
  window.sessionStorage.removeItem(`flash:${key}`);

  return message;
}

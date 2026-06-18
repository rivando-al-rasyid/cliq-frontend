import { redirect } from "react-router";

export const TOKEN_KEY = "accessToken";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getAccessToken() {
  if (!canUseStorage()) return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token) {
  if (!canUseStorage() || !token) return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAccessToken() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export function getSafeRedirectPath(value, fallback = "/dashboard") {
  if (!value || typeof value !== "string") return fallback;

  // Only allow internal redirects. This prevents redirecting users to another site
  // after login through a crafted redirectTo query string.
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;

  return value;
}

export function requireAuthLoader({ request }) {
  if (isAuthenticated()) return null;

  const currentUrl = new URL(request.url);
  const redirectTo = `${currentUrl.pathname}${currentUrl.search}`;

  throw redirect(`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`);
}

export function guestOnlyLoader({ request }) {
  if (!isAuthenticated()) return null;

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

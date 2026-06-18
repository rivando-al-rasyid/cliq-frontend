export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function parseApiResponse(response) {
  const text = await response.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function getApiMessage(result, fallback = "Something went wrong.") {
  if (!result) return fallback;
  if (typeof result === "string") return result;

  return result.message || result.error || fallback;
}

export function extractApiData(result) {
  if (!result || typeof result !== "object") return result;

  if (result.data !== undefined) return result.data;
  if (result.user !== undefined) return result.user;

  return result;
}

export async function apiRequest(path, options = {}) {
  const { body, headers, ...restOptions } = options;

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  let requestBody = body;

  if (body && typeof body !== "string" && !(body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }

  return fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...restOptions,
    headers: requestHeaders,
    body: requestBody,
  });
}

import { redirect } from "react-router";

import { getSafeRedirectPath, setAccessToken, setFlashMessage } from "./auth";

const API_URL = "http://localhost:8080";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const currentUrl = new URL(request.url);

  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = getSafeRedirectPath(
    currentUrl.searchParams.get("redirectTo"),
    "/dashboard",
  );

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await res.json().catch(() => null);

  if (!res.ok || !result?.isSuccess || !result?.data) {
    return {
      error:
        result?.message ||
        "Login failed. Please check your email and password.",
    };
  }

  setAccessToken(result.data);
  setFlashMessage("auth", "Login successful. Welcome back!");
  setFlashMessage("login-modal", "You are signed in. You can create a short link now.");

  return redirect(redirectTo);
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  const currentUrl = new URL(request.url);

  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const redirectTo = getSafeRedirectPath(
    currentUrl.searchParams.get("redirectTo"),
    "/dashboard",
  );

  if (password.length < 6) {
    return {
      error: "Password minimum 6 characters",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      error: result?.message || "Register failed. Please try again.",
    };
  }

  setFlashMessage("register", "Account created. Please log in to continue.");

  return redirect(
    `/auth/login?registered=1&redirectTo=${encodeURIComponent(redirectTo)}`,
  );
}

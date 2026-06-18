import { redirect } from "react-router";

import { apiRequest, getApiMessage, parseApiResponse } from "./api";
import { getSafeRedirectPath, setFlashMessage } from "./auth";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const currentUrl = new URL(request.url);

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const redirectTo = getSafeRedirectPath(
    currentUrl.searchParams.get("redirectTo"),
    "/dashboard",
  );

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const res = await apiRequest("/auth/login", {
    method: "POST",
    body: {
      email,
      password,
    },
  });

  const result = await parseApiResponse(res);

  if (!res.ok || result?.isSuccess === false) {
    return {
      error: getApiMessage(
        result,
        "Login failed. Please check your email and password.",
      ),
    };
  }

  // No localStorage here. The backend should set an HttpOnly cookie through
  // Set-Cookie, and the browser will send it on future requests automatically.
  setFlashMessage("auth", "Login successful. Welcome back!");
  setFlashMessage(
    "login-modal",
    "You are signed in. You can create a short link now.",
  );

  return redirect(redirectTo);
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  const currentUrl = new URL(request.url);

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");
  const redirectTo = getSafeRedirectPath(
    currentUrl.searchParams.get("redirectTo"),
    "/dashboard",
  );

  if (!email || !password || !confirmPassword) {
    return {
      error: "Email, password, and confirm password are required.",
    };
  }

  if (password.length < 8) {
    return {
      error: "Password minimum 8 characters.",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match.",
    };
  }

  const res = await apiRequest("/auth/register", {
    method: "POST",
    body: {
      email,
      password,
    },
  });

  const result = await parseApiResponse(res);

  if (!res.ok || result?.isSuccess === false) {
    return {
      error: getApiMessage(result, "Register failed. Please try again."),
    };
  }

  setFlashMessage("register", "Account created. Please log in to continue.");

  return redirect(
    `/auth/login?registered=1&redirectTo=${encodeURIComponent(redirectTo)}`,
  );
}

export async function logoutAction() {
  try {
    await apiRequest("/auth/logout", {
      method: "POST",
    });
  } catch {
    // Even if the request fails, redirect away from protected UI.
    // The protected loader will still block access if the cookie is valid.
  }

  return redirect("/auth/login");
}

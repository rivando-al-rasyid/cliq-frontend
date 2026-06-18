import { redirect } from "react-router";

const API_URL = "http://localhost:8080";

export async function loginAction({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

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

  if (!res.ok || !result?.isSuccess) {
    return {
      error:
        result?.message ||
        "Login failed. Please check your email and password.",
    };
  }

  return redirect("/dashboard");
}

export async function registerAction({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

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

  return redirect("/auth/login");
}

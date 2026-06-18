import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";

import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreateLinkPage from "./pages/CreateLinkPage";

import { loginAction, registerAction } from "./utils/auth.action";
import { createLinkAction, homeShortenAction } from "./utils/link.action";
import { guestOnlyLoader, requireAuthLoader } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
    action: homeShortenAction,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    loader: guestOnlyLoader,
    children: [
      {
        path: "register",
        Component: RegisterPage,
        action: registerAction,
      },
      {
        path: "login",
        Component: LoginPage,
        action: loginAction,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: AppLayout,
    loader: requireAuthLoader,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "profile",
        Component: ProfilePage,
      },
      {
        path: "create",
        Component: CreateLinkPage,
        action: createLinkAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

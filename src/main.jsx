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

import { loginAction, logoutAction, registerAction } from "./utils/auth.action";
import {
  createLinkAction,
  deleteLinkAction,
  homeShortenAction,
} from "./utils/link.action";
import { dashboardLinksLoader } from "./utils/link.loader";
import {
  guestOnlyLoader,
  optionalAuthLoader,
  requireAuthLoader,
} from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
    loader: optionalAuthLoader,
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
    id: "dashboard",
    Component: AppLayout,
    loader: requireAuthLoader,
    children: [
      {
        index: true,
        Component: DashboardPage,
        loader: dashboardLinksLoader,
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
      {
        path: "links/:id/delete",
        action: deleteLinkAction,
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

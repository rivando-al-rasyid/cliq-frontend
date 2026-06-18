import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    index: true,
    Component: LandingPage,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/login",
        Component: RegisterPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

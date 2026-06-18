import { NavLink, useLocation, useNavigate } from "react-router";
import { Plus, UserRound } from "lucide-react";

import { clearAccessToken, isAuthenticated } from "../utils/auth";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuth = isAuthenticated();

  const handleLogout = () => {
    clearAccessToken();
    navigate("/auth/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
      <nav className="navbar mx-auto max-w-7xl px-5">
        <div className="navbar-start">
          <NavLink to="/" className="text-xl font-black tracking-tight">
            ShortLink
          </NavLink>
        </div>

        {isAuth && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-4 px-1 text-sm font-medium">
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-none border-b-2 border-primary text-primary"
                      : "text-base-content/60 hover:text-primary"
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/create"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-none border-b-2 border-primary text-primary"
                      : "text-base-content/60 hover:text-primary"
                  }
                >
                  Create
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-none border-b-2 border-primary text-primary"
                      : "text-base-content/60 hover:text-primary"
                  }
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <div className="navbar-end gap-4">
          {isAuth ? (
            <>
              <NavLink
                to="/dashboard/create"
                className="btn btn-primary btn-sm hidden gap-2 shadow-md sm:inline-flex"
              >
                <Plus className="h-4 w-4" />
                Create New Link
              </NavLink>

              <NavLink
                to="/dashboard/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
                aria-label="Open profile"
              >
                <UserRound className="h-5 w-5" />
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-ghost btn-sm text-base-content/60"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to={`/auth/login?redirectTo=${encodeURIComponent(
                  location.pathname === "/" ? "/dashboard" : location.pathname,
                )}`}
                className="btn btn-ghost btn-sm text-base-content/60"
              >
                Login
              </NavLink>

              <NavLink
                to={`/auth/register?redirectTo=${encodeURIComponent(
                  location.pathname === "/" ? "/dashboard" : location.pathname,
                )}`}
                className="btn btn-primary btn-sm"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

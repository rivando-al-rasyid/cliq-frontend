import { NavLink, useNavigate } from "react-router";
import { Plus, UserRound } from "lucide-react";

function Header() {
  const navigate = useNavigate();

  const isAuth = Boolean(localStorage.getItem("accessToken"));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
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
                  to="/"
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
                  to="/analytics"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-none border-b-2 border-primary text-primary"
                      : "text-base-content/60 hover:text-primary"
                  }
                >
                  Analytics
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/links"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-none border-b-2 border-primary text-primary"
                      : "text-base-content/60 hover:text-primary"
                  }
                >
                  Links
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <div className="navbar-end gap-4">
          {isAuth ? (
            <>
              <button className="btn btn-primary btn-sm hidden gap-2 shadow-md sm:inline-flex">
                <Plus className="h-4 w-4" />
                Create New Link
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserRound className="h-5 w-5" />
              </div>

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
                to="/auth/login"
                className="btn btn-ghost btn-sm text-base-content/60"
              >
                Login
              </NavLink>

              <NavLink to="/auth/register" className="btn btn-primary btn-sm">
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

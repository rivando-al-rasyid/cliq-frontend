function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav className="navbar mx-auto max-w-7xl px-5">
        <div className="navbar-start">
          <a className="text-xl font-black tracking-tight">
            Short<span className="text-primary">Link</span>
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1 text-sm">
            <li>
              <a className="rounded-none border-b-2 border-primary text-primary">
                Dashboard
              </a>
            </li>
            <li>
              <a className="text-base-content/50 hover:text-primary">
                Analytics
              </a>
            </li>
            <li>
              <a className="text-base-content/50 hover:text-primary">Links</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-3">
          <button className="btn btn-ghost btn-sm hidden sm:inline-flex">
            Login
          </button>
          <button className="btn btn-primary btn-sm shadow-md">Logout</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;

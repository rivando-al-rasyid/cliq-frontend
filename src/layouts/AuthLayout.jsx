import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <main className="flex min-h-screen flex-col bg-base-200 text-base-content">
      <div className="flex flex-1 items-center justify-center px-5 py-20">
        <Outlet />
      </div>

      <footer className="bg-base-200 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-xs font-black uppercase tracking-[0.25em] text-base-content/50 md:flex-row md:items-center md:justify-between">
          <p>© 2024 Shortlink. The Digital Architect.</p>

          <div className="flex flex-wrap gap-8">
            <a className="hover:text-primary">API Documentation</a>
            <a className="hover:text-primary">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default AuthLayout;

import { Bell, Link2, LogOut, Pencil, Shield, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { clearAccessToken } from "../utils/auth";

function ProfilePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAccessToken();
    navigate("/auth/login", { replace: true });
  };

  return (
    <section className="bg-base-200">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-base-content/50">
          Account Management
        </p>

        <div className="mt-8 rounded-2xl border border-base-300 bg-base-100 p-8 shadow-sm md:p-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black tracking-tight">Profile</h1>

            <span className="rounded-full bg-primary/15 px-4 py-2 text-xs font-black uppercase text-primary">
              Pro Member
            </span>
          </div>

          <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-28 w-28 shrink-0 overflow-visible rounded-xl bg-neutral text-neutral-content shadow-xl">
              <div className="flex h-full w-full items-center justify-center">
                <UserRound className="h-16 w-16" />
              </div>

              <button className="btn btn-square btn-sm absolute -bottom-3 -right-3 border-base-300 bg-base-100 text-primary shadow-md hover:bg-base-200">
                <Pencil className="h-4 w-4" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-black">Alex Thompson</h2>
              <p className="mt-1 text-base text-base-content/70">
                Product Architect at Digital Flow
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-base-200 p-6">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-base-content/40">
                Email Address
              </p>
              <p className="mt-2 font-medium text-base-content">
                user@example.com
              </p>
            </div>

            <div className="rounded-lg bg-base-200 p-6">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-base-content/40">
                Account Tenure
              </p>
              <p className="mt-2 font-medium text-base-content">
                Member since: January 1, 2026
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-primary p-6 text-primary-content">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-10 w-12 items-center justify-center rounded-lg bg-primary-content/10">
                  <Link2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-content/80">
                    Active Assets
                  </p>
                  <p className="text-3xl font-black leading-none">12</p>
                </div>
              </div>

              <Link
                to="/dashboard"
                className="btn border-primary-content/30 bg-primary-content/10 text-primary-content hover:border-primary-content hover:bg-primary-content hover:text-primary"
              >
                View Links
              </Link>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Bell className="h-5 w-5 text-base-content/40" />
                <p className="font-bold">Email Notifications</p>
              </div>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                defaultChecked
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <Shield className="h-5 w-5 text-base-content/40" />
                <p className="font-bold">Two-Factor Authentication</p>
              </div>

              <p className="text-xs font-black uppercase tracking-[0.2em] text-error">
                Disabled
              </p>
            </div>
          </div>

          <div className="divider my-8" />

          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-outline w-full border-base-300 text-base-content/70 hover:border-error hover:bg-error hover:text-error-content"
          >
            <LogOut className="h-5 w-5" />
            Logout Session
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-base-content/40">
          Your data is encrypted using AES-256 standards.{" "}
          <a className="font-bold text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
}

export default ProfilePage;

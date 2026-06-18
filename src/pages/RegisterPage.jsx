import { useState } from "react";
import { ArrowRight, Link2 } from "lucide-react";
import { Link } from "react-router";

function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      console.log("Password minimum 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    console.log("Register data:", form);
  };

  return (
    <section className="w-full max-w-md">
      <div className="text-center">
        <div className="mx-auto flex h-7 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Link2 className="h-5 w-5" strokeWidth={3} />
        </div>

        <h1 className="mt-12 text-3xl font-black tracking-tight">
          Create Account
        </h1>

        <p className="mt-4 text-base text-base-content/70">
          Join the elite architects of the web.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-lg border border-base-300 bg-base-100 p-8 shadow-xl shadow-base-300/30"
      >
        <div className="space-y-7">
          <div>
            <label className="text-sm font-bold text-base-content/80">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="input input-bordered mt-2 h-12 w-full rounded-lg border-base-content/40 bg-base-200 text-base placeholder:text-base-content/30 focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-base-content/80">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input input-bordered mt-2 h-12 w-full rounded-lg border-base-content/40 bg-base-200 text-base placeholder:text-base-content/30 focus:border-primary focus:outline-none"
              required
            />

            <p className="mt-2 text-xs font-black uppercase tracking-[0.15em] text-base-content/50">
              Minimum 6 characters
            </p>
          </div>

          <div>
            <label className="text-sm font-bold text-base-content/80">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="input input-bordered mt-2 h-12 w-full rounded-lg border-base-content/40 bg-base-200 text-base placeholder:text-base-content/30 focus:border-primary focus:outline-none"
              required
            />
          </div>

          <button className="btn btn-primary h-13 w-full rounded-lg text-base font-black">
            Sign Up
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mx-auto mt-7 max-w-xs text-center text-sm leading-6 text-base-content/70">
          By signing up, you agree to our{" "}
          <a className="font-bold text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="font-bold text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>

      <p className="mt-10 text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;

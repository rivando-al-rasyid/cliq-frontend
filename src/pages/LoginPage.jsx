import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login data:", form);
  };

  return (
    <section className="w-full max-w-md">
      <h1 className="text-center text-3xl font-black tracking-tight">
        ShortLink
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-lg border border-base-300 bg-base-100 p-8 shadow-xl shadow-base-300/40"
      >
        <div>
          <h2 className="text-3xl font-black tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-base text-base-content/70">
            Please enter your details to sign in.
          </p>
        </div>

        <div className="mt-9 space-y-6">
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
              className="input input-bordered mt-3 h-[46px] w-full rounded-lg border-base-300 bg-base-100 text-base placeholder:text-base-content/20 focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-base-content/80">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-bold text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="input input-bordered mt-3 flex h-[46px] items-center gap-3 rounded-lg border-base-300 bg-base-100 focus-within:border-primary">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="grow bg-transparent text-base placeholder:text-base-content/20 focus:outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="text-base-content/50 hover:text-primary"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button className="btn btn-primary h-[52px] w-full rounded-lg text-base font-black shadow-lg shadow-primary/20">
            Log In
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="my-9 flex items-center gap-5">
          <div className="h-px flex-1 bg-base-300" />
          <p className="text-xs font-black uppercase tracking-[0.2em] text-base-content/30">
            Or continue with
          </p>
          <div className="h-px flex-1 bg-base-300" />
        </div>

        <button
          type="button"
          className="btn h-[46px] w-full rounded-lg border-base-300 bg-base-100 text-base font-medium text-base-content/80 hover:border-primary hover:bg-base-100"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-neutral text-xs font-black text-neutral-content">
            G
          </span>
          Sign in with Google
        </button>
      </form>

      <p className="mt-10 text-center text-sm text-base-content/70">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-bold text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;

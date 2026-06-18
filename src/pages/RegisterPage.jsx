import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Form, Link, useActionData, useNavigation } from "react-router";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="w-full max-w-md">
      <h1 className="text-center text-3xl font-black tracking-tight">
        ShortLink
      </h1>

      <Form
        method="post"
        className="mt-10 rounded-lg border border-base-300 bg-base-100 p-8 shadow-xl shadow-base-300/40"
      >
        <div>
          <h2 className="text-3xl font-black tracking-tight">Create Account</h2>
          <p className="mt-2 text-base text-base-content/70">
            Please enter your details to create an account.
          </p>
        </div>

        {actionData?.error && (
          <div className="alert alert-error mt-6 rounded-lg text-sm">
            {actionData.error}
          </div>
        )}

        <div className="mt-9 space-y-6">
          <div>
            <label className="text-sm font-bold text-base-content/80">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              className="input input-bordered mt-3 h-11.5 w-full rounded-lg border-base-300 bg-base-100 text-base placeholder:text-base-content/20 focus:border-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-base-content/80">
              Password
            </label>

            <div className="mt-3 flex h-11.5 w-full items-center rounded-lg border border-base-300 bg-base-100 px-3 focus-within:border-primary">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="min-w-0 flex-1 bg-transparent text-base placeholder:text-base-content/20 focus:outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-base-content/50 hover:text-primary"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <p className="mt-2 text-xs font-black uppercase tracking-[0.15em] text-base-content/40">
              Minimum 6 characters
            </p>
          </div>

          <div>
            <label className="text-sm font-bold text-base-content/80">
              Confirm Password
            </label>

            <div className="mt-3 flex h-11.5 w-full items-center rounded-lg border border-base-300 bg-base-100 px-3 focus-within:border-primary">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                className="min-w-0 flex-1 bg-transparent text-base placeholder:text-base-content/20 focus:outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-base-content/50 hover:text-primary"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary h-13 w-full rounded-lg text-base font-black shadow-lg shadow-primary/20"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
            {!isSubmitting && <ArrowRight className="h-5 w-5" />}
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
          className="btn h-11.5 w-full rounded-lg border-base-300 bg-base-100 text-base font-medium text-base-content/80 hover:border-primary hover:bg-base-100"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-neutral text-xs font-black text-neutral-content">
            G
          </span>
          Sign up with Google
        </button>
      </Form>

      <p className="mt-10 text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-bold text-primary hover:underline"
        >
          Log in
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;

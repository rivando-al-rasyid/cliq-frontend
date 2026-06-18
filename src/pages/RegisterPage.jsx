import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router";

import { getSafeRedirectPath } from "../utils/auth";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();

  const redirectTo = getSafeRedirectPath(
    searchParams.get("redirectTo"),
    "/dashboard",
  );

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
        action={`/auth/register?redirectTo=${encodeURIComponent(redirectTo)}`}
        className="mt-10 rounded-lg border border-base-300 bg-base-100 p-8 shadow-xl shadow-base-300/40"
      >
        <div>
          <h2 className="text-3xl font-black tracking-tight">Create Account</h2>
          <p className="mt-2 text-base text-base-content/70">
            Fill in your details to get started.
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
                minLength={8}
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

            <p className="mt-1.5 text-xs text-base-content/50">
              Minimum 8 characters
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
                  showConfirmPassword ? "Hide password" : "Show password"
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
            {isSubmitting ? "Creating account..." : "Create Account"}
            {!isSubmitting && <ArrowRight className="h-5 w-5" />}
          </button>
        </div>
      </Form>

      <p className="mt-10 text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link
          to={`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`}
          className="font-bold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
}

export default RegisterPage;

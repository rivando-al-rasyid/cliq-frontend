import { useEffect } from "react";
import { Form, useActionData, useNavigate, useNavigation } from "react-router";
import { Link as LinkIcon } from "lucide-react";

import { rememberPendingUrl } from "../../utils/auth";
import { showAuthRequiredAlert, showToast } from "../../utils/sweetAlert";

function HeroSection({ isAuthenticated = false }) {
  const navigate = useNavigate();
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const requireAccountFirst = async () => {
    const result = await showAuthRequiredAlert();
    const redirectTo = encodeURIComponent("/dashboard/create");

    if (result.isConfirmed) {
      navigate(`/auth/register?redirectTo=${redirectTo}`);
      return;
    }

    if (result.isDenied) {
      navigate(`/auth/login?redirectTo=${redirectTo}`);
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard/create");
      return;
    }

    requireAccountFirst();
  };

  useEffect(() => {
    if (actionData?.error) {
      showToast(actionData.error, "error");
    }

    if (actionData?.authRequired) {
      rememberPendingUrl(actionData.destinationUrl);
      requireAccountFirst();
    }
  }, [actionData]);

  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-5 py-24 text-center md:py-32">
      <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-6xl">
        Shorten URLs. <span className="text-primary">Share Easily.</span>
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-7 text-base-content/60 md:text-lg">
        Create short, memorable links for your team communications. Transform
        long, cumbersome URLs into powerful digital assets that drive
        engagement.
      </p>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={handleGetStarted}
          className="btn btn-primary px-8"
        >
          Get Started
        </button>
        <a
          href="#features"
          className="btn btn-outline border-base-300 px-8 text-primary hover:border-primary hover:bg-primary hover:text-primary-content"
        >
          Learn More
        </a>
      </div>

      <Form
        method="post"
        className="mt-16 w-full max-w-3xl rounded-2xl bg-base-100 p-3 shadow-xl ring-1 ring-base-300"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="input input-bordered flex flex-1 items-center gap-3 border-base-200 bg-base-200">
            <LinkIcon className="h-5 w-5 text-base-content/30" />

            <input
              type="url"
              name="destinationUrl"
              placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
              className="grow text-sm text-base-content placeholder:text-base-content/30"
              required
            />
          </label>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary px-8">
            {isSubmitting ? "Checking..." : "Shorten"}
          </button>
        </div>
      </Form>
    </section>
  );
}

export default HeroSection;

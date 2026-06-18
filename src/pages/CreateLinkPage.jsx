import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, BarChart3, Eye, Link2, QrCode, Zap } from "lucide-react";
import {
  Form,
  Link,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router";

import { takePendingUrl } from "../utils/auth";
import { showCreatedLinkAlert, showToast } from "../utils/sweetAlert";

function normalizeSlug(value) {
  return value.trim().replaceAll(" ", "-").toLowerCase();
}

function CreateLinkPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const actionData = useActionData();
  const navigation = useNavigation();
  const handledShortUrlRef = useRef("");

  const [initialDestinationUrl] = useState(
    () => location.state?.destinationUrl || takePendingUrl(),
  );
  const [slugPreview, setSlugPreview] = useState("");

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!actionData?.error) return;

    showToast(actionData.error, "error");
  }, [actionData]);

  useEffect(() => {
    if (!actionData?.success || !actionData.shortUrl) return;
    if (handledShortUrlRef.current === actionData.shortUrl) return;

    handledShortUrlRef.current = actionData.shortUrl;
    setSlugPreview(actionData.slug || "");

    showToast("Short link created successfully.");

    showCreatedLinkAlert({
      destinationUrl: actionData.destinationUrl,
      shortUrl: actionData.shortUrl,
    }).then((result) => {
      if (result.isConfirmed) {
        navigator.clipboard
          .writeText(actionData.shortUrl)
          .then(() => showToast("Short link copied to clipboard."))
          .catch(() =>
            showToast("Copy failed. Please copy the link manually.", "error"),
          );
        return;
      }

      if (result.isDenied) {
        navigate("/dashboard");
      }
    });
  }, [actionData, navigate]);

  const previewSlug = useMemo(
    () => normalizeSlug(slugPreview) || "my-custom-slug",
    [slugPreview],
  );

  return (
    <section className="bg-base-200">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-black text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mt-8">
          <h1 className="text-3xl font-black tracking-tight">
            Create New Short Link
          </h1>
          <p className="mt-3 font-bold text-base-content/60">
            Transform your long URLs into clean, manageable assets.
          </p>
        </div>

        <Form
          method="post"
          className="mt-10 rounded-2xl border border-base-300 bg-base-100 p-8 shadow-xl md:p-10"
        >
          <div>
            <label className="text-sm font-black uppercase tracking-[0.12em]">
              Destination URL <span className="text-error">*</span>
            </label>

            <label className="input input-bordered mt-4 flex h-14 items-center gap-3 rounded-lg border-base-300 bg-base-200">
              <Link2 className="h-5 w-5 text-base-content/40" />

              <input
                type="url"
                name="destinationUrl"
                defaultValue={initialDestinationUrl}
                placeholder="https://example.com/your-long-url-here"
                className="grow bg-transparent text-base placeholder:text-base-content/30 focus:outline-none"
                required
              />
            </label>

            <p className="mt-3 text-xs italic text-base-content/50">
              Ensure your URL starts with http:// or https://
            </p>
          </div>

          <div className="mt-9">
            <label className="text-sm font-black uppercase tracking-[0.12em]">
              Custom Slug{" "}
              <span className="text-base-content/60">(Optional)</span>
            </label>

            <div className="mt-4 flex overflow-hidden rounded-lg border border-base-300 bg-base-100">
              <span className="flex items-center border-r border-base-300 bg-base-200 px-5 text-sm font-medium text-base-content/70">
                short.link/
              </span>

              <input
                type="text"
                name="slug"
                value={slugPreview}
                onChange={(event) => setSlugPreview(event.target.value)}
                placeholder="my-custom-slug"
                className="input h-14 min-w-0 flex-1 border-0 bg-base-100 text-base placeholder:text-base-content/30 focus:outline-none"
                pattern="[A-Za-z0-9-]+"
                title="Use letters, numbers, and hyphens only"
              />
            </div>

            <p className="mt-3 text-xs italic text-base-content/50">
              Leave blank to generate a random unique identifier.
            </p>
          </div>

          <div className="mt-9 rounded-lg border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary">
              <Eye className="h-5 w-5" />
              Live Preview
            </div>

            <p className="mt-3 pl-8 text-base font-medium">
              Your short link will be:{" "}
              <span className="font-black text-primary">
                https://short.link/{previewSlug}
              </span>
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary h-14 px-9 text-base font-black shadow-lg shadow-primary/20"
            >
              {isSubmitting ? "Creating..." : "Create Link"}
              {!isSubmitting && <Zap className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn btn-ghost h-14 px-9 text-base font-bold text-base-content/60"
            >
              Cancel
            </button>
          </div>
        </Form>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <BarChart3 className="h-6 w-6" />
            </div>

            <div>
              <h2 className="font-black">Real-time Analytics</h2>
              <p className="mt-1 text-sm font-medium leading-6 text-base-content/60">
                Track every click, geographical location, and referral source
                instantly.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <QrCode className="h-6 w-6" />
            </div>

            <div>
              <h2 className="font-black">Auto-generated QR</h2>
              <p className="mt-1 text-sm font-medium leading-6 text-base-content/60">
                Every link automatically creates a high-resolution QR code for
                print.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateLinkPage;

import { Zap, PencilLine, Users } from "lucide-react";

function FeaturesSection() {
  return (
    <section className="bg-base-300">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
          Architectural Features
        </p>

        <h2 className="mt-4 text-3xl font-black tracking-tight">
          Built for Enterprise Precision
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          <article className="card bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="card-body p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Zap className="h-5 w-5" />
              </div>

              <h3 className="text-xl font-black">Easy Create</h3>

              <p className="mt-2 leading-7 text-base-content/60">
                Instantly generate high-performance short links with a single
                click or through our surgical API endpoints.
              </p>

              <div className="mt-5 h-1 w-12 rounded-full bg-primary/40" />
            </div>
          </article>

          <article className="card bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="card-body p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <PencilLine className="h-5 w-5" />
              </div>

              <h3 className="text-xl font-black">Custom Slugs</h3>

              <p className="mt-2 leading-7 text-base-content/60">
                Maintain brand authority with readable, custom link endings that
                resonate with your digital audience.
              </p>

              <div className="mt-5 h-1 w-12 rounded-full bg-primary/40" />
            </div>
          </article>

          <article className="card bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="card-body p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20 text-secondary">
                <Users className="h-5 w-5" />
              </div>

              <h3 className="text-xl font-black">Team Ready</h3>

              <p className="mt-2 leading-7 text-base-content/60">
                Collaborate across departments with shared workspaces,
                permissions, and unified analytics dashboards.
              </p>

              <div className="mt-5 h-1 w-12 rounded-full bg-secondary/40" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;

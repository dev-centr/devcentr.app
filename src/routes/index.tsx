import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { HeroOrbit } from "~/components/hero-orbit";
import { SiteHeader } from "~/components/site-header";

const capabilities = [
  {
    n: "01",
    title: "Ecosystem Management",
    body: "Treat shells, toolchains, and environments like real project assets—author them, version them, and share them instead of chasing config files.",
  },
  {
    n: "02",
    title: "Visual Blueprints",
    body: "Interactive maps of your architecture and environments so you can see how the pieces connect.",
  },
  {
    n: "03",
    title: "AI Synergy Hub",
    body: "Share reliable project and environment context with your AI tools so suggestions match how your stack really runs.",
  },
  {
    n: "04",
    title: "Reproducible Workspaces",
    body: "Version your workspace setup so teammates get the same working environment—from local through the rest of the path.",
  },
  {
    n: "05",
    title: "DevOps",
    body: "CI/CD, infra, and traditional ops where they sit on the path—one facet of the suite, not the whole product.",
  },
] as const;

export default function Home() {
  return (
    <MetaProvider>
      <Title>DevCentr — Development Orchestration Suite</Title>
      <Meta
        name="description"
        content="DevCentr is a Development Orchestration Suite (DOS): orchestrate environments, toolchains, projects, and the ops around the code—not just the editor."
      />

      <div class="plane-surface relative min-h-dvh">
        <div class="relative z-10">
          <SiteHeader />

          <main>
            <section class="relative isolate min-h-[calc(100dvh-5.5rem)] overflow-hidden">
              <HeroOrbit />
              <div class="relative z-10 mx-auto flex max-w-6xl flex-col justify-center px-6 pb-20 pt-10 md:min-h-[calc(100dvh-5.5rem)] md:px-10 md:pb-28 md:pt-6">
                <p class="eyebrow rise text-primary">Development Orchestration Suite</p>

                <h1 class="rise rise-delay-1 mt-5 max-w-3xl font-display text-[clamp(2.75rem,10vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-foreground">
                  DevCentr
                </h1>

                <p class="rise rise-delay-2 mt-6 max-w-xl font-display text-xl font-medium leading-snug tracking-tight text-foreground/90 md:text-2xl">
                  Stop managing tools. Orchestrate ecosystems.
                </p>

                <p class="rise rise-delay-2 mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
                  The flagship Development Orchestration Suite for Windows, macOS, and Linux—environments, toolchains,
                  projects, and the ops around them in one control plane. DevOps is one facet; think “Dev OS” only as a
                  quiet mental model.
                </p>

                <div class="rise rise-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href="https://github.com/dev-centr/devcentr/releases"
                    class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Download DevCentr
                  </a>
                  <a
                    href="https://docs.devcentr.org"
                    class="inline-flex h-11 items-center justify-center rounded-md border border-border/80 bg-background/40 px-8 font-mono text-xs font-medium uppercase tracking-[0.16em] text-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Explore the docs
                  </a>
                </div>
              </div>
            </section>

            <section class="border-t border-border/60">
              <div class="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
                <p class="eyebrow">Capabilities</p>
                <h2 class="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  One suite. The whole lifecycle around the code.
                </h2>
                <p class="mt-4 max-w-2xl text-muted-foreground">
                  DevOps is one facet of the DOS—alongside environment orchestration, visual blueprints, and grounded
                  AI context. The public category is Development Orchestration Suite.
                </p>
                <ul class="mt-14 grid gap-10 md:grid-cols-2">
                  {capabilities.map((c) => (
                    <li class="border-t border-border/70 pt-6">
                      <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{c.n}</p>
                      <h3 class="mt-2 font-display text-xl font-semibold tracking-tight">{c.title}</h3>
                      <p class="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">{c.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>

          <footer class="border-t border-border/60">
            <div class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
              <div class="space-y-2">
                <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  The first Development Orchestration Suite.
                </p>
                <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  A flagship product of{" "}
                  <a href="https://devcentr.org" class="text-foreground underline-offset-4 hover:underline">
                    DevCentr.org
                  </a>
                </p>
              </div>
              <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">© 2026 DevCentr</p>
            </div>
          </footer>
        </div>
      </div>
    </MetaProvider>
  );
}

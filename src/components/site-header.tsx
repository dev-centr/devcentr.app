import { LogoMark } from "~/components/logo-mark";

const linkClass =
  "hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground sm:inline";

export function SiteHeader() {
  return (
    <header class="mx-auto flex max-w-6xl items-center justify-between px-6 pb-4 pt-6 md:px-10 md:pt-8">
      <a href="/" class="group flex items-center gap-3 text-foreground no-underline">
        <LogoMark class="size-9 text-primary transition-transform duration-500 group-hover:rotate-12" />
        <span class="font-display text-lg font-semibold tracking-tight">DevCentr</span>
      </a>
      <nav class="flex items-center gap-4 md:gap-6">
        <a href="https://docs.devcentr.org" class={linkClass}>
          Docs
        </a>
        <a href="https://github.com/dev-centr/devcentr" class={linkClass}>
          GitHub
        </a>
        <a href="https://devcentr.org" class={linkClass}>
          Org
        </a>
        <a
          href="https://github.com/dev-centr/devcentr/releases"
          class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Download
        </a>
      </nav>
    </header>
  );
}

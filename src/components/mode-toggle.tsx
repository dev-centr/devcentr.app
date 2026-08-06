import { destinationBackground } from "~/lib/theme";
import { runDualLayerThemeTransition } from "~/lib/theme-transition";
import { useTheme } from "~/components/theme-provider";

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="size-[1.15rem]" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <g stroke="currentColor" stroke-width="1.75" stroke-linecap="round">
        <path d="M12 2.5v2.25M12 19.25V21.5M2.5 12h2.25M19.25 12H21.5" />
        <path d="M5.05 5.05l1.6 1.6M17.35 17.35l1.6 1.6M5.05 18.95l1.6-1.6M17.35 6.65l1.6-1.6" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="size-[1.15rem]"
      aria-hidden="true"
    >
      <path d="M20.2 14.35A8.2 8.2 0 0 1 9.65 3.8a8.25 8.25 0 1 0 10.55 10.55Z" />
    </svg>
  );
}

export function ModeToggle() {
  const { resolved, setColorMode } = useTheme();
  let busy = false;

  const handleClick = async (event: MouseEvent) => {
    if (busy) return;
    const next = resolved() === "dark" ? "light" : "dark";
    const origin = event.currentTarget as HTMLElement;
    busy = true;
    try {
      await runDualLayerThemeTransition({
        origin,
        destinationBg: destinationBackground(next),
        commit: () => setColorMode(next),
      });
    } finally {
      busy = false;
    }
  };

  return (
    <button
      type="button"
      class="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/55 text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/35 hover:bg-primary/8 hover:text-primary"
      onClick={handleClick}
      aria-label={resolved() === "dark" ? "Use light appearance" : "Use dark appearance"}
    >
      {resolved() === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

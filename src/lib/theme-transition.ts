export type ThemeTransitionOptions = {
  origin: HTMLElement;
  destinationBg: string;
  commit: () => void;
  durationMs?: number;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Dual-layer theme reveal: 20% clip wash + full-strength overlay. */
export function runDualLayerThemeTransition(opts: ThemeTransitionOptions): Promise<void> {
  if (prefersReducedMotion()) {
    opts.commit();
    return Promise.resolve();
  }

  const duration = opts.durationMs ?? 700;
  const rect = opts.origin.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const maxR = Math.hypot(
    Math.max(cx, window.innerWidth - cx),
    Math.max(cy, window.innerHeight - cy),
  );

  const root = document.createElement("div");
  root.className = "theme-transition-root";
  root.setAttribute("aria-hidden", "true");

  const clip = document.createElement("div");
  clip.className = "theme-transition-clip";
  clip.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;

  const bottom = document.createElement("div");
  bottom.className = "theme-transition-bottom";
  bottom.style.background = opts.destinationBg;

  const inner = document.createElement("div");
  inner.className = "theme-transition-inner";
  inner.style.background = opts.destinationBg;

  clip.append(bottom, inner);
  root.append(clip);
  document.body.append(root);
  void clip.offsetWidth;

  let committed = false;
  const doCommit = () => {
    if (committed) return;
    committed = true;
    opts.commit();
  };

  const commitTimer = window.setTimeout(doCommit, duration * 0.45);
  clip.style.transition = `clip-path ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
  inner.style.transition = `opacity ${duration * 0.85}ms cubic-bezier(0.22, 1, 0.36, 1)`;

  requestAnimationFrame(() => {
    clip.style.clipPath = `circle(${maxR}px at ${cx}px ${cy}px)`;
    inner.style.opacity = "1";
  });

  return new Promise((resolve) => {
    const finish = () => {
      window.clearTimeout(commitTimer);
      doCommit();
      root.remove();
      resolve();
    };
    clip.addEventListener("transitionend", finish, { once: true });
    window.setTimeout(finish, duration + 80);
  });
}

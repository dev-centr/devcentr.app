export const THEME_STORAGE_KEY = "devcentr-app-theme";

export type ColorMode = "light" | "dark" | "system";
export type ResolvedColorMode = "light" | "dark";

export function getSystemColorMode(): ResolvedColorMode {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function readStoredColorMode(): ColorMode | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    /* ignore */
  }
  return null;
}

export function resolveColorMode(mode: ColorMode): ResolvedColorMode {
  return mode === "system" ? getSystemColorMode() : mode;
}

export function applyResolvedTheme(resolved: ResolvedColorMode): void {
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
}

export const THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var r=(s==="light"||s==="dark")?s:(d?"dark":"light");document.documentElement.dataset.theme=r;document.documentElement.style.colorScheme=r;}catch(e){document.documentElement.dataset.theme="dark";document.documentElement.style.colorScheme="dark";}})();`;

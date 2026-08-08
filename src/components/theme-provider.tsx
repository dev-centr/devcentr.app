import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  useContext,
  type ParentProps,
} from "solid-js";

import {
  THEME_STORAGE_KEY,
  applyResolvedTheme,
  getSystemColorMode,
  readStoredColorMode,
  resolveColorMode,
  type ColorMode,
  type ResolvedColorMode,
} from "~/lib/theme";
import { syncThemeRevealBaseline } from "~/lib/theme-reveal";

type ThemeContextValue = {
  colorMode: () => ColorMode;
  resolved: () => ResolvedColorMode;
  setColorMode: (mode: ColorMode) => void;
};

const ThemeContext = createContext<ThemeContextValue>();

function persistColorMode(mode: ColorMode): void {
  try {
    if (mode === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

export function ThemeProvider(props: ParentProps) {
  const initialStored = typeof window !== "undefined" ? readStoredColorMode() : null;
  const [colorMode, setColorModeSignal] = createSignal<ColorMode>(initialStored ?? "system");
  const [resolved, setResolved] = createSignal<ResolvedColorMode>(
    typeof window !== "undefined" ? resolveColorMode(initialStored ?? "system") : "dark",
  );

  const setColorMode = (mode: ColorMode) => {
    setColorModeSignal(mode);
    persistColorMode(mode);
    const next = resolveColorMode(mode);
    setResolved(next);
    applyResolvedTheme(next);
  };

  createEffect(() => {
    applyResolvedTheme(resolved());
  });

  onMount(() => {
    syncThemeRevealBaseline(resolved());

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onSchemeChange = () => {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === "light" || stored === "dark") {
          setColorMode("system");
          syncThemeRevealBaseline(getSystemColorMode());
          return;
        }
      } catch {
        /* ignore */
      }
      if (colorMode() === "system") {
        const next = getSystemColorMode();
        setResolved(next);
        applyResolvedTheme(next);
        // New OS scheme becomes the baseline for forward/reverse reveal direction.
        syncThemeRevealBaseline(next);
      }
    };
    mql.addEventListener("change", onSchemeChange);
    onCleanup(() => mql.removeEventListener("change", onSchemeChange));
  });

  return (
    <ThemeContext.Provider value={{ colorMode, resolved, setColorMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

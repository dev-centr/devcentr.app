import { For, Show, createSignal, onMount } from "solid-js";

import {
  DISTROS,
  desktopDefault,
  detectKind,
  detectedLabel,
  type DetectedKind,
  type DistroId,
} from "~/lib/detect-platform";
import { fetchLatestRelease, pickAsset, type LatestRelease } from "~/lib/github-release";

type Props = {
  /** Shown on the primary control, e.g. "Download DevCentr". */
  label: string;
  class?: string;
  /** Anchor for in-page Download links. Omit on secondary copies. */
  anchor?: string;
  /**
   * Canonical product URLs keyed by platform (e.g. GitHub latest/download).
   * When set, these win over GitHub API matching.
   */
  downloads?: Partial<Record<DistroId, string>>;
  owner?: string;
  repo?: string;
};

export function DownloadCta(props: Props) {
  const [kind, setKind] = createSignal<DetectedKind | null>(null);
  const [chosen, setChosen] = createSignal<DistroId | null>(null);
  const [release, setRelease] = createSignal<LatestRelease | null | undefined>(undefined);
  const [error, setError] = createSignal<string | null>(null);

  const usesCatalog = () => !!props.downloads && Object.keys(props.downloads).length > 0;

  onMount(() => {
    void (async () => {
      try {
        const detected = await detectKind();
        setKind(detected);
        setChosen((c) => c ?? desktopDefault(detected));
      } catch {
        setKind("unknown");
      }
      if (usesCatalog()) {
        setRelease(null);
        return;
      }
      if (!props.owner || !props.repo) {
        setRelease(null);
        return;
      }
      try {
        setRelease(await fetchLatestRelease(props.owner, props.repo));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load releases");
        setRelease(null);
      }
    })();
  });

  const selected = () => chosen();
  const href = () => {
    const id = selected();
    if (!id) return undefined;
    if (usesCatalog()) return props.downloads?.[id];
    const rel = release();
    if (rel === undefined) return undefined;
    return pickAsset(rel ?? null, id)?.browser_download_url;
  };
  const detectedLine = () => {
    const k = kind();
    if (!k) return "Detecting…";
    return `(Download) ${detectedLabel(k)} detected`;
  };
  const ready = () => kind() !== null && (usesCatalog() || release() !== undefined);
  const available = (id: DistroId) => {
    if (usesCatalog()) return !!props.downloads?.[id];
    return !!pickAsset(release() ?? null, id);
  };
  const missingRelease = () => ready() && !usesCatalog() && release() === null;
  const missingAsset = () => ready() && selected() != null && !href();

  const btnClass =
    "inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50";

  return (
    <div id={props.anchor} class={`flex flex-col items-start gap-2 ${props.class ?? ""}`}>
      <Show
        when={href()}
        fallback={
          <button type="button" class={btnClass} disabled>
            {props.label}
          </button>
        }
      >
        {(url) => (
          <a class={btnClass} href={url()} rel="noopener noreferrer">
            {props.label}
          </a>
        )}
      </Show>

      <p class="text-[11px] leading-snug text-muted-foreground">{detectedLine()}</p>

      <label class="flex flex-col gap-1 text-[11px] text-muted-foreground">
        <span>Another platform</span>
        <select
          class="h-8 min-w-[12rem] rounded-md border border-border/80 bg-background/70 px-2 font-mono text-[11px] text-foreground"
          value={selected() ?? ""}
          disabled={!ready()}
          onChange={(e) => {
            const v = e.currentTarget.value;
            setChosen((DISTROS.some((d) => d.id === v) ? v : null) as DistroId | null);
          }}
        >
          <Show when={!desktopDefault(kind() ?? "unknown")}>
            <option value="">Choose a platform</option>
          </Show>
          <For each={DISTROS}>
            {(d) => (
              <option value={d.id}>
                {d.label}
                {ready() && !available(d.id) ? " — none yet" : ""}
              </option>
            )}
          </For>
        </select>
      </label>

      <Show when={missingRelease()}>
        <p class="text-[11px] text-muted-foreground">No release yet.</p>
      </Show>
      <Show when={missingAsset()}>
        <p class="text-[11px] text-muted-foreground">No build for that platform yet.</p>
      </Show>
      <Show when={error()}>
        {(msg) => <p class="text-[11px] text-muted-foreground">{msg()}</p>}
      </Show>
    </div>
  );
}

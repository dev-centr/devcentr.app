import { onMount } from "solid-js";

const NEXT = "https://devcentr.org/orchestrator";

/** The suite now lives on the organization site. This host only forwards. */
export default function Home() {
  onMount(() => {
    window.location.replace(NEXT);
  });

  return (
    <main class="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-4 px-6">
      <p class="text-lg">Orchestrator now lives on devcentr.org.</p>
      <a class="text-primary underline-offset-4 hover:underline" href={NEXT}>
        Continue to Orchestrator
      </a>
    </main>
  );
}

import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import { ThemeProvider } from "~/components/theme-provider";

import "./app.css";

export default function App() {
  return (
    <ThemeProvider>
      <Router
        root={(props) => (
          <MetaProvider>
            <Suspense
              fallback={
                <div class="flex min-h-dvh items-center justify-center font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Loading…
                </div>
              }
            >
              {props.children}
            </Suspense>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </ThemeProvider>
  );
}

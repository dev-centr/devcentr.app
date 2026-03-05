import "./app.css";

export default function Home() {
  return (
    <main>
      <section class="hero-wrapper">
        <div class="hero">
          <h1>Stop Managing Tools.<br/><span class="highlight">Orchestrate Ecosystems.</span></h1>
          <p>
            Experience the world's first <strong>Development Orchestration Suite (DOS)</strong>. A new class of software for the next era of engineering.
          </p>
          <div class="btn-group">
            <a href="https://github.com/dev-centr/devcentr/releases" class="btn btn-primary">Download DevCentr</a>
            <a href="https://docs.devcentr.org" class="btn btn-secondary">Explore the DOS</a>
          </div>
        </div>
      </section>

      <section class="container">
        <div class="grid">
          <div class="feature-card">
            <div class="icon">🚀</div>
            <h3>One-Touch Tooling</h3>
            <p>
              Instantly provision shell environments, toolchains, and project dependencies. Redefine efficiency.
            </p>
          </div>
          <div class="feature-card">
            <div class="icon">🧭</div>
            <h3>Visual Blueprints</h3>
            <p>
              Interactive maps that model your software architecture in real-time. See the whole picture.
            </p>
          </div>
          <div class="feature-card">
            <div class="icon">🧠</div>
            <h3>AI Synergy Hub</h3>
            <p>
              The truth-source for AI vibe-coding. Feed your LLMs the deep environmental context they crave.
            </p>
          </div>
          <div class="feature-card">
            <div class="icon">🛡️</div>
            <h3>Reproducible Flow</h3>
            <p>
              Version your entire workspace infrastructure. Consistent environments from dev to production.
            </p>
          </div>
          <div class="feature-card">
            <div class="icon">🛠️</div>
            <h3>VCS Integration</h3>
            <p>
              Unified support for Git, Mercurial, SVN, and more. One interface to rule every repository.
            </p>
          </div>
          <div class="feature-card">
            <div class="icon">🧩</div>
            <h3>Extension Architecture</h3>
            <p>
              Built to grow. A copy-left, source-available ecosystem designed for community-driven evolution.
            </p>
          </div>
        </div>
      </section>

      <footer style="padding: 4rem; text-align: center; color: #475569; font-size: 0.9rem;">
        <p>A flagship project of the Dev-Centr Organization.</p>
        <p>&copy; 2026 Dev-Centr</p>
      </footer>
    </main>
  );
}

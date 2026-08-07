# Design system — devcentr.app

## Direction

**Product control plane.** Same steel/teal family as `devcentr.org`, but this site sells the **DevCentr app** as a Development Orchestration Suite (DOS). DevOps is one facet of capabilities; “Dev OS” may appear once as a quiet mental model. The org site owns the cultural-resource / development-path pitch; lab identity lives elsewhere.

## Color

| Token | Light | Dark (system) |
| --- | --- | --- |
| Background | Cool gray-blue `#F0F4F8` | Near-black `#0A1016` |
| Primary (signal) | Teal `#178F80` | Bright teal `#2DD4BF` |
| Foreground | Ink `#0B1520` | Soft white |
| Muted text | Slate mid | Slate mid |

## Typography

- **Display / body:** Space Grotesk
- **Meta / CTAs:** IBM Plex Mono (uppercase, tracked)

## Brand mark

Orbiting rings + rotated square hub. Assets in `public/brand/` (mirrors org / GitHub profile).

## Layout rules

1. Hero is one composition: brand, one headline, one supporting line, CTA group, full-bleed orbital visual.
2. No cards in the hero. Capability list uses hairline rules, not card chrome.
3. One job per section.
4. Motion: orbit spin, reverse orbit, hub pulse (respect `prefers-reduced-motion`).
5. No login / account UI on this site.

## CTAs

- Primary: Download → `https://github.com/dev-centr/devcentr/releases`
- Secondary: Docs → `https://docs.devcentr.org`
- Org: `https://devcentr.org`

bba-shared-kit -> @barito-bahalap/* packages

Purpose: one shared foundation for every BBA application, so the corporate site, the BBT site, the BBM site and the internal dashboard look and behave consistently without copying code between repositories.

Packages:

| Package | Contents |
|---|---|
| types | Shared TypeScript types (brand, navigation, site, profile, icons) |
| config | Site config, divisions, navigation |
| styles | Global styles, two-layer design tokens, per-app brand files, brand scopes |
| contexts | Header and auth contexts |
| components | Routing helpers, feedback, SEO, icon, button, display, layout, cards, inputs, forms |
| icons | Icon set |
| assets | Shared static assets (favicon) |
| utils | Shared helpers |
| supabase | Supabase client, for apps that need a database |
| ts-config | Shared TypeScript declarations |

Each package has its own version. Packages are source-exported (TS and CSS), and the consuming Vite app compiles them.

Rules:

- Components use only Layer 2 tokens (`--clr-*`). Layer 1 (`--palette-*`) is for brand files only.
- Inside a package, import siblings with relative paths. Never import a package from itself.
- Shared code stays presentational and structural. No client data, no brand-specific copy, no BBT or BBM business content. This keeps the operational firewall intact at repository level.
- If an app needs a missing component or token, add it here, then publish.

Local setup (from the repository root C:\dev\bba, which holds `pnpm-workspace.yaml`):

1. `pnpm install`
2. `pnpm typecheck`

The workspace uses `nodeLinker: hoisted` and `linkWorkspacePackages: true`, so apps resolve the kit from local source during development.

Publish (from `bba-shared-kit`):

1. Bump the `version` of every package you changed.
2. `pnpm typecheck`
3. `pnpm -r publish --no-git-checks`

Publishing needs a GitHub token with `write:packages` in your user-level `.npmrc` for `https://npm.pkg.github.com`.

Consume:

- Apps declare the `@barito-bahalap/*` packages they use and set the `@barito-bahalap` registry to GitHub Packages in their `.npmrc`.
- Local: `pnpm --filter <app> dev` from the repository root.
- Vercel: set `GITHUB_TOKEN` (read:packages) as a build environment variable.

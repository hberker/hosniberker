// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Site + base path are derived from the repository name so the site works
 * in both GitHub Pages modes with zero code changes:
 *
 *   - Repo named `hosniberker`      -> https://hberker.github.io/hosniberker/
 *   - Repo renamed `hberker.github.io` -> https://hberker.github.io/  (clean root)
 *
 * GITHUB_REPOSITORY is provided automatically by GitHub Actions.
 * Local dev/builds fall back to the project-site config below.
 */
const FALLBACK_OWNER = 'hberker';
const FALLBACK_REPO = 'hosniberker';

const [owner = FALLBACK_OWNER, repo = FALLBACK_REPO] = (
  process.env.GITHUB_REPOSITORY ?? ''
).split('/').filter(Boolean);

const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

const site = isUserSite
  ? `https://${repo.toLowerCase()}`
  : `https://${owner.toLowerCase()}.github.io`;
const base = isUserSite ? '/' : `/${repo}`;

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // Emits predictable /path/index.html files that GitHub Pages
    // serves natively at extension-free URLs.
    format: 'directory',
  },
});

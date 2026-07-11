/**
 * Prefix an internal path with the configured base path so links work both
 * as a project site (/hosniberker/...) and at the domain root if the repo
 * is ever renamed to hberker.github.io.
 */
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function withBase(path: string): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

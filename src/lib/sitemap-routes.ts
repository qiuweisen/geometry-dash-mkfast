export const SITEMAP_LOCALIZED_ROUTES = [
  '/',
  '/game/geometry-dash-lite',
  '/how-to-play-geometry-dash-lite',
] as const;

/**
 * `/resources` is currently translated only for English and Simplified
 * Chinese. Keep it in the localized route set so those two documents can
 * share hreflang metadata, but do not synthesize the other locale variants.
 * `null` means every canonical locale prefix is supported.
 */
export const SITEMAP_ROUTE_LOCALE_PREFIXES: Record<
  (typeof SITEMAP_LOCALIZED_ROUTES)[number],
  readonly string[] | null
> = {
  '/': null,
  '/game/geometry-dash-lite': null,
  '/how-to-play-geometry-dash-lite': null,
};

export const BASE_LOCALE_ONLY_PATHS = [
  '/about',
  '/contact',
  '/resources',
  '/privacy-policy',
  '/user-agreement',
] as const;

/** No English-only pages are currently eligible for search indexing. */
export const SITEMAP_BASE_LOCALE_ROUTES = [] as const;

const publishedLocalePrefixes = ['/', '/zh-hans'] as const;

/** Exact public HTML paths currently eligible for search indexing. */
export function isSearchIndexablePath(pathname: string): boolean {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  return publishedLocalePrefixes.some((prefix) =>
    SITEMAP_LOCALIZED_ROUTES.some((route) => {
      const localizedRoute =
        prefix === '/' ? route : route === '/' ? prefix : `${prefix}${route}`;
      return normalizedPath === localizedRoute;
    })
  );
}

/** Public pages whose content exists only in the base (English) locale. */
export function isBaseLocaleOnlyPath(pathname: string): boolean {
  return (
    pathname === '/blog' ||
    pathname.startsWith('/blog/') ||
    (BASE_LOCALE_ONLY_PATHS as readonly string[]).includes(pathname)
  );
}

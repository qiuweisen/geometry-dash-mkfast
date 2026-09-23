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

export const SITEMAP_BASE_LOCALE_ROUTES = [
  '/about',
  '/contact',
  '/privacy-policy',
  '/user-agreement',
] as const;

/** Public pages whose content exists only in the base (English) locale. */
export function isBaseLocaleOnlyPath(pathname: string): boolean {
  return (
    pathname === '/blog' ||
    pathname.startsWith('/blog/') ||
    (SITEMAP_BASE_LOCALE_ROUTES as readonly string[]).includes(pathname)
  );
}

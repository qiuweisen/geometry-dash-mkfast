import { describe, expect, it } from 'vitest';
import { getChartMiniLegacyRedirect } from '@/lib/chartmini-legacy-redirects';
import {
  getBaseLocaleOnlyRedirectPath,
  getLocalizedLocalesForPath,
  isLocalizedPath,
} from '@/lib/locale';
import {
  isSearchIndexablePath,
  SITEMAP_BASE_LOCALE_ROUTES,
  SITEMAP_LOCALIZED_ROUTES,
} from '@/lib/sitemap-routes';

describe('SEO URL redirects', () => {
  it('does not add a redirect for non-English blog URLs', () => {
    const response = getChartMiniLegacyRedirect(
      new Request(
        'https://play-geometry-dash.com/cs/blog/triple-ema-tradingview-tutorial?ref=gsc'
      )
    );

    expect(response).toBeNull();
  });

  it('does not convert the legacy zh blog alias into a 301', () => {
    const response = getChartMiniLegacyRedirect(
      new Request(
        'https://play-geometry-dash.com/zh/blog/triple-ema-tradingview-tutorial'
      )
    );

    expect(response).toBeNull();
  });

  it('redirects source route-group paths to public paths', () => {
    const response = getChartMiniLegacyRedirect(
      new Request('https://play-geometry-dash.com/(pages)/contact')
    );

    expect(response?.status).toBe(301);
    expect(response?.headers.get('location')).toBe(
      'https://play-geometry-dash.com/contact'
    );
  });

  it('leaves the English canonical blog URL alone', () => {
    const response = getChartMiniLegacyRedirect(
      new Request(
        'https://play-geometry-dash.com/blog/triple-ema-tradingview-tutorial'
      )
    );

    expect(response).toBeNull();
  });
});

describe('SEO sitemap locale contract', () => {
  it('keeps translated sitemap routes aligned with hreflang metadata', () => {
    expect(SITEMAP_LOCALIZED_ROUTES.every(isLocalizedPath)).toBe(true);
  });

  it('keeps English-only routes out of localized sitemap clusters', () => {
    expect(
      SITEMAP_BASE_LOCALE_ROUTES.every((path) => !isLocalizedPath(path))
    ).toBe(true);
    expect(isLocalizedPath('/blog')).toBe(false);
    expect(isLocalizedPath('/blog/example-post')).toBe(false);
  });

  it('redirects only locale-prefixed English-only public paths', () => {
    expect(getBaseLocaleOnlyRedirectPath('/fr/blog')).toBe('/blog');
    expect(getBaseLocaleOnlyRedirectPath('/fr/blog/example-post')).toBe(
      '/blog/example-post'
    );
    expect(getBaseLocaleOnlyRedirectPath('/zh-hans/privacy-policy')).toBe(
      '/privacy-policy'
    );
    expect(getBaseLocaleOnlyRedirectPath('/de/resources')).toBe('/resources');
    expect(getBaseLocaleOnlyRedirectPath('/de/resources/')).toBe('/resources');
    expect(getBaseLocaleOnlyRedirectPath('/zh-hans/resources')).toBe(
      '/resources'
    );
    expect(getBaseLocaleOnlyRedirectPath('/fr/crypto-trading-simulator')).toBe(
      '/crypto-trading-simulator'
    );
    expect(getBaseLocaleOnlyRedirectPath('/fr')).toBe('/');
    expect(getBaseLocaleOnlyRedirectPath('/fr/game/geometry-dash-lite')).toBe(
      '/game/geometry-dash-lite'
    );
    expect(
      getBaseLocaleOnlyRedirectPath('/zh-hans/game/geometry-dash-lite')
    ).toBeNull();
    expect(getBaseLocaleOnlyRedirectPath('/blog/example-post')).toBeNull();
  });

  it('keeps only published game pages in localized sitemap clusters', () => {
    expect(SITEMAP_LOCALIZED_ROUTES).toEqual([
      '/',
      '/game/geometry-dash-lite',
      '/how-to-play-geometry-dash-lite',
    ]);
    expect(SITEMAP_LOCALIZED_ROUTES.every(isLocalizedPath)).toBe(true);
  });

  it('marks only published English and Simplified Chinese HTML URLs indexable', () => {
    for (const route of SITEMAP_LOCALIZED_ROUTES) {
      expect(isSearchIndexablePath(route)).toBe(true);
      expect(
        isSearchIndexablePath(route === '/' ? '/zh-hans' : `/zh-hans${route}`)
      ).toBe(true);
    }
    for (const path of [
      '/about',
      '/contact',
      '/blog',
      '/resources',
      '/market-replay',
      '/fr/game/geometry-dash-lite',
      '/privacy-policy',
    ]) {
      expect(isSearchIndexablePath(path)).toBe(false);
    }
  });

  it('limits Geometry Dash hreflang to published English and Simplified Chinese pages', () => {
    for (const route of SITEMAP_LOCALIZED_ROUTES) {
      expect(getLocalizedLocalesForPath(route)).toEqual(['en', 'zh-hans']);
    }
    expect(getLocalizedLocalesForPath('/market-replay')).toEqual(['en']);
  });
});

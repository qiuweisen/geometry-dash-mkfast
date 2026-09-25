import {
  baseLocale,
  deLocalizeHref,
  getLocale,
  locales,
  localizeHref,
  type Locale,
} from '@/locale/paraglide/runtime';
import type { SupportedLang } from '@/lib/languages';
import { isBaseLocaleOnlyPath } from '@/lib/sitemap-routes';

export {
  baseLocale,
  deLocalizeHref,
  getLocale,
  locales,
  localizeHref,
  type Locale,
};

type LocaleConfig = {
  flag: string;
  name: string;
  hreflang: string;
  ogLocale: string;
};

const localeNames: Record<string, string> = {
  en: 'English',
  zh: '简体中文',
  'es-419': 'Español',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  'zh-hans': '简体中文',
  'zh-hant': '繁體中文',
  ar: 'العربية',
  it: 'Italiano',
  nl: 'Nederlands',
  pl: 'Polski',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
  hi: 'हिन्दी',
  he: 'עברית',
  fa: 'فارسی',
  uk: 'Українська',
  cs: 'Čeština',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi',
  el: 'Ελληνικά',
  ro: 'Română',
  hu: 'Magyar',
  bg: 'Български',
  sk: 'Slovenčina',
  sl: 'Slovenščina',
  sr: 'Српски',
  ms: 'Bahasa Melayu',
  bn: 'বাংলা',
  ur: 'اردو',
  ta: 'தமிழ்',
  te: 'తెలుగు',
};

const localeHreflangs: Record<string, string> = {
  zh: 'zh-Hans',
  'es-419': 'es',
  // Keep the production hreflang contract. The URL remains /pt, while the
  // current production site publishes `pt`, not `pt-BR`.
  pt: 'pt',
  'zh-hans': 'zh-Hans',
  'zh-hant': 'zh-Hant',
};

const localeOgLocales: Record<string, string> = {
  zh: 'zh_CN',
  'zh-hans': 'zh_CN',
  'zh-hant': 'zh_TW',
};

// TanStarter's native locale switcher uses a small `flag` string in the
// locale config. Keep that approach, but provide a real regional indicator
// for every language instead of using the generic globe placeholder.
const localeFlags: Record<string, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
  'es-419': '🇲🇽',
  pt: '🇧🇷',
  fr: '🇫🇷',
  de: '🇩🇪',
  ru: '🇷🇺',
  ja: '🇯🇵',
  ko: '🇰🇷',
  'zh-hans': '🇨🇳',
  'zh-hant': '🇭🇰',
  ar: '🇸🇦',
  it: '🇮🇹',
  nl: '🇳🇱',
  pl: '🇵🇱',
  tr: '🇹🇷',
  vi: '🇻🇳',
  th: '🇹🇭',
  id: '🇮🇩',
  hi: '🇮🇳',
  he: '🇮🇱',
  fa: '🇮🇷',
  uk: '🇺🇦',
  cs: '🇨🇿',
  sv: '🇸🇪',
  no: '🇳🇴',
  da: '🇩🇰',
  fi: '🇫🇮',
  el: '🇬🇷',
  ro: '🇷🇴',
  hu: '🇭🇺',
  bg: '🇧🇬',
  sk: '🇸🇰',
  sl: '🇸🇮',
  sr: '🇷🇸',
  ms: '🇲🇾',
  bn: '🇧🇩',
  ur: '🇵🇰',
  ta: '🇮🇳',
  te: '🇮🇳',
};

export const localeConfig = Object.fromEntries(
  locales.map((locale) => [
    locale,
    {
      flag: localeFlags[locale] ?? '🌐',
      name: localeNames[locale] ?? locale,
      hreflang: localeHreflangs[locale] ?? locale,
      ogLocale:
        localeOgLocales[locale] ??
        (localeHreflangs[locale] ?? locale).replace('-', '_'),
    },
  ])
) as Record<Locale, LocaleConfig>;

// `zh` was introduced by the TanStarter migration. Keep `/zh` routable as a
// compatibility alias while `/zh-hans` is the published Simplified Chinese
// URL for this site.
const legacyLocaleAliases = new Set<Locale>();

// Keep the most commonly used languages at the top of every native locale
// selector. Locales not listed here retain their configured order below them.
const commonLocaleOrder: Locale[] = ['en', 'zh-hans'];

const commonLocalePriority = new Map(
  commonLocaleOrder.map((locale, index) => [locale, index])
);

export const selectableLocales = locales
  .filter(
    (locale) =>
      !legacyLocaleAliases.has(locale) && ['en', 'zh-hans'].includes(locale)
  )
  .sort(
    (left, right) =>
      (commonLocalePriority.get(left) ?? Number.MAX_SAFE_INTEGER) -
      (commonLocalePriority.get(right) ?? Number.MAX_SAFE_INTEGER)
  );

/**
 * Return only locales with a published document for a public SEO path.
 * Geometry Dash content is currently reviewed in English and Simplified
 * Chinese; legacy template paths must not advertise untranslated locales.
 */
export function getLocalizedLocalesForPath(path: string): Locale[] {
  return LOCALIZED_PATHS.has(path) ? ['en', 'zh-hans'] : ['en'];
}

export function getCanonicalLocale(locale: Locale): Locale {
  return locale;
}

/**
 * Adapter for legacy ChartMini dictionaries that still use the historical
 * language identifiers. Paraglide uses URL-safe BCP 47 identifiers while the
 * simulator copy modules predate the migration.
 */
const legacyLangByLocale: Record<string, SupportedLang> = {
  en: 'en',
  zh: 'zh-Hans',
  'zh-hans': 'zh-Hans',
  'zh-hant': 'zh-Hant',
  'es-419': 'es',
  pt: 'pt',
  fr: 'fr',
  de: 'de',
  ru: 'ru',
  ja: 'ja',
  ko: 'ko',
  ar: 'ar',
  it: 'it',
  nl: 'nl',
  pl: 'pl',
  tr: 'tr',
  vi: 'vi',
  th: 'th',
  id: 'id',
  hi: 'hi',
  he: 'he',
  fa: 'fa',
  uk: 'uk',
  cs: 'cs',
  sv: 'sv',
  no: 'no',
  da: 'da',
  fi: 'fi',
  el: 'el',
  ro: 'ro',
  hu: 'hu',
  bg: 'bg',
  sk: 'sk',
  sl: 'sl',
  sr: 'sr',
  ms: 'ms',
  bn: 'bn',
  ur: 'ur',
  ta: 'ta',
  te: 'te',
};

export function toLegacySupportedLang(locale: string): SupportedLang {
  return legacyLangByLocale[locale] ?? 'en';
}

/**
 * Public locale prefixes currently published for Geometry Dash. These are
 * kept separate from Paraglide's retained template locale list so sitemap
 * output does not invent URLs for untranslated documents.
 */
export const chartMiniLocalePaths = [
  { prefix: '/', hreflang: 'en' },
  { prefix: '/zh-hans', hreflang: 'zh-Hans' },
] as const;

export function parseMessageJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function getMessageList(value: string) {
  return parseMessageJson<string[]>(value, []);
}

export function getCanonicalPathname(pathname: string) {
  return deLocalizeHref(pathname).split('?')[0]?.split('#')[0] ?? pathname;
}

/**
 * Paths that have localized SEO documents and should get hreflang alternates
 * in sitemap / SEO metadata. Most paths are translated for every canonical
 * locale; `/resources` is a deliberate partial-locale exception handled by
 * `getLocalizedLocalesForPath`. Blog content currently falls back to the
 * English production article and is intentionally not marked as localized.
 */
export const LOCALIZED_PATHS = new Set([
  '/',
  '/game/geometry-dash-lite',
  '/how-to-play-geometry-dash-lite',
]);

/**
 * True for any user-visible path with at least one localized SEO document and
 * therefore needs hreflang alternates (English ↔ localized variants,
 * x-default). Used by both `seo()` metadata and the dynamic sitemap.
 */
export function isLocalizedPath(path: string): boolean {
  return LOCALIZED_PATHS.has(path);
}

/**
 * Return the base-locale destination for a public URL whose locale does not
 * have translated content. Fully translated paths intentionally return null
 * and remain first-class locale URLs.
 */
export function getBaseLocaleOnlyRedirectPath(pathname: string): string | null {
  const localePrefixes = locales
    .filter((locale) => locale !== baseLocale)
    .map((locale) => `/${locale}`);
  const localePrefix = localePrefixes.find(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!localePrefix) return null;

  const basePathname = pathname.slice(localePrefix.length) || '/';
  const normalizedBasePathname = basePathname.replace(/\/+$/, '') || '/';

  if (localePrefix !== '/zh-hans') return normalizedBasePathname;

  return isBaseLocaleOnlyPath(normalizedBasePathname)
    ? normalizedBasePathname
    : null;
}

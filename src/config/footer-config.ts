import type { MenuItemConfig } from '../types';
import { m } from '@/locale/paraglide/messages';

/** Public links grouped for TanStarter's native Footer. */
export function getFooterLinks(): MenuItemConfig[] {
  return [
    {
      title: m.home_hero_primary(),
      items: [
        {
          title: m.home_hero_primary(),
          href: '/game/geometry-dash-lite',
        },
        {
          title: m.home_hero_secondary(),
          href: '/how-to-play-geometry-dash-lite',
        },
      ],
    },
    {
      title: m.footer_content(),
      items: [
        { title: m.footer_blog(), href: '/blog', baseLocaleOnly: true },
        { title: m.footer_about(), href: '/about', baseLocaleOnly: true },
        { title: m.footer_contact(), href: '/contact', baseLocaleOnly: true },
      ],
    },
    {
      title: m.footer_legal(),
      items: [
        {
          title: m.footer_user_agreement(),
          href: '/user-agreement',
          baseLocaleOnly: true,
        },
        {
          title: m.footer_privacy_policy(),
          href: '/privacy-policy',
          baseLocaleOnly: true,
        },
      ],
    },
  ];
}

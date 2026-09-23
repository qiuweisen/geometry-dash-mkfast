import { m } from '@/locale/paraglide/messages';
import type { MenuItemConfig } from '../types';

/**
 * Public navigation for the single-game SEO validation site.
 */
export function getNavbarLinks(): MenuItemConfig[] {
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
      title: m.nav_about_title(),
      href: '/about',
      external: false,
      baseLocaleOnly: true,
    },
    {
      title: m.nav_contact_title(),
      href: '/contact',
      external: false,
      baseLocaleOnly: true,
    },
  ];
}

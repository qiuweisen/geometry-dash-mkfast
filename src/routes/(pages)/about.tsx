import { createFileRoute, Link } from '@tanstack/react-router';
import Container from '@/components/layout/container';
import { websiteConfig } from '@/config/website';
import { getCanonicalLocale, getLocale } from '@/lib/locale';
import { seo } from '@/lib/seo';
import { m } from '@/locale/paraglide/messages';

export const Route = createFileRoute('/(pages)/about')({
  head: () => {
    const isEnglish = getCanonicalLocale(getLocale()) === 'en';
    const metadata = seo('/about', {
      title: isEnglish
        ? 'About This Website | Play Geometry Dash'
        : `${m.about_title()} | ${websiteConfig.metadata?.name}`,
      description:
        'Learn what this independent Geometry Dash Lite browser game website provides.',
    });
    return {
      ...metadata,
      meta: [...metadata.meta, { name: 'robots', content: 'noindex, follow' }],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <Container className="px-4 py-16 md:py-20">
      <article className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About this website
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          This independent website provides a browser-based Geometry Dash Lite
          player, along with practical controls and troubleshooting information.
          The game player is hosted separately from the site's pages.
        </p>
        <p className="leading-7 text-muted-foreground">
          This website is not the official Geometry Dash website and is not
          affiliated with or endorsed by the game's creators. Game names,
          trademarks, and original game content remain the property of their
          respective owners.
        </p>
        <Link
          to="/game/geometry-dash-lite"
          className="inline-flex font-medium text-primary underline-offset-4 hover:underline"
        >
          Play Geometry Dash Lite
        </Link>
      </article>
    </Container>
  );
}

import { createFileRoute, Link } from '@tanstack/react-router';
import { jsonLdScript, seo, siteStructuredData } from '@/lib/seo';
import { websiteConfig } from '@/config/website';

const gameUrl = 'https://pub-80cc1196a115483ab41dc7676e40da8c.r2.dev/gdlite/v1/index.html';

export const Route = createFileRoute('/game/geometry-dash-lite')({
  head: () => ({
    ...seo('/game/geometry-dash-lite', {
      title: 'Geometry Dash Lite Online | Play Free in Your Browser',
      description:
        'Play Geometry Dash Lite online in your browser. Jump over spikes, use keyboard or touch controls, and replay instantly with no download.',
    }),
    scripts: [
      jsonLdScript({
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: 'Geometry Dash Lite',
        description: 'Play Geometry Dash Lite online in your browser.',
        url: `${websiteConfig.metadata?.name ? 'https://play-geometry-dash.com' : ''}/game/geometry-dash-lite`,
        applicationCategory: 'Game',
        operatingSystem: 'Web browser',
        genre: 'Arcade',
        playMode: 'SinglePlayer',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }),
      jsonLdScript(siteStructuredData()),
    ],
  }),
  component: GamePage,
});

function GamePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">Browser arcade</p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Geometry Dash Lite Online</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">Jump, dodge the spikes, and replay Geometry Dash Lite directly in your browser. No download or signup required.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border bg-black shadow-2xl">
        <iframe src={gameUrl} title="Play Geometry Dash Lite" className="aspect-video w-full border-0" allow="fullscreen; autoplay" />
      </div>
      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div><h2 className="text-2xl font-semibold">How to play</h2><p className="mt-3 leading-7 text-muted-foreground">Press Space, Up Arrow, or click to jump on desktop. Tap the game area on mobile. Time each jump to clear obstacles and improve your run.</p></div>
        <div><h2 className="text-2xl font-semibold">Play in your browser</h2><p className="mt-3 leading-7 text-muted-foreground">The game loads in an independent player and works on modern desktop and mobile browsers with WebGL enabled.</p><Link to="/how-to-play-geometry-dash-lite" className="mt-4 inline-block font-medium text-primary">View controls and troubleshooting</Link></div>
      </section>
    </main>
  );
}
